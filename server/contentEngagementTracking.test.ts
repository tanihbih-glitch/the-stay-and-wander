import { describe, expect, it } from "vitest";
import { aggregateRelatedGuideClicks } from "./contentEngagementTracking";

describe("anonymous related-guide engagement", () => {
  const events = [
    { sourcePath: "/blog/bali-hotel-price-index-2026", destinationPath: "/blog/where-to-stay-in-bali-2026", createdAt: new Date("2026-09-10T10:00:00.000Z") },
    { sourcePath: "/blog/bali-hotel-price-index-2026", destinationPath: "/blog/where-to-stay-in-bali-2026", createdAt: new Date("2026-09-11T10:00:00.000Z") },
    { sourcePath: "/blog/bangkok-hotel-price-index-2026", destinationPath: "/blog/bangkok-airport-hotels-2026", createdAt: new Date("2026-09-12T10:00:00.000Z") },
  ];

  it("aggregates first-party source and destination selections without visitor fields", () => {
    const stats = aggregateRelatedGuideClicks(events);

    expect(stats).toEqual({
      totalClicks: 3,
      bySource: [
        { sourcePath: "/blog/bali-hotel-price-index-2026", count: 2 },
        { sourcePath: "/blog/bangkok-hotel-price-index-2026", count: 1 },
      ],
      byDestination: [
        { destinationPath: "/blog/where-to-stay-in-bali-2026", count: 2 },
        { destinationPath: "/blog/bangkok-airport-hotels-2026", count: 1 },
      ],
    });
  });

  it("respects an optional reporting window", () => {
    const stats = aggregateRelatedGuideClicks(events, new Date("2026-09-11T00:00:00.000Z"), new Date("2026-09-11T23:59:59.999Z"));

    expect(stats.totalClicks).toBe(1);
    expect(stats.bySource).toEqual([{ sourcePath: "/blog/bali-hotel-price-index-2026", count: 1 }]);
  });
});
