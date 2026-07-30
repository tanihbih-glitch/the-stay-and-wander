import { describe, expect, it } from "vitest";
import { BALI_EXPERIENCES_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { pageMetadataConfig } from "@shared/seo";
import { articleMetadata, experienceCategories } from "./BlogBaliExperiences";

describe("Bali experiences guide", () => {
  it("contains the supplied 50-experience structure", () => {
    const allExperiences = experienceCategories.flatMap((category) => category.experiences);

    expect(allExperiences).toHaveLength(50);
    expect(allExperiences.map((experience) => experience.number)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    expect(experienceCategories.map((category) => category.title)).toEqual([
      "Culture and Temples",
      "Nature and Rice Terraces",
      "Beaches and Water",
      "Food and Markets",
      "Wellness and Relaxation",
      "Adventure and Unique Experiences",
      "Day Trips and Island Escapes",
    ]);
  });

  it("uses the supplied secure affiliate destinations", () => {
    expect(BALI_EXPERIENCES_AFFILIATE_LINKS).toEqual({
      tours: "https://gyg.me/As25WS5K",
      hotels: "https://booking.stay22.com/thestayandwander/r-lvU3PLVF",
      flights: "https://aviasales.tpo.lu/f9QeB1mu",
    });
  });

  it("exposes canonical crawler metadata for the published route", () => {
    expect(articleMetadata.url).toBe("/blog/things-to-do-in-bali-2026");
    expect(pageMetadataConfig.baliExperiencesGuide.url).toBe(articleMetadata.url);
    expect(pageMetadataConfig.baliExperiencesGuide.title).toContain("Things to Do in Bali");
  });
});
