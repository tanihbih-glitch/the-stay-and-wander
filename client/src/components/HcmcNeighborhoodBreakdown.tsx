import { useMemo, useState } from "react";
import { MapPinned, Sparkles } from "lucide-react";

type Neighborhood = {
  name: string;
  bestFor: string;
  character: string;
  practicalNote: string;
  attractions?: string;
};

type TripType = "all" | "nightlife" | "culture" | "nomad" | "family";

const tripTypes: readonly { id: TripType; label: string; description: string }[] = [
  { id: "all", label: "Show all", description: "Compare every researched district" },
  { id: "nightlife", label: "Nightlife", description: "Central evenings and easy after-dark access" },
  { id: "culture", label: "Culture + history", description: "Architecture, markets, temples, and food" },
  { id: "nomad", label: "Digital nomad", description: "Cafés, longer stays, and international services" },
  { id: "family", label: "Family", description: "Space, services, and a calmer daily rhythm" },
];

const recommendedIds: Record<Exclude<TripType, "all">, readonly string[]> = {
  nightlife: ["District 1"],
  culture: ["District 3", "District 5 / Cho Lon"],
  nomad: ["District 2 / Thao Dien"],
  family: ["District 2 / Thao Dien", "District 7 / Phu My Hung"],
};

export default function HcmcNeighborhoodBreakdown({ items }: { items: readonly Neighborhood[] }) {
  const [tripType, setTripType] = useState<TripType>("all");
  const visibleItems = useMemo(() => tripType === "all" ? items : items.filter((item) => recommendedIds[tripType].includes(item.name)), [items, tripType]);
  const selectedDescription = tripTypes.find((item) => item.id === tripType)?.description ?? tripTypes[0].description;

  return <section id="hcmc-neighborhoods" className="mt-12 scroll-mt-28" aria-labelledby="hcmc-neighborhoods-title">
    <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Ho Chi Minh City by traveler fit</p><h2 id="hcmc-neighborhoods-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Which neighborhood matches your selector choice?</h2></div><MapPinned className="hidden h-8 w-8 text-[#F4A261] sm:block" aria-hidden="true" /></div>
    <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Choose a trip type to filter the researched recommendations. These are neighborhood dynamics, not a ranking. Hover or focus a district card to bring its vibe and top attractions forward.</p>
    <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter HCMC neighborhoods by trip type">{tripTypes.map((type) => <button key={type.id} type="button" aria-pressed={tripType === type.id} onClick={() => setTripType(type.id)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2 ${tripType === type.id ? "border-[#0077B6] bg-[#0077B6] text-white shadow-md" : "border-slate-300 bg-white text-[#0D1B2A] hover:border-[#0077B6] hover:text-[#0077B6]"}`}>{type.label}</button>)}</div>
    <p className="mt-3 text-sm text-slate-600" aria-live="polite"><Sparkles className="mr-1 inline h-4 w-4 text-[#F4A261]" aria-hidden="true" />{selectedDescription} · Showing {visibleItems.length} {visibleItems.length === 1 ? "district" : "districts"}.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{visibleItems.map((item) => <article key={item.name} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#7fc5dd] hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[#7fc5dd] focus-within:shadow-lg"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-playfair text-2xl font-bold text-[#0D1B2A] transition-colors duration-200 group-hover:text-[#0077B6]">{item.name}</h3><span className="rounded-full bg-[#F8EFE0] px-3 py-1 text-xs font-bold text-[#9a5b20]">{item.bestFor}</span></div><p className="mt-3 leading-relaxed text-slate-700">{item.character}</p>{item.attractions && <div className="mt-4 rounded-xl border border-[#e5f4fb] bg-[#f7fcfe] p-3 transition-colors duration-200 group-hover:border-[#b9dce9] group-hover:bg-[#eef8fb]"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]">Top attractions & vibe</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{item.attractions}</p></div>}<p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-[#0D1B2A]">Practical note:</span> {item.practicalNote}</p></article>)}</div>
  </section>;
}
