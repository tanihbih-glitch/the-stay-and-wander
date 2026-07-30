import { describe, expect, it } from "vitest";
import { articleMetadata, neighborhoodPicks } from "./BlogLisbonHotels";
import { LISBON_ARTICLE_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { GYG_PARTNER_ID } from "@/components/GetYourGuideTours";

describe("Lisbon hotel guide article", () => {
  it("uses the requested canonical route, title, description, category, and read time", () => {
    expect(articleMetadata.url).toBe("/blog/where-to-stay-lisbon-2026");
    expect(articleMetadata.title).toBe("Where to Stay in Lisbon 2026 — Best Neighbourhoods and Hotels for Every Budget");
    expect(articleMetadata.description).toBe("Not sure where to stay in Lisbon in 2026? Our complete neighbourhood guide covers Alfama, Chiado, Bairro Alto, Belém and beyond — with hand-picked hotels from $45/night.");
    expect(articleMetadata.category).toBe("HOTEL REVIEWS · EUROPE TRAVEL");
    expect(articleMetadata.readTime).toBe("10 minutes");
  });

  it("keeps all hotel, flight, and tour calls to action on the supplied affiliate destinations", () => {
    expect(LISBON_ARTICLE_AFFILIATE_LINKS.hotels).toBe("https://booking.stay22.com/thestayandwander/_3gvRmesd0");
    expect(LISBON_ARTICLE_AFFILIATE_LINKS.flights).toBe("https://aviasales.tpo.lu/f9QeB1mu");
    expect(LISBON_ARTICLE_AFFILIATE_LINKS.tours).toBe("https://gyg.me/JwtO7kBb");
    expect(GYG_PARTNER_ID).toBe("YOPATWV");
  });

  it("covers the requested Lisbon neighbourhoods, including Alfama, Chiado, Bairro Alto, and Belém", () => {
    expect(neighborhoodPicks.map((pick) => pick.name)).toEqual(expect.arrayContaining(["Alfama", "Chiado & Baixa", "Bairro Alto & Príncipe Real", "Belém"]));
  });
});
