import { describe, expect, it } from "vitest";
import {
  comparePriorityCtrFollowUp,
  compareUaeExtendedStayHubFollowUp,
  isFirstBusinessDayOfMonth,
  isUaeExtendedStayReviewEligible,
  MONITORED_SEARCH_CONSOLE_PATHS,
  MONITORED_UAE_EXTENDED_STAY_HUB_PATHS,
  MONITORED_WHERE_TO_STAY_PATHS,
  PRIORITY_CTR_FOLLOW_UP_BASELINE,
  previousCompleteCalendarMonth,
  UAE_EXTENDED_STAY_MONITORING_START_DATE,
} from "./searchConsoleCtrMonitoring";

describe("Search Console CTR monitoring", () => {
  it("tracks exactly the four published where-to-stay guides", () => {
    expect(MONITORED_WHERE_TO_STAY_PATHS).toEqual([
      "/blog/where-to-stay-in-bali-2026",
      "/blog/where-to-stay-in-bangkok-2026",
      "/blog/where-to-stay-in-tokyo-2026",
      "/blog/where-to-stay-in-seoul-2026",
    ]);
  });

  it("retains the established CTR snapshot paths without adding the UAE hub", () => {
    expect(MONITORED_SEARCH_CONSOLE_PATHS).toEqual([
      "/blog/where-to-stay-in-bali-2026",
      "/blog/where-to-stay-in-bangkok-2026",
      "/blog/where-to-stay-in-tokyo-2026",
      "/blog/where-to-stay-in-seoul-2026",
      "/blog/bangkok-hotel-budget-breakdown-2026",
      "/blog/uae-extended-stay-sustainability-2026",
    ]);
    expect(MONITORED_SEARCH_CONSOLE_PATHS).not.toContain("/blog/uae-extended-stay-hotels-2026");
    expect(PRIORITY_CTR_FOLLOW_UP_BASELINE.periodEnd).toBe("2026-09-06");
    expect(PRIORITY_CTR_FOLLOW_UP_BASELINE.pages["/blog/where-to-stay-in-bali-2026"].sourcePath).toBe("/blog/bali-hotel-prices-2026");
  });

  it("computes CTR and position deltas against the supplied priority baseline", () => {
    const result = comparePriorityCtrFollowUp({
      "/blog/where-to-stay-in-bali-2026": { clicks: 3, impressions: 1000, ctr: 0.003, position: 7.5 },
    });

    expect(result[0]).toMatchObject({ path: "/blog/where-to-stay-in-bali-2026", ctrChange: 0.003, positionChange: -0.56 });
  });

  it("tracks the UAE hub independently by position trend and a manual citation review rather than CTR", () => {
    const result = compareUaeExtendedStayHubFollowUp({
      "/blog/uae-extended-stay-hotels-2026": { clicks: 0, impressions: 120, ctr: 0, position: 18.25 },
    });

    expect(MONITORED_UAE_EXTENDED_STAY_HUB_PATHS).toEqual(["/blog/uae-extended-stay-hotels-2026"]);
    expect(result.positionChangeVsLegacy).toBe(-7.63);
    expect(result.citationReview).toMatchObject({ mode: "manual", cadence: "monthly" });
  });

  it("starts UAE review only after the first complete published month", () => {
    expect(UAE_EXTENDED_STAY_MONITORING_START_DATE).toBe("2026-11-02");
    expect(isUaeExtendedStayReviewEligible(new Date("2026-10-01T09:00:00.000Z"))).toBe(false);
    expect(isUaeExtendedStayReviewEligible(new Date("2026-11-02T09:00:00.000Z"))).toBe(true);
    expect(isUaeExtendedStayReviewEligible(new Date("2026-11-03T09:00:00.000Z"))).toBe(false);
  });

  it("queries the preceding complete calendar month", () => {
    expect(previousCompleteCalendarMonth(new Date("2026-08-13T08:00:00.000Z"))).toEqual({
      startDate: "2026-07-01",
      endDate: "2026-07-31",
    });
  });

  it("runs only on the first weekday of each month", () => {
    expect(isFirstBusinessDayOfMonth(new Date("2026-08-03T09:00:00.000Z"))).toBe(true);
    expect(isFirstBusinessDayOfMonth(new Date("2026-08-01T09:00:00.000Z"))).toBe(false);
    expect(isFirstBusinessDayOfMonth(new Date("2026-09-01T09:00:00.000Z"))).toBe(true);
  });
});
