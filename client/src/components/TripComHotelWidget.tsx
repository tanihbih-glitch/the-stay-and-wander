import { useEffect } from "react";

interface TripComHotelWidgetProps {
  title?: string;
}

export default function TripComHotelWidget({
  title = "Search Hotels in Asia — Powered by Trip.com",
}: TripComHotelWidgetProps) {
  useEffect(() => {
    // Reload the Trip.com widget script if it exists
    const script = document.createElement("script");
    script.src = "https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container max-w-4xl mx-auto">
        {/* Heading */}
        <h3 className="text-xl font-semibold mb-8" style={{ color: "#0077B6" }}>
          {title}
        </h3>

        {/* Trip.com Widget Container */}
        <div className="flex justify-center overflow-x-auto">
          <div className="min-w-max md:min-w-0">
            <iframe
              src="https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1="
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "320px",
                border: "none",
              }}
              frameBorder="0"
              scrolling="no"
              title="Trip.com Hotel Search"
            />
          </div>
        </div>

        {/* Mobile-friendly note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Search and book hotels across Asia with Trip.com's secure booking platform
        </p>
      </div>
    </section>
  );
}
