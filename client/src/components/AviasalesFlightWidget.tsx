import { useEffect, useRef } from "react";

/**
 * AviasalesFlightWidget Component
 * Integrates Travelpayouts Aviasales flight search widget
 * Tracks all searches with affiliate ID 745048 (marker 745048)
 * Updated embed code with limit=6 for 6 flight results display
 */

export default function AviasalesFlightWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Create and append the Aviasales widget script
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=544987&shmarker=745048&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100";
    script.charset = "utf-8";

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
      style={{
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Loading state while widget loads */}
      <div className="text-center text-gray-600">
        <p className="text-sm">Loading flight search...</p>
      </div>
    </div>
  );
}
