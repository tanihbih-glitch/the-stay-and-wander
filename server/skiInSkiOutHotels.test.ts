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
    expect(SKI_HOTELS_AFFILIATE_LINKS.hakubaAlpineHotel.href).toBe("https://www.stay22.com/allez/booking?aid=thestayandwander&link=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fjp%2Fhakuba-alpine.html&campaign=ski_in_ski_out_hotels_2026_2027");
    expect(SKI_HOTELS_AFFILIATE_LINKS.hakubaAlpineHotel.tripComHref).toBe("https://www.trip.com/t/znzNFqMorW2");
    expect(SKI_HOTELS_AFFILIATE_LINKS.aspenSkiChalets.href).toBe("https://booking.stay22.com/thestayandwander/5vPFBcmoMP");
    expect(SKI_HOTELS_AFFILIATE_LINKS.treehotel.href).toBe("https://booking.stay22.com/thestayandwander/1TiRHL_1uE");
    expect(SKI_HOTELS_AFFILIATE_LINKS.arcoraLapland.href).toBe("https://booking.stay22.com/thestayandwander/XPUPEWVXq4");
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogSkiInSkiOutHotels.tsx"), "utf8");
    expect(source).toContain('ctaType="check_availability_click"');
    expect(source).toContain('label: "Check availability", rel: "sponsored"');
    expect(source).not.toContain("secondaryLink");
    expect(source).toContain('ctaType="check_availability_click"');
    expect(source).toContain('data-enquiry-click="true"');
    expect(source).toContain('data-enquiry-form="ski_property_enquiry"');
    expect(source).toContain('onClick={() => openEnquiry(property.name)}');
    expect(source).toContain("ski-in-ski-out-hotels-2026-2027");
  });

  it("maps six visible FAQs to the canonical page", () => {
    expect(skiInSkiOutHotelsFaqs).toHaveLength(6);
    expect(getArticleFaqs(articleMetadata.url)).toBe(skiInSkiOutHotelsFaqs);
  });

  it("keeps ski alerts on Mailchimp without local database storage", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/components/SkiAlertsSignup.tsx"), "utf8");
    const endpoint = readFileSync(path.resolve(process.cwd(), "server/mailchimpSubscribe.ts"), "utf8");
    expect(source).toContain('fetch("/api/subscribe"');
    expect(source).toContain('name="company"');
    expect(source).toContain('data-email-signup-form="ski-2026-27"');
    expect(source).toContain("Check your inbox to confirm.");
    expect(source).toContain("/privacy-policy");
    expect(endpoint).toContain('status_if_new: "pending"');
    expect(endpoint).toContain('SUBSCRIBER_TAG = "ski-2026-27"');
    expect(endpoint).toContain("MAX_REQUESTS_PER_WINDOW");
  });

  it("keeps the future Meta Pixel inactive until a configured ID and marketing consent exist", () => {
    const analytics = readFileSync(path.resolve(process.cwd(), "client/src/lib/analytics.ts"), "utf8");
    const consent = readFileSync(path.resolve(process.cwd(), "client/src/components/AnalyticsConsent.tsx"), "utf8");
    expect(analytics).toContain("VITE_META_PIXEL_ID");
    expect(analytics).toContain("isSkiGuidePage");
    expect(analytics).toContain('"CheckAvailability" | "Lead"');
    expect(consent).toContain("Allow marketing");
    expect(consent).toContain("MARKETING_CONSENT_KEY");
  });
});
