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


## GetYourGuide Widget Integration (17 total placements)
- [x] Add GetYourGuide widget to Bali article after intro (label: 'Top-Rated Bali Tours & Activities')
- [x] Add GetYourGuide widget to Bali article after final hotel (label: 'Complete Your Bali Trip — Book Activities')
- [x] Add GetYourGuide widget after each Europe city section (7 cities: Lisbon, Dubrovnik, Budapest, Porto, Athens, Ljubljana, Kotor)
- [x] Add GetYourGuide widget at bottom of Europe article (label: 'Browse All European Tours & Experiences')
- [x] Add GetYourGuide widget after Bangkok hotels section in Tokyo vs Bangkok article
- [x] Add GetYourGuide widget after Tokyo hotels section in Tokyo vs Bangkok article
- [x] Add GetYourGuide widget at bottom of Tokyo vs Bangkok article before CTAs
- [ ] Add GetYourGuide widget to Tokyo & Seoul itinerary below day-by-day timeline
- [ ] Add GetYourGuide widget to Mediterranean itinerary below day-by-day timeline
- [ ] Add GetYourGuide widget to Brazil itinerary below day-by-day timeline
- [ ] Add GetYourGuide Tours & Activities tab to Booking Portal with widget

## Mailchimp Integration (5 signup flows)
- [ ] Install Mailchimp script in head section of all pages
- [ ] Connect homepage email capture form to Mailchimp
- [ ] Create Mailchimp email capture popup for itinerary downloads (Tokyo & Seoul, Mediterranean, Brazil)
- [ ] Implement exit-intent popup sitewide with Mailchimp integration
- [ ] Add email signup section to blog article footer connected to Mailchimp
- [ ] Test all email capture flows and verify Mailchimp integration
