import { describe, expect, it } from "vitest";
import { articleMetadata, bangkokStayDecisions, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBangkokHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import { pageMetadataConfig } from "../shared/seo";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("Bangkok hotel prices article", () => {
  it("preserves the first-timer H1 and canonical route while using the approved Bangkok hotel-cost snippet", () => {
    expect(articleMetadata.title).toBe("Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)");
    expect(articleMetadata.url).toBe("/blog/where-to-stay-in-bangkok-2026");
    expect(searchMetadata.title).toBe("Bangkok Hotel Prices 2026: $10–$250+ | The Stay & Wander");
    expect(searchMetadata.description).toBe("Compare typical 2026 Bangkok hotel ranges from $10–$60 budget to $250+ luxury across Sukhumvit, Silom, Riverside, Khao San and Sathorn.");
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

  it("embeds the shared matcher directly after the Bangkok decision tree", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogBangkokHotelPrices.tsx"), "utf8");
    expect(source).toContain("<CityStayMatcher config={bangkokStayMatcherConfig} />");
  });
});
