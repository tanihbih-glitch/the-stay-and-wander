import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { UAE_EXTENDED_STAY_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { articleMetadata, UAE_EXTENDED_STAY_SOURCE_LINKS } from "../client/src/pages/BlogUaeExtendedStayHotels";
import { rankUaeExtendedStayOptions, UAE_EXTENDED_STAY_OPTIONS } from "../client/src/components/UaeExtendedStaySelector";
import { getArticleFaqs } from "../shared/articleFaqs";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";
import { featuredGuideDiscovery } from "../shared/featuredGuideDiscovery";

const projectRoot = process.cwd();
function readProjectFile(relativePath: string) {
  return fs.readFileSync(path.resolve(projectRoot, relativePath), "utf8");
}

describe("UAE extended-stay comparison hub", () => {
  it("publishes a source-bounded canonical hub with a unique short search snippet and visible FAQ source", () => {
    expect(articleMetadata.url).toBe("/blog/uae-extended-stay-hotels-2026");
    expect(articleMetadata.title.length).toBeLessThanOrEqual(60);
    expect(articleMetadata.description.length).toBeLessThanOrEqual(155);
    expect(pageMetadataConfig.uaeExtendedStayHotels.url).toBe(articleMetadata.url);
    expect(getArticleFaqs(articleMetadata.url)).toHaveLength(5);
    expect(UAE_EXTENDED_STAY_SOURCE_LINKS).toHaveLength(15);
    expect(UAE_EXTENDED_STAY_SOURCE_LINKS.every((source) => source.href.startsWith("https://"))).toBe(true);
  });

  it("returns a stable two-to-three option shortlist using only verified UAE property formats", () => {
    const first = rankUaeExtendedStayOptions("business", "amenities");
    const second = rankUaeExtendedStayOptions("business", "amenities");

    expect(first).toEqual(second);
    expect(first).toHaveLength(3);
    expect(UAE_EXTENDED_STAY_OPTIONS.every((option) => option.sourceUrl.startsWith("https://"))).toBe(true);
    expect(UAE_EXTENDED_STAY_OPTIONS.map((option) => option.brand)).not.toContain("Hilton");
    expect(UAE_EXTENDED_STAY_OPTIONS.map((option) => option.property)).not.toContain("Marriott Executive Apartments Sheikh Zayed Road");
  });

  it("uses the approved registry, sponsored new-tab CTAs, and a browser-local selector", () => {
    const page = readProjectFile("client/src/pages/BlogUaeExtendedStayHotels.tsx");
    const selector = readProjectFile("client/src/components/UaeExtendedStaySelector.tsx");

    expect(UAE_EXTENDED_STAY_AFFILIATE_LINKS.hotels).toBe("https://booking.stay22.com/thestayandwander/8S9p00Hygg-");
    expect(UAE_EXTENDED_STAY_AFFILIATE_LINKS.tripCom).toContain("trip.com/partners/ad/");
    expect(page).toContain("UAE_EXTENDED_STAY_AFFILIATE_LINKS.hotels");
    expect(page).toContain("UAE_EXTENDED_STAY_AFFILIATE_LINKS.tripCom");
    expect(page).toContain('target="_blank" rel="sponsored nofollow"');
    expect(page).toContain("Affiliate disclosure");
    expect(selector).toContain("useState");
    expect(selector).not.toMatch(/localStorage|fetch\(|trpc\.|axios|userId/i);
  });

  it("registers the new hub independently while preserving the live legacy article for future migration", () => {
    const blog = readProjectFile("client/src/pages/Blog.tsx");
    const redirects = readProjectFile("server/legacyRedirects.ts");

    expect(isApplicationRoute(articleMetadata.url)).toBe(true);
    expect(isApplicationRoute("/blog/uae-extended-stay-sustainability-2026")).toBe(true);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
    expect(sitemapRoutes.map((route) => route.path)).toContain("/blog/uae-extended-stay-sustainability-2026");
    expect(featuredGuideDiscovery.map((guide) => guide.path)).toContain(articleMetadata.url);
    expect(blog).toContain("featuredGuideDiscovery.map");
    expect(redirects).not.toContain("/blog/uae-extended-stay-sustainability-2026");
  });
});
