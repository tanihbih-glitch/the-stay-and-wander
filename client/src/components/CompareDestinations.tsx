import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, Compass, Sparkles } from "lucide-react";

export type ComparableDestination = "bali" | "bangkok" | "tokyo" | "seoul";
type SeasonFilter = "all" | "value" | "events";
type RateSignal = "value" | "baseline" | "higher" | "event";

type MonthPlan = {
  month: string;
  shortMonth: string;
  season: string;
  rateSignal: RateSignal;
  rateLabel: string;
  event: string;
};

type DestinationSummary = {
  name: string;
  href: string;
  range: string;
  rangeContext: string;
  bestFor: string;
  planningLens: string;
  seasonalNote: string;
  monthly: MonthPlan[];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const makeMonthPlans = (
  plans: Array<{ season: string; rateSignal: RateSignal; rateLabel: string; event: string }>,
): MonthPlan[] => plans.map((plan, index) => ({
  month: MONTHS[index],
  shortMonth: shortMonths[index],
  ...plan,
}));

const destinations: Record<ComparableDestination, DestinationSummary> = {
  bali: {
    name: "Bali",
    href: "/blog/bali-hotel-price-index-2026",
    range: "$7–$1,200+/night",
    rangeContext: "Published regional planning range",
    bestFor: "Beach time, villa groups, wellness, and varied regional pacing.",
    planningLens: "Compare coasts and inland bases before choosing a property.",
    seasonalNote: "Compare dates outside July–August and mid-December through January if you want to avoid the guide’s 35%–60% peak-season premium guidance.",
    monthly: makeMonthPlans([
      { season: "Shoulder", rateSignal: "higher", rateLabel: "Higher around Jan 1–5", event: "New Year travel period; dates and demand vary." },
      { season: "Baseline", rateSignal: "value", rateLabel: "Lower-demand planning window", event: "Rainy-season wellness and slower beach days." },
      { season: "Baseline", rateSignal: "value", rateLabel: "Lower-demand planning window", event: "Nyepi / Day of Silence; exact date varies by year." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Easter travel period can lift demand; dates vary." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Quieter pre-peak island planning." },
      { season: "High", rateSignal: "baseline", rateLabel: "Baseline before peak uplift", event: "Dry-season beach and outdoor planning." },
      { season: "Peak", rateSignal: "higher", rateLabel: "35%–60% peak guidance", event: "Peak summer beach season." },
      { season: "Peak", rateSignal: "higher", rateLabel: "35%–60% peak guidance", event: "Peak summer beach season." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Quieter shoulder-season beach planning." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Transitional weather and wellness stays." },
      { season: "Low", rateSignal: "value", rateLabel: "Lower-demand planning window", event: "Rainy-season retreat planning." },
      { season: "Peak", rateSignal: "higher", rateLabel: "Higher Dec 20–31", event: "Festive season; exact holiday demand varies." },
    ]),
  },
  bangkok: {
    name: "Bangkok",
    href: "/blog/bangkok-hotel-price-index-2026",
    range: "$8–$850+/night",
    rangeContext: "Published district planning range",
    bestFor: "City energy, food, transit access, and strong hotel-tier choice.",
    planningLens: "A BTS/MRT-adjacent base can reshape the daily transport budget.",
    seasonalNote: "May–October is the guide’s savings window, with mid-range and five-star rates potentially up to 40% lower; check weather and final availability.",
    monthly: makeMonthPlans([
      { season: "Peak", rateSignal: "baseline", rateLabel: "Outside the savings window", event: "Cool-season city sightseeing." },
      { season: "Peak", rateSignal: "baseline", rateLabel: "Outside the savings window", event: "Cool-season city sightseeing." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Hot-season food and city breaks." },
      { season: "Shoulder", rateSignal: "event", rateLabel: "Event-demand period", event: "Songkran; exact holiday dates vary by year." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "Start of the guide’s May–October savings window." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "Rainy-season food, museums, and city breaks." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "Indoor culture and neighborhood dining." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "Rainy-season savings planning." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "Flexible city-break planning." },
      { season: "Value", rateSignal: "value", rateLabel: "Potentially up to 40% lower", event: "End of the guide’s savings window." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Outside the savings window", event: "Cooler-season city sightseeing begins." },
      { season: "Peak", rateSignal: "baseline", rateLabel: "Outside the savings window", event: "Festive-season demand can vary by dates." },
    ]),
  },
  tokyo: {
    name: "Tokyo",
    href: "/blog/where-to-stay-in-tokyo-2026",
    range: "$35–$280+/night",
    rangeContext: "Published neighborhood planning range",
    bestFor: "Rail-connected first trips, shopping, late nights, and distinct neighborhoods.",
    planningLens: "Choose the station area first; the range is directional, not a live quote.",
    seasonalNote: "Late March–early April cherry blossom weeks and October–November foliage can run 30%–50% higher, so book early or compare shoulder dates.",
    monthly: makeMonthPlans([
      { season: "Winter", rateSignal: "value", rateLabel: "Shoulder/value planning", event: "Winter illuminations and indoor culture." },
      { season: "Winter", rateSignal: "value", rateLabel: "Shoulder/value planning", event: "Plum blossoms and quieter city planning." },
      { season: "Spring", rateSignal: "event", rateLabel: "30%–50% higher in peak weeks", event: "Cherry blossom season begins; timing varies by year." },
      { season: "Spring", rateSignal: "event", rateLabel: "30%–50% higher in peak weeks", event: "Cherry blossom viewing and Golden Week planning." },
      { season: "Shoulder", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Late-spring neighborhood exploration." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Summer festivals and city evenings." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Matsuri season; exact event dates vary." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Summer festivals and waterfront days." },
      { season: "Autumn", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Early autumn food and design trips." },
      { season: "Autumn", rateSignal: "event", rateLabel: "30%–50% higher in peak weeks", event: "Autumn foliage season begins; timing varies by year." },
      { season: "Autumn", rateSignal: "event", rateLabel: "30%–50% higher in peak weeks", event: "Autumn foliage and cultural event planning." },
      { season: "Winter", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Winter illuminations and festive city breaks." },
    ]),
  },
  seoul: {
    name: "Seoul",
    href: "/blog/where-to-stay-in-seoul-2026",
    range: "$30–$200+/night",
    rangeContext: "Published district planning range",
    bestFor: "Subway-connected sightseeing, street food, cafés, and nightlife variety.",
    planningLens: "District personality and subway access matter as much as the nightly rate.",
    seasonalNote: "April cherry blossoms and October autumn foliage can run 25%–40% higher; shoulder-season dates are the guide’s baseline for comparison.",
    monthly: makeMonthPlans([
      { season: "Winter", rateSignal: "value", rateLabel: "Shoulder/value planning", event: "Winter cafés, shopping, and indoor culture." },
      { season: "Winter", rateSignal: "value", rateLabel: "Shoulder/value planning", event: "Quieter palace and food-market planning." },
      { season: "Spring", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Early spring cafés and palace walks." },
      { season: "Spring", rateSignal: "event", rateLabel: "25%–40% higher in peak weeks", event: "Cherry blossom season; timing varies by year." },
      { season: "Spring", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Late-spring neighborhood exploration." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Summer markets and riverside evenings." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Summer city festivals; dates vary." },
      { season: "Summer", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Late-summer food and nightlife planning." },
      { season: "Autumn", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Early autumn cafés and design trips." },
      { season: "Autumn", rateSignal: "event", rateLabel: "25%–40% higher in peak weeks", event: "Autumn foliage season; timing varies by year." },
      { season: "Autumn", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Late-autumn markets and food planning." },
      { season: "Winter", rateSignal: "baseline", rateLabel: "Published baseline context", event: "Winter lights, shopping, and café culture." },
    ]),
  },
};

const signalStyles: Record<RateSignal, string> = {
  value: "border-emerald-200 bg-emerald-50 text-emerald-900",
  baseline: "border-slate-200 bg-slate-50 text-slate-800",
  higher: "border-amber-200 bg-amber-50 text-amber-950",
  event: "border-violet-200 bg-violet-50 text-violet-950",
};

const filterLabels: Record<SeasonFilter, string> = {
  all: "All planning lenses",
  value: "Lower-cost guidance",
  events: "Event-led months",
};

interface CompareDestinationsProps {
  current: ComparableDestination;
}

/**
 * Cross-city orientation using published guide ranges and seasonal signals only.
 * It deliberately distinguishes planning guidance from live rates or a normalized value score.
 */
export default function CompareDestinations({ current }: CompareDestinationsProps) {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");

  const visibleDestinations = useMemo(() => {
    if (seasonFilter === "all") return Object.keys(destinations) as ComparableDestination[];
    return (Object.keys(destinations) as ComparableDestination[]).filter((key) => {
      const signal = destinations[key].monthly[selectedMonth].rateSignal;
      return seasonFilter === "value" ? signal === "value" : signal === "event";
    });
  }, [seasonFilter, selectedMonth]);

  const monthName = MONTHS[selectedMonth];

  return (
    <section className="mt-14 border-t border-slate-200 pt-12" aria-labelledby="compare-destinations-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Cross-city planning</p>
          <h2 id="compare-destinations-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Compare destinations by month</h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-slate-600">
          Compare each guide&apos;s published planning range, seasonal rate signal, and popular events. Seasonal planning signals are directional—not live, tax-inclusive quotes or a like-for-like price ranking.
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-[#cfe4ee] bg-[#f5fbfd] p-5 sm:p-6" aria-label="Month-by-month price comparison controls">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]"><CalendarDays className="h-4 w-4" aria-hidden="true" />Month-by-month comparison</div>
            <p className="mt-2 text-sm text-slate-700">Viewing <strong>{monthName}</strong>. Choose a month to compare each city&apos;s published rate signal and event context.</p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Best months filters">
            {(Object.keys(filterLabels) as SeasonFilter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={seasonFilter === filter}
                onClick={() => setSeasonFilter(filter)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 ${seasonFilter === filter ? "border-[#0077B6] bg-[#0077B6] text-white" : "border-slate-300 bg-white text-slate-700 hover:border-[#0077B6] hover:text-[#0077B6]"}`}
              >
                {filterLabels[filter]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
          {MONTHS.map((month, index) => (
            <button
              key={month}
              type="button"
              aria-label={`Compare ${month} planning signals`}
              aria-pressed={selectedMonth === index}
              onClick={() => setSelectedMonth(index)}
              className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2 ${selectedMonth === index ? "border-[#F4A261] bg-[#fff0df] text-[#8b4f19]" : "border-slate-200 bg-white text-slate-600 hover:border-[#F4A261]"}`}
            >
              {shortMonths[index]}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Best months filters are planning lenses: lower-cost guidance highlights published savings signals; event-led months highlight popular seasonal moments. Always confirm exact dates and availability.</p>
      </div>

      {visibleDestinations.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">No destination in this month has the selected planning signal. Try another month or return to all planning lenses.</div>
      ) : (
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleDestinations.map((key) => {
            const destination = destinations[key];
            const isCurrent = key === current;
            const monthPlan = destination.monthly[selectedMonth];
            return (
              <article key={key} className={`rounded-2xl border p-6 shadow-sm ${isCurrent ? "border-[#F4A261] bg-[#fff8f1]" : "border-slate-200 bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">{isCurrent ? "Current guide" : "City guide"}</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{destination.name}</h3></div>
                  {isCurrent ? <CheckCircle2 className="h-5 w-5 shrink-0 text-[#d7782e]" aria-label="Current guide" /> : <Compass className="h-5 w-5 shrink-0 text-[#F4A261]" aria-hidden="true" />}
                </div>
                <p className="mt-5 text-2xl font-bold text-[#0D1B2A]">{destination.range}</p>
                <p className="mt-1 text-xs text-slate-500">{destination.rangeContext}</p>
                <p className="mt-5 text-sm leading-relaxed text-slate-700"><strong className="text-[#0D1B2A]">Best for:</strong> {destination.bestFor}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{destination.planningLens}</p>
                <div className={`mt-5 rounded-xl border p-4 ${signalStyles[monthPlan.rateSignal]}`}>
                  <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"><CalendarDays className="h-4 w-4" aria-hidden="true" />{monthName}</div><span className="text-xs font-semibold">{monthPlan.season}</span></div>
                  <p className="mt-2 text-sm font-semibold">{monthPlan.rateLabel}</p>
                  <div className="mt-3 flex items-start gap-2 border-t border-current/15 pt-3"><Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><p className="text-sm leading-relaxed"><strong>Seasonal highlight:</strong> {monthPlan.event}</p></div>
                </div>
                {isCurrent ? <span className="mt-6 inline-flex text-sm font-semibold text-[#9a5b20]">You are here</span> : <a href={destination.href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#005c91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2">Compare {destination.name} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
