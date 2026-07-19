import { useRef, useEffect } from "react";

/**
 * PopularRoutesWidget Component
 * Embeds Travelpayouts Popular Routes widget showing trending flight deals
 * Full-width section with ocean blue and gold branding
 */

export default function PopularRoutesWidget() {
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
    <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2
            style={{ fontFamily: '"Playfair Display", serif' }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Most Popular Flight Routes This Summer
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Search and compare the best prices — powered by Aviasales.
          </p>
        </div>

        {/* Widget Container */}
        <div
          ref={containerRef}
          className="w-full bg-white rounded-lg shadow-lg p-8"
          style={{
            minHeight: "500px",
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

        {/* Trust Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            💳 Prices shown are per person • ✈️ All prices include taxes and fees
          </p>
        </div>
      </div>
    </section>
  );
}
