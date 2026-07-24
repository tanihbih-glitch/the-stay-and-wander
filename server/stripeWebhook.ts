import express, { type Express, type Request, type Response } from "express";
import Stripe from "stripe";
import { fulfillPaidTripPlan, markTripPlanPaidFromCheckout } from "./tripPlannerService";
import { getStripeClient } from "./stripe";

function resourceId(resource: string | { id: string } | null | undefined) {
  return typeof resource === "string" ? resource : resource?.id ?? null;
}

export function registerStripeWebhook(app: Express) {
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (typeof signature !== "string" || !webhookSecret) {
      return res.status(400).json({ error: "Missing Stripe webhook signature or configuration." });
    }

    let event: Stripe.Event;
    try {
      event = getStripeClient().webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown webhook verification failure.";
      return res.status(400).json({ error: `Webhook signature verification failed: ${message}` });
    }

    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid") {
          await markTripPlanPaidFromCheckout({
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: resourceId(session.payment_intent),
            stripeCustomerId: resourceId(session.customer),
            customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
          });
          await fulfillPaidTripPlan(session.id);
        }
      }
      console.log(`[Stripe] Processed webhook ${event.type} (${event.id})`);
      return res.json({ received: true });
    } catch (error) {
      console.error("[Stripe] Webhook processing failed", error);
      return res.status(500).json({ error: "Webhook processing failed." });
    }
  });
}
