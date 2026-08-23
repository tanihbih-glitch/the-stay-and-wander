import { Calculator, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

export const DEFAULT_KRW_PER_USD = 1350;
export const DEFAULT_EUR_PER_USD = 0.92;
export const DEFAULT_GBP_PER_USD = 0.78;
export const DEFAULT_AUD_PER_USD = 1.52;

export function convertKrwToUsd(amountKrw: number, krwPerUsd: number): number | null {
  if (!Number.isFinite(amountKrw) || !Number.isFinite(krwPerUsd) || amountKrw < 0 || krwPerUsd <= 0) return null;
  return amountKrw / krwPerUsd;
}

export function convertUsdToCurrency(usd: number | null, currencyPerUsd: number): number | null {
  if (usd === null || !Number.isFinite(currencyPerUsd) || currencyPerUsd <= 0) return null;
  return usd * currencyPerUsd;
}

function numeric(value: string): number {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function format(value: number | null, currency: "USD" | "EUR" | "GBP" | "AUD"): string {
  return value === null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

const mealPresets = [
  { label: "Budget café", amount: 6000, detail: "₩2,500 coffee + ₩3,500 pastry" },
  { label: "Independent café", amount: 12000, detail: "₩5,000 coffee + ₩7,000 pastry" },
  { label: "Luxury café", amount: 18500, detail: "₩7,500 coffee + ₩11,000 pastry" },
] as const;

export default function KrwMealBudgetConverter() {
  const [amount, setAmount] = useState("12000");
  const [krwRate, setKrwRate] = useState(String(DEFAULT_KRW_PER_USD));
  const [eurRate, setEurRate] = useState(String(DEFAULT_EUR_PER_USD));
  const [gbpRate, setGbpRate] = useState(String(DEFAULT_GBP_PER_USD));
  const [audRate, setAudRate] = useState(String(DEFAULT_AUD_PER_USD));
  const values = useMemo(() => ({ amount: numeric(amount), krw: numeric(krwRate), eur: numeric(eurRate), gbp: numeric(gbpRate), aud: numeric(audRate) }), [amount, krwRate, eurRate, gbpRate, audRate]);
  const usd = convertKrwToUsd(values.amount, values.krw);
  const estimates = [
    { currency: "USD" as const, value: usd },
    { currency: "EUR" as const, value: convertUsdToCurrency(usd, values.eur) },
    { currency: "GBP" as const, value: convertUsdToCurrency(usd, values.gbp) },
    { currency: "AUD" as const, value: convertUsdToCurrency(usd, values.aud) },
  ];
  const reset = () => { setAmount("12000"); setKrwRate(String(DEFAULT_KRW_PER_USD)); setEurRate(String(DEFAULT_EUR_PER_USD)); setGbpRate(String(DEFAULT_GBP_PER_USD)); setAudRate(String(DEFAULT_AUD_PER_USD)); };

  return (
    <section className="mt-7 rounded-2xl border border-blue-100 bg-[#e5f4fb] p-5 sm:p-6" aria-labelledby="meal-calculator-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Interactive meal-budget calculator</p><h3 id="meal-calculator-title" className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Translate a Seoul meal budget into four currencies</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">The rate fields are editable planning references based on the rounded USD equivalents in this guide—not live FX quotes. Update them before booking or spending.</p></div><button type="button" onClick={reset} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0077B6]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-[#f6fcff] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" />Reset</button></div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><label className="block"><span className="text-sm font-semibold text-[#0D1B2A]">Meal or café budget in KRW</span><input value={amount} inputMode="decimal" onChange={(event) => setAmount(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-[#0D1B2A] shadow-sm outline-none transition focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><div><p className="text-sm font-semibold text-[#0D1B2A]">Editable reference rates</p><div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><label className="text-xs font-semibold text-slate-600">KRW / USD<input value={krwRate} inputMode="decimal" onChange={(event) => setKrwRate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">EUR / USD<input value={eurRate} inputMode="decimal" onChange={(event) => setEurRate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">GBP / USD<input value={gbpRate} inputMode="decimal" onChange={(event) => setGbpRate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">AUD / USD<input value={audRate} inputMode="decimal" onChange={(event) => setAudRate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label></div></div></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">{estimates.map(({ currency, value }) => <div key={currency} className={currency === "USD" ? "rounded-xl bg-[#0D1B2A] p-4 text-white" : "rounded-xl border border-blue-100 bg-white p-4 text-[#0D1B2A]"}><p className={currency === "USD" ? "text-xs font-bold uppercase tracking-[0.14em] text-[#F4A261]" : "text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]"}>{currency} estimate</p><output className="mt-2 block font-playfair text-2xl font-bold">{format(value, currency)}</output></div>)}</div>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#0077B6]/15 pt-5"><span className="mr-1 self-center text-sm font-medium text-slate-700">Café presets:</span>{mealPresets.map((preset) => <button key={preset.amount} type="button" onClick={() => setAmount(String(preset.amount))} className="rounded-full border border-[#0077B6]/25 bg-white px-3 py-1.5 text-left text-sm font-semibold text-[#0077B6] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><span>{preset.label} · ₩{preset.amount.toLocaleString("en-US")}</span><span className="ml-1 font-normal text-slate-500">({preset.detail})</span></button>)}</div>
    </section>
  );
}
