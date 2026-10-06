import CityComparisonGuide, { type CityComparisonConfig } from "@/components/CityComparisonGuide";
import { bangkokVsSeoulFaqs } from "@shared/articleFaqs";

export const articleMetadata = {
  title: "Bangkok vs Seoul 2026: Which City Costs Less?",
  description: "Compare Bangkok and Seoul hotel tiers, food, transport, and traveler fit in 2026—with published ranges and a live availability handoff.",
  url: "/blog/bangkok-vs-seoul-2026",
  image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
  keywords: "Bangkok vs Seoul 2026, Bangkok hotel prices, Seoul hotel prices, Bangkok or Seoul cheaper, Asia city comparison",
};

const config: CityComparisonConfig = {
  ...articleMetadata,
  label: "Asia city comparison · 2026 planning guide",
  intro: "Bangkok and Seoul both reward first-time visitors with excellent transit, food, and distinct neighborhoods—but the daily budget and trip rhythm are different. Compare the published hotel bands, choose your traveler fit, then check live dates.",
  updated: "2026-10-06",
  cityA: { name: "Bangkok", flag: "🇹🇭", range: "$8–$850+/night", tierRows: ["Hostels / budget: $8–$35", "3–4 star mid-range: $35–$150", "5-star luxury: $120–$850+"], summary: "Published district bands span Khao San, Sukhumvit, Silom, Siam, and Riverside." },
  cityB: { name: "Seoul", flag: "🇰🇷", range: "$30–$200+/night", tierRows: ["Value districts: $30–$150+", "Central first-timer: $40–$160+", "Premium lifestyle: $55–$200+"], summary: "Published district bands span Hongdae, Itaewon, Myeongdong, Gangnam, and Insadong." },
  tableRows: [
    { label: "Hostel / budget", a: "$8–$35/night", b: "$30–$55+/night" },
    { label: "3–4 star mid-range", a: "$35–$150/night", b: "$40–$160+/night" },
    { label: "5-star luxury", a: "$120–$850+/night", b: "$55–$200+/night" },
  ],
  selector: [
    { id: "budget", label: "Budget traveler", city: "a", reason: "Bangkok is the stronger starting point when the lowest published accommodation bands and broad tier choice matter most." },
    { id: "foodie", label: "Foodie", city: "b", reason: "Seoul is the stronger starting point if district food culture, markets, cafés, and Korean dining neighborhoods are the trip anchor." },
    { id: "first-timer", label: "First-timer", city: "a", reason: "Bangkok offers a broad range of central districts and a clear BTS/MRT planning lens for a first city break." },
    { id: "nightlife", label: "Nightlife", city: "b", reason: "Seoul is the stronger starting point for a deliberate Hongdae, Itaewon, and Gangnam nightlife comparison." },
  ],
  foodTitle: "Street food, markets, and dining range",
  foodCopy: "Bangkok’s price guide emphasizes wide value across markets, casual dining, and premium Riverside or Siam stays. Seoul’s dining index distinguishes market bites, mid-range Korean meals, cafés, and premium Gangnam dining—so neighborhood choice changes the daily total.",
  transportCopy: "Bangkok’s guide notes that BTS/MRT proximity can carry a rate premium but offset daily taxi costs. Seoul’s subway-connected districts likewise make access a core part of the stay decision; compare the station walk, not just the room headline.",
  activityTitle: "Match the city to the trip rhythm",
  activityCopy: "Choose Bangkok for temples, riverfront stays, street food, and a high-contrast city itinerary. Choose Seoul for food markets, cafés, palace neighborhoods, shopping, and nightlife districts that feel deliberately different from one another.",
  related: [
    { href: "/blog/bangkok-hotel-price-index-2026", label: "Bangkok Hotel Price Index", description: "See district-level Bangkok bands, transit access, tax context, and planning tools." },
    { href: "/blog/seoul-food-price-index-2026", label: "Seoul Food & Dining Price Index", description: "Compare Seoul districts for street food, BBQ, cafés, and premium meals." },
    { href: "/blog/tokyo-vs-bangkok-2026", label: "Tokyo vs Bangkok", description: "Continue the Asia-city comparison with cost, culture, transport, and trip-fit context." },
  ],
  sources: [
    { href: "/blog/bangkok-hotel-price-index-2026", label: "Bangkok Hotel Price Index (The Stay & Wander)", note: "Published Bangkok district and tier bands, transit access, tax context, and transfer planning." },
    { href: "/blog/seoul-food-price-index-2026", label: "Seoul Food & Dining Price Index (The Stay & Wander)", note: "Published Seoul district dining, café, nightlife, and daily-cost benchmarks." },
    { href: "/blog/where-to-stay-in-seoul-2026", label: "Where to Stay in Seoul (The Stay & Wander)", note: "Published Seoul neighborhood and room-tier planning context." },
    { href: "/blog/tokyo-vs-bangkok-2026", label: "Tokyo vs Bangkok (The Stay & Wander)", note: "Related Asia-city comparison context for cost, culture, transport, and trip fit." },
  ],
  faqs: bangkokVsSeoulFaqs,
};

export default function BlogBangkokVsSeoul() { return <CityComparisonGuide config={config} />; }
