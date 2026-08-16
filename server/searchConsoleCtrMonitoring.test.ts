import { describe, expect, it } from "vitest";
import { isFirstBusinessDayOfMonth, MONITORED_WHERE_TO_STAY_PATHS, previousCompleteCalendarMonth } from "./searchConsoleCtrMonitoring";

describe("Search Console CTR monitoring", () => {
  it("tracks exactly the four published where-to-stay guides", () => {
    expect(MONITORED_WHERE_TO_STAY_PATHS).toEqual([
      "/blog/where-to-stay-in-bali-2026",
      "/blog/where-to-stay-in-bangkok-2026",
      "/blog/where-to-stay-in-tokyo-2026",
      "/blog/where-to-stay-in-seoul-2026",
    ]);
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
