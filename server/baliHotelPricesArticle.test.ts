import { describe, expect, it } from "vitest";
import { articleMetadata, baliStayDecisions, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBaliHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import {
  BALI_BASE_MATCHER_STAY22_URL,
  BALI_MATCHER_FAVORITES_KEY,
  BALI_MATCHER_FAVORITES_LIMIT,
  BALI_MATCHER_RESULT_REVEAL_MS,
  BALI_TRAVELER_FIT_LABELS,
  buildBaliAreaSeasonalEstimate,
  buildBaliFavoritesComparisonText,
  calculateBaliAreaTotalStayEstimate,
  BALI_MATCHER_SHORTLIST_KEY,
  BALI_MATCHER_SHORTLIST_LIMIT,
  buildBaliMatcherSocialShareUrl,
  buildBaliMatcherShareSummary,
  baliBaseAreas,
  filterBaliFavoriteAreas,
  getBaliBaseRecommendation,
  getBaliMatcherSeasonalEstimate,
  matcherQuestions,
  sanitizeBaliBaseFavorites,
  sanitizeBaliBaseShortlist,
  sortBaliFavoriteAreas,
  trackBaliMatcherEvent,
} from "../client/src/components/BaliBaseMatcher";
import { DEALS_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Bali hotel prices article", () => {
  it("uses the supplied first-timer guide title, canonical route, and neighborhood-focused search description", () => {
    expect(articleMetadata.title).toBe("Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)");
    expect(articleMetadata.url).toBe("/blog/where-to-stay-in-bali-2026");
    expect(searchMetadata.title).toBe("Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)");
    expect(searchMetadata.description).toBe("Find the best area to stay in Bali for a first trip — Seminyak for beach clubs, Ubud for culture, Uluwatu for surf, or Canggu for cafés.");
    expect(priceSnapshot).toEqual([
      ["Seminyak", "$40–70/night", "$80–150/night", "$200+/night"],
      ["Ubud", "$30–60/night", "$75–130/night", "$180+/night"],
      ["Uluwatu", "$50–90/night", "$100–180/night", "$250+/night"],
      ["Canggu", "$35–65/night", "$70–140/night", "$190+/night"],
    ]);
  });

  it("reuses the established live Trip.com hotel widget", () => {
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe(
      "https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1="
    );
  });

  it("provides a transparent planning method and linked area decision tree", () => {
    expect(baliStayDecisions).toEqual([
      expect.objectContaining({ recommendation: "Seminyak", href: "#seminyak" }),
      expect.objectContaining({ recommendation: "Ubud", href: "#ubud" }),
      expect.objectContaining({ recommendation: "Uluwatu", href: "#uluwatu" }),
      expect.objectContaining({ recommendation: "Canggu", href: "#canggu" }),
    ]);
  });

  it("adds an adapted three-step matcher with deterministic, explainable area guidance", () => {
    expect(matcherQuestions).toHaveLength(3);
    expect(matcherQuestions.map((question) => question.field)).toEqual(["vibe", "budget", "duration"]);
    expect(getBaliBaseRecommendation({ vibe: "culture", budget: "budget", duration: "medium" })?.primary.key).toBe("ubud");
    expect(getBaliBaseRecommendation({ vibe: "social", budget: "luxury", duration: "short" })?.primary.key).toBe("seminyak");
    expect(getBaliBaseRecommendation({ vibe: "scenic", budget: "luxury", duration: "medium" })?.primary.key).toBe("uluwatu");
    expect(getBaliBaseRecommendation({ vibe: "cafe", budget: "budget", duration: "long" })?.primary.key).toBe("canggu");
    expect(getBaliBaseRecommendation({ vibe: "", budget: "budget", duration: "long" })).toBeNull();
  });

  it("keeps the saved-area shortlist browser-safe and capped at three valid area keys", () => {
    expect(BALI_MATCHER_SHORTLIST_KEY).toBe("tsw-bali-base-shortlist");
    expect(BALI_MATCHER_SHORTLIST_LIMIT).toBe(3);
    expect(sanitizeBaliBaseShortlist(["ubud", "not-an-area", "canggu", "seminyak", "uluwatu"])).toEqual(["ubud", "canggu", "seminyak"]);
    expect(sanitizeBaliBaseShortlist("not-an-array")).toEqual([]);
  });

  it("keeps matched-area favorites browser-local, valid, and bounded to Bali area keys", () => {
    expect(BALI_MATCHER_FAVORITES_KEY).toBe("tsw-bali-base-favorites");
    expect(BALI_MATCHER_FAVORITES_LIMIT).toBe(4);
    expect(sanitizeBaliBaseFavorites(["ubud", "not-an-area", "canggu", "seminyak", "uluwatu", "extra"])).toEqual(["ubud", "canggu", "seminyak", "uluwatu"]);
    expect(sanitizeBaliBaseFavorites({ areas: ["ubud"] })).toEqual([]);
  });

  it("uses the approved Bali Stay22 registry destination and stays outside global GTM dataLayer tracking", () => {
    expect(BALI_BASE_MATCHER_STAY22_URL).toBe(DEALS_AFFILIATE_LINKS.hotels.bali);
    expect(BALI_BASE_MATCHER_STAY22_URL).toBe("https://booking.stay22.com/thestayandwander/r-lvU3PLVF");
    expect(() => trackBaliMatcherEvent("bali_matcher_started")).not.toThrow();

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain('rel="sponsored nofollow"');
    expect(componentSource).toContain('target="_blank"');
    expect(componentSource).toContain('"tsw:bali-matcher"');
    expect(componentSource).not.toContain("dataLayer");
    expect(componentSource).not.toContain("matchScore");
    expect(componentSource).not.toContain("The Lawn Beach Villa");
    expect(componentSource).not.toContain("Six Senses Uluwatu");
  });

  it("provides a copy-ready result summary and accessible restart and location controls", () => {
    const recommendation = getBaliBaseRecommendation({ vibe: "culture", budget: "budget", duration: "medium" });
    expect(recommendation).not.toBeNull();
    const shareSummary = buildBaliMatcherShareSummary(recommendation!);
    expect(shareSummary).toContain("Primary area: Ubud");
    expect(shareSummary).toContain("Alternative area: Canggu");
    expect(shareSummary).toContain("#bali-base-matcher");

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain("Start Over");
    expect(componentSource).toContain("Share Results");
    expect(componentSource).toContain("navigator.clipboard?.writeText");
    expect(componentSource).toContain("transition-opacity duration-200");
    expect(componentSource).toContain("motion-safe:animate-in");
    expect(componentSource).toContain("bali_matcher_location_opened");
    expect(componentSource).toContain("Bali · not to scale");
    expect(componentSource).not.toContain("google.com/maps");
  });

  it("adds direct social sharing and a short compass-loading reveal before results", () => {
    const recommendation = getBaliBaseRecommendation({ vibe: "culture", budget: "budget", duration: "medium" });
    expect(recommendation).not.toBeNull();
    expect(BALI_MATCHER_RESULT_REVEAL_MS).toBe(1800);
    expect(buildBaliMatcherSocialShareUrl("whatsapp", recommendation!)).toContain("https://wa.me/?text=");
    expect(buildBaliMatcherSocialShareUrl("whatsapp", recommendation!)).toContain("Ubud");
    expect(buildBaliMatcherSocialShareUrl("x", recommendation!)).toContain("https://twitter.com/intent/tweet?text=");

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain("Finding your Bali rhythm");
    expect(componentSource).toContain("motion-safe:animate-spin");
    expect(componentSource).toContain("Save to Favorites");
    expect(componentSource).toContain("WhatsApp");
    expect(componentSource).toContain("Share on X");
    expect(componentSource).toContain('rel="noopener noreferrer"');
    expect(componentSource).toContain("bali_matcher_social_share_opened");
    expect(componentSource).toContain("bali_matcher_favorite_saved");
  });

  it("provides guide-grounded summaries and sortable side-by-side favorite comparisons without an external AI service", () => {
    expect(baliBaseAreas.ubud.quickSummary).toContain("temple visits");
    expect(baliBaseAreas.uluwatu.localHighlights).toContain("Clifftop sunsets");
    expect(sortBaliFavoriteAreas(["uluwatu", "seminyak", "ubud", "canggu"], "cost")).toEqual(["ubud", "canggu", "seminyak", "uluwatu"]);
    expect(sortBaliFavoriteAreas(["canggu", "ubud"], "saved")).toEqual(["canggu", "ubud"]);

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain("match summary");
    expect(componentSource).toContain("Sort saved favorites");
    expect(componentSource).toContain("Lower directional cost");
    expect(componentSource).toContain("Compare saved areas");
    expect(componentSource).toContain("Estimated seasonal range");
    expect(componentSource).not.toContain("invokeLLM");
  });

  it("filters favorites by traveler fit and applies supplied 2026 seasonal planning references", () => {
    expect(BALI_TRAVELER_FIT_LABELS).toEqual({ solo: "Solo travelers", couples: "Couples", families: "Families" });
    expect(filterBaliFavoriteAreas(["canggu", "ubud", "uluwatu"], "families")).toEqual(["ubud"]);
    expect(filterBaliFavoriteAreas(["ubud", "uluwatu"], "couples")).toEqual(["ubud", "uluwatu"]);
    expect(getBaliMatcherSeasonalEstimate("2026-01-03")).toMatchObject({ multiplier: 1.25, label: "New Year peak reference" });
    expect(getBaliMatcherSeasonalEstimate("2026-08-15")).toMatchObject({ multiplier: 1.5, label: "August peak-season reference" });
    expect(buildBaliAreaSeasonalEstimate(baliBaseAreas.ubud, "2026-02-15").budget).toBe("$24–48/night");
    expect(buildBaliAreaSeasonalEstimate(baliBaseAreas.ubud, "2026-08-15").midRange).toBe("$113–195/night");
  });

  it("creates a downloadable text-card comparison without sending saved favorites to a server", () => {
    const comparisonText = buildBaliFavoritesComparisonText(["ubud", "canggu"], "2026-08-15");
    expect(comparisonText).toContain("Bali base comparison — The Stay & Wander");
    expect(comparisonText).toContain("August peak-season reference (1.50×)");
    expect(comparisonText).toContain("Ubud");
    expect(comparisonText).toContain("Canggu");
    expect(comparisonText).toContain("Planning estimates only");

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain("Best for");
    expect(componentSource).toContain("Trip date");
    expect(componentSource).toContain("Download text card");
    expect(componentSource).toContain("Estimated seasonal range");
    expect(componentSource).toContain("window.URL.createObjectURL");
    expect(componentSource).toContain("bali_matcher_comparison_exported");
  });

  it("calculates transparent traveler-count total-stay ranges and provides a printable comparison card", () => {
    expect(calculateBaliAreaTotalStayEstimate(baliBaseAreas.ubud, "2026-08-15", 3, 5)).toEqual({
      rooms: 2,
      nights: 5,
      budget: "$450–900 total",
      midRange: "$1,125–1,950 total",
      luxuryFrom: "$2,700+ total",
    });

    const comparisonText = buildBaliFavoritesComparisonText(["ubud", "canggu"], "2026-08-15", 3, 5);
    expect(comparisonText).toContain("3 travelers · 5 nights · one mid-range room per two travelers.");
    expect(comparisonText).toContain("Total stay estimate: Budget $450–900 total");

    const componentSource = readFileSync(resolve(process.cwd(), "client/src/components/BaliBaseMatcher.tsx"), "utf8");
    expect(componentSource).toContain("bali-comparison-travelers");
    expect(componentSource).toContain("Total-stay estimate");
    expect(componentSource).toContain("Print comparison");
    expect(componentSource).toContain("bali-favorites-print-card");
    expect(componentSource).toContain("@media print");
    expect(componentSource).toContain("window.print()");
  });
});
