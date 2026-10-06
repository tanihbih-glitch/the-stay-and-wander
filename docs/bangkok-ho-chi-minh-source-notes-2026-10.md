# Bangkok vs Ho Chi Minh City — source notes (2026-10-07)

## Scope

This comparison uses the site's published Bangkok guides plus dated third-party research for Ho Chi Minh City (HCMC). Hotel ranges are planning bands, not live quotes or rankings. Food and transport figures are city-cost context; exact dates, district, occupancy, taxes, and room type can change a booking total.

## Bangkok sources

1. **The Stay & Wander — Bangkok Hotel Price Index (2026)**
   URL: https://thestayandwander.com/blog/bangkok-hotel-price-index-2026
   Relevant evidence: district benchmark table shows hostels/budget at $8–$35/night, 3–4-star mid-range at $35–$150/night, and 5-star luxury at $120–$850+/night. It also explains BTS/MRT proximity, a published 17.7% surcharge context, and transfer planning.
2. **The Stay & Wander — Bangkok Hotel Budget Breakdown (2026)**
   URL: https://thestayandwander.com/blog/bangkok-hotel-budget-breakdown-2026
   Relevant evidence: published budget, mid-range, and luxury accommodation tiers and booking-planning context.

## Ho Chi Minh City sources

1. **Vietnam With Me — Vietnam Hotel Prices: Ultimate Budget to Luxury Guide**
   URL: https://vietnamwithme.com/2026/07/07/vietnam-hotel-prices/
   Accessed/retrieved 2026-10-07; page says published 2026-07-07 and updated 2026-10-02. HCMC table: budget $10–$20, mid-range $30–$60, luxury $120–$400. The HCMC section says District 1 private rooms can start around $15, most mid-range hotels hover $30–$80, and gives illustrative examples around $23, $37, and $104; these are not treated as guaranteed property rates.
2. **Day Trips Vietnam — Vietnam Travel Cost Index 2026**
   URL: https://daytripsvietnam.com/guides/vietnam-travel-cost-index-2026/
   Accessed/retrieved 2026-10-07; page attributes accommodation observations to April 2026. HCMC accommodation bands: hostel dorm $10–$18; private guesthouse $28–$55; 3-star $55–$100; boutique 4-star $140–$240; 5-star $280–$650. HCMC food benchmarks: pho $1.80–$2.80 (45,000–70,000 VND), famous pho up to $3.60, banh mi $0.80–$1.40, mid-range restaurant main $3.50–$8.50, Vietnamese coffee $0.80–$2.00. Local transport: Grab/Be motorbike $0.80–$2.00 for a short ride, Grab car $2.00–$4.80, airport transfer $10–$16, public bus $0.30–$0.40, group day tours $15–$35. Its sample Vietnam budgets are around $53/day backpacker and $129/day mid-range, but those samples cover multi-city itineraries; do not present them as HCMC-only averages.
3. **Trip.com — Ho Chi Minh City hotels**
   URL: https://us.trip.com/hotels/ho-chi-minh-city-hotels-list-301/
   Accessed/retrieved 2026-10-07. Dynamic page reports 4,115 properties, weekday average $93 and weekend average $99. Its latest-12-month FAQ reports HCMC 3-star average $75 weekday/$82 weekend, 4-star $168/$178, and 5-star $362/$364. These are dynamic platform figures and are presented only as current availability context, not a guaranteed rate.

## Content boundaries

- Do not claim Bangkok or HCMC is universally cheaper; compare the cited bands and note that HCMC's central 4-star/5-star platform averages can sit above its low-cost independent-room floor.
- Do not turn individual hotel examples into endorsements.
- Do not treat dynamic Trip.com figures as fixed 2026 averages; label them current platform context.
- The comparison selector is deterministic and browser-local: it maps four user priorities to one city and one reason; it does not score, persist, track, or query live prices.


## Additional sources for neighborhood and season filters

4. **Vietcetera — A Guide To Ho Chi Minh City's Districts**
   URL: https://vietcetera.com/en/a-guide-to-ho-chi-minh-citys-districts-understanding-the-city
   Retrieved 2026-10-07. District 1 is the commercial/business core and tourist starting point; District 2/Thao Dien is more international, spacious, amenity-rich, and family-oriented; District 3 combines colonial architecture, restaurants, temples, parks, and street food; District 4 is especially noted for affordable Vietnamese street food and a young independent community; District 5/Cho Lon is the Chinese-heritage area with markets, teahouses, pagodas, and Chinese food; District 7/Phu My Hung is quieter, cleaner, international, and family-oriented but farther from the center; Binh Thanh has local street food and a mix of local/international restaurants.

5. **KAYAK — Ho Chi Minh City hotels**
   URL: https://www.kayak.com/Ho-Chi-Minh-City-Hotels.18144.hotel.ksp
   Retrieved 2026-10-07. Dynamic booking insights say August is the cheapest month in one displayed series at $159 average and December the most expensive at $225; a separate “Good to know” table identifies September as low season and June as high season, with average weeknight/weekend figures varying by the displayed window. The page also reports District 1 as the most searched neighborhood with a displayed average of $89 and advises that rates vary by dates. These are dynamic platform signals, not fixed city-wide rates.

### Seasonal implementation boundary

The month filter uses only the KAYAK-reported seasonal direction as a transparent planning signal: August is labeled the lowest displayed month, December the highest displayed month, September/October low-season context, June high-season context, and other months are labeled transition/standard rather than assigned invented numeric averages. The PDF and UI must keep the dated/dynamic caveat visible and should not imply that an interpolated month is a quoted rate.
