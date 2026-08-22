import { describe, expect, it } from "vitest";
import { articleMetadata, bangkokStayDecisions, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBangkokHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import { pageMetadataConfig } from "../shared/seo";

describe("Bangkok hotel prices article", () => {
  it("uses the supplied first-timer guide title, canonical route, and neighborhood-focused search description", () => {
    expect(articleMetadata.title).toBe("Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)");
    expect(articleMetadata.url).toBe("/blog/where-to-stay-in-bangkok-2026");
    expect(searchMetadata.title).toBe("Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)");
    expect(searchMetadata.description).toBe("Find the best area to stay in Bangkok for a first trip — Sukhumvit for transit, Riverside for temples, Khao San Road for energy, and Sathorn for quiet.");
    expect(priceSnapshot).toHaveLength(5);
    expect(priceSnapshot[0]).toEqual(["Sukhumvit", "$25–45/night", "$60–120/night", "$180+/night"]);
    expect(pageMetadataConfig.bangkokHotelPricesGuide.url).toBe(articleMetadata.url);
  });

  it("uses the established live Trip.com hotel widget", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });

  it("provides a transparent planning method and linked area decision tree", () => {
    expect(bangkokStayDecisions).toEqual([
      expect.objectContaining({ recommendation: "Sukhumvit", href: "#sukhumvit" }),
      expect.objectContaining({ recommendation: "Riverside", href: "#riverside" }),
      expect.objectContaining({ recommendation: "Khao San Road", href: "#khao-san-road" }),
      expect.objectContaining({ recommendation: "Sathorn", href: "#sathorn" }),
    ]);
  });
});
