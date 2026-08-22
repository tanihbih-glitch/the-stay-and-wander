import { Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";

export const DEFAULT_IDR_PER_USD = 16000;

export function convertIdrToUsd(amountIdr: number, idrPerUsd: number): number | null {
  if (!Number.isFinite(amountIdr) || !Number.isFinite(idrPerUsd) || amountIdr < 0 || idrPerUsd <= 0) {
    return null;
  }
  return amountIdr / idrPerUsd;
}

function formatUsd(value: number | null): string {
  return value === null
    ? "—"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

export default function IdrUsdConverter() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState(String(DEFAULT_IDR_PER_USD));
  const amountNumber = Number(amount.replace(/[^0-9.]/g, ""));
  const rateNumber = Number(rate.replace(/[^0-9.]/g, ""));
  const result = convertIdrToUsd(amountNumber, rateNumber);

  const applyExample = (value: number) => setAmount(String(value));
  const reset = () => {
    setAmount("500000");
    setRate(String(DEFAULT_IDR_PER_USD));
  };

  return (
    <section className="mt-7 rounded-2xl border border-blue-100 bg-[#e5f4fb] p-5 sm:p-6" aria-labelledby="currency-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Planning calculator</p>
          <h3 id="currency-title" className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Convert an IDR spa budget to USD</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">The editable reference rate starts at IDR {DEFAULT_IDR_PER_USD.toLocaleString("en-US")} per USD 1. It is not a live exchange rate; update it with your preferred current rate before booking.</p>
        </div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0077B6]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-[#f6fcff] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset</button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_1.1fr]">
        <label className="block"><span className="text-sm font-semibold text-[#0D1B2A]">Amount in IDR</span><input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby="currency-help" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-[#0D1B2A] shadow-sm outline-none transition focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label>
        <label className="block"><span className="text-sm font-semibold text-[#0D1B2A]">IDR per USD 1</span><input inputMode="decimal" value={rate} onChange={(event) => setRate(event.target.value)} aria-describedby="currency-help" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-[#0D1B2A] shadow-sm outline-none transition focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label>
        <div className="rounded-xl bg-[#0D1B2A] p-4 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F4A261]">Estimated USD value</p><output aria-live="polite" className="mt-2 block font-playfair text-3xl font-bold">{formatUsd(result)}</output><p className="mt-1 text-xs leading-relaxed text-slate-300">Amount ÷ editable IDR/USD rate</p></div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2" id="currency-help"><span className="mr-1 text-sm font-medium text-slate-700">Try a benchmark:</span>{[150000, 500000, 2500000].map((example) => <button key={example} type="button" onClick={() => applyExample(example)} className="rounded-full border border-[#0077B6]/25 bg-white px-3 py-1.5 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">IDR {example.toLocaleString("en-US")}</button>)}</div>
    </section>
  );
}
