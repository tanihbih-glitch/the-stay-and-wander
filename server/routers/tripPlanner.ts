import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  createFreePreview,
  fulfillPaidTripPlan,
  getItineraryDelivery,
  getTripPlanForAccess,
  markTripPlanPaidFromCheckout,
  recordCheckoutSession,
  submitConciergeRevision,
} from "../tripPlannerService";
import { createTripPlannerCheckoutSession, tierSupportsTripLength, verifyPaidCheckoutSession } from "../stripe";
import { TRIP_PLANNER_TIERS, type TripPlannerTier } from "../tripPlannerPrompts";

const planningInput = z.object({
  destination: z.string().trim().min(2, "Enter a destination.").max(255),
  tripLength: z.number().int().min(2).max(10),
  travelDates: z.string().trim().max(128).optional(),
  interests: z.array(z.string().trim().min(1).max(48)).min(1, "Choose at least one interest.").max(8),
  budgetLevel: z.enum(["Budget", "Mid-range", "Luxury"]),
  travelStyle: z.string().trim().min(2).max(64),
  pace: z.enum(["Relaxed", "Balanced", "Packed"]),
});

const accessInput = z.object({
  publicId: z.string().uuid(),
  accessToken: z.string().min(32).max(128),
});

function toError(error: unknown) {
  const message = error instanceof Error ? error.message : "We could not complete that trip-planning request.";
  console.error("[Trip Planner] Request failed", error);
  return new TRPCError({
    code: "BAD_REQUEST",
    message: /usage exhausted|timed out|LLM invoke failed/i.test(message)
      ? "Your payment is confirmed, but your itinerary is taking longer than expected. Please try again in a few minutes."
      : message,
  });
}

export const tripPlannerRouter = router({
  createPreview: publicProcedure.input(planningInput).mutation(async ({ input, ctx }) => {
    try {
      return await createFreePreview(input, ctx.user?.id);
    } catch (error) {
      throw toError(error);
    }
  }),

  createCheckout: publicProcedure
    .input(
      z.object({
        access: accessInput,
        tier: z.enum(TRIP_PLANNER_TIERS),
        customerEmail: z.string().trim().email("Enter a valid email address."),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const plan = await getTripPlanForAccess(input.access);
        if (!plan) throw new Error("We could not find that trip plan. Please generate a new preview.");
        if (!tierSupportsTripLength(input.tier, plan.tripLength)) {
          throw new Error(
            input.tier === "basic"
              ? "Basic itineraries are available for two-day trips."
              : input.tier === "standard"
                ? "Standard itineraries are available for five-day trips."
                : "Premium and Concierge itineraries are available for trips of seven to ten days."
          );
        }

        const origin = ctx.req.headers.origin;
        if (!origin) throw new Error("We could not establish a secure checkout origin. Please try again from the Trip Planner page.");
        const session = await createTripPlannerCheckoutSession({
          tier: input.tier,
          origin,
          publicId: input.access.publicId,
          accessToken: input.access.accessToken,
          customerEmail: input.customerEmail,
          userId: ctx.user?.id,
          customerName: ctx.user?.name,
        });
        if (!session.url) throw new Error("Stripe did not return a checkout URL.");

        await recordCheckoutSession({
          access: input.access,
          tier: input.tier,
          customerEmail: input.customerEmail,
          stripeCheckoutSessionId: session.id,
        });
        return { checkoutUrl: session.url };
      } catch (error) {
        throw toError(error);
      }
    }),

  confirmCheckout: publicProcedure
    .input(z.object({ access: accessInput, sessionId: z.string().min(1).max(255) }))
    .mutation(async ({ input }) => {
      try {
        const verified = await verifyPaidCheckoutSession(input.sessionId, input.access.publicId);
        await markTripPlanPaidFromCheckout({
          stripeCheckoutSessionId: verified.sessionId,
          stripePaymentIntentId: verified.paymentIntentId,
          stripeCustomerId: verified.customerId,
          customerEmail: verified.customerEmail,
        });
        const plan = await fulfillPaidTripPlan(verified.sessionId);
        const delivery = await getItineraryDelivery(input.access);
        return {
          status: plan.fulfillmentStatus,
          itinerary: delivery?.fullItinerary ?? null,
          pdfUrl: delivery?.pdfUrl ?? null,
          destination: delivery?.destination ?? null,
          tier: delivery?.selectedTier ?? null,
          conciergeRevisionAvailable: delivery?.conciergeRevisionAvailable ?? false,
        };
      } catch (error) {
        throw toError(error);
      }
    }),

  getDelivery: publicProcedure.input(accessInput).query(async ({ input }) => {
    try {
      const delivery = await getItineraryDelivery(input);
      if (!delivery) throw new Error("This itinerary link is invalid or has expired.");
      return {
        status: delivery.fulfillmentStatus,
        itinerary: delivery.fulfillmentStatus === "ready" ? delivery.fullItinerary : null,
        pdfUrl: delivery.fulfillmentStatus === "ready" ? delivery.pdfUrl : null,
        destination: delivery.destination,
        tier: delivery.selectedTier,
        conciergeRevisionAvailable: delivery.conciergeRevisionAvailable,
        failureReason: delivery.fulfillmentStatus === "failed" ? delivery.failureReason : null,
      };
    } catch (error) {
      throw toError(error);
    }
  }),

  submitConciergeRevision: publicProcedure
    .input(z.object({ access: accessInput, revisionRequest: z.string().trim().min(10).max(2000) }))
    .mutation(async ({ input }) => {
      try {
        return await submitConciergeRevision(input);
      } catch (error) {
        throw toError(error);
      }
    }),
});
