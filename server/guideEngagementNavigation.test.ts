import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { DESTINATION_GUIDE_PATHS, isDestinationGuidePath, isLongFormNonPriceDestinationGuidePath } from "../client/src/lib/destinationGuides";

const feedbackSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/GuideFeedbackAndBackToTop.tsx"), "utf8");
const contentsSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/GuideTableOfContents.tsx"), "utf8");
const headerSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/Header.tsx"), "utf8");
const footerSource = fs.readFileSync(path.resolve(process.cwd(), "client/src/components/Footer.tsx"), "utf8");

describe("destination-guide engagement and navigation", () => {
  it("covers the complete public destination-guide set while retaining price-index TOC ownership", () => {
    expect(DESTINATION_GUIDE_PATHS).toHaveLength(21);
    expect(isDestinationGuidePath("/blog/where-to-stay-in-bali-2026")).toBe(true);
    expect(isDestinationGuidePath("/blog")).toBe(false);
    expect(isLongFormNonPriceDestinationGuidePath("/blog/where-to-stay-lisbon-2026")).toBe(true);
    expect(isLongFormNonPriceDestinationGuidePath("/blog/bali-hotel-price-index-2026")).toBe(false);
  });

  it("keeps thumbs feedback browser-local, per-guide, accessible, and free from identity collection", () => {
    expect(feedbackSource).toContain("Was this guide helpful?");
    expect(feedbackSource).toContain("tsw-guide-feedback:");
    expect(feedbackSource).toContain("window.localStorage");
    expect(feedbackSource).toContain('aria-label="Guide helpfulness feedback"');
    expect(feedbackSource).toContain("aria-pressed");
    expect(feedbackSource).not.toMatch(/fetch\(|trpc\.|axios|email|userId/i);
  });

  it("uses reduced-motion-aware smooth scrolling for a guide-only Back to Top control", () => {
    expect(feedbackSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(feedbackSource).toContain('behavior: reducedMotion ? "auto" : "smooth"');
    expect(feedbackSource).toContain('aria-label="Back to top"');
    expect(feedbackSource).toContain("window.scrollY > 420");
  });

  it("derives non-price guide contents from actual headings and renders sticky desktop navigation", () => {
    expect(contentsSource).toContain('document.querySelectorAll("#root h2")');
    expect(contentsSource).toContain('heading.id !== "guide-feedback-heading"');
    expect(contentsSource).toContain("heading.id = id");
    expect(contentsSource).toContain('aria-label="Guide table of contents"');
    expect(contentsSource).toContain("<details");
    expect(contentsSource).toContain("lg:hidden");
    expect(contentsSource).toContain("lg:block");
    expect(contentsSource).toContain("overflow-x-auto");
    expect(contentsSource).toContain('href={`#${item.id}`}');
  });

  it("mounts contents and feedback controls through shared chrome so every guide receives them", () => {
    expect(headerSource).toContain('<GuideTableOfContents />');
    expect(footerSource).toContain('<GuideFeedbackAndBackToTop />');
  });
});
