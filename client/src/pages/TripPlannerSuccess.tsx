import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Download, Loader2, Mail, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { canRequestConciergeRevision } from "@/lib/conciergeRevision";
import { trpc } from "@/lib/trpc";

type Access = { publicId: string; accessToken: string };
type Delivery = {
  itinerary: string | null;
  pdfUrl: string | null;
  destination: string | null;
  tier: string | null;
  conciergeRevisionAvailable: boolean;
};

export default function TripPlannerSuccess() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const [access] = useState<Access | null>(() => {
    const publicId = params.get("plan");
    const accessToken = params.get("token");
    return publicId && accessToken ? { publicId, accessToken } : null;
  });
  const [sessionId] = useState(() => params.get("session_id"));
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [confirmationAttempt, setConfirmationAttempt] = useState(0);
  const [revisionRequest, setRevisionRequest] = useState("");
  const [revisionComplete, setRevisionComplete] = useState(false);
  const [revisionError, setRevisionError] = useState("");
  const confirmCheckout = trpc.tripPlanner.confirmCheckout.useMutation();
  const submitConciergeRevision = trpc.tripPlanner.submitConciergeRevision.useMutation();
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
        conciergeRevisionAvailable: deliveryQuery.data.conciergeRevisionAvailable,
      }
    : null);
  const deliveryFailed = deliveryQuery.data?.status === "failed";
  const displayError = error || (deliveryFailed
    ? "Your payment is confirmed, but we could not finish preparing the itinerary. Please try again in a few minutes."
    : "");
  const revisionAvailable = canRequestConciergeRevision({
    tier: readyDelivery?.tier,
    conciergeRevisionAvailable: readyDelivery?.conciergeRevisionAvailable,
    revisionComplete,
  });

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

  const requestConciergeRevision = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!access || !readyDelivery || revisionRequest.trim().length < 10) return;
    setRevisionError("");

    try {
      const revised = await submitConciergeRevision.mutateAsync({ access, revisionRequest: revisionRequest.trim() });
      setDelivery({
        itinerary: revised.revisedItinerary,
        pdfUrl: revised.pdfUrl,
        destination: readyDelivery.destination,
        tier: readyDelivery.tier,
        conciergeRevisionAvailable: false,
      });
      setRevisionRequest("");
      setRevisionComplete(true);
    } catch (requestError) {
      setRevisionError(requestError instanceof Error ? requestError.message : "We could not prepare that Concierge revision. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] pb-20 md:pb-0">
      <Header />
      <main className="container px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#d9d2c6] bg-white p-7 text-center shadow-[0_18px_55px_rgba(23,54,74,0.10)] sm:p-12">
          {(confirmCheckout.isPending || (paymentConfirmed && !readyDelivery && !displayError)) && <><Loader2 className="mx-auto size-10 animate-spin text-[#b3842d]" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Creating your full itinerary</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your journey is being written.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">We’re confirming payment, generating your complete itinerary from scratch, and preparing the branded PDF. Please keep this page open while we finish the details.</p></>}
          {displayError && <><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">We need one more moment</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your itinerary is not available yet.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">{displayError}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={retryFulfillment} disabled={confirmCheckout.isPending} className="bg-[#17364a] text-white hover:bg-[#0e2839]">Try again</Button><Button asChild variant="outline" className="border-[#b3842d] text-[#8d691f] hover:bg-[#fbf6eb]"><Link href="/trip-planner">Return to Trip Planner</Link></Button></div></>}
          {readyDelivery && !displayError && <><CheckCircle2 className="mx-auto size-11 text-[#b3842d]" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Payment confirmed</p><h1 className="mt-3 font-display text-4xl font-bold text-[#17364a]">Your {readyDelivery.destination} itinerary is ready.</h1><p className="mx-auto mt-4 max-w-xl text-slate-600">Your complete {readyDelivery.tier} itinerary was generated fresh as one cohesive document. We have also sent the download link to your email.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{readyDelivery.pdfUrl && <Button asChild className="h-11 bg-[#17364a] px-6 text-white hover:bg-[#0e2839]"><a href={readyDelivery.pdfUrl} target="_blank" rel="noreferrer"><Download className="size-4" /> Download your PDF</a></Button>}<Button asChild variant="outline" className="h-11 border-[#b3842d] text-[#8d691f] hover:bg-[#fbf6eb]"><Link href="/trip-planner"><Sparkles className="size-4" /> Plan another trip</Link></Button></div><p className="mt-6 flex justify-center gap-2 text-sm text-slate-500"><Mail className="size-4" />A copy of the download link is on its way to your inbox.</p>{readyDelivery.itinerary && <div className="mt-10 rounded-xl bg-[#f7f3ec] p-5 text-left text-sm leading-6 text-slate-700"><p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#b3842d]">Your itinerary preview</p><p className="whitespace-pre-wrap">{readyDelivery.itinerary.slice(0, 1400)}{readyDelivery.itinerary.length > 1400 ? "…" : ""}</p></div>}{revisionAvailable && <form onSubmit={requestConciergeRevision} className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#dccda9] bg-[#fffcf5] p-5 text-left"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b3842d]">Included Concierge revision</p><h2 className="mt-2 font-display text-2xl font-bold text-[#17364a]">Fine-tune one part of your journey.</h2><p className="mt-2 text-sm leading-6 text-slate-600">Tell us what needs to change. Your one included revision updates only the affected parts and creates a replacement PDF.</p><label htmlFor="concierge-revision" className="mt-4 block text-sm font-semibold text-[#17364a]">What would you like adjusted?</label><textarea id="concierge-revision" value={revisionRequest} onChange={event => setRevisionRequest(event.target.value)} minLength={10} maxLength={2000} required placeholder="For example: Swap the Day 3 dinner for a quieter seafood restaurant near our hotel." className="mt-2 min-h-28 w-full rounded-lg border border-[#d9d2c6] bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#b3842d] focus:ring-2 focus:ring-[#b3842d]/20" />{revisionError && <p className="mt-3 text-sm text-red-700">{revisionError}</p>}<Button type="submit" disabled={submitConciergeRevision.isPending || revisionRequest.trim().length < 10} className="mt-4 bg-[#17364a] text-white hover:bg-[#0e2839]">{submitConciergeRevision.isPending ? <><Loader2 className="size-4 animate-spin" /> Preparing your revision</> : "Request your included revision"}</Button></form>}{readyDelivery.tier === "concierge" && !readyDelivery.conciergeRevisionAvailable && <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#dccda9] bg-[#fffcf5] p-5 text-left"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b3842d]">Concierge revision complete</p><p className="mt-2 text-sm leading-6 text-slate-700">Your included Concierge revision has been used. The latest itinerary and replacement PDF are ready above.</p></div>}</>}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
