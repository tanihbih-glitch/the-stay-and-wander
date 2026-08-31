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

  it("keeps tier-level total estimates limited to Bangkok's published three-tier guide data", () => {
    expect(bangkokStayMatcherConfig.supportsTierEstimates).toBe(true);
    expect(bangkokStayMatcherConfig.areas.every((area) => Boolean(area.tierRanges))).toBe(true);
    expect(seoulStayMatcherConfig.supportsTierEstimates).toBe(false);
    expect(tokyoStayMatcherConfig.supportsTierEstimates).toBe(false);
    expect(seoulStayMatcherConfig.tierNotice).toContain("not shown yet");
    expect(tokyoStayMatcherConfig.tierNotice).toContain("not shown yet");
    expect(seoulStayMatcherConfig.areas.every((area) => !area.tierRanges)).toBe(true);
    expect(tokyoStayMatcherConfig.areas.every((area) => !area.tierRanges)).toBe(true);
  });

  it("uses only the explicitly published seasonal uplift guidance for Seoul and Tokyo", () => {
    expect(seoulStayMatcherConfig.seasonal("2026-04-15").multiplier).toEqual([1.25, 1.4]);
    expect(seoulStayMatcherConfig.seasonal("2026-07-15").multiplier).toEqual([1, 1]);
    expect(tokyoStayMatcherConfig.seasonal("2026-03-15").multiplier).toEqual([1.3, 1.5]);
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
    expect(source).toContain("rel=\"sponsored nofollow\"");
    expect(source).toContain("target=\"_blank\"");
    expect(source).toContain("Localized");
  });
});
