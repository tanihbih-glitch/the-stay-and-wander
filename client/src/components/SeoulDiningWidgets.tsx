import { useEffect, useRef } from "react";

export const SEOUL_DAY_EXCURSIONS_WIDGET_URL =
  "https://tpwidg.com/content?currency=USD&trs=544987&shmarker=745048&locale=en&city_id=13&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497";
export const SEOUL_GYG_CITY_WIDGET_LOCATION_ID = "200";

/** Renders the supplied raw Seoul GetYourGuide city-widget data block. */
export function SeoulGetYourGuideCityWidget() {
  return (
    <div className="min-h-32 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm" aria-label="Seoul GetYourGuide city tours">
      <div data-gyg-href="https://widget.getyourguide.com/default/city.frame" data-gyg-location-id={SEOUL_GYG_CITY_WIDGET_LOCATION_ID} data-gyg-locale-code="en-US" data-gyg-widget="city" data-gyg-partner-id="YOPATWV" />
    </div>
  );
}

/** Mounts the exact supplied Travelpayouts Seoul day-excursions script into an article-safe container. */
export function SeoulDayExcursionsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = SEOUL_DAY_EXCURSIONS_WIDGET_URL;
    script.charset = "utf-8";
    container.appendChild(script);
    return () => {
      if (script.parentNode === container) container.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} className="min-h-28 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm" aria-label="Seoul day excursions"><p className="text-sm text-slate-600">Loading Seoul day excursions...</p></div>;
}
