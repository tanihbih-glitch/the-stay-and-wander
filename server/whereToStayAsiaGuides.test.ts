import { describe, expect, it } from "vitest";
import { articleMetadata as tokyoMetadata, priceSnapshot as tokyoPrices, tokyoStayDecisions } from "../client/src/pages/BlogTokyoStay";
import { articleMetadata as seoulMetadata, priceSnapshot as seoulPrices, seoulStayDecisions } from "../client/src/pages/BlogSeoulStay";
import { CITY_ACTIVITIES_CAMPAIGN, CITY_ACTIVITIES_WIDGET_SRC } from "../client/src/components/CityActivitiesWidget";
import { pageMetadataConfig } from "../shared/seo";
import { sitemapRoutes } from "../shared/publicRoutes";
import { getArticleFaqs, seoulStayFaqs, tokyoStayFaqs } from "../shared/articleFaqs";

describe("Tokyo and Seoul where-to-stay guides", () => {
  it("uses the supplied canonical titles, paths, five-area price tables, and crawler metadata", () => {
    expect(tokyoMetadata.title).toBe("Where to Stay in Tokyo: Best Neighborhoods for First-Timers (2026 Guide)");
    expect(tokyoMetadata.url).toBe("/blog/where-to-stay-in-tokyo-2026");
    expect(tokyoPrices).toHaveLength(5);
    expect(seoulMetadata.title).toBe("Where to Stay in Seoul: Best Areas for First-Timers (2026 Guide)");
    expect(seoulMetadata.url).toBe("/blog/where-to-stay-in-seoul-2026");
    expect(seoulPrices).toHaveLength(5);
    expect(pageMetadataConfig.tokyoStayGuide.url).toBe(tokyoMetadata.url);
    expect(pageMetadataConfig.seoulStayGuide.url).toBe(seoulMetadata.url);
    expect(sitemapRoutes.map((route) => route.path)).toEqual(expect.arrayContaining([tokyoMetadata.url, seoulMetadata.url]));
  });

  it("uses the supplied city activities widget integration", () => {
    expect(CITY_ACTIVITIES_WIDGET_SRC).toBe("https://tpwidg.com/widgets/activities.js");
    expect(CITY_ACTIVITIES_CAMPAIGN).toBe("437150");
  });

  it("provides transparent planning methods and linked neighborhood decision paths", () => {
    expect(tokyoStayDecisions).toEqual([
      expect.objectContaining({ recommendation: "Shinjuku", href: "#shinjuku" }),
      expect.objectContaining({ recommendation: "Shibuya", href: "#shibuya" }),
      expect.objectContaining({ recommendation: "Asakusa", href: "#asakusa" }),
      expect.objectContaining({ recommendation: "Ginza", href: "#ginza" }),
    ]);
    expect(seoulStayDecisions).toEqual([
      expect.objectContaining({ recommendation: "Myeongdong", href: "#myeongdong" }),
      expect.objectContaining({ recommendation: "Gangnam", href: "#gangnam" }),
      expect.objectContaining({ recommendation: "Hongdae", href: "#hongdae" }),
      expect.objectContaining({ recommendation: "Insadong", href: "#insadong" }),
    ]);
  });

  it("matches visible long-tail Tokyo and Seoul FAQs to their schema source", () => {
    expect(tokyoStayFaqs).toHaveLength(5);
    expect(seoulStayFaqs).toHaveLength(5);
    expect(tokyoStayFaqs[0].question).toBe("Where should first-timers stay in Tokyo?");
    expect(seoulStayFaqs[1].question).toBe("What is the best area to stay in Seoul for K-pop and nightlife?");
    expect(getArticleFaqs(tokyoMetadata.url)).toBe(tokyoStayFaqs);
    expect(getArticleFaqs(seoulMetadata.url)).toBe(seoulStayFaqs);
  });

  it("registers the new first-timer itinerary routes and crawler metadata", () => {
    expect(pageMetadataConfig.tokyoItinerary.url).toBe("/itinerary/tokyo");
    expect(pageMetadataConfig.seoulItinerary.url).toBe("/itinerary/seoul");
    expect(sitemapRoutes.map((route) => route.path)).toEqual(expect.arrayContaining(["/itinerary/tokyo", "/itinerary/seoul"]));
  });
});
