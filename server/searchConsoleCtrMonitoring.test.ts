import { describe, expect, it } from "vitest";
import { MONITORED_WHERE_TO_STAY_PATHS, previousCompleteCalendarMonth } from "./searchConsoleCtrMonitoring";

describe("Search Console CTR monitoring", () => {
  it("tracks exactly the four published where-to-stay guides", () => {
    expect(MONITORED_WHERE_TO_STAY_PATHS).toEqual([
      "/blog/bali-hotel-prices-2026",
      "/blog/bangkok-hotel-prices-2026",
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
});
