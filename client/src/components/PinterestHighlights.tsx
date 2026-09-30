import { ArrowUpRight, Pin } from "lucide-react";
import { Link } from "wouter";

const highlights = [
  {
    label: "Hotel picks",
    title: "Best hotels in Dubai and Abu Dhabi",
    description: "A practical starting point for skyline, beach, culture, and resort stays.",
    href: "/blog/best-hotels-dubai-2026",
  },
  {
    label: "Longer stays",
    title: "UAE extended-stay hotel formats",
    description: "Compare kitchen, laundry, and brand-format considerations before a multi-week stay.",
    href: "/blog/uae-extended-stay-hotels-2026",
  },
  {
    label: "Itinerary",
    title: "Dubai and Abu Dhabi city-to-desert route",
    description: "Pair the two UAE cities with a balanced five-day planning framework.",
    href: "/itineraries",
  },
] as const;

/** Curated, non-personalized highlights inspired by the public Dubai Pinterest board. */
export default function PinterestHighlights() {
  return (
    <aside className="rounded-2xl border border-[#e5c2c8] bg-[#fff7f8] p-6 shadow-[0_14px_34px_rgba(23,54,74,0.06)]" aria-labelledby="pinterest-highlights-title">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E60023] text-white">
          <Pin className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b4233c]">Popular on Pinterest</p>
          <h2 id="pinterest-highlights-title" className="mt-1 font-playfair text-2xl font-bold text-[#17364a]">Dubai planning highlights</h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">Explore the hotel, longer-stay, and itinerary topics currently featured on The Stay &amp; Wander&apos;s Dubai travel board.</p>
      <div className="mt-5 space-y-3">
        {highlights.map((highlight) => (
          <Link key={highlight.href} href={highlight.href} className="group block rounded-xl border border-[#f1dfe2] bg-white p-4 transition-colors hover:border-[#e60023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] focus-visible:ring-offset-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b4233c]">{highlight.label}</p>
            <p className="mt-1 font-semibold leading-snug text-[#17364a] group-hover:text-[#b4233c]">{highlight.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{highlight.description}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#b4233c]">Read guide <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
      <a href="https://www.pinterest.com/thestayandwander/dubai-travel-hotels-tips-itineraries/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#b4233c] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E60023] focus-visible:ring-offset-2">
        See the Dubai board <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </aside>
  );
}
