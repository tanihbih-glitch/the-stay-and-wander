import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { aboutPageMetadata } from "../client/src/pages/About";
import { privacyPolicyMetadata } from "../client/src/pages/PrivacyPolicy";
import { pageMetadataConfig } from "../shared/seo";

const projectRoot = process.cwd();

function readSource(relativePath: string) {
  return fs.readFileSync(path.resolve(projectRoot, relativePath), "utf8");
}

describe("About and Privacy public pages", () => {
  it("exposes the requested About page identity, canonical URL, and contact address", () => {
    const source = readSource("client/src/pages/About.tsx");

    expect(aboutPageMetadata.url).toBe("/about");
    expect(aboutPageMetadata.title).toContain("About The Stay & Wander");
    expect(source).toContain("The Stay &amp; Wander is a travel resource dedicated to helping travellers");
    expect(source).toContain("thestayandwander@thestayandwander.com");
  });

  it("includes the requested privacy topics and contact address", () => {
    const source = readSource("client/src/pages/PrivacyPolicy.tsx");

    expect(privacyPolicyMetadata.url).toBe("/privacy-policy");
    expect(source).toContain("Cookies and similar technologies");
    expect(source).toContain("Google Analytics");
    expect(source).toContain("Mailchimp newsletter sign-ups");
    expect(source).toContain("Affiliate disclosure and external links");
    expect(source).toContain("thestayandwander@thestayandwander.com");
  });

  it("adds the pages to footer navigation and shared SEO metadata", () => {
    const footer = readSource("client/src/components/Footer.tsx");

    expect(footer).toContain('href="/about"');
    expect(footer).toContain('href="/privacy-policy"');
    expect(pageMetadataConfig.about.url).toBe("/about");
    expect(pageMetadataConfig.privacyPolicy.url).toBe("/privacy-policy");
  });
});
