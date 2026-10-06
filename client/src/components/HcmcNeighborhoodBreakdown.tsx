import { MapPinned } from "lucide-react";

type Neighborhood = {
  name: string;
  bestFor: string;
  character: string;
  practicalNote: string;
};

export default function HcmcNeighborhoodBreakdown({ items }: { items: readonly Neighborhood[] }) {
  return <section id="hcmc-neighborhoods" className="mt-12 scroll-mt-28" aria-labelledby="hcmc-neighborhoods-title">
    <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Ho Chi Minh City by traveler fit</p><h2 id="hcmc-neighborhoods-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Which neighborhood matches your selector choice?</h2></div><MapPinned className="hidden h-8 w-8 text-[#F4A261] sm:block" aria-hidden="true" /></div>
    <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">These are neighborhood dynamics, not a ranking. Use them to decide where to search, then confirm the final rate, noise level, traffic, and distance for your dates.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{items.map((item) => <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-playfair text-2xl font-bold text-[#0D1B2A]">{item.name}</h3><span className="rounded-full bg-[#F8EFE0] px-3 py-1 text-xs font-bold text-[#9a5b20]">{item.bestFor}</span></div><p className="mt-3 leading-relaxed text-slate-700">{item.character}</p><p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-[#0D1B2A]">Practical note:</span> {item.practicalNote}</p></article>)}</div>
  </section>;
}
