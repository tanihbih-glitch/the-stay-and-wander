import { describe, expect, it } from "vitest";
import {
  articleMetadata,
  coastlineRows,
} from "../client/src/pages/BlogBaliBeachComparison";
import { BALI_COASTAL_MATRIX_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";

describe("Bali beach comparison matrix", () => {
  it("uses the requested canonical title and route", () => {
    expect(articleMetadata.title).toBe(
      "Bali Beach Comparison Matrix (2026): Sand Quality, Swim Safety & Entry Fees by Region"
    );
    expect(articleMetadata.url).toBe("/blog/bali-beach-comparison-matrix-2026");
  });

  it("contains all five supplied coastline regions and their material safety distinctions", () => {
    expect(coastlineRows.map((row) => row.region)).toEqual([
      "Bukit Peninsula",
      "West Coast",
      "Southeast Coast",
      "East / North Coast",
      "Nusa Islands",
    ]);
    expect(coastlineRows.find((row) => row.region === "West Coast")?.safety).toContain("rip currents");
    expect(coastlineRows.find((row) => row.region === "Nusa Islands")?.safety).toContain("Kelingking is non-swimmable");
    expect(coastlineRows.find((row) => row.region === "Southeast Coast")?.bestFor).toContain("Family swimming");
  });

  it("keeps the supplied hotel, flight, and tour booking destinations centralized", () => {
    expect(BALI_COASTAL_MATRIX_AFFILIATE_LINKS).toEqual({
      hotels: "https://booking.stay22.com/thestayandwander/r-lvU3PLVF",
      flights: "https://aviasales.tpo.lu/f9QeB1mu",
      tours: "https://gyg.me/As25WS5K",
    });
  });
});
