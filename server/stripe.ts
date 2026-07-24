import Stripe from "stripe";
import { TRIP_PLANNER_TIER_CONFIG, type TripPlannerTier } from "./tripPlannerPrompts";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Stripe is not configured. Please add the project payment credentials first.");
  if (!stripeClient) stripeClient = new Stripe(secretKey);
  return stripeClient;
}

export function tierSupportsTripLength(tier: TripPlannerTier, tripLength: number) {
  if (tier === "basic") return tripLength === 2;
  if (tier === "standard") return tripLength === 5;
  return tripLength >= 7 && tripLength <= 10;
}

export async function createTripPlannerCheckoutSession(options: {
  tier: TripPlannerTier;
  origin: string;
  publicId: string;
  accessToken: string;
  customerEmail: string;
  userId?: number;
  customerName?: string | null;
}) {
  const stripe = getStripeClient();
  const tier = TRIP_PLANNER_TIER_CONFIG[options.tier];
  const accessParams = new URLSearchParams({ plan: options.publicId, token: options.accessToken });

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: options.customerEmail,
    billing_address_collection: "auto",
    allow_promotion_codes: true,
    client_reference_id: options.publicId,
    success_url: `${options.origin}/trip-planner/success?session_id={CHECKOUT_SESSION_ID}&${accessParams.toString()}`,
    cancel_url: `${options.origin}/trip-planner?${accessParams.toString()}&checkout=cancelled`,
    metadata: {
      trip_plan_id: options.publicId,
      user_id: options.userId?.toString() ?? "guest",
      customer_email: options.customerEmail,
      customer_name: options.customerName ?? "",
      tier: options.tier,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: tier.priceCents,
          product_data: {
            name: `The Stay & Wander — ${tier.label} itinerary`,
            description: tier.description,
          },
        },
      },
    ],
  });
}

function idOf(resource: string | { id: string } | null | undefined) {
  return typeof resource === "string" ? resource : resource?.id ?? null;
}

export async function verifyPaidCheckoutSession(sessionId: string, expectedPlanId: string) {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.metadata?.trip_plan_id !== expectedPlanId || session.client_reference_id !== expectedPlanId) {
    throw new Error("This checkout session does not belong to the requested trip plan.");
  }
  if (session.payment_status !== "paid") {
    throw new Error("Payment has not completed yet. Please wait a moment and try again.");
  }
  return {
    sessionId: session.id,
    paymentIntentId: idOf(session.payment_intent),
    customerId: idOf(session.customer),
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
  };
}
