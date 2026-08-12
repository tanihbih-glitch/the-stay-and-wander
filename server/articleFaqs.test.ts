import { describe, expect, it } from "vitest";
import { articleFaqsByPath, getArticleFaqs } from "../shared/articleFaqs";

describe("published article FAQ data", () => {
  const expectedPaths = [
    "/blog/bali-hotel-prices-2026",
    "/blog/bangkok-hotel-prices-2026",
    "/blog/where-to-stay-in-tokyo-2026",
    "/blog/where-to-stay-in-seoul-2026",
    "/blog/best-hotels-bali-2026",
    "/blog/best-4-star-hotels-bali-2026",
    "/blog/best-flight-deals-asia-2026",
    "/blog/brazil-travel-guide-2026",
  ];

  it("provides four to six non-empty FAQ pairs for each requested article", () => {
    expect(Object.keys(articleFaqsByPath)).toEqual(expectedPaths);

    for (const path of expectedPaths) {
      const faqs = getArticleFaqs(path);
      expect(faqs.length).toBeGreaterThanOrEqual(4);
      expect(faqs.length).toBeLessThanOrEqual(6);
      expect(faqs.every((faq) => faq.question.length > 10 && faq.answer.length > 40)).toBe(true);
      expect(getArticleFaqs(`${path}/`)).toEqual(faqs);
    }
  });
});
