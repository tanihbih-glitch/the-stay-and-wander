/**
 * Static Site Generation (SSG) Build Script
 * Pre-renders static pages to HTML at build time for better SEO
 * Runs during build process to generate static HTML files
 */

import fs from "fs";
import path from "path";
import { pageMetadataConfig, generateMetaTags, generateBlogMetadata, generateItineraryMetadata } from "../shared/seo";

interface StaticPage {
  path: string;
  metadata: any;
}

/**
 * Generate HTML meta tags string
 */
function generateMetaTagsHTML(metadata: any): string {
  const tags = generateMetaTags(metadata);

  return `
    <title>${escapeHtml(tags.title)}</title>
    <meta name="description" content="${escapeHtml(tags.description)}">
    <meta name="keywords" content="${escapeHtml(tags.keywords || '')}">
    <meta name="author" content="${escapeHtml(tags.author || '')}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(tags.ogTitle)}">
    <meta property="og:description" content="${escapeHtml(tags.ogDescription)}">
    <meta property="og:image" content="${escapeHtml(tags.ogImage)}">
    <meta property="og:url" content="${escapeHtml(tags.ogUrl)}">
    <meta property="og:type" content="${tags.ogType}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="${tags.twitterCard}">
    <meta name="twitter:title" content="${escapeHtml(tags.twitterTitle)}">
    <meta name="twitter:description" content="${escapeHtml(tags.twitterDescription)}">
    <meta name="twitter:image" content="${escapeHtml(tags.twitterImage)}">
    
    <!-- Canonical -->
    <link rel="canonical" href="${escapeHtml(tags.canonical)}">
    
    ${tags.publishedDate ? `<meta property="article:published_time" content="${tags.publishedDate}">` : ''}
    ${tags.updatedDate ? `<meta property="article:modified_time" content="${tags.updatedDate}">` : ''}
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  if (!text) return "";
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Get all static pages to pre-render
 */
function getStaticPages(): StaticPage[] {
  const pages: StaticPage[] = [];

  // Add main pages
  Object.entries(pageMetadataConfig).forEach(([key, metadata]) => {
    pages.push({
      path: metadata.url,
      metadata,
    });
  });

  return pages;
}

/**
 * Generate sitemap.xml
 */
export function generateSitemap(): string {
  const pages = getStaticPages();
  const baseUrl = "https://thestayandwander.com";

  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generate robots.txt
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Allow: /blog/
Allow: /itineraries/
Allow: /itinerary/
Allow: /booking/
Allow: /destinations/
Allow: /about/
Allow: /contact/
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /.next/

Sitemap: https://thestayandwander.com/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;
}

/**
 * Main SSG build function
 */
export async function buildSSG() {
  console.log("[SSG] Starting static site generation...");

  try {
    // Create dist directory if it doesn't exist
    const distDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Generate and save sitemap.xml
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
    console.log("[SSG] ✓ Generated sitemap.xml");

    // Generate and save robots.txt
    const robots = generateRobotsTxt();
    fs.writeFileSync(path.join(distDir, "robots.txt"), robots);
    console.log("[SSG] ✓ Generated robots.txt");

    // Get all static pages
    const pages = getStaticPages();
    console.log(`[SSG] Found ${pages.length} pages to pre-render`);

    // Log page list
    pages.forEach((page) => {
      console.log(`[SSG] - ${page.path} (${page.metadata.title})`);
    });

    console.log("[SSG] ✓ Static site generation complete!");
  } catch (error) {
    console.error("[SSG] Error during build:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildSSG();
}
