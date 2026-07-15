/**
 * Server-Side Rendering (SSR) Middleware
 * Handles rendering of dynamic pages with meta tags on the server
 * Ensures meta tags are in HTML before JavaScript loads
 */

import { Request, Response, NextFunction } from "express";
import { generateMetaTags, pageMetadataConfig, type PageMetadata } from "../shared/seo";

/**
 * SSR Context - passed to rendering functions
 */
export interface SSRContext {
  req: Request;
  res: Response;
  path: string;
  metadata?: PageMetadata;
}

/**
 * Generate HTML head with meta tags for SSR
 */
export function generateSSRHead(metadata: PageMetadata): string {
  const tags = generateMetaTags(metadata);

  return `
    <title>${escapeHtml(tags.title)}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(tags.description)}">
    <meta name="keywords" content="${escapeHtml(tags.keywords || '')}">
    <meta name="author" content="${escapeHtml(tags.author || '')}">
    <meta name="theme-color" content="#0077B6">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(tags.ogTitle)}">
    <meta property="og:description" content="${escapeHtml(tags.ogDescription)}">
    <meta property="og:image" content="${escapeHtml(tags.ogImage)}">
    <meta property="og:url" content="${escapeHtml(tags.ogUrl)}">
    <meta property="og:type" content="${tags.ogType}">
    <meta property="og:site_name" content="The Stay & Wander">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="${tags.twitterCard}">
    <meta name="twitter:title" content="${escapeHtml(tags.twitterTitle)}">
    <meta name="twitter:description" content="${escapeHtml(tags.twitterDescription)}">
    <meta name="twitter:image" content="${escapeHtml(tags.twitterImage)}">
    <meta name="twitter:site" content="@thestayandwander">
    
    <!-- Canonical -->
    <link rel="canonical" href="${escapeHtml(tags.canonical)}">
    
    <!-- Preconnect to external services -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://api.manus.im">
    
    <!-- Article meta tags -->
    ${tags.publishedDate ? `<meta property="article:published_time" content="${tags.publishedDate}">` : ''}
    ${tags.updatedDate ? `<meta property="article:modified_time" content="${tags.updatedDate}">` : ''}
    ${tags.author ? `<meta property="article:author" content="${escapeHtml(tags.author)}">` : ''}
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
 * SSR Middleware - Attach metadata to request
 */
export function ssrMiddleware(req: Request, res: Response, next: NextFunction) {
  // Determine page metadata based on route
  const path = req.path;

  let metadata: PageMetadata | undefined;

  // Match routes to metadata
  if (path === "/") {
    metadata = pageMetadataConfig.home;
  } else if (path === "/about") {
    metadata = pageMetadataConfig.about;
  } else if (path === "/contact") {
    metadata = pageMetadataConfig.contact;
  } else if (path === "/blog") {
    metadata = pageMetadataConfig.blog;
  } else if (path.startsWith("/blog/")) {
    // Blog article - metadata would be dynamically generated
    metadata = pageMetadataConfig.blog;
  } else if (path === "/itineraries") {
    metadata = pageMetadataConfig.itineraries;
  } else if (path.startsWith("/itinerary/")) {
    // Itinerary detail - metadata would be dynamically generated
    metadata = pageMetadataConfig.itineraries;
  } else if (path === "/booking") {
    metadata = pageMetadataConfig.booking;
  } else if (path === "/destinations/europe") {
    metadata = pageMetadataConfig.destinationEurope;
  } else if (path === "/destinations/asia") {
    metadata = pageMetadataConfig.destinationAsia;
  } else if (path === "/destinations/brazil") {
    metadata = pageMetadataConfig.destinationBrazil;
  }

  // Attach to request for use in route handlers
  (req as any).ssrMetadata = metadata;

  next();
}

/**
 * Generate H1 tag for page
 */
export function generateH1(title: string): string {
  return `<h1 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">${escapeHtml(title)}</h1>`;
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredDataScript(data: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Create SSR context for rendering
 */
export function createSSRContext(req: Request, res: Response, path: string): SSRContext {
  return {
    req,
    res,
    path,
    metadata: (req as any).ssrMetadata,
  };
}
