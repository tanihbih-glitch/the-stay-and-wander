import crypto from "node:crypto";
import { and, eq } from "drizzle-orm";
import { tripPlanRevisions, tripPlans, type TripPlan } from "../drizzle/schema";
import { getDb } from "./db";
import { generateTripItineraryPdf } from "./generateTripItineraryPdf";
import { sendItineraryDeliveryEmail } from "./itineraryEmail";
import { invokeLLM } from "./_core/llm";
import { storageGet, storagePut } from "./storage";
import {
  buildConciergeRevisionPrompt,
  buildFreePreviewPrompt,
  buildPaidItineraryPrompt,
  type TripPlannerInput,
  type TripPlannerTier,
} from "./tripPlannerPrompts";

export type TripPlannerAccess = { publicId: string; accessToken: string };

function hashAccessToken(accessToken: string) {
  return crypto.createHash("sha256").update(accessToken).digest("hex");
}

function createTripPlannerAccess(): TripPlannerAccess & { accessTokenHash: string } {
  const accessToken = crypto.randomBytes(32).toString("base64url");
  return {
    publicId: crypto.randomUUID(),
    accessToken,
    accessTokenHash: hashAccessToken(accessToken),
  };
}

function toInput(plan: TripPlan): TripPlannerInput {
  return {
    destination: plan.destination,
    tripLength: plan.tripLength,
    travelDates: plan.travelDates,
    interests: Array.isArray(plan.interests) ? plan.interests.map(String) : [],
    budgetLevel: plan.budgetLevel,
    travelStyle: plan.travelStyle,
    pace: plan.pace,
  };
}

function itineraryText(result: Awaited<ReturnType<typeof invokeLLM>>) {
  const content = result.choices[0]?.message.content;
  if (typeof content === "string" && content.trim()) return content.trim();
  if (Array.isArray(content)) {
    const text = content
      .filter(item => item.type === "text")
      .map(item => item.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  throw new Error("The itinerary generator returned no usable text.");
}

function withTimeout<T>(operation: Promise<T>, label: string, timeoutMs: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out. Please try again.`)), timeoutMs);
  });

  return Promise.race([operation, timeoutPromise]).finally(() => {
    if (timeout) clearTimeout(timeout);
  });
}

async function generateItinerary(prompt: string) {
  const result = await withTimeout(
    invokeLLM({
      model: "claude-sonnet-4-6",
      maxTokens: 12000,
      messages: [{ role: "user", content: prompt }],
    }),
    "Itinerary generation",
    120_000
  );
  return itineraryText(result);
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Trip planning is temporarily unavailable because the database is not connected.");
  return db;
}

export async function createFreePreview(input: TripPlannerInput, userId?: number) {
  const db = await requireDb();
  const previewItinerary = await generateItinerary(buildFreePreviewPrompt(input));
  const access = createTripPlannerAccess();

  await db.insert(tripPlans).values({
    publicId: access.publicId,
    accessTokenHash: access.accessTokenHash,
    userId,
    destination: input.destination,
    tripLength: input.tripLength,
    travelDates: input.travelDates || null,
    interests: input.interests,
    budgetLevel: input.budgetLevel,
    travelStyle: input.travelStyle,
    pace: input.pace,
    previewItinerary,
    previewGeneratedAt: new Date(),
    fulfillmentStatus: "preview_ready",
  });

  return { publicId: access.publicId, accessToken: access.accessToken, previewItinerary };
}

export async function getTripPlanForAccess(access: TripPlannerAccess) {
  const db = await requireDb();
  const result = await db
    .select()
    .from(tripPlans)
    .where(and(eq(tripPlans.publicId, access.publicId), eq(tripPlans.accessTokenHash, hashAccessToken(access.accessToken))))
    .limit(1);
  return result[0] ?? null;
}

export async function recordCheckoutSession(options: {
  access: TripPlannerAccess;
  tier: TripPlannerTier;
  customerEmail: string;
  stripeCheckoutSessionId: string;
}) {
  const db = await requireDb();
  const plan = await getTripPlanForAccess(options.access);
  if (!plan) throw new Error("We could not find that trip plan. Please create a new preview.");
  if (plan.fulfillmentStatus === "ready") throw new Error("This trip plan has already been fulfilled.");

  await db
    .update(tripPlans)
    .set({
      selectedTier: options.tier,
      customerEmail: options.customerEmail,
      stripeCheckoutSessionId: options.stripeCheckoutSessionId,
      fulfillmentStatus: "checkout_created",
      failureReason: null,
    })
    .where(eq(tripPlans.id, plan.id));

  return plan;
}

export async function markTripPlanPaidFromCheckout(options: {
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
  stripeCustomerId?: string | null;
  customerEmail?: string | null;
}) {
  const db = await requireDb();
  const matchingPlans = await db.select().from(tripPlans).where(eq(tripPlans.stripeCheckoutSessionId, options.stripeCheckoutSessionId)).limit(1);
  const plan = matchingPlans[0];
  if (!plan) throw new Error("No trip plan is associated with this Stripe Checkout session.");

  await db
    .update(tripPlans)
    .set({
      stripePaymentIntentId: options.stripePaymentIntentId || plan.stripePaymentIntentId,
      stripeCustomerId: options.stripeCustomerId || plan.stripeCustomerId,
      customerEmail: options.customerEmail || plan.customerEmail,
      fulfillmentStatus:
        plan.fulfillmentStatus === "checkout_created" || plan.fulfillmentStatus === "preview_ready" || plan.fulfillmentStatus === "paid" || plan.fulfillmentStatus === "failed"
          ? "paid"
          : plan.fulfillmentStatus,
      purchasedAt: plan.purchasedAt || new Date(),
      failureReason: null,
    })
    .where(eq(tripPlans.id, plan.id));

  return plan;
}

function affectedRows(result: unknown) {
  const header = Array.isArray(result) ? result[0] : result;
  if (header && typeof header === "object" && "affectedRows" in header) {
    const value = (header as { affectedRows?: unknown }).affectedRows;
    return typeof value === "number" ? value : 0;
  }
  return 0;
}

export async function fulfillPaidTripPlan(stripeCheckoutSessionId: string) {
  const db = await requireDb();
  const records = await db.select().from(tripPlans).where(eq(tripPlans.stripeCheckoutSessionId, stripeCheckoutSessionId)).limit(1);
  const current = records[0];
  if (!current) throw new Error("No trip plan was found for fulfillment.");
  if (current.fulfillmentStatus === "ready") return current;
  if (current.fulfillmentStatus === "generating") return current;
  if (current.fulfillmentStatus !== "paid" || !current.selectedTier) {
    throw new Error("This itinerary cannot be fulfilled until payment is confirmed.");
  }

  const claimed = await db
    .update(tripPlans)
    .set({ fulfillmentStatus: "generating", failureReason: null })
    .where(and(eq(tripPlans.id, current.id), eq(tripPlans.fulfillmentStatus, "paid")));

  if (affectedRows(claimed) !== 1) {
    const latest = await db.select().from(tripPlans).where(eq(tripPlans.id, current.id)).limit(1);
    return latest[0] ?? current;
  }

  try {
    const startedAt = Date.now();
    console.info(`[Trip Planner] Started ${current.selectedTier} fulfillment for ${current.publicId}`);
    const itinerary = await generateItinerary(buildPaidItineraryPrompt(current.selectedTier, toInput(current)));
    console.info(`[Trip Planner] Itinerary generated for ${current.publicId} in ${Date.now() - startedAt}ms`);
    const pdf = await generateTripItineraryPdf({ itinerary, input: toInput(current), tier: current.selectedTier });
    console.info(`[Trip Planner] PDF rendered for ${current.publicId} in ${Date.now() - startedAt}ms`);
    const stored = await withTimeout(
      storagePut(
        `trip-itineraries/${current.publicId}/${current.selectedTier}-itinerary.pdf`,
        pdf,
        "application/pdf"
      ),
      "PDF storage upload",
      30_000
    );
    console.info(`[Trip Planner] PDF stored for ${current.publicId} in ${Date.now() - startedAt}ms`);

    await db
      .update(tripPlans)
      .set({
        fullItinerary: itinerary,
        pdfStorageKey: stored.key,
        pdfUrl: stored.url,
        fulfillmentStatus: "ready",
        conciergeRevisionAvailable: current.selectedTier === "concierge",
        deliveredAt: new Date(),
        failureReason: null,
      })
      .where(eq(tripPlans.id, current.id));
    console.info(`[Trip Planner] Fulfillment completed for ${current.publicId} in ${Date.now() - startedAt}ms`);

    if (current.customerEmail) {
      try {
        await sendItineraryDeliveryEmail({
          recipient: current.customerEmail,
          destination: current.destination,
          tier: current.selectedTier,
          downloadPath: stored.url,
        });
      } catch (emailError) {
        // The generated PDF remains accessible through the protected access
        // link, so an external email failure must not fail fulfillment.
        console.error("[Trip Planner] Itinerary email delivery failed", emailError);
      }
    }

    const completed = await db.select().from(tripPlans).where(eq(tripPlans.id, current.id)).limit(1);
    return completed[0] ?? current;
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 512) : "Itinerary generation failed.";
    console.error(`[Trip Planner] Fulfillment failed for ${current.publicId}`, error);
    await db
      .update(tripPlans)
      .set({ fulfillmentStatus: "failed", failureReason: message })
      .where(eq(tripPlans.id, current.id));
    throw error;
  }
}

export async function getItineraryDelivery(access: TripPlannerAccess) {
  const plan = await getTripPlanForAccess(access);
  if (!plan) return null;
  const pdfUrl = plan.pdfStorageKey ? (await storageGet(plan.pdfStorageKey)).url : plan.pdfUrl;
  return { ...plan, pdfUrl };
}

export async function submitConciergeRevision(options: { access: TripPlannerAccess; revisionRequest: string }) {
  const db = await requireDb();
  const plan = await getTripPlanForAccess(options.access);
  if (!plan || plan.selectedTier !== "concierge" || !plan.conciergeRevisionAvailable || !plan.fullItinerary) {
    throw new Error("A Concierge revision is not available for this itinerary.");
  }

  const existing = await db.select().from(tripPlanRevisions).where(eq(tripPlanRevisions.tripPlanId, plan.id)).limit(1);
  if (existing[0]) throw new Error("The included Concierge revision has already been used.");

  await db.insert(tripPlanRevisions).values({ tripPlanId: plan.id, revisionRequest: options.revisionRequest, fulfillmentStatus: "generating" });
  await db.update(tripPlans).set({ conciergeRevisionAvailable: false, conciergeRevisionUsedAt: new Date() }).where(eq(tripPlans.id, plan.id));

  try {
    const revisedItinerary = await generateItinerary(buildConciergeRevisionPrompt(plan.fullItinerary, options.revisionRequest));
    const pdf = await generateTripItineraryPdf({ itinerary: revisedItinerary, input: toInput(plan), tier: "concierge" });
    const stored = await storagePut(`trip-itineraries/${plan.publicId}/concierge-revision.pdf`, pdf, "application/pdf");
    await db
      .update(tripPlanRevisions)
      .set({ revisedItinerary, revisedPdfStorageKey: stored.key, revisedPdfUrl: stored.url, fulfillmentStatus: "ready", completedAt: new Date() })
      .where(eq(tripPlanRevisions.tripPlanId, plan.id));
    await db
      .update(tripPlans)
      .set({ fullItinerary: revisedItinerary, pdfStorageKey: stored.key, pdfUrl: stored.url, deliveredAt: new Date() })
      .where(eq(tripPlans.id, plan.id));
    return { revisedItinerary, pdfUrl: stored.url };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 512) : "Revision generation failed.";
    await db.update(tripPlanRevisions).set({ fulfillmentStatus: "failed", failureReason: message }).where(eq(tripPlanRevisions.tripPlanId, plan.id));
    throw error;
  }
}
