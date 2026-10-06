export type ArticleFaq = Readonly<{
  question: string;
  answer: string;
}>;

export const barcelonaVsLisbonFaqs: readonly ArticleFaq[] = [
  { question: "Is Barcelona or Lisbon cheaper for hotels in summer 2026?", answer: "The cited planning ranges overlap, but they are not directly equivalent: Barcelona's source gives €22–€40 hostel dorms, €55–€95 budget hotels, €95–€190 3-star hotels, and €190–€550+ luxury, while Lisbon's guide gives €153, €220, and €365 averages for 3-, 4-, and 5-star rooms. Summer demand, taxes, location, and exact dates can change the result." },
  { question: "Which city is better for a beach and city trip?", answer: "Barcelona is the clearer beach-and-city combination because urban beaches sit alongside the Gothic Quarter, Eixample, Gaudí architecture, dining, and nightlife. Lisbon is better for riverfront walks, viewpoints, tiled neighborhoods, and Atlantic day trips rather than a central-city beach holiday." },
  { question: "Is Barcelona or Lisbon better for nightlife?", answer: "Barcelona is the stronger starting point when late dinners, beach bars, clubs, and a large summer city-energy scene are the priority. Lisbon's Bairro Alto and Príncipe Real provide a more compact bar-and-restaurant rhythm with a different, hillier feel." },
  { question: "Which city is better for culture and architecture?", answer: "Both are strong. Choose Barcelona for Gaudí, Modernisme, the Gothic Quarter, and major urban landmarks; choose Lisbon for tiled façades, Alfama lanes, viewpoints, trams, Belém, and a more layered historic streetscape." },
  { question: "Are Barcelona and Lisbon crowded in July and August?", answer: "Yes. The cited seasonal references describe July and August as Barcelona's hottest and most crowded period, while Lisbon's June–September window is premium and crowded, with July and August at peak pricing and tighter availability." },
  { question: "Are these Barcelona and Lisbon hotel rates live prices?", answer: "No. They are source-bounded planning benchmarks. Confirm current availability, taxes, room type, occupancy, and cancellation terms with the live search handoff for your dates." },
];
export const baliHotelPricesFaqs: readonly ArticleFaq[] = [
  {
    question: "Where should first-timers stay in Bali?",
    answer:
      "Choose Seminyak for beach clubs, dining, and a social resort atmosphere; Ubud for culture, rice terraces, and wellness; Uluwatu for cliffs and surf; or Canggu for cafés, surf, and longer stays. The guide recommends selecting the area by trip style before comparing individual hotels.",
  },
  {
    question: "Is Seminyak or Ubud better for a first Bali trip?",
    answer:
      "Choose Seminyak when you want beach clubs, restaurants, boutiques, and easy social evenings. Choose Ubud when your priority is temples, rice terraces, wellness, and a slower inland setting.",
  },
  {
    question: "Which Bali area is best for surf and beach time?",
    answer:
      "Uluwatu is the guide's choice for dramatic cliffs, surf breaks, and a slower resort-style beach stay. Canggu also suits surf and beach time, with a more social café and remote-work scene.",
  },
  {
    question: "Should I stay in one Bali area or split my trip?",
    answer:
      "The guide recommends choosing a strong single base and using day trips when you want a lower-friction first visit, especially because Bali traffic can make frequent hotel changes tiring. Split stays make more sense only when you want deliberately different experiences, such as Ubud's inland culture and Uluwatu's coast.",
  },
];

export const bangkokHotelPricesFaqs: readonly ArticleFaq[] = [
  {
    question: "Where should first-timers stay in Bangkok?",
    answer:
      "Sukhumvit is the guide's easiest all-round pick for first-timers because it combines BTS access, dining, shopping, and nightlife. Riverside is better for scenery and temples, Khao San Road for budget Old City energy, and Sathorn for a quieter central base.",
  },
  {
    question: "Which Bangkok area is best for temples and sightseeing?",
    answer:
      "Choose Riverside for boat access to Wat Arun and the Grand Palace in a scenic hotel setting. Khao San Road is the more sociable, budget-minded alternative within walking distance of the Old City temple zone.",
  },
  {
    question: "Is Sukhumvit or Silom better for a first Bangkok trip?",
    answer:
      "Choose Sukhumvit for the widest hotel choice, easy BTS access, malls, dining, and nightlife. Choose Silom when you want a more business-district setting near a BTS/MRT interchange with direct access toward the river and central sights.",
  },
  {
    question: "What is the easiest way to get around Bangkok from my hotel?",
    answer:
      "The guide recommends prioritising a hotel near a BTS or MRT station because Bangkok traffic can make a convenient transit connection more useful than a broadly central address. Riverside travellers can also use river boats for key temple and sightseeing stops.",
  },
];

export const baliHotelPriceIndexFaqs: readonly ArticleFaq[] = [
  {
    question: "What is the average hotel price in Bali per night in 2026?",
    answer:
      "The guide uses regional ranges rather than a single island-wide average: budget stays run from $7–$30 per night, boutique options from $30–$160, private pool villas from $90–$400, and five-star resorts from $180–$1,200+ depending on the Bali zone.",
  },
  {
    question: "Which neighborhood is best to stay in Bali on a budget?",
    answer:
      "Amed and Lovina have the lowest budget range in the index, from $7–$15 per night, and suit travellers prioritising snorkeling, black-sand beaches, and a quieter pace. Ubud is another value-focused option, with budget stays from $8–$18 per night and an inland culture-and-wellness setting.",
  },
  {
    question: "How much do high season rates increase in Bali?",
    answer:
      "The guide states that rates rise 35–60% during July and August and from mid-December through January. Comparing the full tax-inclusive price before booking is particularly important in those higher-demand windows.",
  },
  {
    question: "Are Bali hotel taxes included in the nightly rate?",
    answer:
      "Not always. The guide notes that many listing cards exclude the 10% government tax and 11% service charge, so travellers should allow for an additional 21% surcharge when comparing final accommodation costs.",
  },
];

export const bangkokHotelPriceIndexFaqs: readonly ArticleFaq[] = [
  {
    question: "What is the average hotel price in Bangkok per night in 2026?",
    answer:
      "The guide uses district and tier ranges instead of one citywide average: budget stays run from $8–$35 per night, mid-range options from $35–$150, and five-star properties from $120–$850+ depending on the Bangkok district.",
  },
  {
    question: "Which neighborhood is best to stay in Bangkok on a budget?",
    answer:
      "Khao San and the Old City have the lowest budget range in the index, from $8–$16 per night, and place travellers close to backpacker energy and temples. Silom and Sathorn are another comparatively economical central choice, with budget stays from $12–$22 per night and strong BTS/MRT access.",
  },
  {
    question: "How much do high season rates increase in Bangkok?",
    answer:
      "The guide does not claim a fixed high-season percentage increase. It does document that travelling between May and October can lower mid-range and five-star nightly rates by up to 40%, so dates outside that lower-rate period should be compared carefully using current availability.",
  },
  {
    question: "Are Bangkok hotel taxes included in the nightly rate?",
    answer:
      "Not necessarily. The index advises allowing for a mandatory 17.7% surcharge made up of 7% VAT, 10% service charge, and 0.7% local provincial tax when comparing the final stay cost.",
  },
];

export const uaeExtendedStayHotelsFaqs: readonly ArticleFaq[] = [
  {
    question: "What should I look for in a UAE extended-stay hotel?",
    answer: "Compare a documented kitchen, laundry access, workspace, bedroom layout, Wi-Fi terms, location, and long-stay cancellation conditions before comparing a headline nightly price. The guide recommends requesting an itemized long-stay quote for the same dates and party size.",
  },
  {
    question: "Which UAE extended-stay hotel format is best for business travelers?",
    answer: "The guide highlights Residence Inn Sheikh Zayed Road and Staybridge Suites Dubai Internet City as source-verified options to compare for business use, because their official property pages document kitchens, Wi-Fi, workspace or meeting features, and Metro-oriented business locations. The right choice still depends on the traveler’s office location and live rate terms.",
  },
  {
    question: "Are extended-stay hotel rates cheaper than booking night by night in Dubai?",
    answer: "The guide does not claim a universal rate advantage because no stable first-party cross-brand price comparison was available. Instead, it recommends comparing an itemized long-stay quote with the standard nightly route for identical dates, occupancy, unit type, inclusions, taxes, deposits, and cancellation terms.",
  },
  {
    question: "Which UAE extended-stay options have kitchens and laundry?",
    answer: "The guide’s cited Dubai options document apartment or suite layouts with kitchens and laundry access, including Residence Inn Sheikh Zayed Road, Marriott Executive Apartments Sheikh Zayed Road, Adagio Gold District, Adagio Premium The Palm, and Staybridge Suites Dubai Internet City. Confirm the selected unit’s current inclusions before booking.",
  },
  {
    question: "How should I compare hotel sustainability for a UAE extended stay?",
    answer: "Use group frameworks such as Hilton Travel with Purpose, Marriott Serve 360, Accor’s responsible-hospitality roadmap, and IHG Journey to Tomorrow as a starting point, not a property score. The guide recommends checking the actual property’s current certifications, resource disclosures, refillable amenities, and operating policies before booking.",
  },
];

export const tokyoStayFaqs: readonly ArticleFaq[] = [
  {
    question: "What is the average hotel price in Tokyo per night in 2026?",
    answer: "The guide does not use a single citywide average because rates differ sharply by neighborhood and season. Its typical shoulder-season double-occupancy ranges run from $35–150 per night in Asakusa and $40–160 in Ikebukuro to $70–280 in Ginza, with Shinjuku and Shibuya in between.",
  },
  {
    question: "Where should first-timers stay in Tokyo?",
    answer: "The guide identifies Shinjuku as the easiest, lowest-risk choice for a first Tokyo trip because it is built around a major train hub and gives flexible access across the city. It is a practical base when you want to minimise transit planning and stay close to nightlife, gardens, and entertainment.",
  },
  {
    question: "What is the best area to stay in Tokyo for shopping?",
    answer: "Shibuya is the guide's pick for trendy shopping and youthful energy, with the scramble crossing, Center Gai, and easy access to Harajuku. Ginza is the alternative for luxury shopping and fine dining, but the article notes that it is consistently the most expensive area in the comparison.",
  },
  {
    question: "Which Tokyo neighborhood is best for a budget-conscious stay?",
    answer: "Asakusa and Ikebukuro are the guide's more value-focused options. Asakusa combines traditional atmosphere with typical prices from $35–150 per night, while Ikebukuro offers major transit access with typical prices from $40–160 per night.",
  },
  {
    question: "Is Shinjuku or Shibuya better for a first Tokyo visit?",
    answer: "Choose Shinjuku if you value broad train connections and maximum flexibility. Choose Shibuya if you want to stay in the middle of Tokyo's most photographed, trend-led shopping and nightlife area.",
  },
  {
    question: "When are Tokyo hotel prices highest?",
    answer: "The article flags late March to early April for cherry blossoms and October to November for autumn foliage as higher-demand periods. Typical shoulder-season prices can run 30–50% higher in those windows, so availability should be checked well ahead of travel.",
  },
];

export const seoulStayFaqs: readonly ArticleFaq[] = [
  {
    question: "What is the average hotel price in Seoul per night in 2026?",
    answer: "The guide does not present one citywide average because hotel costs vary by district and travel date. Its typical shoulder-season double-occupancy ranges begin at $30 per night in Hongdae and Insadong, rise to $40–160 in Myeongdong, and reach $55–200+ in Gangnam.",
  },
  {
    question: "Where should first-timers stay in Seoul?",
    answer: "The guide identifies Myeongdong as the easiest first-timer base because it is central, walkable, and close to shopping, street food, and subway access. It also places visitors within reach of Namsan Tower and Myeongdong Cathedral.",
  },
  {
    question: "What is the best area to stay in Seoul for K-pop and nightlife?",
    answer: "Gangnam is the guide's upscale K-culture and nightlife choice, with luxury shopping, trendy cafés, and landmarks such as COEX Mall. Hongdae is the more value-conscious alternative for youthful energy, street performances, indie cafés, and live music.",
  },
  {
    question: "Which Seoul neighborhood offers the best value for hotels?",
    answer: "Hongdae and Insadong begin at the lower end of the guide's typical price ranges, from $30 per night. Hongdae is positioned around youth culture and nightlife, while Insadong is the quieter, traditional choice near palaces and galleries.",
  },
  {
    question: "Is Myeongdong or Gangnam better for a first Seoul trip?",
    answer: "Choose Myeongdong for the simplest central base, especially if convenience, shopping, and first-visit sightseeing are your priorities. Choose Gangnam when you want a trendier, more upscale stay and are comfortable with the guide's higher typical price range.",
  },
  {
    question: "When are Seoul hotel prices highest?",
    answer: "The guide notes that April cherry blossoms and October autumn foliage can raise typical shoulder-season rates by 25–40%. If those seasonal experiences are not the focus of your trip, comparing dates outside those peaks can provide more choice.",
  },
];

export const baliHotelsFaqs: readonly ArticleFaq[] = [
  {
    question: "What are the best budget hotels in Bali in this guide?",
    answer:
      "The budget selections are Pondok Ayu Guest House in Seminyak from $32 per night, Bisma Cottages in Ubud from $38, and The Layar Guesthouse in Canggu from $45. Each is presented as an under-$50 option with a distinct location and traveller fit.",
  },
  {
    question: "Which Bali area is best for nightlife, wellness, or surf?",
    answer:
      "The guide positions Seminyak and Kuta for nightlife and beach clubs, Ubud for culture and wellness, Canggu for digital nomads and surf, and Uluwatu for clifftop sunsets and surfing. Nusa Dua is presented as the calmer luxury-resort choice.",
  },
  {
    question: "Which mid-range Bali hotels does the article recommend?",
    answer:
      "The mid-range picks include Alaya Resort Ubud from $89, Katamama Hotel in Seminyak from $120, and Komaneka at Bisma in Ubud from $145 per night. The article highlights their pool, design, spa, jungle, or valley-view strengths for different traveller types.",
  },
  {
    question: "When should I book a hotel in Bali?",
    answer:
      "The article says July–August and December–January are the busiest, most expensive periods and recommends booking 6–8 weeks ahead in peak season. It identifies April and October as a shoulder-season option with fewer crowds and lower hotel prices.",
  },
];

export const baliFourStarHotelsFaqs: readonly ArticleFaq[] = [
  {
    question: "How much do four-star hotels in Bali cost in 2026?",
    answer:
      "The article places most of its featured four-star hotels between $80 and $220 per night, with area ranges from $65–160 in Sanur to $100–250 in Nusa Dua. It describes this category as the value sweet spot between basic stays and ultra-luxury resorts.",
  },
  {
    question: "Which four-star Bali hotels are under $100 per night?",
    answer:
      "The guide lists Layar Villas Seminyak from $88, Alaya Resort Ubud from $89, and Desa Potato Head in Canggu from $95 per night. These choices are paired with different strengths, including rooftop, jungle-infinity, and beach-club experiences.",
  },
  {
    question: "Which Bali area suits a four-star wellness or beach stay?",
    answer:
      "The article describes Ubud as the culture-and-wellness choice, while Seminyak is for beach clubs and nightlife and Uluwatu is for clifftop scenery and waves. It positions Canggu around digital-nomad and surf culture, with Nusa Dua for beach-oriented resort stays.",
  },
  {
    question: "When should I book a four-star hotel in Bali?",
    answer:
      "The guide says four-star prices can rise 40–60% during July–August and December–January and recommends booking at least six weeks ahead for peak travel. It also identifies April, May, September, and October as shoulder-season months with lower prices.",
  },
];

export const asiaFlightDealsFaqs: readonly ArticleFaq[] = [
  {
    question: "What are the cheapest days to fly to Asia?",
    answer:
      "The article identifies Tuesday, Wednesday, and Thursday as the typical cheapest days to fly to Asia. It says weekend departures are consistently 20–30% more expensive.",
  },
  {
    question: "How far in advance should I book Asia flights?",
    answer:
      "The guide says booking 6–10 weeks ahead usually balances availability and price. For seasonal travel, it gives earlier planning windows, such as booking summer flights by April and autumn flights in June or July.",
  },
  {
    question: "Can a layover make flights to Asia cheaper?",
    answer:
      "The article says non-stop flights are convenient but more expensive than options with a connection. It lists layovers through Istanbul, Doha, Dubai, or Kuala Lumpur as potential ways to save $200–400 on Tokyo or Bali flights.",
  },
  {
    question: "When should I book for Japan's cherry blossom season?",
    answer:
      "The guide places Japan's cherry blossom period in late March to early April and says hotel and flight prices rise significantly then. For spring travel generally, it recommends booking in December or January.",
  },
];

export const brazilTravelGuideFaqs: readonly ArticleFaq[] = [
  {
    question: "When is the best time to visit Brazil?",
    answer:
      "The guide recommends April to October as Brazil's dry season. It notes that Carnival falls in February or March and is extremely busy, so accommodation should be booked about six months ahead for that period.",
  },
  {
    question: "How do I get to the Amazon from Rio or São Paulo?",
    answer:
      "The article recommends flying to Manaus from Rio or São Paulo, a journey of about four hours. From Manaus, it says travellers transfer by river boat for one to two hours to reach a jungle lodge.",
  },
  {
    question: "What daily budget should I plan for Brazil?",
    answer:
      "The guide estimates $60–80 per day for a budget traveller, $120–180 for a mid-range traveller, and $300–600 for luxury travel. It also estimates a 14-day mid-range Brazil trip including international flights at $1,800–3,200 per person.",
  },
  {
    question: "What is the best way to get around Brazil?",
    answer:
      "The article recommends domestic flights for Brazil's long distances and names LATAM, Azul, and Gol as the main carriers. For shorter routes, it says buses are comfortable, including the six-hour Rio–São Paulo route.",
  },
  {
    question: "What language and currency are used in Brazil?",
    answer:
      "Portuguese is the official language, with English more limited outside major tourist areas and upmarket hotels. The currency is the Brazilian Real, and the guide recommends preparing offline Portuguese translation support before travelling.",
  },
];

export const bangkokVsSeoulFaqs: readonly ArticleFaq[] = [
  { question: "Is Bangkok or Seoul cheaper for hotels in 2026?", answer: "The published planning bands put Bangkok's budget floor lower, from about $8 per night, while Seoul's value-oriented districts start around $30. Final prices vary by district, dates, occupancy, taxes, and room type." },
  { question: "Which city is better for a first-time Asia trip?", answer: "Bangkok is the stronger starting point when broad hotel choice, temples, street food, and BTS/MRT planning are the priority. Seoul is a strong fit for subway-connected neighborhoods, markets, cafés, shopping, and nightlife districts." },
  { question: "Which city has better food for a budget traveler?", answer: "Both cities have strong value at markets and casual restaurants. Bangkok's guide emphasizes a broad street-food range, while Seoul's dining index separates market bites, Korean meals, cafés, and premium districts." },
  { question: "Does transport change the hotel decision in Bangkok and Seoul?", answer: "Yes. Bangkok's guide notes that BTS/MRT proximity can cost more at the room level but reduce daily taxi spending. Seoul's subway access and station walk likewise belong in the total-stay comparison." },
  { question: "Which city is better for nightlife?", answer: "Seoul is the clearer fit for comparing Hongdae, Itaewon, and Gangnam nightlife districts. Bangkok offers a different mix of riverside, Sukhumvit, Old City, and street-level evening experiences." },
  { question: "Are these live hotel prices?", answer: "No. The ranges are directional planning benchmarks carried from the published city guides. Use the live search handoff for current availability, taxes, and final booking terms." },
];

export const baliVsPhuketFaqs: readonly ArticleFaq[] = [
  { question: "Is Bali or Phuket cheaper for accommodation in 2026?", answer: "The published Bali index has a lower budget floor, beginning around $7 per night, while the cited Phuket budget research begins around $9. These are directional bands, not live quotes, and beach location and season can change the final price." },
  { question: "Which is better for a family beach holiday?", answer: "Bali is the stronger comparison starting point when you want to choose between calmer, reef-protected and family-oriented regions such as Nusa Dua and Sanur. Phuket can work well when a compact resort base is the priority." },
  { question: "Which destination is better for nightlife?", answer: "Phuket is the more compact nightlife-led choice around Patong. Bali spreads nightlife across several coastal areas, so the best fit depends on whether you want a single-base resort trip or more regional variety." },
  { question: "Which destination is better for a quiet wellness trip?", answer: "Bali offers more distinct quiet-stay directions, including Ubud wellness and quieter east and north coast planning. Phuket can suit a slower resort stay, especially when minimizing transfers matters." },
  { question: "How do Bali and Phuket differ for activities?", answer: "Bali combines beaches with surf, snorkeling, temples, wellness, and villa-group planning across multiple regions. Phuket is well suited to beach-resort days, boat trips, and a simpler single-base holiday rhythm." },
  { question: "Are the Phuket rates live hotel prices?", answer: "No. The Phuket bands are source-bounded research notes used for orientation, while Bali's figures come from the published price index. Confirm current availability, taxes, room type, and resort terms through the live search handoff." },
];

export const dubaiVsAbuDhabiFaqs: readonly ArticleFaq[] = [
  { question: "Is Dubai or Abu Dhabi cheaper for hotels in 2026?", answer: "The planning bands in this comparison put simple Dubai bases around $30–$90 and Abu Dhabi bases around $45–$100, while both cities have wide mid-range and luxury spreads. These are directional benchmarks, not live quotes; dates, room type, taxes, and events can change the final price." },
  { question: "Which UAE city is better for a first-time visitor?", answer: "Dubai is the easier starting point when skyline landmarks, shopping, dining, desert experiences, and a broad choice of recognizable areas lead the trip. Abu Dhabi is a strong alternative when culture, beaches, family attractions, and a more measured itinerary matter more." },
  { question: "Is Abu Dhabi better for families?", answer: "Abu Dhabi is the stronger starting point in this guide when family attractions, beaches, cultural landmarks, and a less rushed itinerary are the priority. The best choice still depends on the exact attraction mix and hotel location." },
  { question: "What is Dubai best known for compared with Abu Dhabi?", answer: "The comparison uses Dubai as the high-contrast metropolis of skyline landmarks, major malls, traditional souks, waterfront dining, desert experiences, and nightlife or events. Abu Dhabi is framed around culture, heritage landmarks, museums, beaches, relaxation, and family planning." },
  { question: "Is Abu Dhabi quieter than Dubai?", answer: "This guide treats Abu Dhabi as a more measured planning rhythm, not as a universal crowd or noise ranking. Hotel location, events, season, and the attractions you choose still determine how busy the trip feels." },
  { question: "Are these live UAE hotel prices?", answer: "No. The ranges are planning benchmarks carried from the published UAE guides and should not be read as live availability or a property ranking. Use the live search handoff for current rates, taxes, and booking terms." },
];

export const tokyoVsOsakaFaqs: readonly ArticleFaq[] = [
  { question: "Is Tokyo or Osaka cheaper for hotels in 2026?", answer: "The directional bands in this comparison put value Tokyo bases around $35–$160+ and Osaka bases around $30–$90, with both cities widening considerably for central and premium stays. Check your dates, district, occupancy, and taxes before treating the difference as a saving." },
  { question: "Should first-time visitors choose Tokyo or Osaka?", answer: "Tokyo is the stronger single-city starting point when you want maximum landmark variety, district choice, and rail-connected flexibility. Osaka is the better starting point when food, a relaxed city rhythm, and Kansai day trips are the main reason for the trip." },
  { question: "How many days should I spend in Tokyo and Osaka?", answer: "For a seven-day first Japan trip, the guide uses four nights Tokyo and three nights Osaka as a practical starting split. If food and Kansai history lead the brief, reverse the emphasis to three nights Tokyo and four nights Osaka." },
  { question: "Is Osaka better for food than Tokyo?", answer: "Osaka is the more immediately food-led and relaxed comparison, with Dotonbori, Minami, Tenma, and Ura Namba making casual eating central to the trip. Tokyo offers greater overall breadth across markets, neighborhood restaurants, food halls, and high-end dining." },
  { question: "Can I visit Kyoto and Nara from Osaka?", answer: "Yes. The comparison positions Osaka as a useful Kansai base for trips to Kyoto and Nara, alongside Osaka Castle and historic neighborhoods. Allow for the exact rail route and day-trip timing when choosing your hotel area." },
  { question: "Are the Tokyo and Osaka rates live hotel prices?", answer: "No. They are directional planning bands based on the cited Tokyo guide and Osaka tourism context. Use the live search handoff to confirm current availability, room type, taxes, and final terms." },
];

export const bangkokVsHoChiMinhFaqs: readonly ArticleFaq[] = [
  { question: "Is Bangkok or Ho Chi Minh City cheaper for hotels in 2026?", answer: "Bangkok has the lower published hotel floor at about $8 per night, while the dated Ho Chi Minh City hotel bands begin around $10. Ho Chi Minh City can be excellent value for independent rooms, but central 4-star and 5-star platform averages can be higher than the entry-level bands suggest." },
  { question: "Which city is better for a budget traveler?", answer: "Bangkok is the stronger starting point when the lowest hotel floor and a wide choice of budget districts matter most. Ho Chi Minh City is a strong alternative when low-cost street food, coffee, and inexpensive short rides are more important than rail connectivity." },
  { question: "Which city has cheaper food, Bangkok or Ho Chi Minh City?", answer: "Both cities support low-cost eating, but the cited Ho Chi Minh City research gives especially clear budget signals: banh mi around $0.80–$1.40, pho around $1.80–$2.80, and Vietnamese coffee around $0.80–$2.00. Bangkok's published guide emphasizes a broad street-food range rather than one fixed city average." },
  { question: "Is Bangkok or Ho Chi Minh City easier to get around?", answer: "Bangkok is the better fit when BTS/MRT rail access is central to the plan. Ho Chi Minh City has inexpensive short GrabBike and Grab car trips, but traffic is a bigger part of the daily movement trade-off." },
  { question: "Which city is better for a first-time Southeast Asia trip?", answer: "Bangkok is the more immediately varied first-time choice for temples, shopping, river access, rail-connected districts, street food, and nightlife. Ho Chi Minh City is a compelling first city when café culture, historic central districts, and a more compact street-level rhythm are the priority." },
  { question: "Are the Bangkok and Ho Chi Minh City rates live hotel prices?", answer: "No. The comparison combines published planning bands, dated research, and a dynamic platform snapshot that is shown only as current context. Confirm the exact dates, taxes, room type, occupancy, and final availability through the live search handoff." },
];

export const tokyoOrBangkokFlightDealsFaqs: readonly ArticleFaq[] = [
  { question: "Is Tokyo or Bangkok cheaper to fly to in 2026?", answer: "The published route snapshot used in this guide shows Bangkok from Dubai at $180 and Tokyo from Abu Dhabi at $420, but those are different origins. Compare the exact departure airport, dates, baggage, cabin, and stopover terms in the live widget before deciding which destination is cheaper for your trip." },
  { question: "When should I book a flight to Tokyo or Bangkok?", answer: "The established Asia flight guide recommends searching by April for summer travel, June–July for autumn, September–October for winter, and December–January for spring. Start earlier for Tokyo's late-March to early-April blossom period and for Christmas or New Year travel." },
  { question: "Which destination usually has fewer flight stops?", answer: "It depends on the departure airport and schedule. The published snapshot documents multiple daily Los Angeles–Tokyo services and direct-service examples from major hubs, while Bangkok also has direct and one-stop options. Use the live search with a non-stop or maximum-stops filter rather than relying on a citywide rule." },
  { question: "Are the prices on this page live flight fares?", answer: "No. They are dated planning examples carried from the published Asia flight-deals guide. The embedded Aviasales widget is the live step for current fares, taxes, baggage rules, stopovers, and availability." },
  { question: "Can I use the same flight search for Tokyo and Bangkok?", answer: "Yes. The page reuses the same Aviasales/Travelpayouts widget and canonical affiliate deep link as the established Asia flight-deals guide. Enter the exact origin, destination, dates, and passenger details to compare both searches." },
  { question: "Is a one-stop flight worth considering for Asia?", answer: "Often. The existing guide notes that a connection can save money, but the total value depends on the connection length, airport change, baggage, and overnight costs. Compare the complete itinerary rather than the lowest headline fare alone." },
];

export const articleFaqsByPath: Readonly<Record<string, readonly ArticleFaq[]>> = {
  "/blog/where-to-stay-in-bali-2026": baliHotelPricesFaqs,
  "/blog/where-to-stay-in-bangkok-2026": bangkokHotelPricesFaqs,
  "/blog/where-to-stay-in-tokyo-2026": tokyoStayFaqs,
  "/blog/where-to-stay-in-seoul-2026": seoulStayFaqs,
  "/blog/best-hotels-bali-2026": baliHotelsFaqs,
  "/blog/best-4-star-hotels-bali-2026": baliFourStarHotelsFaqs,
  "/blog/best-flight-deals-asia-2026": asiaFlightDealsFaqs,
  "/blog/brazil-travel-guide-2026": brazilTravelGuideFaqs,
  "/blog/bali-hotel-price-index-2026": baliHotelPriceIndexFaqs,
  "/blog/bangkok-hotel-price-index-2026": bangkokHotelPriceIndexFaqs,
  "/blog/uae-extended-stay-hotels-2026": uaeExtendedStayHotelsFaqs,
  "/blog/bangkok-vs-seoul-2026": bangkokVsSeoulFaqs,
  "/blog/bali-vs-phuket-2026": baliVsPhuketFaqs,
  "/blog/dubai-vs-abu-dhabi-2026": dubaiVsAbuDhabiFaqs,
  "/blog/tokyo-vs-osaka-2026": tokyoVsOsakaFaqs,
  "/blog/bangkok-vs-ho-chi-minh-city-2026": bangkokVsHoChiMinhFaqs,
  "/blog/barcelona-vs-lisbon-2026": barcelonaVsLisbonFaqs,
  "/blog/tokyo-or-bangkok-flight-deals-2026": tokyoOrBangkokFlightDealsFaqs,
};

export function getArticleFaqs(pathname: string): readonly ArticleFaq[] {
  const normalizedPath = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  return articleFaqsByPath[normalizedPath] ?? [];
}
