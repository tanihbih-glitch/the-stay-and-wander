import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";

const root = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const bookingSource = readFileSync(resolve(root, "client/src/pages/Booking.tsx"), "utf8");
const widgetSource = readFileSync(resolve(root, "client/src/components/TripComHotelWidget.tsx"), "utf8");
const aviasalesWidgetSource = readFileSync(resolve(root, "client/src/components/AviasalesFlightWidget.tsx"), "utf8");

describe("Trip.com hotel widget placements", () => {
  it("uses the supplied Trip.com partner widget URL with responsive dimensions", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
    expect(widgetSource).toContain('maxWidth: "320px"');
    expect(widgetSource).toContain('width: "100%"');
    expect(widgetSource).toContain('height: "320px"');
    expect(widgetSource).toContain('scrolling="no"');
    expect(widgetSource).toContain('const [isLoaded, setIsLoaded] = useState(false)');
    expect(widgetSource).toContain('onLoad={() => setIsLoaded(true)}');
    expect(widgetSource).toContain('isLoaded ? "opacity-0" : "opacity-100"');
  });

  it("uses the widget in both requested Hotel locations while retaining the other home tabs", () => {
    expect(homeSource).toContain("<TripComHotelWidget />");
    expect(bookingSource).toContain('<TripComHotelWidget title="Search hotels with Trip.com" />');
    ["Flights", "Cruises", "Car Rentals", "AviasalesFlightWidget", "Search Cruise Deals →", "Search Car Rentals →", "Compare Prices →"].forEach((control) => {
      expect(homeSource).toContain(control);
    });
  });

  it("uses the live homepage widgets inline on the Booking-page Hotels and Flights tabs", () => {
    expect(bookingSource).toContain('<TripComHotelWidget title="Search hotels with Trip.com" />');
    expect(bookingSource).toContain("<AviasalesFlightWidget />");
    expect(bookingSource).not.toContain("Search Hotels on Booking.com");
    expect(bookingSource).not.toContain("Search Flights on Aviasales");
    ["Destination", "Check-in", "Check-out", "Guests", "Browse Cruise Deals", "Find the Best Car Rental Deals"].forEach((control) => {
      expect(bookingSource).toContain(control);
    });
  });

  it("hides the Aviasales loading placeholder once the shared live widget loads", () => {
    expect(aviasalesWidgetSource).toContain('const [widgetLoaded, setWidgetLoaded] = useState(false)');
    expect(aviasalesWidgetSource).toContain('script.onload = () => setWidgetLoaded(true)');
    expect(aviasalesWidgetSource).toContain('data-widget-loaded={widgetLoaded ? "true" : "false"}');
    expect(aviasalesWidgetSource).toContain('widgetLoaded ? "opacity-0" : "opacity-100"');
  });
});
