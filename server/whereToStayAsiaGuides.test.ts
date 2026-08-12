import { describe, expect, it } from "vitest";
import { articleMetadata as tokyoMetadata, priceSnapshot as tokyoPrices } from "../client/src/pages/BlogTokyoStay";
import { articleMetadata as seoulMetadata, priceSnapshot as seoulPrices } from "../client/src/pages/BlogSeoulStay";
import { CITY_ACTIVITIES_CAMPAIGN, CITY_ACTIVITIES_WIDGET_SRC } from "../client/src/components/CityActivitiesWidget";
import { pageMetadataConfig } from "../shared/seo";
import { sitemapRoutes } from "../shared/publicRoutes";

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
});
