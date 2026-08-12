import { useEffect } from "react";

export const CITY_ACTIVITIES_WIDGET_SRC = "https://tpwidg.com/widgets/activities.js";
export const CITY_ACTIVITIES_CAMPAIGN = "437150";

interface CityActivitiesWidgetProps {
  city: "Tokyo" | "Seoul";
}

/** Loads the partner-supplied city activities widget after the hotel search widget. */
export default function CityActivitiesWidget({ city }: CityActivitiesWidgetProps) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CITY_ACTIVITIES_WIDGET_SRC}"]`
    );

    if (existing) return;

    const script = document.createElement("script");
    script.src = CITY_ACTIVITIES_WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="mt-12 border-t border-gray-200 pt-12">
      <h2 className="font-playfair text-3xl font-bold text-gray-900">Things to Do in {city}</h2>
      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        Explore activities and experiences for your stay in {city}.
      </p>
      <div
        className="tp-widget mt-6"
        data-type="activities"
        data-city={city}
        data-campaign={CITY_ACTIVITIES_CAMPAIGN}
      />
    </section>
  );
}
