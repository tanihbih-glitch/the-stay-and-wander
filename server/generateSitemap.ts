import {
  sitemapRoutes,
  type SitemapChangeFrequency,
} from "../shared/publicRoutes";

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: SitemapChangeFrequency;
  priority?: number;
}

const SITE_URL = "https://thestayandwander.com";

export function getCanonicalSitemapEntries(): SitemapEntry[] {
  return sitemapRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastmod: route.lastmod,
    changefreq: route.changefreq,
    priority: route.priority,
  }));
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
      const changefreq = entry.changefreq
        ? `\n    <changefreq>${entry.changefreq}</changefreq>`
        : "";
      const priority = entry.priority !== undefined
        ? `\n    <priority>${entry.priority.toFixed(1)}</priority>`
        : "";

      return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function generateBlogEntries(): SitemapEntry[] {
  return getCanonicalSitemapEntries().filter((entry) =>
    entry.url.startsWith(`${SITE_URL}/blog/`)
  );
}

export function generateItineraryEntries(): SitemapEntry[] {
  return getCanonicalSitemapEntries().filter((entry) =>
    entry.url.startsWith(`${SITE_URL}/itinerary/`)
  );
}

export function generateCompleteSitemap(): string {
  return generateSitemap(getCanonicalSitemapEntries());
}

function escapeXml(value: string): string {
  const xmlChars: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };

  return value.replace(/[&<>"']/g, (character) => xmlChars[character]);
}
