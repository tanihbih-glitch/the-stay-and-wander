import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TRIP_COM_HOTELS_AFFILIATE_URL } from "../client/src/lib/affiliateLinks";

const root = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("homepage Trip.com hotel search", () => {
  it("uses the supplied Trip.com destination in a safe new browser tab", () => {
    expect(TRIP_COM_HOTELS_AFFILIATE_URL).toBe("https://www.trip.com/t/cRAt9tqPeV2");
    expect(homeSource).toContain("TRIP_COM_HOTELS_AFFILIATE_URL");
    expect(homeSource).toContain('target="_blank"');
    expect(homeSource).toContain('rel="noopener noreferrer"');
    expect(homeSource).toContain("Search Hotels");
  });

  it("leaves the other booking-tab controls in the homepage source", () => {
    ["Flights", "Cruises", "Car Rentals", "AviasalesFlightWidget", "Search Cruises (CruiseDirect)", "Search Car Rentals"].forEach((control) => {
      expect(homeSource).toContain(control);
    });
  });
});

