import { CheckCircle2, Download, PlaneLanding } from "lucide-react";
import { useMemo, useState } from "react";

const arrivalSteps = [
  "Save your hotel address and district in Thai and English.",
  "Confirm your BKK or DMK arrival terminal and transfer pickup point.",
  "Keep a cash or card backup for airport rail, taxi surcharge, tolls, or luggage fees.",
  "Screenshot your airport transfer booking or live ride-hailing confirmation.",
  "Message your hotel if you expect a late arrival or need luggage storage.",
  "Keep your passport, arrival documents, and hotel confirmation accessible.",
  "On arrival, verify the vehicle and fare details before leaving the airport.",
];

export default function BangkokArrivalChecklist() {
  const [completed, setCompleted] = useState<number[]>([]);
  const checklistText = useMemo(() => [
    "Bangkok Arrival-Day Checklist — The Stay & Wander",
    "https://thestayandwander.com/blog/bangkok-hotel-price-index-2026",
    "",
    ...arrivalSteps.map((step, index) => `${completed.includes(index) ? "[x]" : "[ ]"} ${step}`),
  ].join("\n"), [completed]);

  const downloadChecklist = () => {
    const blob = new Blob([checklistText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bangkok-arrival-day-checklist.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-12 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-arrival-checklist-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><PlaneLanding className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival planning</p><h2 id="bangkok-arrival-checklist-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Downloadable Bangkok arrival-day checklist</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Tick off your transfer and check-in steps, then download the current list for offline reference on arrival day.</p></div></div>
      <div className="mt-6 grid gap-3">{arrivalSteps.map((step, index) => { const isDone = completed.includes(index); return <label key={step} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white bg-white p-4 text-sm leading-relaxed text-slate-700"><input type="checkbox" checked={isDone} onChange={() => setCompleted((current) => isDone ? current.filter((item) => item !== index) : [...current, index])} className="mt-0.5 h-4 w-4 accent-[#0077B6]" /><span className={isDone ? "text-slate-400 line-through" : ""}>{step}</span></label>; })}</div>
      <button type="button" onClick={downloadChecklist} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#005c91]"><Download className="h-4 w-4" aria-hidden="true" />Download Arrival-Day Checklist</button>
      <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Your selections stay in this browser until you refresh or leave the page.</p>
    </section>
  );
}
