import { describe, expect, it } from "vitest";
import { articleMetadata, priceSnapshot } from "../client/src/pages/BlogBaliHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";

describe("Bali hotel prices article", () => {
  it("keeps the supplied title, canonical route, and 2026 pricing snapshot", () => {
    expect(articleMetadata.title).toBe("Bali Hotel Prices in 2026: What You'll Actually Pay by Region");
    expect(articleMetadata.url).toBe("/blog/bali-hotel-prices-2026");
    expect(articleMetadata.description).toContain("Bali hotel prices in 2026 by region");
    expect(priceSnapshot).toEqual([
      ["Seminyak", "$40–70/night", "$80–150/night", "$200+/night"],
      ["Ubud", "$30–60/night", "$75–130/night", "$180+/night"],
      ["Uluwatu", "$50–90/night", "$100–180/night", "$250+/night"],
      ["Canggu", "$35–65/night", "$70–140/night", "$190+/night"],
    ]);
  });

  it("reuses the established live Trip.com hotel widget", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe(
      "https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1="
    );
  });
});
