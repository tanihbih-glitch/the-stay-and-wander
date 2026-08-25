import { describe, expect, it } from "vitest";
import { articleMetadata, baliStayDecisions, priceSnapshot, searchMetadata } from "../client/src/pages/BlogBaliHotelPrices";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import {
  BALI_BASE_MATCHER_STAY22_URL,
  BALI_MATCHER_SHORTLIST_KEY,
  BALI_MATCHER_SHORTLIST_LIMIT,
  getBaliBaseRecommendation,
  matcherQuestions,
  sanitizeBaliBaseShortlist,
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
});
