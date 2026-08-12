import { describe, expect, it } from "vitest";
import { articleMetadata, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBangkokHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import { pageMetadataConfig } from "../shared/seo";

describe("Bangkok hotel prices article", () => {
  it("uses the supplied where-to-stay title while preserving the canonical route and pricing table", () => {
    expect(articleMetadata.title).toBe("Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)");
    expect(articleMetadata.url).toBe("/blog/bangkok-hotel-prices-2026");
    expect(searchMetadata.title).toBe("Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)");
    expect(searchMetadata.description).toBe("Not sure where to stay in Bangkok? Compare Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn — what each is best for, and what you'll pay in 2026.");
    expect(priceSnapshot).toHaveLength(5);
    expect(priceSnapshot[0]).toEqual(["Sukhumvit", "$25–45/night", "$60–120/night", "$180+/night"]);
    expect(pageMetadataConfig.bangkokHotelPricesGuide.url).toBe(articleMetadata.url);
  });

  it("uses the established live Trip.com hotel widget", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });
});
