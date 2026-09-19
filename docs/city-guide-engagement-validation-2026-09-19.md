# City Guide Engagement and Navigation Validation — 2026-09-19

## Desktop review

Full-page desktop previews at 1440 × 900 were reviewed for the Bali and Bangkok hotel price indexes and the Tokyo and Seoul stay guides. The two price indexes render the existing contextual related-article cards followed by the new four-city **Compare destinations** module. Each comparison card clearly distinguishes its published planning range from live rates and identifies the current guide without presenting a value ranking.

Tokyo and Seoul render an in-page breadcrumb trail, a readable desktop-side table of contents, and the three new tier cards directly beneath their published neighborhood/district price snapshots. The guide content remains a single readable article column; the companion flight-deals widget remains below the sticky contents panel. No overlap, clipping, or contrast issue was visible in the full-page capture.

## Data and privacy boundary

The related-card event model stores only an event type, component name, source path, destination path, and timestamp. It intentionally does not include an account, session ID, IP address, user agent, referrer, device identifier, or external destination. The Privacy Policy now explains this boundary in a visible **Anonymous guide engagement** section.

## Automated results

The focused suite passed 49 assertions across the engagement aggregation, Bali, Bangkok, Tokyo, Seoul, and SSR coverage. The full project suite passed 37 files and 202 tests; TypeScript and the production build passed. Local crawler HTML exposed matching canonical URLs, `article:modified_time` values, `BlogPosting`, and `BreadcrumbList` payloads for all four reviewed guides.

## Mobile review

Full-page mobile previews at 390 × 844 were reviewed for Tokyo and Seoul. The hero, visible breadcrumb, compact **In this guide** disclosure, matcher, price table, tier cards, neighborhood sections, FAQ, and footer all remained within the single-column layout. The desktop sidebar is correctly absent at the mobile breakpoint; its contents navigation is available in the in-flow disclosure. No horizontal clipping or overlapping panel was visible in either capture.

## Deep-link review

A direct preview navigation to `#tokyo-premium-tier` was checked after hydration. The initial browser response loaded at the document top, then the shared sticky-contents component restored the fragment position; the subsequent view reported 3,190 pixels above the viewport and placed the premium-tier card at the top of the content area. This confirms that tier anchors remain usable for direct links as well as in-page navigation.
The equivalent Seoul `#seoul-premium-tier` navigation was also checked after hydration and landed at the tier cards (3,146 pixels above the viewport). The shared restoration behavior works on both newly extended city guides.

## Privacy notice review

The browser-rendered Privacy Policy displays the new **Anonymous guide engagement** section. It accurately states that only source guide, selected guide, and time are stored and explicitly excludes names, emails, account IDs, session IDs, IP addresses, browser/device identifiers, user agents, referrers, and external booking destinations.

## Public release verification

After checkpoint `c633a0d1` propagated, cache-busted custom-domain requests returned HTTP 200 for the Bali and Bangkok hotel price indexes, Tokyo and Seoul stay guides, and Privacy Policy. Public crawler HTML confirms each guide's canonical URL, `BlogPosting`, `BreadcrumbList`, and updated `article:modified_time` (`2026-09-19`) payload. A public browser session loaded the released Bali guide with the verified current title and Last Updated signal.
