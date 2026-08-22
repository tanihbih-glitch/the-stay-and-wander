import { describe, expect, it } from "vitest";
import { articleMetadata, spaPriceRows } from "../client/src/pages/BlogBaliSpaWellnessPriceIndex";
import { BALI_WELLNESS_INDEX_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { DEFAULT_AUD_PER_USD, DEFAULT_EUR_PER_USD, DEFAULT_GBP_PER_USD, DEFAULT_IDR_PER_USD, buildSpaBudgetSummary, convertIdrToUsd, convertUsdToCurrency } from "../client/src/components/IdrUsdConverter";
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

  it("converts IDR with an editable planning rate rather than presenting a live FX quote", () => {
    expect(DEFAULT_IDR_PER_USD).toBe(16000);
    expect(convertIdrToUsd(500000, DEFAULT_IDR_PER_USD)).toBe(31.25);
    expect(convertIdrToUsd(2500000, 15000)).toBeCloseTo(166.6667, 3);
    expect(convertIdrToUsd(100000, 0)).toBeNull();
    expect(convertIdrToUsd(-1, DEFAULT_IDR_PER_USD)).toBeNull();
  });

  it("calculates EUR, GBP, and AUD estimates and creates a copy-ready budget summary", () => {
    const usd = convertIdrToUsd(500000, DEFAULT_IDR_PER_USD);
    expect(convertUsdToCurrency(usd, DEFAULT_EUR_PER_USD)).toBeCloseTo(28.75, 2);
    expect(convertUsdToCurrency(usd, DEFAULT_GBP_PER_USD)).toBeCloseTo(24.375, 3);
    expect(convertUsdToCurrency(usd, DEFAULT_AUD_PER_USD)).toBeCloseTo(47.5, 2);
    const summary = buildSpaBudgetSummary({ amountIdr: 500000, idrPerUsd: DEFAULT_IDR_PER_USD, eurPerUsd: DEFAULT_EUR_PER_USD, gbpPerUsd: DEFAULT_GBP_PER_USD, audPerUsd: DEFAULT_AUD_PER_USD });
    expect(summary).toContain("IDR 500,000");
    expect(summary).toContain("EUR");
    expect(summary).toContain("GBP");
    expect(summary).toContain("AUD");
  });
});
