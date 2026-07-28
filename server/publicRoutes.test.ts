import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { generateCompleteSitemap } from "./generateSitemap";
import { generateSitemap as generateSsgSitemap } from "./ssg";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";

describe("public route and sitemap cleanup", () => {
  it("treats the reported legacy slug and unimplemented template paths as unknown", () => {
    expect(isApplicationRoute("/exploring-the-best-travel-destinations-for-modern-wanderlust/")).toBe(false);
    expect(isApplicationRoute("/contact")).toBe(false);
    expect(isApplicationRoute("/destinations/europe")).toBe(false);
    expect(isApplicationRoute("/itineraries/1")).toBe(false);
  });

  it("retains the intended canonical routes, including new company pages", () => {
    expect(isApplicationRoute("/blog/bali-hotel-prices-2026")).toBe(true);
    expect(isApplicationRoute("/blog/bali-hotel-prices-2026/")).toBe(true);
    expect(isApplicationRoute("/itinerary/tokyo-seoul")).toBe(true);
    expect(isApplicationRoute("/trip-planner")).toBe(true);
    expect(isApplicationRoute("/about")).toBe(true);
    expect(isApplicationRoute("/privacy-policy/")).toBe(true);
  });

  it("lists only canonical URLs in the generated sitemap", () => {
    const sitemap = generateCompleteSitemap();

    expect(sitemap).toContain("/blog/bali-hotel-prices-2026");
    expect(sitemap).toContain("/itinerary/tokyo-seoul");
    expect(sitemap).toContain("/about");
    expect(sitemap).toContain("/privacy-policy");
    expect(sitemap).not.toContain("/exploring-the-best-travel-destinations-for-modern-wanderlust");
    expect(sitemap).not.toContain("/itineraries/1");
  });

  it("keeps the deployed static sitemap aligned with the canonical route registry", () => {
    const staticSitemap = fs.readFileSync(
      path.resolve(process.cwd(), "client/public/sitemap.xml"),
      "utf8"
    );
    const staticLocations = [...staticSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, location]) => location
    );
    const canonicalLocations = sitemapRoutes.map(
      (route) => `https://thestayandwander.com${route.path}`
    );

    expect(staticLocations).toEqual(canonicalLocations);
  });

  it("keeps the legacy SSG sitemap generator aligned with the same route registry", () => {
    expect(generateSsgSitemap()).toBe(generateCompleteSitemap());
  });
});
