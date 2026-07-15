# Hybrid SSG/SSR Implementation Guide

## Overview

This document explains the hybrid Static Site Generation (SSG) and Server-Side Rendering (SSR) architecture implemented for The Stay & Wander website to ensure optimal SEO performance and Google indexing.

## Architecture

### Static Site Generation (SSG)
Pre-renders pages to static HTML at build time. Perfect for content that doesn't change frequently.

**SSG Pages:**
- Homepage (`/`)
- Blog articles (`/blog`, `/blog/:id`)
- Itineraries (`/itineraries`, `/itinerary/:id`)
- Destination guides (`/destinations/europe`, `/destinations/asia`, `/destinations/brazil`)
- About page (`/about`)
- Contact page (`/contact`)

**Benefits:**
- Fastest performance (no server-side rendering needed)
- Best for SEO (all content in HTML before JavaScript loads)
- Reduced server load
- Automatic sitemap.xml generation

### Server-Side Rendering (SSR)
Renders pages on the server for each request. Perfect for dynamic content and user-specific pages.

**SSR Pages:**
- Booking Portal (`/booking`)
- User account pages (login, profile)
- Any user-specific or real-time content

**Benefits:**
- Supports dynamic content and user authentication
- Fresh content on every request
- SEO-friendly (meta tags rendered server-side)
- Can access databases and APIs

## SEO Meta Tags

All pages include comprehensive meta tags rendered before JavaScript loads:

### Standard Meta Tags
- `<title>` - Page title (max 60 characters)
- `<meta name="description">` - Page description (max 160 characters)
- `<meta name="keywords">` - Relevant keywords
- `<meta name="author">` - Author name (for articles)

### Open Graph Tags
- `og:title` - Social media title
- `og:description` - Social media description
- `og:image` - Social media preview image
- `og:url` - Canonical URL
- `og:type` - Content type (website, article, etc.)

### Twitter Tags
- `twitter:card` - Card type (summary_large_image)
- `twitter:title` - Tweet title
- `twitter:description` - Tweet description
- `twitter:image` - Tweet image

### Canonical Tags
- `<link rel="canonical">` - Preferred URL for duplicate content

### Article Tags (for blog posts)
- `article:published_time` - Publication date
- `article:modified_time` - Last update date
- `article:author` - Article author

## Implementation

### 1. Meta Tag Configuration

All page metadata is defined in `shared/seo.ts`:

```typescript
export const pageMetadataConfig: Record<string, PageMetadata> = {
  home: {
    title: "The Stay & Wander - Discover Beautiful Places...",
    description: "Discover beautiful places, unique stays...",
    image: "https://thestayandwander.com/og-image.png",
    url: "/",
    type: "website",
    keywords: "travel, hotels, itineraries...",
  },
  // ... more pages
};
```

### 2. Using the Head Component

In React components, use the `Head` component to set meta tags:

```typescript
import Head from "@/components/Head";
import { pageMetadataConfig } from "@shared/seo";

export default function Home() {
  const homeMetadata = pageMetadataConfig.home;

  return (
    <>
      <Head
        title={homeMetadata.title}
        description={homeMetadata.description}
        canonical={`https://thestayandwander.com${homeMetadata.url}`}
        ogTitle={homeMetadata.title}
        ogDescription={homeMetadata.description}
        ogImage={homeMetadata.image}
        ogUrl={`https://thestayandwander.com${homeMetadata.url}`}
        keywords={homeMetadata.keywords}
      />
      {/* Page content */}
    </>
  );
}
```

### 3. SSR Middleware

The `server/ssr.ts` file provides middleware for server-side rendering:

```typescript
import { ssrMiddleware, generateSSRHead } from "./ssr";

// In Express app
app.use(ssrMiddleware);
```

### 4. Sitemap Generation

The `server/ssg.ts` file automatically generates `sitemap.xml`:

```bash
# Run during build
pnpm run build:ssg
```

This creates:
- `public/sitemap.xml` - All pages with priority and update frequency
- `public/robots.txt` - Crawler directives

## H1 Headings

Every page must have a single H1 heading that matches the page title:

```typescript
<h1 style={{ fontFamily: '"Playfair Display", serif' }}>
  {pageTitle}
</h1>
```

## Structured Data (JSON-LD)

Add structured data to help search engines understand page content:

```typescript
import { generateStructuredData } from "@shared/seo";

const schema = generateStructuredData("Article", {
  headline: "Article Title",
  description: "Article description",
  image: "https://...",
  author: { "@type": "Person", "name": "Author Name" },
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
});
```

## Testing SEO

### 1. Check Meta Tags in HTML

Use browser DevTools or curl to verify meta tags are in the HTML:

```bash
curl -s https://thestayandwander.com | grep -A 5 "<meta name=\"description\""
```

### 2. Test with Google Search Console

1. Submit sitemap.xml: https://search.google.com/search-console
2. Check indexing status
3. Monitor crawl errors

### 3. Test with Lighthouse

Use Chrome DevTools Lighthouse to audit SEO:
- Right-click → Inspect → Lighthouse tab
- Run audit → Check SEO score

### 4. Test with Mobile-Friendly Test

https://search.google.com/test/mobile-friendly

## Updating Content

### Adding a New Blog Article

1. Add article to blog data in `client/src/pages/Blog.tsx`
2. Run build: `pnpm run build:ssg`
3. Sitemap automatically updates
4. Google crawls new URL within 24-48 hours

### Adding a New Itinerary

1. Add itinerary to itineraries data
2. Create detail page in `client/src/pages/ItineraryDetail.tsx`
3. Run build: `pnpm run build:ssg`
4. Sitemap automatically updates

### Updating Meta Tags

1. Edit `shared/seo.ts`
2. Update `pageMetadataConfig` or article metadata
3. Run build: `pnpm run build:ssg`
4. Deploy

## Performance Optimization

### Cache Headers

Set appropriate cache headers for different content types:

```
# Static content (images, CSS, JS)
Cache-Control: public, max-age=31536000

# HTML pages
Cache-Control: public, max-age=3600

# API responses
Cache-Control: private, max-age=300
```

### Image Optimization

- Use WebP format for images
- Compress images before upload
- Use responsive images with `srcset`
- Add `loading="lazy"` for below-the-fold images

### Code Splitting

- Split large components into separate chunks
- Load components on demand with React.lazy()
- Preload critical resources

## Monitoring

### Google Search Console

- Monitor indexing status
- Check crawl errors
- Review search performance
- Monitor Core Web Vitals

### Google Analytics 4

- Track organic traffic
- Monitor bounce rate
- Track conversion funnels
- Analyze user behavior

### Sitemap Monitoring

- Verify sitemap.xml is accessible
- Check for broken URLs
- Monitor crawl frequency
- Ensure all pages are included

## Troubleshooting

### Pages Not Indexed

1. Check if page is in sitemap.xml
2. Verify meta tags are in HTML (not just in DevTools)
3. Check robots.txt allows crawling
4. Submit URL to Google Search Console
5. Wait 24-48 hours for indexing

### Meta Tags Not Showing

1. Verify Head component is used
2. Check browser DevTools → Elements → Head
3. Use curl to verify tags are in HTML source
4. Clear browser cache and reload

### Sitemap Not Updating

1. Run build: `pnpm run build:ssg`
2. Verify sitemap.xml file exists in public/
3. Check file permissions
4. Resubmit to Google Search Console

## Best Practices

1. **Keep titles under 60 characters** - Prevents truncation in search results
2. **Keep descriptions under 160 characters** - Prevents truncation
3. **Use keywords naturally** - Avoid keyword stuffing
4. **Update content regularly** - Fresh content signals to search engines
5. **Use descriptive URLs** - `/blog/best-hotels-in-bali` vs `/blog/123`
6. **Add internal links** - Link related pages to improve crawlability
7. **Mobile-first design** - Optimize for mobile devices first
8. **Fast loading** - Aim for <3 second page load time
9. **Unique content** - Avoid duplicate content across pages
10. **Regular monitoring** - Check Google Search Console weekly

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
