import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { getLegacyRedirectTarget } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";
import { calculateBangkokHotelSurcharge } from "../client/src/components/BangkokHotelTaxCalculator";
import { buildBangkokStay22SearchUrl } from "../client/src/components/BangkokLiveHotelSearch";
import { getRoundtripTransferAllowance } from "../client/src/components/BangkokTransferBenchmarkData";

const articleSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/pages/BlogBangkokHotelPriceIndex.tsx"), "utf8");
const mapSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokDistrictHotelMap.tsx"), "utf8");
const taxCalculatorSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokHotelTaxCalculator.tsx"), "utf8");
const liveSearchSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokLiveHotelSearch.tsx"), "utf8");
const transferSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokAirportTransferBudget.tsx"), "utf8");
const transferDataSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokTransferBenchmarkData.ts"), "utf8");
const arrivalChecklistSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/BangkokArrivalChecklist.tsx"), "utf8");

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
    expect(calculateBangkokHotelSurcharge(90, 3, 17.7)).toEqual({ subtotal: 270, surcharge: 47.79, transfer: 0, total: 317.79, perPerson: 317.79 });
    expect(articleSource).toContain("<BangkokHotelTaxCalculator />");
    expect(taxCalculatorSource).toContain("Bangkok hotel tax calculator");
    expect(articleSource).toContain("Sukhumvit transit and dining plan");
    expect(articleSource).toContain("Riverside temples and ferries plan");
    expect(articleSource).toContain("href={`/blog/where-to-stay-in-bangkok-2026${link.hash}`}");
    expect(articleSource).toContain('hash: "#sukhumvit"');
  });

  it("provides a compliant live hotel date handoff, the supplied BKK/DMK transfer matrix, and a group-aware share export", () => {
    const liveSearchUrl = buildBangkokStay22SearchUrl("2026-10-10", "2026-10-13");
    expect(liveSearchUrl).toContain("checkin=2026-10-10");
    expect(liveSearchUrl).toContain("checkout=2026-10-13");
    expect(liveSearchUrl).toContain("group_adults=2");
    expect(liveSearchSource).toContain('target="_blank"');
    expect(liveSearchSource).toContain('rel="sponsored nofollow"');
    expect(liveSearchSource).toContain("Check Live Bangkok Rates");
    expect(getRoundtripTransferAllowance("BKK", "taxi")).toBe(22.5);
    expect(calculateBangkokHotelSurcharge(90, 3, 17.7, 22.5, 2)).toEqual({ subtotal: 270, surcharge: 47.79, transfer: 22.5, total: 340.29, perPerson: 170.145 });
    expect(taxCalculatorSource).toContain("Export / Share Cost Breakdown");
    expect(taxCalculatorSource).toContain("Selected District");
    expect(taxCalculatorSource).toContain("Airport Transfer Allowance (Roundtrip)");
    expect(taxCalculatorSource).toContain("ESTIMATED TOTAL STAY COST");
    expect(taxCalculatorSource).toContain("navigator.share");
    expect(taxCalculatorSource).toContain("navigator.clipboard");
    expect(transferSource).toContain("Bangkok Airport-to-Hotel Transfer Cost Benchmarks (2026)");
    expect(transferDataSource).toContain("₩1,800 – ₩3,200 (~$1.35 – $2.40 USD / ฿45)");
    expect(transferDataSource).toContain("₩22,000 – ₩35,000 (~$16.50 – $26.00 USD / ฿550–฿880)");
    expect(transferSource).toContain("Pre-book Private BKK/DMK Airport Transfer on Trip.com");
    expect(transferSource).toContain('rel="sponsored nofollow"');
  });

  it("supports party-size vehicle choices, planning-currency transfer views, and a downloadable arrival checklist", () => {
    expect(taxCalculatorSource).toContain("Group transfer vehicle");
    expect(taxCalculatorSource).toContain('label: "Sedan"');
    expect(taxCalculatorSource).toContain('label: "Minivan"');
    expect(taxCalculatorSource).toContain('label: "Minibus / Bus"');
    expect(taxCalculatorSource).toContain("Up to 2 medium suitcases or 3 cabin bags");
    expect(taxCalculatorSource).toContain("About 4 medium suitcases plus 6 cabin bags");
    expect(taxCalculatorSource).toContain("About 8 medium suitcases plus 12 cabin bags");
    expect(taxCalculatorSource).toContain("Luggage guide:");
    expect(taxCalculatorSource).toContain("Checked suitcases");
    expect(taxCalculatorSource).toContain("Cabin bags");
    expect(taxCalculatorSource).toContain("Auto — recommended");
    expect(taxCalculatorSource).toContain("Recommended:");
    expect(taxCalculatorSource).toContain("View transfer allowance in:");
    expect(taxCalculatorSource).toContain("EUR: 0.92");
    expect(taxCalculatorSource).toContain("GBP: 0.79");
    expect(arrivalChecklistSource).toContain("Download Arrival-Day Checklist");
    expect(arrivalChecklistSource).toContain("URL.createObjectURL");
    expect(arrivalChecklistSource).toContain("bangkok-arrival-day-checklist.txt");
    expect(arrivalChecklistSource).toContain("Email Checklist to My Group");
    expect(arrivalChecklistSource).toContain("mailto:?subject=");
    expect(arrivalChecklistSource).toContain("encodeURIComponent(checklistText)");
    expect(arrivalChecklistSource).toContain("Share Checklist Link");
    expect(arrivalChecklistSource).toContain("arrivalChecklist");
    expect(arrivalChecklistSource).toContain("Download Reminder");
    expect(arrivalChecklistSource).toContain("text/calendar;charset=utf-8");
    expect(arrivalChecklistSource).toContain("bangkok-${kind}-reminder.ics");
    expect(arrivalChecklistSource).toContain("Optional trip title");
    expect(arrivalChecklistSource).toContain("tripTitle.trim()");
    expect(arrivalChecklistSource).toContain("calendar.google.com/calendar/render?action=TEMPLATE");
    expect(arrivalChecklistSource).toContain("Open Google Calendar");
    expect(arrivalChecklistSource).toContain("Your trip countdown");
    expect(arrivalChecklistSource).toContain("until hotel check-in.");
    expect(arrivalChecklistSource).toContain("Copy Event Details");
    expect(arrivalChecklistSource).toContain("navigator.clipboard.writeText(message)");
    expect(arrivalChecklistSource).toContain("Open Outlook Calendar");
    expect(arrivalChecklistSource).toContain("outlook.office.com/calendar/0/deeplink/compose");
    expect(arrivalChecklistSource).toContain("Attendee emails (optional)");
    expect(arrivalChecklistSource).toContain("cleanAttendees");
    expect(arrivalChecklistSource).toContain('target="_blank"');
    expect(arrivalChecklistSource).toContain('rel="noopener noreferrer"');
    expect(articleSource).toContain("<BangkokArrivalChecklist />");
  });
});
