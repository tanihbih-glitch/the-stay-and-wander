import { Calculator, Check, Copy, RotateCcw, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const DEFAULT_IDR_PER_USD = 16000;
export const DEFAULT_EUR_PER_USD = 0.92;
export const DEFAULT_GBP_PER_USD = 0.78;
export const DEFAULT_AUD_PER_USD = 1.52;

export function convertIdrToUsd(amountIdr: number, idrPerUsd: number): number | null {
  if (!Number.isFinite(amountIdr) || !Number.isFinite(idrPerUsd) || amountIdr < 0 || idrPerUsd <= 0) return null;
  return amountIdr / idrPerUsd;
}

export function convertUsdToCurrency(usd: number | null, currencyPerUsd: number): number | null {
  if (usd === null || !Number.isFinite(currencyPerUsd) || currencyPerUsd <= 0) return null;
  return usd * currencyPerUsd;
}

function formatCurrency(value: number | null, currency: "USD" | "EUR" | "GBP" | "AUD"): string {
  return value === null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

export function buildSpaBudgetSummary({ amountIdr, idrPerUsd, eurPerUsd, gbpPerUsd, audPerUsd }: { amountIdr: number; idrPerUsd: number; eurPerUsd: number; gbpPerUsd: number; audPerUsd: number }): string {
  const usd = convertIdrToUsd(amountIdr, idrPerUsd);
  const eur = convertUsdToCurrency(usd, eurPerUsd);
  const gbp = convertUsdToCurrency(usd, gbpPerUsd);
  const aud = convertUsdToCurrency(usd, audPerUsd);
  return `My Bali Spa Budget\nIDR ${amountIdr.toLocaleString("en-US")} estimated as USD ${formatCurrency(usd, "USD")} · EUR ${formatCurrency(eur, "EUR")} · GBP ${formatCurrency(gbp, "GBP")} · AUD ${formatCurrency(aud, "AUD")}\nPlanning reference only — update the editable exchange-rate fields before booking.\nSource: The Stay & Wander Bali Spa & Wellness Price Index`;
}

function toNumericInput(value: string): number {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

type IdrUsdConverterProps = { prefillAmount?: number };

export default function IdrUsdConverter({ prefillAmount }: IdrUsdConverterProps) {
  const [amount, setAmount] = useState(String(prefillAmount ?? 500000));
  const [idrPerUsd, setIdrPerUsd] = useState(String(DEFAULT_IDR_PER_USD));
  const [eurPerUsd, setEurPerUsd] = useState(String(DEFAULT_EUR_PER_USD));
  const [gbpPerUsd, setGbpPerUsd] = useState(String(DEFAULT_GBP_PER_USD));
  const [audPerUsd, setAudPerUsd] = useState(String(DEFAULT_AUD_PER_USD));
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    if (prefillAmount !== undefined) setAmount(String(prefillAmount));
  }, [prefillAmount]);

  const numbers = useMemo(() => ({ amount: toNumericInput(amount), idrPerUsd: toNumericInput(idrPerUsd), eurPerUsd: toNumericInput(eurPerUsd), gbpPerUsd: toNumericInput(gbpPerUsd), audPerUsd: toNumericInput(audPerUsd) }), [amount, idrPerUsd, eurPerUsd, gbpPerUsd, audPerUsd]);
  const usd = convertIdrToUsd(numbers.amount, numbers.idrPerUsd);
  const estimates = [
    { code: "USD" as const, value: usd },
    { code: "EUR" as const, value: convertUsdToCurrency(usd, numbers.eurPerUsd) },
    { code: "GBP" as const, value: convertUsdToCurrency(usd, numbers.gbpPerUsd) },
    { code: "AUD" as const, value: convertUsdToCurrency(usd, numbers.audPerUsd) },
  ];
  const summary = buildSpaBudgetSummary({ amountIdr: numbers.amount, idrPerUsd: numbers.idrPerUsd, eurPerUsd: numbers.eurPerUsd, gbpPerUsd: numbers.gbpPerUsd, audPerUsd: numbers.audPerUsd });

  const reset = () => {
    setAmount("500000");
    setIdrPerUsd(String(DEFAULT_IDR_PER_USD));
    setEurPerUsd(String(DEFAULT_EUR_PER_USD));
    setGbpPerUsd(String(DEFAULT_GBP_PER_USD));
    setAudPerUsd(String(DEFAULT_AUD_PER_USD));
    setShareStatus("");
  };

  const shareBudget = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Bali Spa Budget", text: summary });
        setShareStatus("Share sheet opened.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
        setShareStatus("Budget summary copied to your clipboard.");
      } else {
        window.prompt("Copy your Bali spa budget summary:", summary);
        setShareStatus("Copy your summary from the dialog.");
      }
    } catch {
      setShareStatus("Sharing was cancelled or unavailable. You can try again.");
    }
  };

  return (
    <section id="spa-currency-helper" className="mt-7 rounded-2xl border border-blue-100 bg-[#e5f4fb] p-5 sm:p-6" aria-labelledby="currency-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Planning calculator</p><h3 id="currency-title" className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">Convert an IDR spa budget for four currencies</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">All exchange-rate references are editable planning inputs, not live FX quotes. Update them before booking or sharing a final budget.</p></div>
        <button type="button" onClick={reset} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0077B6]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-[#f6fcff] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset</button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <label className="block"><span className="text-sm font-semibold text-[#0D1B2A]">Amount in IDR</span><input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby="currency-help" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-[#0D1B2A] shadow-sm outline-none transition focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label>
        <div><p className="text-sm font-semibold text-[#0D1B2A]">Editable reference rates</p><div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><label className="text-xs font-semibold text-slate-600">IDR / USD<input inputMode="decimal" value={idrPerUsd} onChange={(event) => setIdrPerUsd(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">EUR / USD<input inputMode="decimal" value={eurPerUsd} onChange={(event) => setEurPerUsd(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">GBP / USD<input inputMode="decimal" value={gbpPerUsd} onChange={(event) => setGbpPerUsd(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label><label className="text-xs font-semibold text-slate-600">AUD / USD<input inputMode="decimal" value={audPerUsd} onChange={(event) => setAudPerUsd(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" /></label></div></div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">{estimates.map(({ code, value }) => <div key={code} className={code === "USD" ? "rounded-xl bg-[#0D1B2A] p-4 text-white" : "rounded-xl border border-blue-100 bg-white p-4 text-[#0D1B2A]"}><p className={code === "USD" ? "text-xs font-bold uppercase tracking-[0.14em] text-[#F4A261]" : "text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]"}>{code} estimate</p><output className="mt-2 block font-playfair text-2xl font-bold">{formatCurrency(value, code)}</output></div>)}</div>

      <div className="mt-5 flex flex-col gap-4 border-t border-[#0077B6]/15 pt-5 sm:flex-row sm:items-center sm:justify-between"><div id="currency-help" className="flex flex-wrap items-center gap-2"><span className="mr-1 text-sm font-medium text-slate-700">Try a benchmark:</span>{[150000, 500000, 2500000].map((example) => <button key={example} type="button" onClick={() => setAmount(String(example))} className="rounded-full border border-[#0077B6]/25 bg-white px-3 py-1.5 text-sm font-semibold text-[#0077B6] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2">IDR {example.toLocaleString("en-US")}</button>)}</div><button type="button" onClick={shareBudget} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0077B6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005c91] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2"><Share2 className="h-4 w-4" aria-hidden="true" />Share My Spa Budget</button></div>
      {shareStatus && <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#005c91]" role="status"><Check className="h-4 w-4" aria-hidden="true" />{shareStatus}</p>}
    </section>
  );
}
