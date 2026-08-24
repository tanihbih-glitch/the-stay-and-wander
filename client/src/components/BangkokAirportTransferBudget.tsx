import { PlaneLanding, TrainFront, CarTaxiFront } from "lucide-react";

const transferOptions = [
  { icon: TrainFront, title: "Airport Rail Link", estimate: "15–45 THB one-way", detail: "A low-cost rail option for central connections; budget extra for any BTS/MRT onward journey and luggage transfers." },
  { icon: CarTaxiFront, title: "Public taxi", estimate: "Metered fare + 50 THB airport surcharge + tolls", detail: "The airport publishes a 50 THB driver surcharge and states that passengers pay toll fees. Treat the final ride amount as traffic- and destination-dependent." },
  { icon: PlaneLanding, title: "Private transfer", estimate: "Compare live quotes before booking", detail: "Useful when arrival time, luggage, or a larger group makes a door-to-door handoff more valuable than a rail connection." },
] as const;

export default function BangkokAirportTransferBudget() {
  return (
    <section className="mt-14" aria-labelledby="bangkok-transfer-budget-heading">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival logistics</p><h2 id="bangkok-transfer-budget-heading" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Airport-to-hotel transfer budget</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">Build an arrival allowance before you book. These are planning references rather than live quotes: the final route, traffic, tolls, and provider availability determine what you pay.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-3">{transferOptions.map(({ icon: Icon, title, estimate, detail }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="inline-flex rounded-full bg-[#e5f4fb] p-3 text-[#0077B6]"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-4 font-playfair text-xl font-bold text-[#0D1B2A]">{title}</h3><p className="mt-3 font-semibold text-[#9a5b20]">{estimate}</p><p className="mt-3 text-sm leading-relaxed text-slate-700">{detail}</p></article>)}</div>
      <p className="mt-5 text-sm leading-relaxed text-slate-600">For the public-taxi pickup point, surcharge, and toll responsibility, consult the <a href="https://suvarnabhumi.airportthai.co.th/service/transportation/detail/304" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077B6] hover:underline">official Suvarnabhumi Airport public taxi guidance</a> before you travel.</p>
    </section>
  );
}
