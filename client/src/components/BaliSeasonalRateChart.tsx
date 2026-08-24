import { useState } from "react";
import { BALI_SEASONAL_BENCHMARKS } from "./BaliGroupCostCalculator";

export default function BaliSeasonalRateChart() {
  const [series, setSeries] = useState<"hotel" | "villa">("hotel");
  const [selectedMonth, setSelectedMonth] = useState("August");
  const highestRate = Math.max(...BALI_SEASONAL_BENCHMARKS.map((item) => item[series]));
  const selected = BALI_SEASONAL_BENCHMARKS.find((item) => item.month === selectedMonth) ?? BALI_SEASONAL_BENCHMARKS[7];
  const label = series === "hotel" ? "Mid-range hotel" : "Private pool villa";

  return (
    <section className="mt-14" aria-labelledby="seasonal-title">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Monthly planning view</p><h2 id="seasonal-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Bali seasonal rate trends for 2026</h2><p className="mt-4 leading-relaxed text-slate-700">Select a benchmark series, then choose any month to inspect its supplied seasonal multiplier and nightly reference. Baseline: $56 mid-range hotel / $150 private pool villa per night.</p></div><div className="flex rounded-full border border-slate-300 bg-white p-1"><button type="button" onClick={() => setSeries("hotel")} className={`rounded-full px-4 py-2 text-sm font-semibold ${series === "hotel" ? "bg-[#0077B6] text-white" : "text-slate-600"}`}>Mid-range hotel</button><button type="button" onClick={() => setSeries("villa")} className={`rounded-full px-4 py-2 text-sm font-semibold ${series === "villa" ? "bg-[#0D1B2A] text-white" : "text-slate-600"}`}>Private pool villa</button></div></div>
      <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"><div className="flex min-w-[720px] items-end gap-3 overflow-x-auto pb-3" role="list" aria-label={`${label} seasonal nightly rate chart`}>{BALI_SEASONAL_BENCHMARKS.map((item) => { const value = item[series]; const active = item.month === selectedMonth; return <button type="button" role="listitem" key={item.month} onClick={() => setSelectedMonth(item.month)} aria-pressed={active} className="group flex w-14 shrink-0 flex-col items-center gap-2 text-center"><span className={`text-xs font-bold ${active ? "text-[#0077B6]" : "text-slate-600"}`}>${value}</span><span className={`w-full rounded-t-lg transition-opacity ${series === "hotel" ? "bg-[#0077B6]" : "bg-[#0D1B2A]"} ${active ? "opacity-100 ring-2 ring-[#F4A261] ring-offset-2" : "opacity-70 group-hover:opacity-100"}`} style={{ height: `${Math.max(44, (value / highestRate) * 220)}px` }} /><span className="text-xs font-semibold text-slate-600">{item.month.slice(0, 3)}</span></button>; })}</div>
        <div className="mt-6 rounded-2xl bg-[#F8EFE0] p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a5b20]">{selected.month} selected</p><p className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">${selected[series]} / night · {selected.multiplier}</p><p className="mt-2 text-sm text-slate-700">{selected.detail}</p></div>
      </div>
    </section>
  );
}
