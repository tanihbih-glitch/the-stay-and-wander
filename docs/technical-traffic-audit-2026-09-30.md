# Technical Traffic-Drop Audit — 2026-09-30

## Search Console findings

Search Console URL Inspection/Page indexing (URL-prefix property `https://thestayandwander.com/`, report last updated 2026-09-21) showed:

### Historical server-error (5xx) examples

1. `/brazil/`
2. `/privacy-policy-2/`
3. `/cruises/`

Direct live checks on 2026-09-30 returned HTTP 404 for all three. They were stale legacy paths rather than active 5xx responses.

### Robots-blocked examples

1. `/blog/5`
2. `/exploring-the-best-travel-destinations-for-modern-wanderlust/`
3. `/wp-json/hostinger-reach/v1/contact`

The first two are retired/legacy content paths. The third is a WordPress API endpoint that is not part of this React site and should remain non-indexable.

## Remediation plan

- 301 `/brazil/` to `/blog/brazil-travel-guide-2026`.
- 301 `/privacy-policy-2/` to `/privacy-policy`.
- 301 `/cruises/` to `/deals`.
- 301 `/blog/5` to `/blog/brazil-travel-guide-2026` at the server layer (replacing the prior client-only redirect).
- 301 `/exploring-the-best-travel-destinations-for-modern-wanderlust/` to `/blog`.
- Keep `/wp-json/` disallowed in `robots.txt`; it is an obsolete API namespace, not a public content route.

## Pinterest cross-channel check

The six Search Console examples do not include the canonical Dubai guide (`/blog/best-hotels-dubai-2026`) or another Dubai destination URL. Repository and public-search checks found no evidence that these six paths are canonical Dubai-board landing pages. Therefore this audit found no direct URL match between the six faults and Dubai-board pin destinations. Pinterest Analytics pin-by-pin export was not exposed by the current connected browser session, so the conclusion is limited to exact URL matching rather than a full historical pin inventory.

## Public verification

After checkpoint `42248755` propagated, cache-busted live requests confirmed:

- `/brazil/` → HTTP 301 → `/blog/brazil-travel-guide-2026`
- `/privacy-policy-2/` → HTTP 301 → `/privacy-policy`
- `/cruises/` → HTTP 301 → `/deals`
- `/blog/5` → HTTP 301 → `/blog/brazil-travel-guide-2026`
- `/exploring-the-best-travel-destinations-for-modern-wanderlust/` → HTTP 301 → `/blog`
- `/robots.txt` includes `Disallow: /wp-json/`.

Search Console URL Inspection confirms `/blog/brazil-travel-guide-2026` is already indexed and served over HTTPS. The five obsolete aliases are redirected rather than restored content pages, so no separate indexing request was needed for them; Google should recrawl the 301 targets through the redirect chain.
