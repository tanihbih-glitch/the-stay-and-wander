import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { getLegacyRedirectTarget } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";

const articleSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogBangkokHotelPriceIndex.tsx"), "utf8");

describe("Bangkok Hotel Price Index", () => {
  it("preserves every supplied district benchmark and pricing factor", () => {
    expect(articleSource).toContain("Sukhumvit (Asok / Nana)");
    expect(articleSource).toContain("$14 – $28");
    expect(articleSource).toContain("Silom & Sathorn");
    expect(articleSource).toContain("$12 – $22");
    expect(articleSource).toContain("Siam & Pratunam");
    expect(articleSource).toContain("$210 – $500");
    expect(articleSource).toContain("Bangkok Riverside");
    expect(articleSource).toContain("$300 – $850+");
    expect(articleSource).toContain("Khao San / Old City");
    expect(articleSource).toContain("15%–20% rate premium");
    expect(articleSource).toContain("17.7% surcharge");
    expect(articleSource).toContain("up to 40%");
  });

  it("uses the approved sponsored Trip.com CTA and keeps the legacy and current Bangkok URLs distinct", () => {
    expect(articleSource).toContain("Search Bangkok Hotel &amp; Excursion Deals on Trip.com");
    expect(articleSource).toContain('rel="sponsored nofollow"');
    expect(articleSource).toContain('target="_blank"');
    const sitemapPaths = sitemapRoutes.map((route) => route.path);
    expect(sitemapPaths).toContain("/blog/bangkok-hotel-price-index-2026");
    expect(sitemapPaths).toContain("/blog/bangkok-hotel-budget-breakdown-2026");
    expect(sitemapPaths).not.toContain("/blog/bangkok-hotel-prices-2026");
    expect(getLegacyRedirectTarget("/blog/bangkok-hotel-prices-2026")).toBe("/blog/where-to-stay-in-bangkok-2026");
  });
});
