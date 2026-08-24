import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

export const calculateBangkokHotelSurcharge = (nightlyRate: number, nights: number, surchargeRate: number) => {
  const subtotal = Math.max(0, nightlyRate) * Math.max(1, nights);
  const surcharge = subtotal * Math.max(0, surchargeRate / 100);
  return { subtotal, surcharge, total: subtotal + surcharge };
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export default function BangkokHotelTaxCalculator() {
  const [nightlyRate, setNightlyRate] = useState(90);
  const [nights, setNights] = useState(3);
  const [surchargeRate, setSurchargeRate] = useState(17.7);
  const result = useMemo(() => calculateBangkokHotelSurcharge(nightlyRate, nights, surchargeRate), [nightlyRate, nights, surchargeRate]);

  return (
    <section className="mt-14 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-tax-calculator-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><Calculator className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Price planning tool</p><h2 id="bangkok-tax-calculator-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Bangkok hotel tax calculator</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Estimate the 17.7% hotel surcharge cited in this guide. This planning tool assumes the rate is charged on the selected room subtotal; individual properties may present taxes and service charges differently at checkout.</p></div></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">{[{ label: "Nightly room rate (USD)", value: nightlyRate, set: setNightlyRate, min: 0, step: 1 }, { label: "Number of nights", value: nights, set: setNights, min: 1, step: 1 }, { label: "Surcharge rate (%)", value: surchargeRate, set: setSurchargeRate, min: 0, step: 0.1 }].map((field) => <label key={field.label} className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">{field.label}<input type="number" min={field.min} step={field.step} value={field.value} onChange={(event) => field.set(Number(event.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20" /></label>)}</div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">{[{ label: "Room subtotal", value: result.subtotal }, { label: "Estimated surcharge", value: result.surcharge }, { label: "Estimated total", value: result.total }].map((item) => <div key={item.label} className="rounded-xl bg-[#0D1B2A] p-4 text-white"><p className="text-xs uppercase tracking-[0.14em] text-slate-300">{item.label}</p><p className="mt-2 font-playfair text-2xl font-bold">{money.format(item.value)}</p></div>)}</div>
    </section>
  );
}
