import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";

export type SeasonalRateSignal = {
  month: string;
  status: "low" | "standard" | "high";
  label: string;
  observedRate?: number;
  note: string;
};

type CityCostPlanningCardProps = {
  cityA: string;
  cityB: string;
  cityARange: string;
  cityBRange: string;
  transportA: string;
  transportB: string;
  seasonalSignals: readonly SeasonalRateSignal[];
  sourceLabel: string;
};

const PLANNING_MONTHS = [
  ["01", "January"], ["02", "February"], ["03", "March"], ["04", "April"],
  ["05", "May"], ["06", "June"], ["07", "July"], ["08", "August"],
  ["09", "September"], ["10", "October"], ["11", "November"], ["12", "December"],
] as const;

export default function CityCostPlanningCard({ cityA, cityB, cityARange, cityBRange, transportA, transportB, seasonalSignals, sourceLabel }: CityCostPlanningCardProps) {
  const initialMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth.startsWith("2026-") ? initialMonth : "2026-08");
  const [message, setMessage] = useState("");
  const selected = useMemo(() => seasonalSignals.find((item) => item.month === selectedMonth.slice(5)) ?? seasonalSignals[0], [seasonalSignals, selectedMonth]);

  const downloadPdf = async () => {
    try {
      const { default: JsPDF } = await import("jspdf");
      const pdf = new JsPDF();
      const lines = [
        "The Stay & Wander — City Cost Planning Card",
        `${cityA} vs ${cityB}`,
        `Planning month: ${selectedMonth}`,
        "",
        `Hotel planning bands — ${cityA}: ${cityARange}`,
        `Hotel planning bands — ${cityB}: ${cityBRange}`,
        "",
        `Transport — ${cityA}: ${transportA}`,
        `Transport — ${cityB}: ${transportB}`,
        "",
        `Season signal: ${selected.label}`,
        selected.observedRate ? `Displayed source rate: $${selected.observedRate}/night` : "Displayed source rate: not reported for this month",
        selected.note,
        "",
        `Source boundary: ${sourceLabel}`,
        "Rates are planning benchmarks, not live quotes. Confirm dates, taxes, occupancy, room type, and availability before booking.",
      ];
      pdf.setFontSize(16);
      pdf.text(lines[0], 16, 20);
      pdf.setFontSize(11);
      lines.slice(1).forEach((line, index) => pdf.text(line, 16, 32 + index * 8, { maxWidth: 178 }));
      pdf.save("bangkok-ho-chi-minh-city-cost-planning-card.pdf");
      setMessage("PDF downloaded. It contains the selected month and source caveat.");
    } catch {
      setMessage("The PDF could not be created in this browser. Try the browser print dialog instead.");
    }
  };

  return <section id="cost-planner" className="mt-12 scroll-mt-28 rounded-3xl border border-[#cfe4ee] bg-[#f5fbfd] p-6 md:p-8" aria-labelledby="cost-planner-title">
    <div className="flex items-start gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6] shadow-sm"><FileText className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Save your planning snapshot</p><h2 id="cost-planner-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Download a city-cost planning card</h2></div></div>
    <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">Choose a month to carry the current seasonal signal into a concise PDF with both nightly planning bands and transport context. This is a browser-local export; no trip data is uploaded.</p>
    <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl bg-white p-5 shadow-sm"><label htmlFor="comparison-month" className="text-sm font-semibold text-[#0D1B2A]">Planning month</label><select id="comparison-month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-[#0D1B2A] focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{PLANNING_MONTHS.map(([value, label]) => <option key={value} value={`2026-${value}`}>{label} 2026</option>)}</select><p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-[#0D1B2A]">Season signal:</span> {selected.label}. {selected.note}</p>{selected.observedRate ? <p className="mt-2 text-2xl font-bold text-[#0077B6]">${selected.observedRate}/night displayed source rate</p> : <p className="mt-2 text-sm font-semibold text-[#9a5b20]">No month-specific rate is reported in the cited source.</p>}</div>
      <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-[#0D1B2A]">At-a-glance bands</p><div className="mt-3 space-y-3 text-sm text-slate-700"><p><span className="font-semibold">{cityA}:</span> {cityARange}</p><p><span className="font-semibold">{cityB}:</span> {cityBRange}</p><div className="h-3 overflow-hidden rounded-full bg-slate-100" aria-label="Seasonal signal scale"><div className={`h-full rounded-full ${selected.status === "low" ? "w-1/3 bg-[#0077B6]" : selected.status === "high" ? "w-full bg-[#F4A261]" : "w-2/3 bg-[#8bb8c9]"}`} /></div><p className="text-xs text-slate-500">The visual bar communicates the source's low/standard/high signal; it is not an interpolated rate curve.</p></div></div>
    </div>
    <button type="button" onClick={downloadPdf} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#005f91] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><Download className="h-4 w-4" aria-hidden="true" />Download PDF planning card</button>
    {message && <p className="mt-3 text-sm font-semibold text-[#0077B6]" role="status">{message}</p>}
  </section>;
}
