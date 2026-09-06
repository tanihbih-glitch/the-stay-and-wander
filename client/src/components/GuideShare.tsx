import { Share2 } from "lucide-react";
import { useState } from "react";

interface GuideShareProps {
  title: string;
  url: string;
  className?: string;
}

/** Shares only the public guide URL; it never serializes visitor inputs or local planner state. */
export default function GuideShare({ title, url, className = "" }: GuideShareProps) {
  const [status, setStatus] = useState("");

  const shareGuide = async () => {
    const shareData = { title, text: `Read ${title} on The Stay & Wander.`, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setStatus("Share options opened.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("Guide link copied.");
      } else {
        setStatus("Copy this guide URL from your browser address bar.");
      }
    } catch {
      setStatus("Sharing was cancelled. You can copy the guide URL from your browser address bar.");
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button type="button" onClick={shareGuide} className="inline-flex items-center gap-2 rounded-full border border-[#a8d4e8] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-colors hover:border-[#0077B6] hover:bg-[#edf8fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share this guide
      </button>
      <span className="min-h-5 text-sm text-slate-600" aria-live="polite">{status}</span>
    </div>
  );
}
