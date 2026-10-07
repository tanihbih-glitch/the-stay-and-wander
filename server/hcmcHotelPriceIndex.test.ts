import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { articleMetadata } from "../client/src/pages/BlogHoChiMinhCityHotelPriceIndex";
import { getArticleFaqs, hoChiMinhCityHotelPriceIndexFaqs } from "../shared/articleFaqs";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";

describe("Ho Chi Minh City hotel price index", () => {
  it("registers the route, metadata, sitemap, and six FAQs", () => {
    expect(isApplicationRoute(articleMetadata.url)).toBe(true);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
    expect(pageMetadataConfig.hoChiMinhCityHotelPriceIndex.url).toBe(articleMetadata.url);
    expect(articleMetadata.title.length).toBeLessThanOrEqual(60);
    expect(articleMetadata.description.length).toBeLessThanOrEqual(155);
    expect(hoChiMinhCityHotelPriceIndexFaqs).toHaveLength(6);
    expect(getArticleFaqs(articleMetadata.url)).toBe(hoChiMinhCityHotelPriceIndexFaqs);
  });

  it("uses one shared TOC mount and source-bounded interactive rate tools", () => {
    const page = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogHoChiMinhCityHotelPriceIndex.tsx"), "utf8");
    const explorer = readFileSync(path.resolve(process.cwd(), "client/src/components/HcmcHotelPriceExplorer.tsx"), "utf8");
    const liveSearch = readFileSync(path.resolve(process.cwd(), "client/src/components/HcmcLiveHotelSearch.tsx"), "utf8");
    const header = readFileSync(path.resolve(process.cwd(), "client/src/components/Header.tsx"), "utf8");
    expect(page).toContain("<HcmcHotelPriceExplorer />");
    expect(page).toContain("<HcmcLiveHotelSearch />");
    expect(page).toContain("<ArticleFAQ faqs={hoChiMinhCityHotelPriceIndexFaqs}");
    expect(page).toContain("/blog/bangkok-vs-ho-chi-minh-city-2026");
    expect(explorer).toContain("city-level planning bands");
    expect(explorer).toContain("District 1");
    expect(liveSearch).toContain("buildHcmcStay22SearchUrl");
    expect(liveSearch).toContain('rel="sponsored nofollow"');
    expect(header).toContain("<GuideTableOfContents />");
    expect(page).not.toContain("GuideTableOfContents");
  });
});
