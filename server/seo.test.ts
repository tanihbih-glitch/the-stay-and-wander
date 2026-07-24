import { describe, expect, it } from "vitest";
import { pageMetadataConfig } from "../shared/seo";

describe("homepage SEO title", () => {
  it("uses the approved document title within the required 30–60-character range", () => {
    const title = pageMetadataConfig.home.title;

    expect(title).toBe("The Stay & Wander | Curated Stays & Travel Itineraries");
    expect(title.length).toBeGreaterThanOrEqual(30);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title.length).toBe(54);
  });
});
