import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";

const root = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const bookingSource = readFileSync(resolve(root, "client/src/pages/Booking.tsx"), "utf8");
const widgetSource = readFileSync(resolve(root, "client/src/components/TripComHotelWidget.tsx"), "utf8");

describe("Trip.com hotel widget placements", () => {
  it("uses the supplied Trip.com partner widget URL with responsive dimensions", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
    expect(widgetSource).toContain('maxWidth: "320px"');
    expect(widgetSource).toContain('width: "100%"');
    expect(widgetSource).toContain('height: "320px"');
    expect(widgetSource).toContain('scrolling="no"');
  });

  it("uses the widget in both requested Hotel locations while retaining the other home tabs", () => {
    expect(homeSource).toContain("<TripComHotelWidget />");
    expect(bookingSource).toContain("<TripComHotelWidget />");
    ["Flights", "Cruises", "Car Rentals", "AviasalesFlightWidget", "Search Cruises (CruiseDirect)", "Search Car Rentals"].forEach((control) => {
      expect(homeSource).toContain(control);
    });
  });
});
