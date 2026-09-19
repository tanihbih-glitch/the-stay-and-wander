import { describe, expect, it } from "vitest";
import { getLegacyRedirectTarget, getTrailingSlashRedirectTarget, LEGACY_PERMANENT_REDIRECTS } from "./legacyRedirects";
import { sitemapRoutes } from "../shared/publicRoutes";

describe("legacy Search Console 404 redirects", () => {
  const expectedRedirects = {
    "/europe/": "/blog/best-cities-europe-summer-2026",
    "/asia/": "/blog",
    "/flights/": "/booking",
    "/blog/tokyo-bangkok": "/blog/tokyo-vs-bangkok-2026",
    "/exploring-unforgettable-destinations-your-guide-to-luxury-travel/": "/blog",
    "/lead-magnets/": "/",
    "/home/": "/",
    "/guides/": "/blog",
    "/blog/europe-cities": "/blog/best-cities-europe-summer-2026",
    "/blog/bali-hotel-prices-2026": "/blog/bali-hotel-price-index-2026",
    "/blog/bangkok-hotel-prices-2026": "/blog/bangkok-hotel-price-index-2026",
  };

  it("maps each of the nine reported retired URLs to its closest live destination", () => {
    expect(LEGACY_PERMANENT_REDIRECTS).toEqual({
      "/europe": "/blog/best-cities-europe-summer-2026",
      "/asia": "/blog",
      "/flights": "/booking",
      "/blog/tokyo-bangkok": "/blog/tokyo-vs-bangkok-2026",
      "/exploring-unforgettable-destinations-your-guide-to-luxury-travel": "/blog",
      "/lead-magnets": "/",
      "/home": "/",
      "/guides": "/blog",
      "/blog/europe-cities": "/blog/best-cities-europe-summer-2026",
      "/blog/bali-hotel-prices-2026": "/blog/bali-hotel-price-index-2026",
      "/blog/bangkok-hotel-prices-2026": "/blog/bangkok-hotel-price-index-2026",
    });

    for (const [source, destination] of Object.entries(expectedRedirects)) {
      expect(getLegacyRedirectTarget(source)).toBe(destination);
    }
  });

  it("keeps all redirected legacy paths out of the canonical sitemap", () => {
    const sitemapPaths = sitemapRoutes.map((route) => route.path);

    for (const source of Object.keys(LEGACY_PERMANENT_REDIRECTS)) {
      expect(sitemapPaths).not.toContain(source);
    }
  });

  it("normalizes trailing slashes only for known public application routes", () => {
    expect(getTrailingSlashRedirectTarget("/booking/")).toBe("/booking");
    expect(getTrailingSlashRedirectTarget("/booking/?source=search")).toBe("/booking");
    expect(getTrailingSlashRedirectTarget("/blog/bali-hotel-price-index-2026/")).toBe("/blog/bali-hotel-price-index-2026");
    expect(getTrailingSlashRedirectTarget("/")).toBeUndefined();
    expect(getTrailingSlashRedirectTarget("/api/trpc/")).toBeUndefined();
    expect(getTrailingSlashRedirectTarget("/assets/")).toBeUndefined();
  });

  it("provides one no-trailing-slash destination for every sitemap URL", () => {
    for (const route of sitemapRoutes.filter((item) => item.path !== "/")) {
      expect(getTrailingSlashRedirectTarget(`${route.path}/`)).toBe(route.path);
    }
  });
});
