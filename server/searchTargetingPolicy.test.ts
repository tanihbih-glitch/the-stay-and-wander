import { describe, expect, it } from "vitest";
import { EXCLUDED_QUERY_TARGETING_NOTE, excludeFromDestinationKeywordTargeting } from "../shared/searchTargetingPolicy";

describe("search targeting policy", () => {
  it("excludes long AI-assistant-style sustainability, loyalty, and accessibility prompts", () => {
    expect(excludeFromDestinationKeywordTargeting("How does Hilton sustainability policy affect long stay hotel choices in Dubai for a corporate traveler?")).toBe(true);
    expect(excludeFromDestinationKeywordTargeting("What loyalty program points work best for a long hotel stay in Abu Dhabi with status benefits?")).toBe(true);
    expect(excludeFromDestinationKeywordTargeting("ما هي سياسات الاستدامة في فنادق هيلتون للإقامات الطويلة في دبي؟")).toBe(true);
    expect(excludeFromDestinationKeywordTargeting("東京のホテルのアクセシビリティとロイヤルティプログラムについて詳しく教えてください")).toBe(true);
  });

  it("retains concise destination-planning queries as potential editorial demand", () => {
    expect(excludeFromDestinationKeywordTargeting("Bangkok hotel prices 2026")).toBe(false);
    expect(EXCLUDED_QUERY_TARGETING_NOTE).toContain("AI-assistant-style");
  });
});
