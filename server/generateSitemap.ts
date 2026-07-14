/**
 * Generate XML Sitemap for SEO
 * This creates a sitemap.xml file containing all pages and blog posts
 */

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export function generateSitemap(entries: SitemapEntry[]): string {
  const baseUrl = "https://thestayandwander.com";

  // Default entries for main pages
  const defaultEntries: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/itineraries`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "daily",
      priority: 0.8,
    },
  ];

  // Combine default entries with custom entries (blog posts, etc.)
  const allEntries = [...defaultEntries, ...entries];

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allEntries.forEach((entry) => {
    xml += "  <url>\n";
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;

    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }

    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }

    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }

    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  const xmlChars: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };

  return str.replace(/[&<>"']/g, (char) => xmlChars[char]);
}

/**
 * Generate blog post sitemap entries
 */
export function generateBlogEntries(): SitemapEntry[] {
  const blogPosts = [
    {
      id: 1,
      title: "Best Hotels in Bali for Every Budget 2026",
      date: "2026-06-15",
    },
    {
      id: 2,
      title: "7 Best Cities to Visit in Europe This Summer",
      date: "2026-06-10",
    },
    {
      id: 3,
      title: "Tokyo vs Bangkok — Which Should You Visit First?",
      date: "2026-06-05",
    },
    {
      id: 4,
      title: "Where to Stay in Lisbon — Neighbourhood Guide",
      date: "2026-05-28",
    },
    {
      id: 5,
      title: "Brazil Travel Guide — Everything You Need to Know",
      date: "2026-05-20",
    },
    {
      id: 6,
      title: "Best Flight Deals to Asia in 2026",
      date: "2026-05-15",
    },
  ];

  return blogPosts.map((post) => ({
    url: `https://thestayandwander.com/blog/${post.id}`,
    lastmod: post.date,
    changefreq: "monthly" as const,
    priority: 0.7,
  }));
}

/**
 * Generate itinerary sitemap entries
 */
export function generateItineraryEntries(): SitemapEntry[] {
  const itineraries = [
    { id: 1, title: "10 Days in Tokyo & Seoul" },
    { id: 2, title: "Two-Week Mediterranean Escape" },
    { id: 3, title: "Ultimate Brazil Adventure" },
  ];

  return itineraries.map((itinerary) => ({
    url: `https://thestayandwander.com/itineraries/${itinerary.id}`,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "monthly" as const,
    priority: 0.8,
  }));
}

/**
 * Generate complete sitemap with all entries
 */
export function generateCompleteSitemap(): string {
  const blogEntries = generateBlogEntries();
  const itineraryEntries = generateItineraryEntries();
  const allEntries = [...blogEntries, ...itineraryEntries];

  return generateSitemap(allEntries);
}
