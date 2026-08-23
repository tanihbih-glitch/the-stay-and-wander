import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { articleMetadata, seoulCafePriceRows } from "../client/src/pages/BlogSeoulFoodPriceIndex";
import { SEOUL_DINING_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { SEOUL_DAY_EXCURSIONS_WIDGET_URL, SEOUL_GYG_CITY_WIDGET_LOCATION_ID } from "../client/src/components/SeoulDiningWidgets";
import { DEFAULT_AUD_PER_USD, DEFAULT_EUR_PER_USD, DEFAULT_GBP_PER_USD, DEFAULT_KRW_PER_USD, convertKrwToUsd, convertUsdToCurrency } from "../client/src/components/KrwMealBudgetConverter";
import { seoulFoodTimelineStops } from "../client/src/components/SeoulFoodTimeline";
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

  it("retains the supplied café benchmarks and converts meal budgets across four editable currencies", () => {
    expect(seoulCafePriceRows).toHaveLength(5);
    expect(seoulCafePriceRows[0]).toEqual(expect.objectContaining({ district: "Jongno & Euljiro", coffee: "₩4,500 – ₩6,000 (~$3.30–$4.40)" }));
    expect(seoulCafePriceRows[4]).toEqual(expect.objectContaining({ district: "Seongsu-dong", pastry: "₩7,000 – ₩9,500 (~$5.10–$7.00)" }));
    const usd = convertKrwToUsd(12000, DEFAULT_KRW_PER_USD);
    expect(usd).toBeCloseTo(8.8889, 3);
    expect(convertUsdToCurrency(usd, DEFAULT_EUR_PER_USD)).toBeCloseTo(8.1778, 3);
    expect(convertUsdToCurrency(usd, DEFAULT_GBP_PER_USD)).toBeCloseTo(6.9333, 3);
    expect(convertUsdToCurrency(usd, DEFAULT_AUD_PER_USD)).toBeCloseTo(13.5111, 3);
  });

  it("provides a four-stop interactive Gwangjang-to-Gangnam food itinerary", () => {
    expect(seoulFoodTimelineStops).toHaveLength(4);
    expect(seoulFoodTimelineStops.map((stop) => stop.district)).toEqual([
      "Gwangjang Market · Jongno",
      "Euljiro",
      "Hongdae & Sinchon",
      "Gangnam & Cheongdam",
    ]);
  });
});
