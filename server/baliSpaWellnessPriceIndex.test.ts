import { describe, expect, it } from "vitest";
import { articleMetadata, spaPriceRows } from "../client/src/pages/BlogBaliSpaWellnessPriceIndex";
import { BALI_WELLNESS_INDEX_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { pageMetadataConfig } from "../shared/seo";
import { sitemapRoutes } from "../shared/publicRoutes";

describe("Bali spa and wellness price index", () => {
  it("uses the supplied canonical title, tier benchmarks, and crawlable metadata", () => {
    expect(articleMetadata.title).toBe("Bali Spa & Wellness Price Index (2026): Local Street Warungs vs. Luxury Resort Treatments");
    expect(articleMetadata.url).toBe("/blog/bali-spa-wellness-price-index-2026");
    expect(spaPriceRows).toEqual([
      expect.objectContaining({ tier: "Tier 1: Local Parlor / Massage Warung", massage: "IDR 100k–180k (~$6–$11 USD)" }),
      expect.objectContaining({ tier: "Tier 2: Mid-Range Boutique Spa", specialty: "IDR 600k–1.2M (~$38–$76 USD)" }),
      expect.objectContaining({ tier: "Tier 3: 5-Star Luxury Resort Spa", massage: "IDR 1.8M–3.5M+ (~$115–$225+ USD)" }),
    ]);
    expect(pageMetadataConfig.baliSpaWellnessPriceIndex.url).toBe(articleMetadata.url);
    expect(sitemapRoutes.map((route) => route.path)).toContain(articleMetadata.url);
  });

  it("uses the supplied secure wellness and resort destinations", () => {
    expect(BALI_WELLNESS_INDEX_AFFILIATE_LINKS).toEqual({
      experiences: "https://gyg.me/As25WS5K",
      resorts: "https://booking.stay22.com/thestayandwander/r-lvU3PLVF",
    });
  });
});
