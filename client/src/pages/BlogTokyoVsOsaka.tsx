import CityComparisonGuide, { type CityComparisonConfig } from "@/components/CityComparisonGuide";
import { tokyoVsOsakaFaqs } from "@shared/articleFaqs";

export const articleMetadata = {
  title: "Tokyo vs Osaka 2026: Which Japan City Fits You?",
  description: "Compare Tokyo and Osaka hotel tiers, food, transport, trip rhythm, and traveler fit in 2026—with a practical split-your-time plan.",
  url: "/blog/tokyo-vs-osaka-2026",
  image: "/manus-storage/tokyo-where-to-stay-hero_78be225b.jpg",
  keywords: "Tokyo vs Osaka 2026, Tokyo or Osaka, Osaka hotel prices, Tokyo hotel prices, Japan city comparison",
};

const config: CityComparisonConfig = {
  ...articleMetadata,
  label: "Japan city comparison · 2026 planning guide",
  intro: "Tokyo and Osaka are not an either-or decision for many Japan trips. Compare their planning bands and personalities, then decide how to split your time between a vast rail-connected metropolis and a relaxed, food-led Kansai base.",
  updated: "2026-10-07",
  cityA: { name: "Tokyo", flag: "🇯🇵", range: "$35–$280+/night", tierRows: ["Value: $35–$160+", "Central city: $50–$210+", "Premium central: $70–$280+"], summary: "Published Tokyo bands cover Shinjuku, Shibuya, Asakusa, Ginza, and Ikebukuro." },
  cityB: { name: "Osaka", flag: "🇯🇵", range: "$30–$250+/night", tierRows: ["Value: $30–$90", "Central food districts: $55–$150", "Premium / resort-linked: $150–$250+"], summary: "Osaka figures are directional planning bands for central, food-led, and premium bases; confirm current dates." },
  tableRows: [
    { label: "Value / budget base", a: "$35–$160+/night", b: "$30–$90/night" },
    { label: "3–4 star mid-range", a: "$50–$210+/night", b: "$55–$150/night" },
    { label: "Premium / luxury", a: "$70–$280+/night", b: "$150–$250+/night" },
  ],
  selector: [
    { id: "first-timer", label: "First-timer in Japan", city: "a", reason: "Tokyo is the stronger starting point when you want maximum landmark variety, district choice, and rail-connected flexibility in one city." },
    { id: "foodie", label: "Foodie", city: "b", reason: "Osaka is the stronger starting point for a relaxed, food-led city break centered on Dotonbori, Minami, Tenma, and local dining culture." },
    { id: "culture", label: "Culture & history", city: "b", reason: "Osaka is the stronger base for combining Osaka Castle, historic neighborhoods, and efficient Kansai trips to Kyoto and Nara." },
    { id: "budget", label: "Budget traveler", city: "b", reason: "Osaka has the lower directional value band in this comparison, while still offering central transit and a wide food scene." },
  ],
  foodTitle: "A different food-city rhythm",
  foodCopy: "Tokyo offers extraordinary breadth across markets, neighborhood restaurants, department-store food halls, and high-end dining. Osaka’s identity is more immediately food-led and relaxed: Dotonbori, Minami, Tenma, and Ura Namba make it easy to build a trip around casual eating and evening wandering.",
  transportCopy: "Tokyo rewards choosing a base near a major rail hub because the city is vast and district-to-district travel adds up. Osaka is easier to pair with nearby Kansai destinations; the official JNTO guide notes Tokyo–Osaka Shinkansen travel at about 2.5 hours, so compare hotel savings with the cost and time of moving between cities.",
  activityTitle: "How to split your time",
  activityCopy: "For a 7-day first Japan trip, a practical starting split is 4 nights Tokyo and 3 nights Osaka, with Osaka used for Kyoto or Nara day-trip access. If food and Kansai history are the main point, reverse the emphasis to 3 nights Tokyo and 4 nights Osaka. The right split depends on your flight pattern, rail plan, and appetite for moving hotels—not a universal rule.",
  relatedHeading: "Keep planning your Japan city break",
  related: [
    { href: "/blog/where-to-stay-in-tokyo-2026", label: "Where to Stay in Tokyo", description: "Compare Tokyo neighborhoods by first-timer ease, rail access, culture, nightlife, and published price bands." },
    { href: "/blog/tokyo-vs-bangkok-2026", label: "Tokyo vs Bangkok", description: "Continue the Asia comparison cluster with hotel, food, transport, culture, and trip-fit context." },
    { href: "/blog/where-to-stay-in-seoul-2026", label: "Where to Stay in Seoul", description: "Compare another rail-connected Asian capital by district personality and traveler priority." },
  ],
  sources: [
    { href: "/blog/where-to-stay-in-tokyo-2026", label: "Where to Stay in Tokyo (The Stay & Wander)", note: "Published Tokyo neighborhood profiles and directional value, central, and premium price bands." },
    { href: "https://www.japan.travel/en/destinations/kansai/osaka/", label: "Japan National Tourism Organization — Osaka", note: "Official context on Osaka’s food, nightlife, history, neighborhoods, and Kansai day-trip role; also notes the Tokyo–Osaka Shinkansen journey." },
    { href: "https://osaka-info.jp/en/", label: "Osaka Convention & Tourism Bureau", note: "Official Osaka visitor-planning context for city districts, attractions, food, and itineraries." },
    { href: "https://www.gotokyo.org/en/story/walks-and-tours/for-the-first-timer/index.html", label: "GO TOKYO — first-timer guidance", note: "Official Tokyo district and first-visit planning context, including walking, markets, Ginza, and Asakusa." },
  ],
  faqs: tokyoVsOsakaFaqs,
};

export default function BlogTokyoVsOsaka() { return <CityComparisonGuide config={config} />; }
