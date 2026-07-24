import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Download, Loader2, Mail, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

type Access = { publicId: string; accessToken: string };

export default function TripPlannerSuccess() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const [access] = useState<Access | null>(() => {
    const publicId = params.get("plan");
    const accessToken = params.get("token");
    return publicId && accessToken ? { publicId, accessToken } : null;
  });
  const [sessionId] = useState(() => params.get("session_id"));
  const [delivery, setDelivery] = useState<{ itinerary: string | null; pdfUrl: string | null; destination: string | null; tier: string | null } | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [confirmationAttempt, setConfirmationAttempt] = useState(0);
  const confirmCheckout = trpc.tripPlanner.confirmCheckout.useMutation();
  const inactiveAccess = useMemo<Access>(() => ({ publicId: "00000000-0000-0000-0000-000000000000", accessToken: "inactive-access-token" }), []);
  const deliveryQuery = trpc.tripPlanner.getDelivery.useQuery(access ?? inactiveAccess, {
    enabled: Boolean(access && sessionId),
    refetchInterval: query => query.state.data?.status === "ready" || query.state.data?.status === "failed" ? false : 4_000,
  });
  const readyDelivery = delivery ?? (deliveryQuery.data?.status === "ready"
    ? {
        itinerary: deliveryQuery.data.itinerary,
        pdfUrl: deliveryQuery.data.pdfUrl,
        destination: deliveryQuery.data.destination,
        tier: deliveryQuery.data.tier,
      }
    : null);
  const deliveryFailed = deliveryQuery.data?.status === "failed";
  const displayError = error || (deliveryFailed
    ? "Your payment is confirmed, but we could not finish preparing the itinerary. Please try again in a few minutes."
    : "");

  useEffect(() => {
    if (!access || !sessionId) {
      setError("This payment-return link is incomplete. You can start a new plan whenever you’re ready.");
      return;
    }
    void confirmCheckout.mutateAsync({ access, sessionId })
      .then(result => {
        setPaymentConfirmed(true);
        if (result.status === "ready") setDelivery(result);
      })
      .catch(requestError => setError(requestError instanceof Error ? requestError.message : "We could not confirm your payment yet."));
    // This confirmation must run once for the fixed Stripe-return query values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, sessionId, confirmationAttempt]);

  const retryFulfillment = () => {
    setError("");
    setPaymentConfirmed(false);
    setDelivery(null);
    setConfirmationAttempt(current => current + 1);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] pb-20 md:pb-0">
      <Header />
      <main className="container px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#d9d2c6] bg-white p-7 text-center shadow-[0_18px_55px_rgba(23,54,74,0.10)] sm:p-12">
          {(confirmCheckout.isPending || (paymentConfirmed && !readyDelivery && !displayError)) && <><Loader2 className="mx-auto size-10 animate-spin text-[#b3842d]" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Creating your full itinerary</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your journey is being written.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">We’re confirming payment, generating your complete itinerary from scratch, and preparing the branded PDF. Please keep this page open while we finish the details.</p></>}
          {displayError && <><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">We need one more moment</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your itinerary is not available yet.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">{displayError}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={retryFulfillment} disabled={confirmCheckout.isPending} className="bg-[#17364a] text-white hover:bg-[#0e2839]">Try again</Button><Button asChild variant="outline" className="border-[#b3842d] text-[#8d691f] hover:bg-[#fbf6eb]"><Link href="/trip-planner">Return to Trip Planner</Link></Button></div></>}
          {readyDelivery && !displayError && <><CheckCircle2 className="mx-auto size-11 text-[#b3842d]" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Payment confirmed</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your {readyDelivery.destination} itinerary is ready.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">Your complete {readyDelivery.tier} itinerary was generated fresh as one cohesive document. We have also sent the download link to your email.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{readyDelivery.pdfUrl && <Button asChild className="h-11 bg-[#17364a] px-6 text-white hover:bg-[#0e2839]"><a href={readyDelivery.pdfUrl} target="_blank" rel="noreferrer"><Download className="size-4" /> Download your PDF</a></Button>}<Button asChild variant="outline" className="h-11 border-[#b3842d] text-[#8d691f] hover:bg-[#fbf6eb]"><Link href="/trip-planner"><Sparkles className="size-4" /> Plan another trip</Link></Button></div><p className="mt-6 flex justify-center gap-2 text-sm text-slate-500"><Mail className="size-4" />A copy of the download link is on its way to your inbox.</p>{readyDelivery.itinerary && <div className="mt-10 rounded-xl bg-[#f7f3ec] p-5 text-left text-sm leading-6 text-slate-700"><p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#b3842d]">Your itinerary preview</p><p className="whitespace-pre-wrap">{readyDelivery.itinerary.slice(0, 1400)}{readyDelivery.itinerary.length > 1400 ? "…" : ""}</p></div>}</>}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
