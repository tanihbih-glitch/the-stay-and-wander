import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { articleMetadata } from "../client/src/pages/BlogSkiInSkiOutHotels";
import { skiInSkiOutHotelsFaqs, getArticleFaqs } from "../shared/articleFaqs";
import { pageMetadataConfig } from "../shared/seo";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";
import { featuredGuideDiscovery } from "../shared/featuredGuideDiscovery";
import { SKI_HOTELS_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";

describe("ski-in/ski-out hotel guide", () => {
  it("registers the canonical route, metadata, discovery card, and sitemap entry", () => {
    expect(articleMetadata.url).toBe("/blog/ski-in-ski-out-hotels-2026-2027");
    expect(articleMetadata.title.length).toBeLessThanOrEqual(60);
    expect(articleMetadata.description.length).toBeLessThanOrEqual(155);
    expect(isApplicationRoute(articleMetadata.url)).toBe(true);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
    expect(featuredGuideDiscovery.some((guide) => guide.path === articleMetadata.url)).toBe(true);
    expect(pageMetadataConfig.skiInSkiOutHotelsGuide.url).toBe(articleMetadata.url);
  });

  it("keeps the facts source-bounded and avoids unsupported price, photo, or review claims", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogSkiInSkiOutHotels.tsx"), "utf8");
    expect(source).toContain("No hotel photos, prices, star scores, or review scores are used here");
    expect(source).toContain("Nordic snow stays");
    expect(source).toContain("Aurora viewing is possible in winter, not guaranteed");
    expect(source).toContain("Bourbon Hotel (Chapitre Six)");
    expect(source).toContain("Aspen Ski Chalets, Kempinski Mall of the Emirates");
    expect(source).toContain("Treehotel");
    expect(source).toContain("Arcora Boutique Hotel & Villas");
    expect(source).toContain("<AffiliateLink");
  });

  it("uses centralized sponsored affiliate destinations and a visible enquiry fallback", () => {
    expect(SKI_HOTELS_AFFILIATE_LINKS.theSkiLodgeVerbier.href).toBe("https://www.trip.com/t/skIrXWGSrW2");
    expect(SKI_HOTELS_AFFILIATE_LINKS.zannierLeChalet.href).toBe("https://booking.stay22.com/thestayandwander/t0TbOoot1M");
    expect(SKI_HOTELS_AFFILIATE_LINKS.sansuiNiseko.href).toBe("https://booking.stay22.com/thestayandwander/S4gJ409szW");
    expect(SKI_HOTELS_AFFILIATE_LINKS.laVigneHakuba.href).toBe("https://www.trip.com/t/LYyYP58SrW2");
    expect(SKI_HOTELS_AFFILIATE_LINKS.aspenSkiChalets.href).toBe("https://booking.stay22.com/thestayandwander/5vPFBcmoMP");
    expect(SKI_HOTELS_AFFILIATE_LINKS.treehotel.href).toBe("https://booking.stay22.com/thestayandwander/1TiRHL_1uE");
    expect(SKI_HOTELS_AFFILIATE_LINKS.arcoraLapland.href).toBe("https://booking.stay22.com/thestayandwander/XPUPEWVXq4");
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogSkiInSkiOutHotels.tsx"), "utf8");
    expect(source).toContain('rel="sponsored nofollow"');
    expect(source).toContain('data-property-link="true"');
    expect(source).toContain("mailto:thestayandwander@thestayandwander.com");
    expect(source).toContain("ski-in-ski-out-hotels-2026-2027");
  });

  it("maps six visible FAQs to the canonical page", () => {
    expect(skiInSkiOutHotelsFaqs).toHaveLength(6);
    expect(getArticleFaqs(articleMetadata.url)).toBe(skiInSkiOutHotelsFaqs);
  });
});
