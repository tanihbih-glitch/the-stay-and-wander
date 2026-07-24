import { useEffect, useRef, useState } from "react";

/**
 * AviasalesFlightWidget Component
 * Integrates Travelpayouts Aviasales flight search widget with custom branding
 * Tracks all searches with affiliate ID 745048
 * Fully responsive on mobile, tablet, and desktop
 * Includes hotel search option and trust badges
 */

export default function AviasalesFlightWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Create and append the Aviasales widget script
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=544987&shmarker=745048&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
    script.charset = "utf-8";
    script.onload = () => setWidgetLoaded(true);

    // Add script to container if it exists
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup: remove script if component unmounts
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      data-widget-loaded={widgetLoaded ? "true" : "false"}
      style={{
        minHeight: "400px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Loading state while widget loads */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center text-center text-gray-600 transition-opacity duration-200 ${widgetLoaded ? "opacity-0" : "opacity-100"}`}
        aria-hidden={widgetLoaded}
      >
        <p className="text-sm">Loading flight search...</p>
      </div>
    </div>
  );
}
