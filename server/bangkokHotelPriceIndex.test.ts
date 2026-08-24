import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { getLegacyRedirectTarget } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";
import { calculateBangkokHotelSurcharge } from "../client/src/components/BangkokHotelTaxCalculator";
import { buildBangkokStay22SearchUrl } from "../client/src/components/BangkokLiveHotelSearch";

const articleSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogBangkokHotelPriceIndex.tsx"), "utf8");
const mapSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokDistrictHotelMap.tsx"), "utf8");
const taxCalculatorSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokHotelTaxCalculator.tsx"), "utf8");
const liveSearchSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokLiveHotelSearch.tsx"), "utf8");
const transferSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokAirportTransferBudget.tsx"), "utf8");

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

  it("adds district nightly-rate tooltips, a transparent 17.7 percent surcharge calculation, and focused planning links", () => {
    expect(mapSource).toContain("Sukhumvit (Asok / Nana)");
    expect(mapSource).toContain('midRange: "$55–$110"');
    expect(mapSource).toContain("Silom & Sathorn");
    expect(mapSource).toContain("Siam & Pratunam");
    expect(mapSource).toContain("Bangkok Riverside");
    expect(mapSource).toContain("Khao San / Old City");
    expect(mapSource).toContain("AdvancedMarkerElement");
    expect(mapSource).toContain("InfoWindow");
    expect(calculateBangkokHotelSurcharge(90, 3, 17.7)).toEqual({ subtotal: 270, surcharge: 47.79, total: 317.79 });
    expect(articleSource).toContain("<BangkokHotelTaxCalculator />");
    expect(taxCalculatorSource).toContain("Bangkok hotel tax calculator");
    expect(articleSource).toContain("Sukhumvit transit and dining plan");
    expect(articleSource).toContain("Riverside temples and ferries plan");
    expect(articleSource).toContain("href={`/blog/where-to-stay-in-bangkok-2026${link.hash}`}");
    expect(articleSource).toContain('hash: "#sukhumvit"');
  });

  it("provides a compliant live hotel date handoff, a shareable calculated stay cost, and transfer-budget guidance", () => {
    const liveSearchUrl = buildBangkokStay22SearchUrl("2026-10-10", "2026-10-13");
    expect(liveSearchUrl).toContain("checkin=2026-10-10");
    expect(liveSearchUrl).toContain("checkout=2026-10-13");
    expect(liveSearchUrl).toContain("group_adults=2");
    expect(liveSearchSource).toContain('target="_blank"');
    expect(liveSearchSource).toContain('rel="sponsored nofollow"');
    expect(liveSearchSource).toContain("Check Live Bangkok Rates");
    expect(taxCalculatorSource).toContain("Share My Bangkok Stay Cost");
    expect(taxCalculatorSource).toContain("navigator.share");
    expect(taxCalculatorSource).toContain("navigator.clipboard");
    expect(transferSource).toContain("15–45 THB one-way");
    expect(transferSource).toContain("50 THB airport surcharge");
    expect(transferSource).toContain("official Suvarnabhumi Airport public taxi guidance");
  });
});
