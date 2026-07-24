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
  return (
    <div className={`flex w-full justify-center ${className}`.trim()}>
      <iframe
        title={title}
        src={TRIP_COM_HOTEL_WIDGET_URL}
        style={{ width: "100%", maxWidth: "320px", height: "320px", border: "none" }}
        frameBorder="0"
        scrolling="no"
        id="S18723294"
      />
    </div>
  );
}
