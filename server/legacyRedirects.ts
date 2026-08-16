import type { NextFunction, Request, Response } from "express";

/**
 * Permanent destinations for retired public URLs that Google Search Console
 * reported as 404s. Keep only destination-relevant paths here; canonical URLs
 * remain exclusively in the public route registry and sitemap.
 */
export const LEGACY_PERMANENT_REDIRECTS: Readonly<Record<string, string>> = {
  "/europe": "/blog/best-cities-europe-summer-2026",
  "/asia": "/blog",
  "/flights": "/booking",
  "/blog/tokyo-bangkok": "/blog/tokyo-vs-bangkok-2026",
  "/exploring-unforgettable-destinations-your-guide-to-luxury-travel": "/blog",
  "/lead-magnets": "/",
  "/home": "/",
  "/guides": "/blog",
  "/blog/europe-cities": "/blog/best-cities-europe-summer-2026",
  "/blog/bali-hotel-prices-2026": "/blog/where-to-stay-in-bali-2026",
  "/blog/bangkok-hotel-prices-2026": "/blog/where-to-stay-in-bangkok-2026",
};

function normalizeLegacyPath(pathname: string): string {
  const withoutQueryOrHash = pathname.split("?")[0].split("#")[0] || "/";
  return withoutQueryOrHash === "/"
    ? "/"
    : withoutQueryOrHash.replace(/\/+$/, "") || "/";
}

export function getLegacyRedirectTarget(pathname: string): string | undefined {
  return LEGACY_PERMANENT_REDIRECTS[normalizeLegacyPath(pathname)];
}

/** Sends a 301 before route-aware metadata and SPA/static fallback handling. */
export function legacyRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  const target = getLegacyRedirectTarget(req.originalUrl || req.path);
  if (!target) {
    next();
    return;
  }

  const queryIndex = req.originalUrl.indexOf("?");
  const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : "";
  res.redirect(301, `${target}${query}`);
}
