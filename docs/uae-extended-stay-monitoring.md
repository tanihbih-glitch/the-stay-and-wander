# UAE Extended-Stay Hub Monitoring

## Scope

The canonical monitoring target is `/blog/uae-extended-stay-hotels-2026`. It is reviewed separately from the site’s established CTR-first price-guide workflow because its anticipated query mix includes comparison-shaped and assistant-style prompts where a click is not the only meaningful outcome.

The existing task, `search-console-where-to-stay-monthly-ctr` (`JXTFqNB6NnfvtLrgKHXNgM`), remains unchanged. It retains its October 8, 2026, 09:00 UTC run and does **not** collect the new hub.

The independent task, `search-console-uae-extended-stay-position` (`PRFVQ9EgjeynvutxFoUVXq`), is enabled with the UTC schedule `0 0 9 1-7 * *`. It invokes the protected handler during the first seven days of every month; the handler itself collects exactly once on the **first business day**, beginning November 2, 2026, after the hub has one complete published calendar month. This split permits weekend-first months without weakening the cron guard.

## Monthly review

The dedicated position-led job stores the canonical hub’s page-level Search Console impressions, clicks, CTR, and average position in its own immutable snapshot table. Its `uaeExtendedStayHubFollowUp` payload compares the new page’s position against the legacy sustainability article’s July 13–September 6, 2026, reference position of **25.88**. This is a directional transition reference, not a claim that the two pages share identical intent.

| Metric | Primary interpretation |
|---|---|
| Average position | Primary automated success signal; review the trend across four to six weeks. |
| Impressions | Diagnostic visibility signal. |
| CTR and clicks | Secondary context only; do not optimize the hub around assistant-style prompts solely to raise CTR. |
| Citation presence | Manual monthly review. Search Console’s API does not provide a citation-presence field. Record whether the canonical hub appears as a cited source or result for relevant UAE extended-stay comparison queries. |

The manual citation check should record the date, query context, whether the canonical hub appeared, and the result URL or supporting screenshot. It should not claim automated backlink or AI-citation detection.

## Migration gate

Keep `/blog/uae-extended-stay-sustainability-2026` live while the new hub is discovered and its indexed status is confirmed. Only then add the 301 redirect, remove the old path from canonical sitemap discovery, update residual links, and preserve the old page as a legacy reference in reporting notes. This publication intentionally does **not** change that route’s canonical response or sitemap presence.
