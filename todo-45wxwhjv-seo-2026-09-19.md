# SEO Consolidation and Canonicalization — 2026-09-19

- [x] Audit live public behavior, legacy redirects, route registry, source body price ranges, and the crawler metadata pipeline.
- [x] Update canonical Bali and Bangkok price-index crawler metadata with ranges grounded in their own published matrices, and refine legacy UAE metadata without unsupported property-level claims.
- [x] Redirect the two retired `*-hotel-prices-2026` aliases to their corresponding price-index pages and preserve query strings.
- [x] Normalize recognized public application routes with a single no-trailing-slash 301 policy while retaining the root URL and API/static paths.
- [x] Update internal-link, sitemap, redirect, SSR, and focused regression coverage; validate local and public crawler HTML. The existing CTR report’s two affected targets now point to the canonical index pages while retaining its October 8 task timing.
- [x] Resubmit the sitemap and request indexing for the two canonical index URLs using authenticated access to the URL-prefix Search Console property. The sitemap submission succeeded and both indexed canonical pages were added to Google’s priority crawl queue.
- [x] Save a checkpoint and verify production propagation. The UAE migration remains gated on confirmed indexing of its separate canonical comparison hub; no UAE redirect was added.
