import { ArrowUp, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { isDestinationGuidePath } from "@/lib/destinationGuides";

type FeedbackVote = "up" | "down";

function storageKey(pathname: string) {
  return `tsw-guide-feedback:${pathname}`;
}

/** Keeps optional guide feedback entirely in the visitor's browser; no identity or response is transmitted. */
export default function GuideFeedbackAndBackToTop() {
  const [location] = useLocation();
  const [vote, setVote] = useState<FeedbackVote | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isGuide = isDestinationGuidePath(location);

  useEffect(() => {
    if (!isGuide) {
      setVote(null);
      setShowBackToTop(false);
      return;
    }
    try {
      const stored = window.localStorage.getItem(storageKey(location));
      setVote(stored === "up" || stored === "down" ? stored : null);
    } catch {
      setVote(null);
    }
    const updateVisibility = () => setShowBackToTop(window.scrollY > 420);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isGuide, location]);

  if (!isGuide) return null;

  const saveVote = (nextVote: FeedbackVote) => {
    setVote(nextVote);
    try {
      window.localStorage.setItem(storageKey(location), nextVote);
    } catch {
      // Storage may be disabled; feedback still remains visible for this page view.
    }
  };

  const returnToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return <>
    <section className="border-t border-[#cfe4ee] bg-[#eef8fb]" aria-labelledby="guide-feedback-heading">
      <div className="container py-10 text-center">
        <h2 id="guide-feedback-heading" className="font-playfair text-2xl font-bold text-[#0D1B2A]">Was this guide helpful?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">Your response stays on this device and helps you keep track of the guides that worked for you.</p>
        <div className="mt-5 flex justify-center gap-3" aria-label="Guide helpfulness feedback">
          <button type="button" onClick={() => saveVote("up")} aria-pressed={vote === "up"} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 ${vote === "up" ? "border-[#0077B6] bg-[#0077B6] text-white" : "border-[#8ec5dc] bg-white text-[#0077B6] hover:bg-[#dff2fa]"}`}><ThumbsUp className="h-4 w-4" aria-hidden="true" />Yes</button>
          <button type="button" onClick={() => saveVote("down")} aria-pressed={vote === "down"} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 ${vote === "down" ? "border-slate-700 bg-slate-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"}`}><ThumbsDown className="h-4 w-4" aria-hidden="true" />Not yet</button>
        </div>
        <p className="mt-4 min-h-5 text-sm font-medium text-slate-700" aria-live="polite">{vote === "up" ? "Thanks for letting us know." : vote === "down" ? "Thanks. Your selection is saved only in this browser." : ""}</p>
      </div>
    </section>
    {showBackToTop && <button type="button" onClick={returnToTop} aria-label="Back to top" className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#0D1B2A] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0077B6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 md:bottom-6"><ArrowUp className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Back to top</span></button>}
  </>;
}
