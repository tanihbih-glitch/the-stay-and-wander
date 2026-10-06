import CityComparisonGuide, { type CityComparisonConfig } from "@/components/CityComparisonGuide";
import { baliVsPhuketFaqs } from "@shared/articleFaqs";

export const articleMetadata = {
  title: "Bali vs Phuket 2026: Which Beach Trip Costs Less?",
  description: "Compare Bali and Phuket hotel tiers, beaches, activities, and traveler fit in 2026—with directional benchmarks and a live resort search handoff.",
  url: "/blog/bali-vs-phuket-2026",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  keywords: "Bali vs Phuket 2026, Bali or Phuket cheaper, Phuket hotel prices, Bali hotel prices, beach destination comparison",
};

const config: CityComparisonConfig = {
  ...articleMetadata,
  label: "Beach destination comparison · 2026 planning guide",
  intro: "Bali and Phuket both make a strong beach escape, but they suit different trip shapes. Compare the published Bali benchmarks with Phuket’s source-bounded planning bands, then choose your beach style before checking live resort availability.",
  updated: "2026-10-06",
  cityA: { name: "Bali", flag: "🇮🇩", range: "$7–$1,200+/night", tierRows: ["Budget: $7–$30", "Boutique / mid-range: $30–$160", "Villa / resort: $90–$1,200+"], summary: "The Bali index covers regional bands, villas, resorts, and seasonal planning across five zones." },
  cityB: { name: "Phuket", flag: "🇹🇭", range: "$9–$767+/night", tierRows: ["Budget: $9–$21", "Mid-range: $46–$107", "Luxury / resort: $153–$767+"], summary: "Phuket bands are dated planning research from the cited budget source—not live rates." },
  tableRows: [
    { label: "Budget / hostel", a: "$7–$30/night", b: "$9–$21/night" },
    { label: "Mid-range / boutique", a: "$30–$160/night", b: "$46–$107/night" },
    { label: "Resort / villa", a: "$90–$1,200+/night", b: "$153–$767+/night" },
  ],
  selector: [
    { id: "party", label: "Party / nightlife", city: "b", reason: "Phuket is the stronger starting point for a compact beach-nightlife base around Patong, while Bali spreads nightlife across several coastal areas." },
    { id: "family", label: "Family-friendly", city: "a", reason: "Bali is the stronger starting point when you want to compare calmer, reef-protected and family-oriented regions such as Nusa Dua and Sanur." },
    { id: "quiet", label: "Quiet relaxation", city: "a", reason: "Bali offers more distinct quiet-stay directions—from Ubud wellness to quieter east and north coast planning." },
    { id: "backpacker", label: "Budget backpacker", city: "a", reason: "Bali has the lower published budget floor in the comparison and a wide range of guesthouse, hostel, and long-stay bases." },
  ],
  foodTitle: "Food and activity budgets",
  foodCopy: "Bali’s source guide separates daily travel planning across beach, wellness, and regional bases, while Phuket’s cited budget notes point to a broad street-food-to-resort dining spread. In both destinations, beach density and resort positioning can change the daily spend quickly.",
  transportCopy: "Bali’s large geography makes the choice of base especially important: a cheaper room can mean more transfer time. Phuket is more compact for a single beach base, but island excursions and airport transfers still need to be added to the stay budget.",
  activityTitle: "Beach and activity fit",
  activityCopy: "Choose Bali for regional variety, surf, snorkeling, wellness, temples, and villa-group planning. Choose Phuket for a more concentrated beach-resort rhythm, boat-trip access, and an easier single-base holiday when nightlife or resort convenience leads the brief.",
  related: [
    { href: "/blog/bali-hotel-price-index-2026", label: "Bali Hotel Price Index", description: "Compare Bali’s five-region accommodation bands, villas, resorts, and seasonal rate signals." },
    { href: "/blog/bali-beach-comparison-matrix-2026", label: "Bali Beach Comparison Matrix", description: "Match Bali coasts by sand, swim safety, entry fees, surf, and family suitability." },
    { href: "/blog/where-to-stay-in-bali-2026", label: "Where to Stay in Bali", description: "Use the area matcher to choose a Bali base before checking properties." },
  ],
  sources: [
    { href: "/blog/bali-hotel-price-index-2026", label: "Bali Hotel Price Index (The Stay & Wander)", note: "Published Bali regional, villa, resort, and seasonal planning bands." },
    { href: "/blog/bali-beach-comparison-matrix-2026", label: "Bali Beach Comparison Matrix (The Stay & Wander)", note: "Beach-region fit, swim-safety, access-cost, and activity context." },
    { href: "https://www.phuket-escape.com/guides/phuket-travel-budget/", label: "Phuket Travel Budget Guide (Phuket Escape)", note: "Dated accommodation, food, transport, and seasonality research used as planning context; not a live rate feed." },
    { href: "https://northabroad.com/where-to-stay-phuket-best-hotels/", label: "Where to Stay in Phuket (North Abroad)", note: "Area-fit context for Patong, Karon, Kata, Surin, Kamala, Bang Tao, Old Town, and Mai Khao." },
  ],
  faqs: baliVsPhuketFaqs,
};

export default function BlogBaliVsPhuket() { return <CityComparisonGuide config={config} />; }
