# The Stay & Wander - SSG/SSR Implementation TODO

## Phase 1: SSG Build Pipeline & Meta Tag System
- [x] Create meta tag generation utility (title, description, OG image, canonical URL)
- [x] Set up SSG build script for static pages
- [x] Create page metadata configuration file
- [x] Implement Helmet/Head component for SSR meta tags

## Phase 2: SSG for Static Pages
- [x] Generate static HTML for homepage
- [x] Generate static HTML for all blog articles
- [x] Generate static HTML for itinerary detail pages (Tokyo, Mediterranean, Brazil)
- [x] Generate static HTML for destination pages (Europe, Asia, Brazil)
- [x] Create About page and generate static HTML
- [x] Create Contact page and generate static HTML

## Phase 3: SSR for Dynamic Pages
- [x] Configure Express middleware for SSR
- [x] Implement SSR for Booking Portal page
- [x] Implement SSR for user account/login pages
- [x] Add dynamic meta tags for SSR pages

## Phase 4: SEO Meta Tags
- [x] Add page titles to all pages
- [x] Add meta descriptions to all pages
- [x] Add Open Graph images to all pages
- [x] Add canonical URLs to all pages
- [x] Add H1 headings to all pages
- [x] Verify meta tags render before JavaScript loads

## Phase 5: Sitemap & Robots
- [x] Create automatic sitemap.xml generator
- [x] Hook sitemap generation to blog content updates
- [x] Create/update robots.txt with SSG/SSR paths
- [x] Test sitemap.xml accessibility at /sitemap.xml
- [x] Submit sitemap to Google Search Console

## Phase 6: Testing & Verification
- [x] Test SSG pages render without JavaScript
- [x] Test SSR pages render with dynamic content
- [x] Verify Google can crawl all pages
- [x] Check meta tags in page source (not DevTools)
- [x] Test mobile responsiveness of all pages
- [x] Verify sitemap.xml updates with new blog posts
- [x] Final checkpoint and deployment


## GetYourGuide Widget Integration (17 total placements)
- [x] Add GetYourGuide widget to Bali article after intro (label: 'Top-Rated Bali Tours & Activities')
- [x] Add GetYourGuide widget to Bali article after final hotel (label: 'Complete Your Bali Trip — Book Activities')
- [x] Add GetYourGuide widget after each Europe city section (7 cities: Lisbon, Dubrovnik, Budapest, Porto, Athens, Ljubljana, Kotor)
- [x] Add GetYourGuide widget at bottom of Europe article (label: 'Browse All European Tours & Experiences')
- [x] Add GetYourGuide widget after Bangkok hotels section in Tokyo vs Bangkok article
- [x] Add GetYourGuide widget after Tokyo hotels section in Tokyo vs Bangkok article
- [x] Add GetYourGuide widget at bottom of Tokyo vs Bangkok article before CTAs
- [x] Add GetYourGuide widget to Tokyo & Seoul itinerary below day-by-day timeline
- [x] Add GetYourGuide widget to Mediterranean itinerary below day-by-day timeline
- [x] Add GetYourGuide widget to Brazil itinerary below day-by-day timeline
- [x] Add GetYourGuide Tours & Activities tab to Booking Portal with widget

## Mailchimp Integration (5 signup flows)
- [x] Install Mailchimp script in head section of all pages
- [x] Connect homepage email capture form to Mailchimp
- [x] Create Mailchimp email capture popup for itinerary downloads (Tokyo & Seoul, Mediterranean, Brazil)
- [x] Implement exit-intent popup sitewide with Mailchimp integration
- [x] Add email signup section to blog article footer connected to Mailchimp
- [x] Test all email capture flows and verify Mailchimp integration


## Affiliate Analytics Dashboard
- [x] Create database schema for affiliateClicks and affiliateConversions tables
- [x] Create server-side tracking helpers in server/affiliateTracking.ts
- [x] Create tRPC analytics router with procedures for tracking and fetching analytics
- [x] Build affiliate analytics dashboard UI component
- [x] Connect dashboard UI to tRPC queries
- [x] Register /admin/analytics route in App.tsx
- [x] Implement click-tracking wrapper component (AffiliateLink.tsx)
- [x] Create vitest tests for affiliate tracking system (17 tests passing)
- [x] Create comprehensive implementation guide (AFFILIATE_ANALYTICS_GUIDE.md)
- [x] Make trackClick procedure public for unauthenticated visitors
- [x] Add robust error handling to prevent blocking user navigation
- [x] Integrate AffiliateLink into Bali Hotels blog article
- [x] Create AffiliateLink component tests (6 tests)
- [ ] Integrate AffiliateLink into remaining blog articles (Europe, Tokyo vs Bangkok, Brazil, Flight Deals)
- [ ] Integrate AffiliateLink into itinerary pages (Tokyo & Seoul, Mediterranean, Brazil)
- [ ] Integrate AffiliateLink into homepage affiliate links
- [ ] Integrate AffiliateLink into booking portal
- [ ] Implement conversion tracking via webhooks from affiliate partners
- [ ] Add admin navigation link to analytics dashboard
