import CityComparisonGuide, { type CityComparisonConfig } from "@/components/CityComparisonGuide";
import { dubaiVsAbuDhabiFaqs } from "@shared/articleFaqs";

export const articleMetadata = {
  title: "Dubai vs Abu Dhabi 2026: Which City Fits Your Trip?",
  description: "Compare Dubai and Abu Dhabi hotel tiers, daily costs, city character, and traveler fit in 2026—with source-backed guidance and live rates.",
  url: "/blog/dubai-vs-abu-dhabi-2026",
  image: "/manus-storage/dubai-middle-east-destination_1431ce58.png",
  keywords: "Dubai vs Abu Dhabi 2026, Dubai or Abu Dhabi, Abu Dhabi hotel prices, Dubai hotel prices, UAE city comparison",
};

const config: CityComparisonConfig = {
  ...articleMetadata,
  label: "UAE city comparison · 2026 planning guide",
  intro: "Dubai and Abu Dhabi can work brilliantly in the same UAE trip, but they create different daily rhythms. Compare the published hotel signals, choose the city that fits your brief, then check live dates.",
  updated: "2026-10-07",
  cityA: { name: "Dubai", flag: "🇦🇪", range: "$30–$450+/night", tierRows: ["Budget: $30–$90", "3–4 star mid-range: $90–$220", "5-star luxury: $220–$450+"], summary: "Existing Dubai guidance spans Downtown, Marina/JBR, Palm Jumeirah, and practical transit-led bases." },
  cityB: { name: "Abu Dhabi", flag: "🇦🇪", range: "$45–$500+/night", tierRows: ["Budget: $45–$100", "3–4 star mid-range: $100–$240", "5-star luxury: $240–$500+"], summary: "Use these as directional planning bands; the UAE hub emphasizes confirming room type, dates, taxes, and long-stay terms directly." },
  tableRows: [
    { label: "Budget / simple base", a: "$30–$90/night", b: "$45–$100/night" },
    { label: "3–4 star mid-range", a: "$90–$220/night", b: "$100–$240/night" },
    { label: "5-star luxury", a: "$220–$450+/night", b: "$240–$500+/night" },
  ],
  selector: [
    { id: "business", label: "Business traveler", city: "a", reason: "Dubai is the stronger starting point when skyline-connected districts, business hubs, dining, and broad hotel choice matter most." },
    { id: "luxury", label: "Luxury leisure", city: "a", reason: "Dubai is the natural first comparison for resort scale, landmark architecture, shopping, nightlife, and waterfront stays." },
    { id: "family", label: "Family trip", city: "b", reason: "Abu Dhabi is the stronger starting point when culture, beaches, family attractions, and a more measured itinerary lead the brief." },
    { id: "extended", label: "Extended stay", city: "b", reason: "Abu Dhabi is a useful starting point for a slower multi-week comparison, while Dubai remains the better fit when daily business access dominates." },
    { id: "first-timer", label: "First-timer", city: "a", reason: "Dubai offers the clearest first-visit mix of iconic skyline landmarks, shopping, dining, and easy-to-recognize area choices." },
  ],
  foodTitle: "Dining and everyday spend",
  foodCopy: "Dubai’s city rhythm is built around a wide spread of restaurants, malls, waterfront dining, traditional souks, and nightlife. Abu Dhabi adds a strong culture-and-leisure mix around museums, heritage landmarks, beaches, and family attractions; compare the daily itinerary you actually want rather than treating the room rate as the whole budget.",
  transportCopy: "Dubai’s area choice changes transfer time between skyline, beach, and desert experiences. Abu Dhabi’s attractions are more spread across an island-and-mainland geography, so check the hotel’s relationship to the cultural district, beach, family attractions, and airport before booking.",
  activityTitle: "What each city is actually known for",
  activityCopy: "Dubai is the high-contrast metropolis: Burj Khalifa views, major malls, traditional souks, waterfront dining, desert experiences, and a nightlife-and-events calendar. Abu Dhabi is the cultural and family counterpoint: Sheikh Zayed Grand Mosque, Qasr Al Watan, Saadiyat’s museums, beaches, relaxation, and a less rushed way to combine landmark days with family time. These are planning lenses, not a claim that either city has one single personality.",
  relatedHeading: "Keep planning your UAE city break",
  related: [
    { href: "/blog/uae-extended-stay-hotels-2026", label: "UAE Extended-Stay Hotels", description: "Compare source-verified apartment-style formats by kitchens, laundry, work setup, capacity, and long-stay fit." },
    { href: "/blog/best-hotels-dubai-2026", label: "Best Hotels in Dubai & Abu Dhabi", description: "Use the neighborhood-led UAE hotel guide for skyline, waterfront, resort, and Abu Dhabi contrasts." },
    { href: "/blog/bangkok-vs-seoul-2026", label: "Bangkok vs Seoul", description: "Continue the city-comparison cluster with hotel tiers, food, transport, and traveler-fit guidance." },
  ],
  sources: [
    { href: "/blog/best-hotels-dubai-2026", label: "Best Hotels in Dubai & Abu Dhabi (The Stay & Wander)", note: "Published Dubai and Abu Dhabi area-fit guidance for skyline, waterfront, resort, and cultural contrasts." },
    { href: "/blog/uae-extended-stay-hotels-2026", label: "UAE Extended-Stay Hotels (The Stay & Wander)", note: "Source-bounded UAE property formats and explicit limits around live rates and brand-level claims." },
    { href: "https://www.visitdubai.com/en/", label: "Visit Dubai — official tourism guidance", note: "City neighborhoods, landmarks, shopping, traditional souks, dining, events, and experience-planning context." },
    { href: "https://visitabudhabi.ae/en", label: "Experience Abu Dhabi — official tourism guidance", note: "Culture, Saadiyat, heritage landmarks, family attractions, beaches, relaxation, and itinerary-planning context." },
  ],
  faqs: dubaiVsAbuDhabiFaqs,
};

export default function BlogDubaiVsAbuDhabi() { return <CityComparisonGuide config={config} />; }
