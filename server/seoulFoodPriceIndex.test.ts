import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { articleMetadata } from "../client/src/pages/BlogSeoulFoodPriceIndex";
import { SEOUL_DINING_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { SEOUL_DAY_EXCURSIONS_WIDGET_URL, SEOUL_GYG_CITY_WIDGET_LOCATION_ID } from "../client/src/components/SeoulDiningWidgets";
import { pageMetadataConfig } from "../shared/seo";
import { sitemapRoutes } from "../shared/publicRoutes";

describe("Seoul Food & Dining Price Index", () => {
  it("registers the supplied canonical title, route, SEO metadata, and sitemap entry", () => {
    expect(articleMetadata.title).toBe("Seoul Food & Dining Price Index (2026): Best Districts, Iconic Eats & Area Cost Breakdown");
    expect(articleMetadata.url).toBe("/blog/seoul-food-price-index-2026");
    expect(pageMetadataConfig.seoulFoodPriceIndex.url).toBe(articleMetadata.url);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
  });

  it("uses the approved sponsored destinations and exact city-widget configuration", () => {
    expect(SEOUL_DINING_AFFILIATE_LINKS).toEqual({
      tripCom: "https://trip.com?Allianceid=9322314&SID=324726991&trip_sub1=&trip_sub3=D19425499",
      stay22: "https://booking.stay22.com/thestayandwander/bEUkQtNQBH",
      klook: "https://klook.tpo.lu/5DVt59mh",
    });
    expect(SEOUL_GYG_CITY_WIDGET_LOCATION_ID).toBe("200");
    expect(SEOUL_DAY_EXCURSIONS_WIDGET_URL).toBe("https://tpwidg.com/content?currency=USD&trs=544987&shmarker=745048&locale=en&city_id=13&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497");
  });

  it("keeps all external article anchors sponsored and nofollow while retaining source price values", () => {
    const source = readFileSync("client/src/pages/BlogSeoulFoodPriceIndex.tsx", "utf8");
    expect(source).toContain('rel: "sponsored nofollow"');
    expect(source).toContain("₩3,000 – ₩7,000 (~$2–$5)");
    expect(source).toContain("₩150,000 – ₩350,000+ (~$110–$250+)");
    expect(source).toContain("₩25,000 – ₩35,000 / day ($18 – $26 USD)");
    expect(source).toContain("reader-supported travel research portal");
  });
});
