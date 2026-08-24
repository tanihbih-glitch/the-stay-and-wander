import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { getLegacyRedirectTarget } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";

const articleSource = fs.readFileSync(
  path.resolve(process.cwd(), "client/src/pages/BlogBaliHotelPriceIndex.tsx"),
  "utf8"
);

describe("Bali Hotel Price Index", () => {
  it("preserves the supplied five-region benchmark values and pricing-factor figures", () => {
    expect(articleSource).toContain("Canggu & Seminyak");
    expect(articleSource).toContain("$12–$25");
    expect(articleSource).toContain("$400–$750");
    expect(articleSource).toContain("Ubud & Central");
    expect(articleSource).toContain("$8–$18");
    expect(articleSource).toContain("Bukit (Uluwatu)");
    expect(articleSource).toContain("$500–$1,200+");
    expect(articleSource).toContain("Sanur & Nusa Dua");
    expect(articleSource).toContain("Amed & Lovina");
    expect(articleSource).toContain("additional 21% surcharge");
    expect(articleSource).toContain("35%–60%");
  });

  it("uses the approved sponsored Stay22 CTA and renders all five regional map markers", () => {
    expect(BALI_HOTEL_PRICE_INDEX_AFFILIATE_LINKS.hotels).toBe("https://booking.stay22.com/thestayandwander/bEUkQtNQBH");
    expect(articleSource).toContain('rel="sponsored nofollow"');
    expect(articleSource).toContain("Compare Bali Accommodation Rates on Stay22");
    expect(articleSource).toContain("regionPins.forEach");
    expect(articleSource).toContain("Canggu & Seminyak");
    expect(articleSource).toContain("Amed & Lovina");
  });

  it("registers only the new canonical price-index route while retaining the old URL's permanent redirect", () => {
    expect(sitemapRoutes.map((route) => route.path)).toContain("/blog/bali-hotel-price-index-2026");
    expect(sitemapRoutes.map((route) => route.path)).not.toContain("/blog/bali-hotel-prices-2026");
    expect(getLegacyRedirectTarget("/blog/bali-hotel-prices-2026")).toBe("/blog/where-to-stay-in-bali-2026");
  });
});
