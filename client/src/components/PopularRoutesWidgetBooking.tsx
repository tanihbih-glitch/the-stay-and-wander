import { useEffect, useRef } from "react";

/**
 * PopularRoutesWidgetBooking Component
 * Embeds Travelpayouts Popular Routes widget on Booking Portal Flights tab
 * Shows 6 trending flight routes with affiliate tracking
 */

export default function PopularRoutesWidgetBooking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Create and append the Popular Routes widget script
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
      className="w-full bg-white rounded-lg p-6"
      style={{
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Loading state while widget loads */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">Loading popular routes...</p>
        <p className="text-sm mt-2">
          Discovering the best flight deals for you
        </p>
      </div>
    </div>
  );
}
