# Where-to-Stay Guide CTR Monitoring

## Purpose

Monitor search performance for the four priority where-to-stay guides after the read-only Google Search Console OAuth connection is configured. This workflow evaluates long-tail search relevance through **impressions**, **clicks**, **CTR**, and **average position**; it does not rely on retired FAQ rich-result treatment.

## Monitored canonical URLs

| Guide | Canonical URL |
|---|---|
| Bali | `https://thestayandwander.com/blog/bali-hotel-prices-2026` |
| Bangkok | `https://thestayandwander.com/blog/bangkok-hotel-prices-2026` |
| Tokyo | `https://thestayandwander.com/blog/where-to-stay-in-tokyo-2026` |
| Seoul | `https://thestayandwander.com/blog/where-to-stay-in-seoul-2026` |

## Monthly report specification

The scheduled read-only Search Console query should request the preceding complete calendar month for the `sc-domain:thestayandwander.com` property. Group results by page and, where available, include the top search queries for each page. Each monthly report should contain the following fields, without estimating unavailable values.

| Field | Definition |
|---|---|
| Impressions | Search Console impressions for the canonical page in the reporting period. |
| Clicks | Search Console clicks for the canonical page in the reporting period. |
| CTR | Clicks divided by impressions, as returned by Search Console. |
| Average position | Search Console's average position metric for the canonical page. |
| Month-over-month change | Difference against the prior complete calendar month, calculated only when both months have data. |

## Review cadence

Run on the **first business day of each month at 09:00 GMT+4**, once OAuth credentials and a read-only `webmasters.readonly` connection are available. The report should highlight pages with materially rising impressions but flat clicks, falling CTR, or declining average position, then recommend a content, title, internal-link, or intent-alignment review. It must never submit indexing requests, change Search Console settings, or modify site content automatically.

## Baseline policy

The first successful monthly API run establishes the baseline. Do not backfill or invent performance data in this document; preserve the API response and report any unavailable metrics as unavailable.
