import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS, buildBaliSeasonalAvailabilityUrl, getNextBaliSeasonalSearchDates } from "../client/src/lib/affiliateLinks";
import { BALI_SEASONAL_BENCHMARKS, calculateBaliGroupCosts } from "../client/src/components/BaliGroupCostCalculator";
import { getLegacyRedirectTarget } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";

const articleSource = fs.readFileSync(
  path.resolve(process.cwd(), "client/src/pages/BlogBaliHotelPriceIndex.tsx"),
  "utf8"
);
const seasonalChartSource = fs.readFileSync(
  path.resolve(process.cwd(), "client/src/components/BaliSeasonalRateChart.tsx"),
  "utf8"
);

describe("Bali Hotel Price Index", () => {
  it("preserves the supplied five-region benchmark values and pricing-factor figures", () => {
    expect(articleSource).toContain("Canggu & Seminyak");
    expect(articleSource).toContain("$12–$25");
    expect(articleSource).toContain("$400–$750");
    expect(articleSource).toContain("Ubud & Central");
    expect(articleSource).toContain("$8–$18");
    expect(articleSource).toContain("Bukit (Uluwatu)");
    expect(articleSource).toContain("$500–$1,200+");
    expect(articleSource).toContain("Sanur & Nusa Dua");
    expect(articleSource).toContain("Amed & Lovina");
    expect(articleSource).toContain("additional 21% surcharge");
    expect(articleSource).toContain("35%–60%");
  });

  it("uses the approved sponsored Stay22 CTA and renders all five regional map markers", () => {
    expect(BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS.hotels).toBe("https://booking.stay22.com/thestayandwander/bEUkQtNQBH");
    expect(articleSource).toContain('rel="sponsored nofollow"');
    expect(articleSource).toContain("Compare Bali Accommodation Rates on Stay22");
    expect(articleSource).toContain("regionPins.forEach");
    expect(articleSource).toContain("Canggu & Seminyak");
    expect(articleSource).toContain("Amed & Lovina");
  });

  it("registers only the new canonical price-index route while retaining the old URL's permanent redirect", () => {
    expect(sitemapRoutes.map((route) => route.path)).toContain("/blog/bali-hotel-price-index-2026");
    expect(sitemapRoutes.map((route) => route.path)).not.toContain("/blog/bali-hotel-prices-2026");
    expect(getLegacyRedirectTarget("/blog/bali-hotel-prices-2026")).toBe("/blog/where-to-stay-in-bali-2026");
  });

  it("uses the supplied monthly seasonal values in the group-cost calculator and interactive rate chart", () => {
    expect(BALI_SEASONAL_BENCHMARKS).toHaveLength(12);
    expect(BALI_SEASONAL_BENCHMARKS[0]).toMatchObject({ month: "January", hotel: 70, villa: 185 });
    expect(BALI_SEASONAL_BENCHMARKS[6]).toMatchObject({ month: "July", hotel: 81, villa: 218, multiplier: "1.45x" });
    expect(BALI_SEASONAL_BENCHMARKS[7]).toMatchObject({ month: "August", hotel: 84, villa: 225, multiplier: "1.50x" });
    expect(BALI_SEASONAL_BENCHMARKS[11]).toMatchObject({ month: "December", hotel: 90, villa: 240, multiplier: "1.60x" });
    expect(calculateBaliGroupCosts(4, 5, 81, 218)).toEqual({ rooms: 2, hotelTotal: 810, villaTotal: 1090, difference: 280 });
    expect(articleSource).toContain("BaliSeasonalRateChart");
  });

  it("includes five nightly-rate strings in the interactive regional map tooltips", () => {
    expect(articleSource).toContain("Average nightly range:");
    expect(articleSource).toContain("$65–$140 boutique");
    expect(articleSource).toContain("$50–$110 boutique");
    expect(articleSource).toContain("$80–$160 boutique");
    expect(articleSource).toContain("$55–$120 boutique");
    expect(articleSource).toContain("$30–$70 boutique");
  });

  it("uses future, three-night date presets in the selected-month Stay22 handoff", () => {
    const reference = new Date("2026-08-24T00:00:00.000Z");
    expect(getNextBaliSeasonalSearchDates(7, reference)).toEqual({ checkIn: "2027-08-15", checkOut: "2027-08-18" });
    expect(getNextBaliSeasonalSearchDates(11, reference)).toEqual({ checkIn: "2026-12-15", checkOut: "2026-12-18" });
    const septemberSearch = buildBaliSeasonalAvailabilityUrl(8, reference);
    expect(septemberSearch).toContain("checkin=2026-09-15");
    expect(septemberSearch).toContain("checkout=2026-09-18");
    expect(septemberSearch).toContain("group_adults=2");
    expect(seasonalChartSource).toContain("Check {selected.month} availability");
    expect(seasonalChartSource).toContain('rel="sponsored nofollow"');
  });
});
