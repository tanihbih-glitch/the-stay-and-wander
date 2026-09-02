import { describe, expect, it } from "vitest";
import { getCityMatcherRecommendation } from "../client/src/components/CityStayMatcher";
import { bangkokStayMatcherConfig, seoulStayMatcherConfig, tokyoStayMatcherConfig } from "../client/src/lib/cityStayMatcherConfigs";
import { CITY_STAY_MATCHER_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("shared city stay matcher", () => {
  it("returns deterministic, guide-led matches for Bangkok, Seoul, and Tokyo", () => {
    expect(getCityMatcherRecommendation(bangkokStayMatcherConfig, { vibe: "transit", budget: "mid", duration: "medium" })?.primary.name).toBe("Sukhumvit");
    expect(getCityMatcherRecommendation(seoulStayMatcherConfig, { vibe: "culture", budget: "value", duration: "medium" })?.primary.name).toBe("Insadong");
    expect(getCityMatcherRecommendation(tokyoStayMatcherConfig, { vibe: "traditional", budget: "value", duration: "medium" })?.primary.name).toBe("Asakusa");
    expect(getCityMatcherRecommendation(tokyoStayMatcherConfig, { vibe: "", budget: "value", duration: "medium" })).toBeNull();
  });

  it("uses centralized approved availability destinations with city-specific paths", () => {
    expect(bangkokStayMatcherConfig.availabilityUrl).toBe(CITY_STAY_MATCHER_AFFILIATE_LINKS.bangkok);
    expect(seoulStayMatcherConfig.availabilityUrl).toBe(CITY_STAY_MATCHER_AFFILIATE_LINKS.seoul);
    expect(tokyoStayMatcherConfig.availabilityUrl).toBe(CITY_STAY_MATCHER_AFFILIATE_LINKS.tokyo);
    expect(CITY_STAY_MATCHER_AFFILIATE_LINKS).toEqual(expect.objectContaining({ bangkok: expect.stringContaining("stay22"), seoul: expect.stringContaining("stay22"), tokyo: expect.stringContaining("stay22") }));
  });

  it("uses transparent dated tier benchmarks with neighborhood eligibility for Seoul and Tokyo estimates", () => {
    expect(bangkokStayMatcherConfig.supportsTierEstimates).toBe(true);
    expect(bangkokStayMatcherConfig.areas.every((area) => Boolean(area.tierRanges))).toBe(true);
    expect(seoulStayMatcherConfig.supportsTierEstimates).toBe(true);
    expect(tokyoStayMatcherConfig.supportsTierEstimates).toBe(true);
    expect(seoulStayMatcherConfig.areas.find((area) => area.key === "hongdae")?.verifiedRoomTypes).toEqual(["hostel", "hotel"]);
    expect(seoulStayMatcherConfig.areas.find((area) => area.key === "gangnam")?.verifiedRoomTypes).toEqual(["hotel", "villa"]);
    expect(seoulStayMatcherConfig.areas.find((area) => area.key === "itaewon")?.tierRanges).toBeUndefined();
    expect(tokyoStayMatcherConfig.areas.find((area) => area.key === "asakusa")?.verifiedRoomTypes).toEqual(["hostel", "hotel"]);
    expect(tokyoStayMatcherConfig.areas.find((area) => area.key === "ginza")?.verifiedRoomTypes).toEqual(["villa"]);
    expect(tokyoStayMatcherConfig.areas.find((area) => area.key === "ikebukuro")?.verifiedRoomTypes).toEqual(["hotel"]);
    expect(seoulStayMatcherConfig.benchmark?.asOf).toBe("2026-08-13");
    expect(tokyoStayMatcherConfig.benchmark?.asOf).toBe("2026-08-13");
    expect(seoulStayMatcherConfig.benchmark?.sourceUrl).toContain("discover.shopback.com");
    expect(tokyoStayMatcherConfig.benchmark?.sourceUrl).toContain("discover.shopback.com");
    expect(seoulStayMatcherConfig.benchmark?.scope).toContain("named neighborhood groups");
    expect(tokyoStayMatcherConfig.benchmark?.scope).toContain("named neighborhood groups");
    expect(seoulStayMatcherConfig.benchmark?.label).toBe("City-Tier Benchmarks (Eligibility Restricted by District)");
    expect(tokyoStayMatcherConfig.benchmark?.label).toBe("City-Tier Benchmarks (Eligibility Restricted by District)");
    expect(seoulStayMatcherConfig.benchmark?.updateNotice).toBe("District-level pricing surveys will update automatically as localized rate benchmarks are finalized.");
    expect(tokyoStayMatcherConfig.benchmark?.updateNotice).toBe("District-level pricing surveys will update automatically as localized rate benchmarks are finalized.");
  });

  it("uses only the explicitly published seasonal uplift guidance for Seoul and Tokyo", () => {
    expect(seoulStayMatcherConfig.seasonal("2026-04-15").multiplier).toEqual([1.3, 1.5]);
    expect(seoulStayMatcherConfig.seasonal("2026-07-15").multiplier).toEqual([1, 1]);
    expect(tokyoStayMatcherConfig.seasonal("2026-03-15").multiplier).toEqual([1.4, 1.8]);
    expect(tokyoStayMatcherConfig.seasonal("2026-07-15").multiplier).toEqual([1, 1]);
  });

  it("keeps the shared interaction suite browser-local and requires compliant external availability links", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/components/CityStayMatcher.tsx"), "utf8");
    expect(source).toContain("window.localStorage");
    expect(source).toContain("Saved area shortlist");
    expect(source).toContain("Save to Favorites");
    expect(source).toContain("Named comparison lists");
    expect(source).toContain("Download text card");
    expect(source).toContain("Download PDF");
    expect(source).toContain("Print comparison");
    expect(source).toContain("Share on X");
    expect(source).toContain("Saved-area map");
    expect(source).toContain("Personal planning note");
    expect(source).toContain("Personal note for");
    expect(source).toContain("Share link");
    expect(source).toContain("Clear all favorites");
    expect(source).toContain("Clear saved favorites?");
    expect(source).toContain("Clear favorites");
    expect(source).toContain("favorites_cleared");
    expect(source).toContain("Note templates");
    expect(source).toContain("Family vacation");
    expect(source).toContain("Solo trip");
    expect(source).toContain("Custom template name");
    expect(source).toContain("Custom template text");
    expect(source).toContain("Template category");
    expect(source).toContain("Template category filter");
    expect(source).toContain("Trip type");
    expect(source).toContain("Destination");
    expect(source).toContain("visibleBuiltInTemplates");
    expect(source).toContain("No built-in templates in this category.");
    expect(source).toContain("Save template");
    expect(source).toContain("note-templates");
    expect(source).toContain("TEMPLATE_LIMIT");
    expect(source).toContain("Copy share link for");
    expect(source).toContain("Link copied");
    expect(source).toContain("comparison_list_link_copied");
    expect(source).toContain("Show QR code for");
    expect(source).toContain("Scan comparison link");
    expect(source).toContain("Download QR image");
    expect(source).toContain("comparison_list_qr_downloaded");
    expect(source).toContain('await import("qrcode")');
    expect(source).toContain("comparison_list_qr_opened");
    expect(source).toContain("Delete comparison list?");
    expect(source).toContain("Delete list");
    expect(source).toContain("comparison_list_deleted");
    expect(source).toContain("Archived comparison lists");
    expect(source).toContain("comparison_list_archived");
    expect(source).toContain("comparison_list_restored");
    expect(source).toContain("Restore");
    expect(source).toContain("Preview note template");
    expect(source).toContain("Preview template");
    expect(source).toContain("Apply template");
    expect(source).toContain("Template color");
    expect(source).toContain("TEMPLATE_COLORS");
    expect(source).toContain("template.color");
    expect(source).toContain("encodeSharedList");
    expect(source).toContain("areaNotes");
    expect(source).toContain("Private notes are not shared");
    expect(source).toContain("data-area-map");
    expect(source).toContain("schematic city orientation map");
    expect(source).toContain("config.benchmark.label");
    expect(source).toContain("rel=\"sponsored nofollow\"");
    expect(source).toContain("target=\"_blank\"");
    expect(source).toContain("Localized");
  });
});
