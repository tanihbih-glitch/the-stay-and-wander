import { PlaneLanding } from "lucide-react";
import { bangkokTransferBenchmarks } from "@/components/BangkokTransferBenchmarkData";

export default function BangkokAirportTransferBudget() {
  return (
    <section className="mt-14" aria-labelledby="bangkok-transfer-budget-heading">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival logistics</p><h2 id="bangkok-transfer-budget-heading" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Bangkok Airport-to-Hotel Transfer Cost Benchmarks (2026)</h2><p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-700">Navigating arrival logistics from Suvarnabhumi Airport (BKK) or Don Mueang International Airport (DMK) into central Bangkok districts (Sukhumvit, Silom, Siam, Riverside):</p>
      <div className="table-responsive mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[1040px] w-full border-collapse text-left text-sm"><thead className="bg-[#0D1B2A] text-white"><tr><th className="p-4">Transport Mode</th><th className="p-4">Suvarnabhumi (BKK) to City Center</th><th className="p-4">Don Mueang (DMK) to City Center</th><th className="p-4">Best Suited For</th><th className="p-4">Booking / Payment Tip</th></tr></thead><tbody>{bangkokTransferBenchmarks.map((option) => <tr key={option.id} className="border-t border-slate-100 align-top"><th scope="row" className="p-4 font-semibold text-[#0D1B2A]">{option.mode}</th><td className="p-4 text-slate-700">{option.bkk}</td><td className="p-4 text-slate-700">{option.dmk}</td><td className="p-4 text-slate-700">{option.bestFor}</td><td className="p-4 text-slate-700">{option.id === "private" ? <a href="https://trip.com?Allianceid=9322314&SID=324726991&trip_sub1=&trip_sub3=D19425499" target="_blank" rel="sponsored nofollow" className="font-semibold text-[#0077B6] hover:underline">Pre-book Private BKK/DMK Airport Transfer on Trip.com</a> : option.tip}</td></tr>)}</tbody></table></div>
      <p className="mt-5 flex gap-3 text-sm leading-relaxed text-slate-600"><PlaneLanding className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" />The table preserves the supplied planning benchmarks. Actual fares vary by time, traffic, tolls, vehicle, and provider availability.</p>
    </section>
  );
}
