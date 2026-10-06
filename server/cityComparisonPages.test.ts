import { describe, expect, it } from "vitest";
import { articleMetadata as bangkokSeoulMetadata } from "../client/src/pages/BlogBangkokVsSeoul";
import { articleMetadata as baliPhuketMetadata } from "../client/src/pages/BlogBaliVsPhuket";
import { articleMetadata as dubaiAbuDhabiMetadata } from "../client/src/pages/BlogDubaiVsAbuDhabi";
import { articleMetadata as tokyoOsakaMetadata } from "../client/src/pages/BlogTokyoVsOsaka";
import { getArticleFaqs, bangkokVsSeoulFaqs, baliVsPhuketFaqs, dubaiVsAbuDhabiFaqs, tokyoVsOsakaFaqs } from "../shared/articleFaqs";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("city comparison pages", () => {
  it("registers both canonical routes, metadata, and sitemap entries", () => {
    for (const metadata of [bangkokSeoulMetadata, baliPhuketMetadata, dubaiAbuDhabiMetadata, tokyoOsakaMetadata]) {
      expect(isApplicationRoute(metadata.url)).toBe(true);
      expect(sitemapRoutes.map((route) => route.path)).toContain(metadata.url);
    }
    expect(pageMetadataConfig.bangkokVsSeoulGuide.url).toBe(bangkokSeoulMetadata.url);
    expect(pageMetadataConfig.baliVsPhuketGuide.url).toBe(baliPhuketMetadata.url);
    expect(pageMetadataConfig.dubaiVsAbuDhabiGuide.url).toBe(dubaiAbuDhabiMetadata.url);
    expect(pageMetadataConfig.tokyoVsOsakaGuide.url).toBe(tokyoOsakaMetadata.url);
    expect(bangkokSeoulMetadata.title.length).toBeLessThanOrEqual(60);
    expect(baliPhuketMetadata.title.length).toBeLessThanOrEqual(60);
    expect(bangkokSeoulMetadata.description.length).toBeLessThanOrEqual(155);
    expect(baliPhuketMetadata.description.length).toBeLessThanOrEqual(155);
  });

  it("uses visible FAQ sources that are mapped to both canonical routes", () => {
    expect(bangkokVsSeoulFaqs).toHaveLength(6);
    expect(baliVsPhuketFaqs).toHaveLength(6);
    expect(dubaiVsAbuDhabiFaqs).toHaveLength(6);
    expect(tokyoVsOsakaFaqs).toHaveLength(6);
    expect(getArticleFaqs(bangkokSeoulMetadata.url)).toBe(bangkokVsSeoulFaqs);
    expect(getArticleFaqs(baliPhuketMetadata.url)).toBe(baliVsPhuketFaqs);
    expect(getArticleFaqs(dubaiAbuDhabiMetadata.url)).toBe(dubaiVsAbuDhabiFaqs);
    expect(getArticleFaqs(tokyoOsakaMetadata.url)).toBe(tokyoVsOsakaFaqs);
  });

  it("uses the shared single TOC mount and browser-local selectors", () => {
    const component = readFileSync(path.resolve(process.cwd(), "client/src/components/CityComparisonGuide.tsx"), "utf8");
    const share = readFileSync(path.resolve(process.cwd(), "client/src/components/ComparisonShare.tsx"), "utf8");
    const header = readFileSync(path.resolve(process.cwd(), "client/src/components/Header.tsx"), "utf8");
    expect(header).toContain("<GuideTableOfContents />");
    expect(component).toContain("This browser-local selector");
    expect(component).toContain("<TripComHotelWidget");
    expect(component).toContain("<ComparisonShare title={config.title}");
    expect(component).toContain("motion-safe:animate-in");
    expect(component).not.toContain("StickyTableOfContents");
    expect(share).toContain("Share this comparison");
    expect(share).toContain("Comparison link copied.");
    expect(share).toContain("twitter.com/intent/tweet");
  });
});
