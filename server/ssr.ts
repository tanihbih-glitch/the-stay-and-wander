/**
 * Server-Side Rendering (SSR) Middleware
 * Handles rendering of dynamic pages with meta tags on the server
 * Ensures meta tags are in HTML before JavaScript loads
 */

import { Request, Response, NextFunction } from "express";
import { generateMetaTags, pageMetadataConfig, type PageMetadata } from "../shared/seo";
import { getArticleFaqs, type ArticleFaq } from "../shared/articleFaqs";

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
 * Insert route-specific metadata into the document head before the SPA boots.
 * The client template already supplies its charset, viewport, font, and script
 * tags; replace only its generic title and append the route-specific SEO tags.
 */
export function generateFAQPageSchema(faqs: readonly ArticleFaq[]): string {
  if (faqs.length === 0) return "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function injectSSRHead(
  template: string,
  metadata?: PageMetadata,
  faqs: readonly ArticleFaq[] = []
): string {
  if (!metadata && faqs.length === 0) return template;

  const withoutDefaultTitle = metadata
    ? template.replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/i, "")
    : template;

  const headContent = [
    metadata ? generateSSRHead(metadata) : "",
    generateFAQPageSchema(faqs),
  ]
    .filter(Boolean)
    .join("\n");

  return withoutDefaultTitle.replace(
    /<\/head>/i,
    `${headContent}\n  </head>`
  );
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
  } else if (path === "/blog") {
    metadata = pageMetadataConfig.blog;
  } else if (path === "/blog/best-hotels-dubai-2026") {
    metadata = pageMetadataConfig.dubaiHotelGuide;
  } else if (path === "/blog/where-to-stay-lisbon-2026") {
    metadata = pageMetadataConfig.lisbonHotelGuide;
  } else if (path === "/blog/things-to-do-in-bali-2026") {
    metadata = pageMetadataConfig.baliExperiencesGuide;
  } else if (path === "/blog/bali-beach-comparison-matrix-2026") {
    metadata = pageMetadataConfig.baliBeachComparisonMatrix;
  } else if (path === "/blog/bali-spa-wellness-price-index-2026") {
    metadata = pageMetadataConfig.baliSpaWellnessPriceIndex;
  } else if (path === "/blog/where-to-stay-in-bali-2026") {
    metadata = pageMetadataConfig.baliHotelPricesGuide;
  } else if (path === "/blog/where-to-stay-in-bangkok-2026") {
    metadata = pageMetadataConfig.bangkokHotelPricesGuide;
  } else if (path === "/blog/bangkok-hotel-budget-breakdown-2026") {
    metadata = pageMetadataConfig.bangkokHotelBudgetBreakdown;
  } else if (path === "/blog/bangkok-airport-hotels-2026") {
    metadata = pageMetadataConfig.bangkokAirportHotels;
  } else if (path === "/blog/uae-extended-stay-sustainability-2026") {
    metadata = pageMetadataConfig.uaeExtendedStaySustainability;
  } else if (path === "/blog/where-to-stay-in-tokyo-2026") {
    metadata = pageMetadataConfig.tokyoStayGuide;
  } else if (path === "/blog/where-to-stay-in-seoul-2026") {
    metadata = pageMetadataConfig.seoulStayGuide;
  } else if (path === "/blog/seoul-food-price-index-2026") {
    metadata = pageMetadataConfig.seoulFoodPriceIndex;
  } else if (path === "/itinerary/tokyo") {
    metadata = pageMetadataConfig.tokyoItinerary;
  } else if (path === "/itinerary/seoul") {
    metadata = pageMetadataConfig.seoulItinerary;
  } else if (path === "/blog/best-4-star-hotels-bali-2026") {
    metadata = pageMetadataConfig.baliFourStarHotelsGuide;
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
  } else if (path === "/deals") {
    metadata = pageMetadataConfig.deals;
  } else if (path === "/corporate-travel") {
    metadata = pageMetadataConfig.corporateTravel;
  } else if (path === "/about") {
    metadata = pageMetadataConfig.about;
  } else if (path === "/privacy-policy") {
    metadata = pageMetadataConfig.privacyPolicy;
  }

  // Attach to request for use in route handlers
  (req as any).ssrMetadata = metadata;
  (req as any).ssrFaqs = getArticleFaqs(path);

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
