import { Check, Clipboard, Share2 } from "lucide-react";
import { useState } from "react";

interface ComparisonShareProps {
  title: string;
  url: string;
  className?: string;
}

/** Shares only the public comparison URL; it never serializes persona choices or local state. */
export default function ComparisonShare({ title, url, className = "" }: ComparisonShareProps) {
  const [status, setStatus] = useState("");
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("Comparison link copied.");
      } else {
        setStatus("Copy this comparison URL from your browser address bar.");
      }
    } catch {
      setStatus("Copy this comparison URL from your browser address bar.");
    }
  };

  const shareComparison = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: `Compare cities with The Stay & Wander: ${title}`, url });
        setStatus("Share options opened.");
      } else {
        await copyLink();
      }
    } catch {
      setStatus("Sharing was cancelled. You can still copy the comparison link.");
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button type="button" onClick={shareComparison} className="inline-flex items-center gap-2 rounded-full border border-[#a8d4e8] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0077B6] hover:bg-[#edf8fd] hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share this comparison
      </button>
      <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0077B6] hover:text-[#0077B6] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">
        {status === "Comparison link copied." ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
        Copy link
      </button>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label={`Share ${title} on Facebook`} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0077B6] hover:text-[#0077B6] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label={`Share ${title} on X`} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0077B6] hover:text-[#0077B6] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">X</a>
      <span className="min-h-5 text-sm text-slate-600" aria-live="polite">{status}</span>
    </div>
  );
}
