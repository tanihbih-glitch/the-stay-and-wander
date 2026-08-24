import { useMemo, useState } from "react";
import { BedDouble, Calculator, Users } from "lucide-react";

export const BALI_SEASONAL_BENCHMARKS = [
  { month: "January", multiplier: "1.25x Jan 1–5 / 0.85x Jan 6–31", hotel: 70, villa: 185, detail: "New Year peak: $70 hotel / $185 villa; late-month low: $48 hotel / $125 villa" },
  { month: "February", multiplier: "0.80x", hotel: 45, villa: 120, detail: "Low season (monsoon)" },
  { month: "March", multiplier: "0.80x", hotel: 45, villa: 120, detail: "Low season (Nyepi period)" },
  { month: "April", multiplier: "1.00x", hotel: 56, villa: 150, detail: "Shoulder season (Easter peak)" },
  { month: "May", multiplier: "0.95x", hotel: 53, villa: 142, detail: "Shoulder season" },
  { month: "June", multiplier: "1.20x", hotel: 67, villa: 180, detail: "High season" },
  { month: "July", multiplier: "1.45x", hotel: 81, villa: 218, detail: "Peak summer season" },
  { month: "August", multiplier: "1.50x", hotel: 84, villa: 225, detail: "Peak summer season" },
  { month: "September", multiplier: "1.05x", hotel: 59, villa: 158, detail: "Shoulder season" },
  { month: "October", multiplier: "0.90x", hotel: 50, villa: 135, detail: "Shoulder / transition" },
  { month: "November", multiplier: "0.80x", hotel: 45, villa: 120, detail: "Low season (rainy start)" },
  { month: "December", multiplier: "1.60x", hotel: 90, villa: 240, detail: "Peak festive season (Dec 20–31)" },
] as const;

export function calculateBaliGroupCosts(travelers: number, nights: number, hotelRate: number, villaRate: number, guestsPerRoom = 2) {
  const rooms = Math.max(1, Math.ceil(Math.max(1, travelers) / guestsPerRoom));
  const hotelTotal = rooms * Math.max(1, nights) * hotelRate;
  const villaTotal = Math.max(1, nights) * villaRate;
  return { rooms, hotelTotal, villaTotal, difference: Math.abs(hotelTotal - villaTotal) };
}

export default function BaliGroupCostCalculator() {
  const [travelers, setTravelers] = useState(4);
  const [nights, setNights] = useState(5);
  const [month, setMonth] = useState("July");
  const benchmark = BALI_SEASONAL_BENCHMARKS.find((item) => item.month === month) ?? BALI_SEASONAL_BENCHMARKS[6];
  const result = useMemo(() => calculateBaliGroupCosts(travelers, nights, benchmark.hotel, benchmark.villa), [travelers, nights, benchmark.hotel, benchmark.villa]);
  const villaWins = result.villaTotal < result.hotelTotal;

  return (
    <section className="mt-14 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="group-cost-title">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Group planning tool</p><h2 id="group-cost-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Villa vs. hotel group-cost calculator</h2><p className="mt-4 leading-relaxed text-slate-700">Compare a mid-range hotel room for every two travellers with one private pool villa, using the supplied monthly Bali benchmarks. This is a planning estimate, not a live quote.</p></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <label className="rounded-2xl bg-white p-4 shadow-sm"><span className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]"><Users className="h-4 w-4 text-[#0077B6]" />Travellers</span><input aria-label="Number of travellers" type="number" min="1" max="20" value={travelers} onChange={(event) => setTravelers(Math.max(1, Number(event.target.value) || 1))} className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-semibold" /></label>
        <label className="rounded-2xl bg-white p-4 shadow-sm"><span className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]"><BedDouble className="h-4 w-4 text-[#0077B6]" />Nights</span><input aria-label="Number of nights" type="number" min="1" max="30" value={nights} onChange={(event) => setNights(Math.max(1, Number(event.target.value) || 1))} className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-semibold" /></label>
        <label className="rounded-2xl bg-white p-4 shadow-sm"><span className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]"><CalendarIcon />Travel month</span><select aria-label="Travel month" value={month} onChange={(event) => setMonth(event.target.value)} className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg font-semibold">{BALI_SEASONAL_BENCHMARKS.map((item) => <option key={item.month} value={item.month}>{item.month}</option>)}</select></label>
      </div>
      <p className="mt-4 text-sm text-slate-600"><span className="font-semibold">{benchmark.month} reference:</span> {benchmark.detail} · {benchmark.multiplier} against the stated baseline.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2"><article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{result.rooms} mid-range hotel room{result.rooms > 1 ? "s" : ""}</p><p className="mt-3 text-3xl font-bold text-[#0D1B2A]">${result.hotelTotal.toLocaleString()}</p><p className="mt-2 text-sm text-slate-600">${benchmark.hotel}/night × {result.rooms} room{result.rooms > 1 ? "s" : ""} × {nights} night{nights !== 1 ? "s" : ""}</p></article><article className="rounded-2xl bg-[#0D1B2A] p-6 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4A261]">One private pool villa</p><p className="mt-3 text-3xl font-bold">${result.villaTotal.toLocaleString()}</p><p className="mt-2 text-sm text-slate-200">${benchmark.villa}/night × {nights} night{nights !== 1 ? "s" : ""}</p></article></div>
      <div className="mt-5 flex items-start gap-3 rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-4 text-slate-700"><Calculator className="mt-0.5 h-5 w-5 shrink-0 text-[#c96725]" /><p><span className="font-bold text-[#0D1B2A]">{villaWins ? "Villa comparison:" : "Hotel comparison:"}</span> {villaWins ? `The villa is about $${result.difference.toLocaleString()} lower for this group estimate.` : `The hotel rooms are about $${result.difference.toLocaleString()} lower for this group estimate.`} Taxes, service, breakfast, and villa cleaning fees can change the final total.</p></div>
    </section>
  );
}

function CalendarIcon() { return <svg aria-hidden="true" className="h-4 w-4 text-[#0077B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>; }
