# Phase 1 Tracking and Overlap Audit — 2026-10-14

## Scope and safety boundary

This report covers the requested **read-only** Search Console overlap audit and validation of the staged analytics implementation. No additional website or account changes were made during this audit.

Search Console period observed: **13 Jul 2026–11 Oct 2026** (the connected property displayed 3 months).

## GA4 validation

- Measurement ID shown in the connected GA4 property: `G-GSDKNJEM0R`.
- GA4 **Internal Traffic** filter: **Active** after the user's explicit confirmation.
- Staged site event contract: `property_link_click`, `enquiry_submit`, `tool_use`, `flight_widget_click`, and `outbound_affiliate_click`.
- Staged tracking includes page slug attribution and existing Travelpayouts widget `sub_id` attribution.
- Local validation: **44 test files / 233 tests passed**, TypeScript passed, production build passed, and `git diff --check` passed.
- Live-event limitation: the tracking implementation remains uncheckpointed/unpublished in the workspace, so GA4 DebugView cannot yet prove events from production. GA4's Analytics home previously showed “No data received from your website yet.” The correct next verification is after publication: opt in to analytics on the live site, trigger each event class, and confirm the event names in DebugView.

## Search Console page-level evidence

| Cluster | Page | Clicks | Impressions | Avg. position | Top observed queries |
|---|---|---:|---:|---:|---|
| Bali | `/blog/bali-hotel-price-index-2026` | 11 | 3.8K | 7.9 | `bali hotel average price per night 2026` (43), `bali hotel average nightly price 2026` (26), `bali hotel average price 7 nights 2026` (16), `average hotel price in bali` (6) |
| Bali | `/blog/where-to-stay-in-bali-2026` | 0 | 4 | 40.8 | `haa` (1) |
| Bali | `/blog/bali-beach-comparison-matrix-2026` | 1 | 32 | 11.9 | `which has better beaches` (1) |
| Bali | `/blog/bali-spa-wellness-price-index-2026` | 2 | 230 | 7.8 | `massage in bali price` (2), `balinese spa in bali` (2), `bali massage cost` (1), `bali massage prices` (1), `best spa in bali` (1) |
| Bali | `/blog/best-hotels-bali-2026` | 1 | 540 | 8.4 | `bali hotel average price per night 2026` (3), `how much does it cost to stay in bali` (1), `cheap hotels bali` (1), `best budget hotels bali 2026` (1) |
| Bali | `/blog/best-4-star-hotels-bali-2026` | 0 | 84 | 11.5 | `4 star hotels in bali` (5), `bali 4 star hotel average nightly rate 2026` (1), `bali hotel average price per night 2026 budget mid range` (1) |
| Bali | `/blog/things-to-do-in-bali-2026` | 1 | 17 | 31.2 | `what to do in bali 2026` (1), `things to do in bali 2026` (1) |
| Bali | `/blog/bali-vs-phuket-2026` | 0 | 0 | 0 | No data |
| Bangkok | `/blog/bangkok-hotel-price-index-2026` | 5 | 2.7K | 8.1 | `what is the average cost of a hotel in bangkok?` (19), `compare hotel prices in bangkok for november trip` (15), `bangkok hotel average price per night 2026` (13), `bangkok hotel average nightly price 2026` (10) |
| Bangkok | `/blog/where-to-stay-in-bangkok-2026` | 0 | 25 | 27.9 | `where to stay in bangkok` (2), `best location to stay in bangkok` (1), `where should i stay in bangkok for the first time` (1) |
| Bangkok | `/blog/bangkok-hotel-budget-breakdown-2026` | 0 | 1.32K | 8.9 | `bangkok hotel average price per night 2026` (28), `bangkok hotel average nightly price 2026` (18), `bangkok hotel average price 2026` (8), `bangkok budget hotel average price 2026` (7) |
| Bangkok | `/blog/bangkok-airport-hotels-2026` | 2 | 629 | 11.7 | `places to stay near bangkok airport` (29), `bangkok layover hotel` (27), `bangkok suvarnabhumi hotel - 90` (17), `hotel near bangkok airport rail link - 340` (7) |
| Bangkok | `/blog/bangkok-vs-ho-chi-minh-city-2026` | 0 | 7 | 11.0 | `bangkok vs ho chi minh city` (1) |

## Query overlap and recommended ownership

| Overlapping query/theme | Pages observed | Recommended owner | Action |
|---|---|---|---|
| `bali hotel average price per night 2026` / related Bali average-price variants | Bali price index; Best Hotels Bali; Best 4-Star Hotels Bali | `/blog/bali-hotel-price-index-2026` | Keep the index as the canonical numerical owner. Keep supporting hotel-list pages, but link them clearly to the index; no merge/301 recommended from this evidence alone. |
| `bangkok hotel average price per night 2026` / related Bangkok average-price variants | Bangkok price index; Bangkok budget breakdown | `/blog/bangkok-hotel-price-index-2026` | Keep the index as the benchmark owner. Position budget breakdown around daily spend and link to the index; no merge/301 recommended from this evidence alone. |
| Bali hotel cost / budget intent | Bali price index; Best Hotels Bali; Best 4-Star Hotels Bali | `/blog/bali-hotel-price-index-2026` for prices, `/blog/best-hotels-bali-2026` for property selection | No merge recommended; intent is adjacent but distinguishable. |
| Bangkok accommodation intent | Bangkok price index; Bangkok budget breakdown; Where to Stay Bangkok; Bangkok airport hotels | Price index for rates; Where to Stay for district intent; Airport guide for layovers; Budget breakdown for daily spend | No merge recommended; these are distinct intents and currently show different query sets. |
| Bali spa pricing | Bali Spa & Wellness index only | `/blog/bali-spa-wellness-price-index-2026` | No overlap requiring action. |
| Bali beach comparison | Bali Beach Comparison only | `/blog/bali-beach-comparison-matrix-2026` | No overlap requiring action. |

## Conclusion

The clearest cannibalization risk is between the two price-index pages and their closely related hotel-list/budget pages, but the live query evidence supports **canonical ownership plus stronger internal linking**, not a 301 merge at this stage. The Bangkok budget page is already being repositioned toward daily spend, which is the appropriate separation. The Bali and Bangkok where-to-stay pages are receiving different district-intent queries and should remain separate.
