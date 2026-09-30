import { ArrowUpRight, CalendarDays, CheckCircle2, Compass } from "lucide-react";

export type ComparableDestination = "bali" | "bangkok" | "tokyo" | "seoul";

type DestinationSummary = {
  name: string;
  href: string;
  range: string;
  rangeContext: string;
  bestFor: string;
  planningLens: string;
  seasonalNote: string;
};

const destinations: Record<ComparableDestination, DestinationSummary> = {
  bali: {
    name: "Bali",
    href: "/blog/bali-hotel-price-index-2026",
    range: "$7–$1,200+/night",
    rangeContext: "Published regional planning range",
    bestFor: "Beach time, villa groups, wellness, and varied regional pacing.",
    planningLens: "Compare coasts and inland bases before choosing a property.",
    seasonalNote: "Compare dates outside July–August and mid-December through January if you want to avoid the guide’s 35%–60% peak-season premium guidance.",
  },
  bangkok: {
    name: "Bangkok",
    href: "/blog/bangkok-hotel-price-index-2026",
    range: "$8–$850+/night",
    rangeContext: "Published district planning range",
    bestFor: "City energy, food, transit access, and strong hotel-tier choice.",
    planningLens: "A BTS/MRT-adjacent base can reshape the daily transport budget.",
    seasonalNote: "May–October is the guide’s savings window, with mid-range and five-star rates potentially up to 40% lower; check weather and final availability.",
  },
  tokyo: {
    name: "Tokyo",
    href: "/blog/where-to-stay-in-tokyo-2026",
    range: "$35–$280+/night",
    rangeContext: "Published neighborhood planning range",
    bestFor: "Rail-connected first trips, shopping, late nights, and distinct neighborhoods.",
    planningLens: "Choose the station area first; the range is directional, not a live quote.",
    seasonalNote: "Late March–early April cherry blossom weeks and October–November foliage can run 30%–50% higher, so book early or compare shoulder dates.",
  },
  seoul: {
    name: "Seoul",
    href: "/blog/where-to-stay-in-seoul-2026",
    range: "$30–$200+/night",
    rangeContext: "Published district planning range",
    bestFor: "Subway-connected sightseeing, street food, cafés, and nightlife variety.",
    planningLens: "District personality and subway access matter as much as the nightly rate.",
    seasonalNote: "April cherry blossoms and October autumn foliage can run 25%–40% higher; shoulder-season dates are the guide’s baseline for comparison.",
  },
};

interface CompareDestinationsProps {
  current: ComparableDestination;
}

/**
 * Cross-city orientation using the published guide ranges only. It deliberately
 * distinguishes the range context from live rates or a normalized value score.
 */
export default function CompareDestinations({ current }: CompareDestinationsProps) {
  return (
    <section className="mt-14 border-t border-slate-200 pt-12" aria-labelledby="compare-destinations-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Cross-city planning</p>
          <h2 id="compare-destinations-title" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">
            Compare destinations
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-slate-600">
          Compare the published guide ranges alongside the kind of trip each city supports. These are planning ranges, not live, tax-inclusive quotes or a like-for-like price ranking.
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {(Object.keys(destinations) as ComparableDestination[]).map((key) => {
          const destination = destinations[key];
          const isCurrent = key === current;

          return (
            <article
              key={key}
              className={`rounded-2xl border p-6 shadow-sm ${
                isCurrent ? "border-[#F4A261] bg-[#fff8f1]" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">
                    {isCurrent ? "Current guide" : "City guide"}
                  </p>
                  <h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{destination.name}</h3>
                </div>
                {isCurrent ? <CheckCircle2 className="h-5 w-5 shrink-0 text-[#d7782e]" aria-label="Current guide" /> : <Compass className="h-5 w-5 shrink-0 text-[#F4A261]" aria-hidden="true" />}
              </div>
              <p className="mt-5 text-2xl font-bold text-[#0D1B2A]">{destination.range}</p>
              <p className="mt-1 text-xs text-slate-500">{destination.rangeContext}</p>
              <p className="mt-5 text-sm leading-relaxed text-slate-700"><strong className="text-[#0D1B2A]">Best for:</strong> {destination.bestFor}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{destination.planningLens}</p>
              <div className="mt-5 rounded-xl border border-[#cfe4ee] bg-[#eef8fb] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0077B6]"><CalendarDays className="h-4 w-4" aria-hidden="true" />Seasonal planning</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{destination.seasonalNote}</p>
              </div>
              {isCurrent ? (
                <span className="mt-6 inline-flex text-sm font-semibold text-[#9a5b20]">You are here</span>
              ) : (
                <a
                  href={destination.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0077B6] transition-colors hover:text-[#005c91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077B6] focus-visible:ring-offset-2"
                >
                  Compare {destination.name} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
