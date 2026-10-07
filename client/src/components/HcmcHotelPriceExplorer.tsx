import { useMemo, useState } from "react";
import { Building2, Check, MapPin } from "lucide-react";

const tiers = [
  { id: "budget", label: "Hostel / budget", range: "$10–$20/night", description: "Dated Vietnam hotel research band for low-cost rooms and hostels." },
  { id: "mid", label: "3–4-star mid-range", range: "$30–$60/night", description: "Dated Vietnam hotel research band; central private rooms and boutique inventory can sit higher." },
  { id: "luxury", label: "5-star luxury", range: "$120–$400/night", description: "Dated Vietnam hotel research band; dynamic central-city platform averages can be higher on specific dates." },
] as const;

type TierId = (typeof tiers)[number]["id"];

const areas = [
  { id: "district-1", name: "District 1", bestFor: "Nightlife + first-timers", note: "The compact tourist and commercial core for landmarks, nightlife, international dining, and the easiest first search.", scope: "The published $10–$20 / $30–$60 / $120–$400 city bands are the applicable planning frame; exact central inventory varies by date." },
  { id: "district-3", name: "District 3", bestFor: "Culture + food", note: "Close-in streets, colonial architecture, temples, parks, and local dining without leaving the central orbit.", scope: "Use the city-level bands as the verified benchmark; the source does not publish a separate District 3 price survey." },
  { id: "phu-nhuan", name: "Phu Nhuan", bestFor: "Airport-side value", note: "A practical local neighborhood between the airport and central districts, suited to food-led stays and shorter transfer times.", scope: "Use the city-level bands as the verified benchmark; area-level rates are not presented as a separate survey." },
  { id: "thao-dien", name: "District 2 / Thao Dien", bestFor: "Digital nomads + families", note: "An international, café-rich pocket with longer-stay appeal, more space, and a quieter rhythm than District 1.", scope: "Source notes identify private guesthouses around $28–$55 and 3-star around $55–$100; boutique 4-star examples can reach $140–$240. These are dated context, not live quotes." },
  { id: "district-4", name: "District 4", bestFor: "Food-focused budget", note: "A compact, young, street-food-forward base across the river from District 1.", scope: "Use the city-level bands as the verified benchmark; the source describes affordability but does not isolate a complete tier table." },
  { id: "cho-lon", name: "District 5 / Cho Lon", bestFor: "History + food", note: "The Chinese-heritage quarter for markets, pagodas, teahouses, and a distinct food culture.", scope: "Use the city-level bands as the verified benchmark; allow for traffic time to the central core." },
  { id: "phu-my-hung", name: "District 7 / Phu My Hung", bestFor: "Family + quieter stays", note: "A spacious, international environment with malls, clinics, restaurants, and a slower daily pace.", scope: "Use the city-level bands as the verified benchmark; the area is farther from central sightseeing." },
  { id: "binh-thanh", name: "Binh Thanh", bestFor: "Local buzz + value", note: "A lively mixed local/international base close to District 2, with strong street-food access.", scope: "Use the city-level bands as the verified benchmark; traffic changes the practical value of the location." },
] as const;

export default function HcmcHotelPriceExplorer() {
  const [tier, setTier] = useState<TierId>("mid");
  const [areaId, setAreaId] = useState<(typeof areas)[number]["id"]>("district-1");
  const selectedTier = useMemo(() => tiers.find((item) => item.id === tier) ?? tiers[1], [tier]);
  const selectedArea = useMemo(() => areas.find((item) => item.id === areaId) ?? areas[0], [areaId]);

  return (
    <section id="hcmc-rate-explorer" className="mt-14 scroll-mt-28 rounded-3xl border border-[#b9dce9] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="hcmc-rate-explorer-title">
      <div className="flex items-start gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><Building2 className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Interactive 2026 planning tool</p><h2 id="hcmc-rate-explorer-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Filter Ho Chi Minh City rates by tier and area</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Choose a benchmark tier and the area you are considering. The tier ranges are verified city-level planning bands; the area selector adds fit and scope notes without pretending unsupported district-level averages exist.</p></div></div>
      <div className="mt-7 grid gap-4 md:grid-cols-2"><label className="rounded-xl border border-[#b9dce9] bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Accommodation tier<select aria-label="Ho Chi Minh City accommodation tier" value={tier} onChange={(event) => setTier(event.target.value as TierId)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{tiers.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.range}</option>)}</select></label><label className="rounded-xl border border-[#b9dce9] bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Area or district<select aria-label="Ho Chi Minh City area" value={areaId} onChange={(event) => setAreaId(event.target.value as typeof areaId)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{areas.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.bestFor}</option>)}</select></label></div>
      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr]" aria-live="polite"><div className="rounded-2xl bg-[#0D1B2A] p-6 text-white"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F4A261]"><Check className="h-4 w-4" aria-hidden="true" />Selected benchmark</div><h3 className="mt-3 font-playfair text-3xl font-bold">{selectedTier.range}</h3><p className="mt-2 text-slate-200">{selectedTier.label} in {selectedArea.name}</p><p className="mt-4 text-sm leading-relaxed text-slate-300">{selectedTier.description}</p></div><div className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]"><MapPin className="h-4 w-4" aria-hidden="true" />Area fit: {selectedArea.bestFor}</div><p className="mt-3 font-playfair text-2xl font-bold text-[#0D1B2A]">{selectedArea.name}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{selectedArea.note}</p><p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">{selectedArea.scope}</p></div></div>
      <p className="mt-5 text-xs leading-relaxed text-slate-500">Benchmark boundary: the cited HCMC research reports city-level bands of $10–$20 budget, $30–$60 mid-range, and $120–$400 luxury. A dynamic Trip.com snapshot in the comparison guide reports about $93 weekday / $99 weekend overall, with 3-star $75/$82, 4-star $168/$178, and 5-star $362/$364. Those platform figures are current context, not guaranteed rates.</p>
    </section>
  );
}
