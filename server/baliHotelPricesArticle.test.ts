import { describe, expect, it } from "vitest";
import { articleMetadata, baliStayDecisions, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBaliHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";

describe("Bali hotel prices article", () => {
  it("uses the supplied first-timer guide title, canonical route, and neighborhood-focused search description", () => {
    expect(articleMetadata.title).toBe("Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)");
    expect(articleMetadata.url).toBe("/blog/where-to-stay-in-bali-2026");
    expect(searchMetadata.title).toBe("Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)");
    expect(searchMetadata.description).toBe("Find the best area to stay in Bali for a first trip — Seminyak for beach clubs, Ubud for culture, Uluwatu for surf, or Canggu for cafés.");
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

  it("provides a transparent planning method and linked area decision tree", () => {
    expect(baliStayDecisions).toEqual([
      expect.objectContaining({ recommendation: "Seminyak", href: "#seminyak" }),
      expect.objectContaining({ recommendation: "Ubud", href: "#ubud" }),
      expect.objectContaining({ recommendation: "Uluwatu", href: "#uluwatu" }),
      expect.objectContaining({ recommendation: "Canggu", href: "#canggu" }),
    ]);
  });
});
