# The Stay & Wander - SSG/SSR Implementation TODO

## Phase 1: SSG Build Pipeline & Meta Tag System
- [x] Create meta tag generation utility (title, description, OG image, canonical URL)
- [x] Set up SSG build script for static pages
- [x] Create page metadata configuration file
- [x] Implement Helmet/Head component for SSR meta tags

## Phase 2: SSG for Static Pages
- [ ] Generate static HTML for homepage
- [ ] Generate static HTML for all blog articles
- [ ] Generate static HTML for itinerary detail pages (Tokyo, Mediterranean, Brazil)
- [ ] Generate static HTML for destination pages (Europe, Asia, Brazil)
- [ ] Create About page and generate static HTML
- [ ] Create Contact page and generate static HTML

## Phase 3: SSR for Dynamic Pages
- [ ] Configure Express middleware for SSR
- [ ] Implement SSR for Booking Portal page
- [ ] Implement SSR for user account/login pages
- [ ] Add dynamic meta tags for SSR pages

## Phase 4: SEO Meta Tags
- [ ] Add page titles to all pages
- [ ] Add meta descriptions to all pages
- [ ] Add Open Graph images to all pages
- [ ] Add canonical URLs to all pages
- [ ] Add H1 headings to all pages
- [ ] Verify meta tags render before JavaScript loads

## Phase 5: Sitemap & Robots
- [ ] Create automatic sitemap.xml generator
- [ ] Hook sitemap generation to blog content updates
- [ ] Create/update robots.txt with SSG/SSR paths
- [ ] Test sitemap.xml accessibility at /sitemap.xml
- [ ] Submit sitemap to Google Search Console

## Phase 6: Testing & Verification
- [ ] Test SSG pages render without JavaScript
- [ ] Test SSR pages render with dynamic content
- [ ] Verify Google can crawl all pages
- [ ] Check meta tags in page source (not DevTools)
- [ ] Test mobile responsiveness of all pages
- [ ] Verify sitemap.xml updates with new blog posts
- [ ] Final checkpoint and deployment
