import { useMemo, useState } from "react";
import { Building2, CheckCircle2, Compass, ExternalLink, SlidersHorizontal } from "lucide-react";

export type UaeTravelerType = "solo" | "business" | "luxury" | "budget" | "group" | "wellness" | "cultural" | "frequent";
export type UaePriority = "sustainability" | "amenities" | "value" | "capacity" | "loyalty" | "booking";

type FitSignals = Record<UaePriority, 1 | 2 | 3>;

export type UaeExtendedStayOption = {
  id: string;
  brand: "Marriott" | "Accor" | "IHG";
  property: string;
  neighborhood: string;
  sourceUrl: string;
  sourceLabel: string;
  travelerTypes: readonly UaeTravelerType[];
  fitSignals: FitSignals;
  reasons: Record<UaePriority, string>;
};

/**
 * Only source-verified UAE properties appear here. Scores represent documented
 * fit signals, not hotel quality, price, booking availability, or sustainability
 * performance. The stable sort makes every equivalent input deterministic.
 */
export const UAE_EXTENDED_STAY_OPTIONS: readonly UaeExtendedStayOption[] = [
  {
    id: "residence-inn-sheikh-zayed",
    brand: "Marriott",
    property: "Residence Inn Sheikh Zayed Road",
    neighborhood: "Sheikh Zayed Road / DIFC access",
    sourceUrl: "https://www.marriott.com/en-us/hotels/dxbsz-residence-inn-sheikh-zayed-road-dubai/overview/",
    sourceLabel: "Marriott property overview",
    travelerTypes: ["business", "frequent", "group", "solo"],
    fitSignals: { sustainability: 2, amenities: 3, value: 2, capacity: 3, loyalty: 2, booking: 3 },
    reasons: {
      sustainability: "Marriott publishes its Serve 360 framework; verify property-level disclosures directly before booking.",
      amenities: "The property documents kitchens, laundry, internet, breakfast, and apartment-style living areas.",
      value: "Kitchen and laundry features can change day-to-day spend; request a live long-stay quote rather than assume a rate advantage.",
      capacity: "Official property information lists studio plus one- and two-bedroom suite options.",
      loyalty: "A Marriott-format option for travellers who want to compare eligible Bonvoy benefits directly with the rate terms.",
      booking: "An official property source and central Sheikh Zayed Road location provide a clear starting point for checking current inclusions.",
    },
  },
  {
    id: "adagio-gold-district",
    brand: "Accor",
    property: "Aparthotel Adagio Dubai Gold District",
    neighborhood: "Deira / Gold Souk Metro",
    sourceUrl: "https://all.accor.com/hotel/A7N6/index.en.shtml",
    sourceLabel: "Accor property overview",
    travelerTypes: ["cultural", "budget", "group", "solo", "business"],
    fitSignals: { sustainability: 2, amenities: 3, value: 2, capacity: 3, loyalty: 2, booking: 3 },
    reasons: {
      sustainability: "Accor publishes its responsible-hospitality roadmap; compare current property-level information before assigning environmental performance.",
      amenities: "The official listing documents furnished apartments, workspaces, kitchens, laundry, free Wi-Fi, and studio-to-two-bedroom choices.",
      value: "Apartment features support a meaningful live long-stay quote comparison, rather than a fixed price claim in this guide.",
      capacity: "The source lists studios through two-bedroom apartments for different party sizes.",
      loyalty: "An Accor option to compare against current ALL program eligibility, member-rate, and stay rules.",
      booking: "The official Accor path lists apartment inventory and Deira location context for a direct availability check.",
    },
  },
  {
    id: "adagio-premium-palm",
    brand: "Accor",
    property: "Adagio Premium The Palm",
    neighborhood: "Palm Jumeirah",
    sourceUrl: "https://all.accor.com/hotel/A609/index.en.shtml",
    sourceLabel: "Accor property overview",
    travelerTypes: ["luxury", "wellness", "solo", "frequent"],
    fitSignals: { sustainability: 2, amenities: 3, value: 2, capacity: 2, loyalty: 2, booking: 3 },
    reasons: {
      sustainability: "Accor's group roadmap is documented, but this guide does not score the individual property’s environmental performance.",
      amenities: "The property documents kitchens, laundry, Wi-Fi, a private beach, rooftop pool, and 24-hour gym.",
      value: "Compare the current apartment package against a standard nightly booking; resort amenities can change the overall trade-off.",
      capacity: "The official listing documents studio and one-bedroom serviced apartments.",
      loyalty: "An Accor option for travellers who want to check current ALL rate and benefit terms before committing to a longer stay.",
      booking: "The official booking path is the appropriate place to verify current Palm inventory, beach access, and package inclusions.",
    },
  },
  {
    id: "staybridge-internet-city",
    brand: "IHG",
    property: "Staybridge Suites Dubai Internet City",
    neighborhood: "Dubai Internet City / Metro access",
    sourceUrl: "https://www.ihg.com/staybridge/hotels/us/en/dubai/dxbtt/hoteldetail",
    sourceLabel: "IHG property overview",
    travelerTypes: ["business", "group", "frequent", "solo"],
    fitSignals: { sustainability: 2, amenities: 3, value: 2, capacity: 3, loyalty: 2, booking: 3 },
    reasons: {
      sustainability: "IHG publishes its Journey to Tomorrow responsible-business plan; check the property’s current operating disclosures directly.",
      amenities: "The official listing documents equipped kitchens, Wi-Fi, breakfast, meeting facilities, and one- or two-bedroom suite options.",
      value: "Included breakfast and kitchen facilities are useful comparison inputs; a long-stay quote is still essential.",
      capacity: "The property documents interconnecting suites plus one- and two-bedroom options for larger parties.",
      loyalty: "An IHG option to assess against current IHG One Rewards eligibility and member-rate conditions.",
      booking: "Official inventory, Metro context, and meeting-space details provide a practical basis for comparing live long-stay terms.",
    },
  },
] as const;

const travelerLabels: Record<UaeTravelerType, string> = {
  solo: "Solo", business: "Business", luxury: "Luxury", budget: "Budget", group: "Group", wellness: "Wellness", cultural: "Cultural immersion", frequent: "Frequent traveler",
};

const priorityLabels: Record<UaePriority, string> = {
  sustainability: "Sustainability", amenities: "Amenities", value: "Value", capacity: "Group capacity", loyalty: "Loyalty perks", booking: "Booking ease",
};

export function rankUaeExtendedStayOptions(travelerType: UaeTravelerType, priority: UaePriority, options = UAE_EXTENDED_STAY_OPTIONS) {
  return [...options]
    .map((option) => ({
      option,
      score: option.fitSignals[priority] * 3 + (option.travelerTypes.includes(travelerType) ? 5 : 0),
    }))
    .sort((left, right) => right.score - left.score || left.option.property.localeCompare(right.option.property))
    .slice(0, 3);
}

export default function UaeExtendedStaySelector() {
  const [travelerType, setTravelerType] = useState<UaeTravelerType>("business");
  const [priority, setPriority] = useState<UaePriority>("amenities");
  const shortlist = useMemo(() => rankUaeExtendedStayOptions(travelerType, priority), [travelerType, priority]);

  return (
    <section id="uae-stay-selector" className="scroll-mt-28 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="uae-selector-title">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Planning selector</p>
        <h2 id="uae-selector-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Find your best extended-stay fit</h2>
        <p className="mt-4 leading-relaxed text-slate-700">Choose a traveler type and priority. This deterministic tool orders only UAE properties with source-verified long-stay features. It is a planning shortlist, not a quality, sustainability, live-price, or current-availability ranking.</p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <label className="rounded-2xl bg-white p-5 shadow-sm"><span className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]"><Compass className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />Traveler type</span><select aria-label="Traveler type" value={travelerType} onChange={(event) => setTravelerType(event.target.value as UaeTravelerType)} className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-semibold text-[#0D1B2A]">{Object.entries(travelerLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="rounded-2xl bg-white p-5 shadow-sm"><span className="flex items-center gap-2 text-sm font-semibold text-[#0D1B2A]"><SlidersHorizontal className="h-4 w-4 text-[#0077B6]" aria-hidden="true" />Priority factor</span><select aria-label="Priority factor" value={priority} onChange={(event) => setPriority(event.target.value as UaePriority)} className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-semibold text-[#0D1B2A]">{Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {shortlist.map(({ option }, index) => <article key={option.id} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">#{index + 1} documented fit · {option.brand}</p><h3 className="mt-2 font-playfair text-xl font-bold text-[#0D1B2A]">{option.property}</h3><p className="mt-1 text-sm font-medium text-slate-600">{option.neighborhood}</p><p className="mt-4 text-sm leading-relaxed text-slate-700">{option.reasons[priority]}</p><a href={option.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6] hover:underline">Check the source <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></article>)}
      </div>

      <p className="mt-6 flex items-start gap-2 rounded-xl border-l-4 border-[#F4A261] bg-[#fff8f1] p-4 text-sm leading-relaxed text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c96725]" aria-hidden="true" /><span><strong className="text-[#0D1B2A]">Why Hilton does not appear in this shortlist:</strong> Homewood Suites and Home2 Suites are documented global extended-stay formats, but this guide did not identify a first-party source confirming a UAE property. Confirm local availability directly before treating a global brand format as a UAE option.</span></p>
      <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-600"><Building2 className="h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" />The selector runs entirely in your browser and does not save traveler choices or send them to a server.</p>
    </section>
  );
}
