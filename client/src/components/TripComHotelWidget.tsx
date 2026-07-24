import { useState } from "react";

export const TRIP_COM_HOTEL_WIDGET_URL = "https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=";

type TripComHotelWidgetProps = {
  className?: string;
  title?: string;
};

/** A compact, responsive Trip.com partner widget for hotel search placements. */
export default function TripComHotelWidget({
  className = "",
  title = "Search hotels with Trip.com",
}: TripComHotelWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative flex w-full justify-center ${className}`.trim()}
      aria-busy={!isLoaded}
    >
      <div
        className={`pointer-events-none absolute inset-0 mx-auto flex max-w-[320px] items-center justify-center rounded-md bg-white/80 text-center text-sm text-gray-600 transition-opacity duration-200 ${isLoaded ? "opacity-0" : "opacity-100"}`}
        aria-hidden={isLoaded}
      >
        Loading hotel search...
      </div>
      <iframe
        title={title}
        src={TRIP_COM_HOTEL_WIDGET_URL}
        style={{ width: "100%", maxWidth: "320px", height: "320px", border: "none" }}
        frameBorder="0"
        scrolling="no"
        id="S18723294"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
