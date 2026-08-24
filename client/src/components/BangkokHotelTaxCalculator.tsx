import { useMemo, useState } from "react";
import { Calculator, Check, Share2, UsersRound } from "lucide-react";
import { bangkokTransferBenchmarks, getRoundtripTransferAllowance, type AirportCode, type BangkokTransferMode } from "@/components/BangkokTransferBenchmarkData";

export const calculateBangkokHotelSurcharge = (nightlyRate: number, nights: number, surchargeRate: number, roundtripTransfer = 0, travelers = 1) => {
  const subtotal = Math.max(0, nightlyRate) * Math.max(1, nights);
  const surcharge = subtotal * Math.max(0, surchargeRate / 100);
  const transfer = Math.max(0, roundtripTransfer);
  const total = subtotal + surcharge + transfer;
  return { subtotal, surcharge, transfer, total, perPerson: total / Math.max(1, travelers) };
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const vehicleOptions = [
  { id: "sedan", label: "Sedan", capacity: "1–3 travelers", luggage: "Up to 2 medium suitcases or 3 cabin bags", maxTravelers: 3, multiplier: 1 },
  { id: "minivan", label: "Minivan", capacity: "4–6 travelers", luggage: "About 4 medium suitcases plus cabin bags", maxTravelers: 6, multiplier: 1.55 },
  { id: "bus", label: "Minibus / Bus", capacity: "7–12 travelers", luggage: "About 8 medium suitcases plus cabin bags", maxTravelers: 12, multiplier: 2.2 },
] as const;
type VehicleId = (typeof vehicleOptions)[number]["id"];
const transferCurrencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 } as const;
type TransferCurrency = keyof typeof transferCurrencyRates;
const formatCurrency = (value: number, currency: TransferCurrency) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value * transferCurrencyRates[currency]);

export default function BangkokHotelTaxCalculator() {
  const [nightlyRate, setNightlyRate] = useState(90);
  const [nights, setNights] = useState(3);
  const [surchargeRate, setSurchargeRate] = useState(17.7);
  const [district, setDistrict] = useState("Sukhumvit (Asok / Nana)");
  const [travelers, setTravelers] = useState(2);
  const [airport, setAirport] = useState<AirportCode>("BKK");
  const [transferMode, setTransferMode] = useState<BangkokTransferMode>("taxi");
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [transferCurrency, setTransferCurrency] = useState<TransferCurrency>("USD");
  const selectedVehicle = vehicleOptions.find((option) => option.id === vehicle) ?? vehicleOptions[0];
  const transferAllowance = getRoundtripTransferAllowance(airport, transferMode) * selectedVehicle.multiplier;
  const result = useMemo(() => calculateBangkokHotelSurcharge(nightlyRate, nights, surchargeRate, transferAllowance, travelers), [nightlyRate, nights, surchargeRate, transferAllowance, travelers]);
  const [shareStatus, setShareStatus] = useState("");
  const summary = `📍 Bangkok 2026 Accommodation Budget Summary (via The Stay & Wander)\n--------------------------------------------------\n• Selected District: ${district}\n• Length of Stay: ${nights} Nights\n• Base Room Total: ${money.format(result.subtotal)} USD\n• Mandatory Surcharges (17.7% Tax & Service): ${money.format(result.surcharge)} USD\n• Airport Transfer Allowance (Roundtrip): ${money.format(result.transfer)} USD\n--------------------------------------------------\n💰 ESTIMATED TOTAL STAY COST: ${money.format(result.total)} USD (${money.format(result.perPerson)}/person)\n🔗 Live Rates & Map: https://thestayandwander.com/blog/bangkok-hotel-price-index-2026`;
  const shareBudget = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bangkok 2026 Accommodation Budget Summary", text: summary, url: "https://thestayandwander.com/blog/bangkok-hotel-price-index-2026" });
        setShareStatus("Shared budget summary.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
        setShareStatus("Budget summary copied.");
      } else {
        setShareStatus(summary);
      }
    } catch {
      setShareStatus("Sharing was cancelled. You can adjust the inputs and try again.");
    }
  };

  return (
    <section className="mt-14 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-tax-calculator-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><Calculator className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Price planning tool</p><h2 id="bangkok-tax-calculator-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Bangkok hotel tax calculator</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Estimate the 17.7% hotel surcharge cited in this guide. This planning tool assumes the rate is charged on the selected room subtotal; individual properties may present taxes and service charges differently at checkout.</p></div></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">{[{ label: "Nightly room rate (USD)", value: nightlyRate, set: setNightlyRate, min: 0, step: 1 }, { label: "Number of nights", value: nights, set: setNights, min: 1, step: 1 }, { label: "Surcharge rate (%)", value: surchargeRate, set: setSurchargeRate, min: 0, step: 0.1 }, { label: "Travelers", value: travelers, set: setTravelers, min: 1, step: 1 }].map((field) => <label key={field.label} className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">{field.label}<input type="number" min={field.min} step={field.step} value={field.value} onChange={(event) => field.set(Number(event.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20" /></label>)}<label className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Selected district<select value={district} onChange={(event) => setDistrict(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{["Sukhumvit (Asok / Nana)", "Silom & Sathorn", "Siam & Pratunam", "Bangkok Riverside", "Khao San / Old City"].map((option) => <option key={option}>{option}</option>)}</select></label><label className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Arrival airport<select value={airport} onChange={(event) => setAirport(event.target.value as AirportCode)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"><option value="BKK">Suvarnabhumi (BKK)</option><option value="DMK">Don Mueang (DMK)</option></select></label><label className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Transfer mode<select value={transferMode} onChange={(event) => setTransferMode(event.target.value as BangkokTransferMode)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{bangkokTransferBenchmarks.map((option) => <option key={option.id} value={option.id}>{option.mode}</option>)}</select></label><label className="rounded-xl border border-white bg-white p-4 text-sm font-semibold text-[#0D1B2A]">Group transfer vehicle<select value={vehicle} onChange={(event) => setVehicle(event.target.value as VehicleId)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20">{vehicleOptions.map((option) => <option key={option.id} value={option.id}>{option.label} ({option.capacity})</option>)}</select><span className="mt-2 inline-flex items-center gap-1 text-xs font-normal text-slate-500"><UsersRound className="h-3.5 w-3.5" aria-hidden="true" />Passenger capacity: {selectedVehicle.capacity}</span><span className="mt-1 block text-xs font-normal text-slate-500">Luggage guide: {selectedVehicle.luggage}. Confirm exact capacity with the provider.</span></label></div>
      {travelers > selectedVehicle.maxTravelers && <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Your party size exceeds the selected {selectedVehicle.label.toLowerCase()} capacity. Choose a larger vehicle or plan multiple vehicles.</p>}
      <div className="mt-5 flex flex-wrap items-center gap-2"><span className="text-sm font-semibold text-[#0D1B2A]">View transfer allowance in:</span>{(Object.keys(transferCurrencyRates) as TransferCurrency[]).map((currency) => <button key={currency} type="button" onClick={() => setTransferCurrency(currency)} className={`rounded-full px-4 py-2 text-sm font-semibold ${transferCurrency === currency ? "bg-[#0077B6] text-white" : "border border-[#b9dce9] bg-white text-[#0077B6]"}`}>{currency}</button>)}<span className="text-xs text-slate-500">Planning references: 1 USD = €0.92 / £0.79; edit booking totals with your provider&apos;s live rate.</span></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[{ label: "Base room total", value: money.format(result.subtotal) }, { label: "17.7% surcharge", value: money.format(result.surcharge) }, { label: `Roundtrip transfer (${transferCurrency})`, value: formatCurrency(result.transfer, transferCurrency) }, { label: "Estimated total", value: money.format(result.total) }, { label: "Per person", value: money.format(result.perPerson) }].map((item) => <div key={item.label} className="rounded-xl bg-[#0D1B2A] p-4 text-white"><p className="text-xs uppercase tracking-[0.14em] text-slate-300">{item.label}</p><p className="mt-2 font-playfair text-2xl font-bold">{item.value}</p></div>)}</div>
      <div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={shareBudget} className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#005c91]"><Share2 className="h-4 w-4" aria-hidden="true" />Export / Share Cost Breakdown</button>{shareStatus && <p className="inline-flex items-center gap-2 text-sm text-slate-700"><Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />{shareStatus}</p>}</div>
    </section>
  );
}
