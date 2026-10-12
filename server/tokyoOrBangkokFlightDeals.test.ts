import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { articleMetadata } from "../client/src/pages/BlogTokyoOrBangkokFlightDeals";
import { getArticleFaqs, tokyoOrBangkokFlightDealsFaqs } from "../shared/articleFaqs";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";

describe("Tokyo or Bangkok flight-deal comparison", () => {
  it("registers the route, metadata, sitemap, and FAQ mapping", () => {
    expect(isApplicationRoute(articleMetadata.url)).toBe(true);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
    expect(pageMetadataConfig.tokyoOrBangkokFlightDealsGuide.url).toBe(articleMetadata.url);
    expect(articleMetadata.title.length).toBeLessThanOrEqual(60);
    expect(articleMetadata.description.length).toBeLessThanOrEqual(155);
    expect(tokyoOrBangkokFlightDealsFaqs).toHaveLength(6);
    expect(getArticleFaqs(articleMetadata.url)).toBe(tokyoOrBangkokFlightDealsFaqs);
  });

  it("keeps the refreshed flight comparison copy concrete", () => {
    expect(articleMetadata.title).toBe("Tokyo or Bangkok Flights 2026: Compare Prices and Deals");
    expect(articleMetadata.description).toContain("live fare checks");
    const page = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogTokyoOrBangkokFlightDeals.tsx"), "utf8");
    expect(page).toContain("December 2026–February 2027");
    expect(page).toContain("March–May 2027");
    expect(page).not.toContain("Search and compare by April");
  });

  it("reuses the established Aviasales widget and canonical affiliate destination", () => {
    const page = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogTokyoOrBangkokFlightDeals.tsx"), "utf8");
    const widget = readFileSync(path.resolve(process.cwd(), "client/src/components/AviasalesFlightWidget.tsx"), "utf8");
    expect(page).toContain("<AviasalesFlightWidget />");
    expect(page).toContain("DEALS_AFFILIATE_LINKS.flights");
    expect(page).toContain("https://aviasales.tpo.lu/f9QeB1mu");
    expect(widget).toContain("trs=544987");
    expect(widget).toContain("shmarker=745048");
    expect(widget).toContain("promo_id=7879");
    expect(widget).toContain("campaign_id=100");
  });
});
