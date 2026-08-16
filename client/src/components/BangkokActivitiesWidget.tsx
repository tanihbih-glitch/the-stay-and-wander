import { useEffect, useRef } from "react";

export const BANGKOK_ACTIVITIES_WIDGET_URL =
  "https://tpwidg.com/content?currency=USD&trs=544987&shmarker=745048&locale=en&city_id=4&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497";

/** Loads the Bangkok Travelpayouts activity widget into an article-safe React container. */
export default function BangkokActivitiesWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = BANGKOK_ACTIVITIES_WIDGET_URL;
    script.charset = "utf-8";
    container.appendChild(script);

    return () => {
      if (script.parentNode === container) container.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-28 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
      aria-label="Bangkok activities and tours"
    >
      <p className="text-sm text-gray-600">Loading Bangkok activities...</p>
    </div>
  );
}
