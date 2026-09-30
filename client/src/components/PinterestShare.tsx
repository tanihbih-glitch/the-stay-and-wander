import { Check, Copy, Pin } from "lucide-react";
import { useState } from "react";

interface PinterestShareProps {
  title: string;
  url: string;
  media: string;
  className?: string;
}

/** Opens Pinterest's official save flow without collecting visitor identity or planner state. */
export default function PinterestShare({ title, url, media, className = "" }: PinterestShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(title)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`rounded-2xl border border-[#f2c9cf] bg-[#fff7f8] p-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b4233c]">Save for later</p>
          <p className="mt-1 text-sm font-semibold text-[#0D1B2A]">Pin this guide</p>
        </div>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Pin ${title} on Pinterest`}
          className="inline-flex items-center gap-2 rounded-full bg-[#E60023] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#bd001d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] focus-visible:ring-offset-2"
        >
          <Pin className="h-4 w-4" aria-hidden="true" />
          Pin this guide
        </a>
        <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-[#f1cdd2] bg-white px-4 py-2 text-sm font-semibold text-[#b4233c] transition duration-150 hover:-translate-y-0.5 hover:bg-[#fff0f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] focus-visible:ring-offset-2" aria-live="polite">
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">Save this planning reference to your Pinterest boards for your next UAE or Southeast Asia trip.</p>
    </div>
  );
}
