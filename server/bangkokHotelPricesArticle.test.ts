import { describe, expect, it } from "vitest";
import { articleMetadata, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBangkokHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import { pageMetadataConfig } from "../shared/seo";

describe("Bangkok hotel prices article", () => {
  it("keeps the supplied content title, search metadata, canonical route, and pricing table", () => {
    expect(articleMetadata.title).toBe("Bangkok Hotel Prices in 2026: What You'll Actually Pay by Area");
    expect(articleMetadata.url).toBe("/blog/bangkok-hotel-prices-2026");
    expect(searchMetadata.title).toBe("Bangkok Hotel Prices 2026: Real Costs by Area (Sukhumvit, Silom, Riverside)");
    expect(searchMetadata.description).toBe("See exactly what you'll pay for hotels in Bangkok in 2026 — broken down by area, from budget to luxury. Real price ranges, no guessing.");
    expect(priceSnapshot).toHaveLength(5);
    expect(priceSnapshot[0]).toEqual(["Sukhumvit", "$25–45/night", "$60–120/night", "$180+/night"]);
    expect(pageMetadataConfig.bangkokHotelPricesGuide.url).toBe(articleMetadata.url);
  });

  it("uses the established live Trip.com hotel widget", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });
});
