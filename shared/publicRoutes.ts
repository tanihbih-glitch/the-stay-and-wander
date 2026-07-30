export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapRoute {
  path: string;
  lastmod: string;
  changefreq: SitemapChangeFrequency;
  priority: number;
}

const BASE_APPLICATION_PATHS = [
  "/",
  "/itineraries",
  "/itinerary/tokyo-seoul",
  "/itinerary/mediterranean",
  "/itinerary/brazil",
  "/booking",
  "/deals",
  "/corporate-travel",
  "/trip-planner",
  "/trip-planner/success",
  "/about",
  "/privacy-policy",
  "/blog",
  "/blog/best-hotels-bali-2026",
  "/blog/best-4-star-hotels-bali-2026",
  "/blog/bali-hotel-prices-2026",
  "/blog/best-cities-europe-summer-2026",
  "/blog/tokyo-vs-bangkok-2026",
  "/blog/where-to-stay-lisbon-2026",
  "/blog/things-to-do-in-bali-2026",
  "/blog/brazil-travel-guide-2026",
  "/blog/best-flight-deals-asia-2026",
  "/blog/best-hotels-dubai-2026",
  "/blog/1",
  "/blog/2",
  "/blog/3",
  "/blog/4",
  "/blog/5",
  "/blog/6",
  "/admin/analytics",
  "/404",
] as const;

const applicationPathSet = new Set<string>(BASE_APPLICATION_PATHS);

export const sitemapRoutes: readonly SitemapRoute[] = [
  { path: "/", lastmod: "2026-07-28", changefreq: "weekly", priority: 1.0 },
  { path: "/itineraries", lastmod: "2026-07-19", changefreq: "weekly", priority: 0.9 },
  { path: "/itinerary/tokyo-seoul", lastmod: "2026-07-19", changefreq: "monthly", priority: 0.8 },
  { path: "/itinerary/mediterranean", lastmod: "2026-07-19", changefreq: "monthly", priority: 0.8 },
  { path: "/itinerary/brazil", lastmod: "2026-07-19", changefreq: "monthly", priority: 0.8 },
  { path: "/booking", lastmod: "2026-07-19", changefreq: "weekly", priority: 0.9 },
  { path: "/deals", lastmod: "2026-07-28", changefreq: "weekly", priority: 0.9 },
  { path: "/corporate-travel", lastmod: "2026-07-30", changefreq: "weekly", priority: 0.9 },
  { path: "/trip-planner", lastmod: "2026-07-28", changefreq: "weekly", priority: 0.9 },
  { path: "/about", lastmod: "2026-07-28", changefreq: "yearly", priority: 0.5 },
  { path: "/privacy-policy", lastmod: "2026-07-28", changefreq: "yearly", priority: 0.4 },
  { path: "/blog", lastmod: "2026-07-28", changefreq: "daily", priority: 0.8 },
  { path: "/blog/best-hotels-bali-2026", lastmod: "2026-07-15", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/best-4-star-hotels-bali-2026", lastmod: "2026-07-20", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/bali-hotel-prices-2026", lastmod: "2026-07-28", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/best-cities-europe-summer-2026", lastmod: "2026-07-10", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/tokyo-vs-bangkok-2026", lastmod: "2026-07-05", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/where-to-stay-lisbon-2026", lastmod: "2026-07-30", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/things-to-do-in-bali-2026", lastmod: "2026-07-30", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/brazil-travel-guide-2026", lastmod: "2026-05-20", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/best-flight-deals-asia-2026", lastmod: "2026-05-15", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/best-hotels-dubai-2026", lastmod: "2026-07-30", changefreq: "monthly", priority: 0.8 },
];

function normalizePath(pathname: string): string {
  const pathWithoutQuery = pathname.split("?")[0].split("#")[0] || "/";
  return pathWithoutQuery === "/"
    ? "/"
    : pathWithoutQuery.replace(/\/+$/, "") || "/";
}

export function isApplicationRoute(pathname: string): boolean {
  return applicationPathSet.has(normalizePath(pathname));
}
