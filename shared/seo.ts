/**
 * SEO Meta Tags Configuration and Utilities
 * Handles generation of meta tags for all pages
 */

export interface PageMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: "website" | "article" | "blog";
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  keywords?: string;
}

export interface MetaTags {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  h1: string;
  keywords?: string;
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
}

const SITE_NAME = "The Stay & Wander";
const SITE_URL = "https://thestayandwander.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(metadata: PageMetadata): MetaTags {
  const fullUrl = `${SITE_URL}${metadata.url}`;
  const ogType = metadata.type || "website";

  return {
    title: metadata.title,
    description: metadata.description,
    canonical: fullUrl,
    ogTitle: metadata.title,
    ogDescription: metadata.description,
    ogImage: metadata.image || DEFAULT_IMAGE,
    ogUrl: fullUrl,
    ogType,
    twitterCard: "summary_large_image",
    twitterTitle: metadata.title,
    twitterDescription: metadata.description,
    twitterImage: metadata.image || DEFAULT_IMAGE,
    h1: metadata.title,
    keywords: metadata.keywords,
    author: metadata.author,
    publishedDate: metadata.publishedDate,
    updatedDate: metadata.updatedDate,
  };
}

/**
 * Page metadata configuration for all static pages
 */
export const pageMetadataConfig: Record<string, PageMetadata> = {
  home: {
    title: "The Stay & Wander | Curated Stays & Travel Itineraries",
    description:
      "Discover beautiful places, unique stays and unforgettable journeys across Europe, Asia, Brazil and the Middle East — hand-picked hotels, flight deals and complete travel itineraries",
    image: DEFAULT_IMAGE,
    url: "/",
    type: "website",
    keywords:
      "travel, hotels, itineraries, destinations, Europe, Asia, Brazil, Middle East, Dubai, Abu Dhabi, travel planning",
  },

  blog: {
    title: "Travel Blog - Tips, Guides & Inspiration | The Stay & Wander",
    description:
      "Expert travel guides, hotel reviews, packing tips, and insider stories from Europe, Asia, Brazil and the Middle East.",
    image: DEFAULT_IMAGE,
    url: "/blog",
    type: "website",
    keywords: "travel blog, travel guides, hotel reviews, packing tips, travel tips",
  },

  itineraries: {
    title: "Curated Travel Itineraries - Europe, Asia, Brazil & Middle East | The Stay & Wander",
    description:
      "Explore our hand-picked travel itineraries for Tokyo, the Mediterranean, Brazil, Dubai, Abu Dhabi, and more. Perfect for your next adventure.",
    image: DEFAULT_IMAGE,
    url: "/itineraries",
    type: "website",
    keywords: "itineraries, travel plans, guided tours, travel packages",
  },

  booking: {
    title: "Book Your Trip - Hotels, Flights & More | The Stay & Wander",
    description:
      "Search and book flights, hotels, cruises, and car rentals for your next adventure. Compare prices and find the best deals.",
    image: DEFAULT_IMAGE,
    url: "/booking",
    type: "website",
  },

  deals: {
    title: "Best Travel Deals This Week — Hotels · Flights · Tours",
    description:
      "Discover this week's hand-picked hotel offers, flight fares, tours, and car-rental deals from The Stay & Wander.",
    image: DEFAULT_IMAGE,
    url: "/deals",
    type: "website",
    keywords:
      "travel deals, hotel deals, flight deals, tours, car rental deals, travel offers",
  },

  corporateTravel: {
    title: "Corporate Travel Planning — ADIPEC 2026 · GITEX 2026 · ADSW 2027 · Global Business Travel | The Stay & Wander",
    description:
      "Professional corporate travel planning for ADIPEC 2026, GITEX 2026 and Abu Dhabi Sustainability Week 2027. Hotels near ADNEC and DWTC · Executive itineraries · Team retreat planning for companies from USA, UK, Canada, Australia, India and Nigeria.",
    image: `${SITE_URL}/manus-storage/corporate-travel-hero_9abcd7f4.png`,
    url: "/corporate-travel",
    type: "website",
    keywords:
      "corporate travel planning, ADIPEC 2026 hotels, GITEX 2026 hotels, Abu Dhabi Sustainability Week, executive travel, team retreats, UAE business travel",
  },

  about: {
    title: "About The Stay & Wander | Travel Guides, Stays & Itineraries",
    description:
      "Learn how The Stay & Wander helps travellers discover beautiful places, unique stays, honest recommendations, and unforgettable journeys across Europe, Asia, Brazil and the Middle East.",
    image: DEFAULT_IMAGE,
    url: "/about",
    type: "website",
    keywords:
      "about The Stay & Wander, travel guides, curated hotels, travel itineraries, honest travel recommendations",
  },

  privacyPolicy: {
    title: "Privacy Policy | The Stay & Wander",
    description:
      "Learn how The Stay & Wander handles cookies, analytics, affiliate links, newsletter sign-ups, and personal information.",
    image: DEFAULT_IMAGE,
    url: "/privacy-policy",
    type: "website",
    keywords:
      "The Stay & Wander privacy policy, travel blog cookies, Google Analytics, Mailchimp, affiliate disclosure",
  },

  dubaiHotelGuide: {
    title: "Best Hotels in Dubai & Abu Dhabi | The Stay & Wander",
    description:
      "Plan a Dubai and Abu Dhabi stay with our guide to the best UAE neighbourhoods for skyline views, beach time, culture, and desert experiences.",
    image: `${SITE_URL}/manus-storage/dubai-middle-east-destination_1431ce58.png`,
    url: "/blog/best-hotels-dubai-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-30",
    keywords:
      "Dubai hotels, Abu Dhabi hotels, UAE travel guide, Dubai travel, Middle East hotels, Burj Khalifa views",
  },

  lisbonHotelGuide: {
    title: "Where to Stay in Lisbon 2026 — Best Neighbourhoods and Hotels for Every Budget | The Stay & Wander",
    description:
      "Not sure where to stay in Lisbon in 2026? Our complete neighbourhood guide covers Alfama, Chiado, Bairro Alto, Belém and beyond — with hand-picked hotels from $45/night.",
    image: `${SITE_URL}/manus-storage/lisbon-yellow-tram-hero_11c0dde1.jpg`,
    url: "/blog/where-to-stay-lisbon-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-30",
    keywords:
      "where to stay in Lisbon 2026, Lisbon hotels, Alfama hotels, Chiado hotels, Bairro Alto hotels, Belém hotels, Lisbon neighbourhood guide",
  },

  baliExperiencesGuide: {
    title: "Things to Do in Bali: 50 Best Experiences for 2026 | The Stay & Wander",
    description:
      "Plan an unforgettable Bali trip with 50 memorable experiences across temples, beaches, food, nature, wellness, adventure, and island escapes — plus practical planning tips for 2026.",
    image: `${SITE_URL}/manus-storage/bali-tegallalang-rice-terraces-hero_030f04ef.jpg`,
    url: "/blog/things-to-do-in-bali-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-30",
    keywords:
      "things to do in Bali 2026, Bali experiences, Bali temples, Bali beaches, Ubud guide, Nusa Penida, Bali itinerary, Bali travel guide",
  },

  baliBeachComparisonMatrix: {
    title: "Bali Beach Comparison Matrix (2026): Sand Quality, Swim Safety & Entry Fees by Region",
    description:
      "Compare Bali beach regions for sand quality, swim safety, entry fees, surfing, snorkeling, cliff views, and family-friendly water in 2026.",
    image: `${SITE_URL}/manus-storage/blog-bali_5a40f78c.png`,
    url: "/blog/bali-beach-comparison-matrix-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-22",
    keywords:
      "Bali beach comparison 2026, Bali beach entry fees, Bali swim safety, Bali beaches for families, Bali surf beaches, Bali snorkeling beaches, Bali beach guide",
  },

  baliSpaWellnessPriceIndex: {
    title: "Bali Spa & Wellness Price Index (2026): Local Street Warungs vs. Luxury Resort Treatments",
    description: "Compare Bali spa prices in 2026, from local massage warungs to boutique retreats and five-star resort treatments — with practical tier, setting, and traveler-fit guidance.",
    image: `${SITE_URL}/manus-storage/blog-bali_5a40f78c.png`,
    url: "/blog/bali-spa-wellness-price-index-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-23",
    keywords: "Bali spa prices 2026, Bali massage cost, Ubud wellness retreat, Seminyak spa, Bali luxury resort spa, Bali traditional massage",
  },

  baliHotelPricesGuide: {
    title: "Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)",
    description:
      "Find the best area to stay in Bali for a first trip — Seminyak for beach clubs, Ubud for culture, Uluwatu for surf, or Canggu for cafés.",
    image: `${SITE_URL}/manus-storage/blog-bali_5a40f78c.png`,
    url: "/blog/where-to-stay-in-bali-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-27",
    keywords:
      "where to stay in Bali 2026, best areas in Bali for first timers, Seminyak hotels, Ubud hotels, Uluwatu hotels, Canggu hotels, Bali hotel prices",
  },

  bangkokHotelPricesGuide: {
    title: "Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)",
    description:
      "Find the best area to stay in Bangkok for a first trip — Sukhumvit for transit, Riverside for temples, Khao San Road for energy, and Sathorn for quiet.",
    image: `${SITE_URL}/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg`,
    url: "/blog/where-to-stay-in-bangkok-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-03",
    keywords:
      "where to stay in Bangkok 2026, best areas in Bangkok for first timers, Sukhumvit hotels, Silom hotels, Bangkok riverside hotels, Khao San Road hotels, Sathorn hotels",
  },

  bangkokHotelBudgetBreakdown: {
    title: "How Much Does a Hotel in Bangkok Really Cost in 2026? (Budget to Luxury Breakdown)",
    description:
      "Bangkok hotel prices in 2026, broken down from hostels to 5-star luxury — real ranges, top picks, and booking tips for every budget.",
    image: `${SITE_URL}/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg`,
    url: "/blog/bangkok-hotel-budget-breakdown-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-17",
    keywords:
      "Bangkok hotel prices 2026, Bangkok hotel cost, Bangkok budget hotels, Bangkok luxury hotels, Bangkok hostel prices, Bangkok hotel booking tips",
  },

  bangkokAirportHotels: {
    title: "Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers",
    description:
      "Where to stay near Bangkok's Suvarnabhumi Airport for a quick layover — in-terminal options, free-shuttle hotels, and essential timing tips.",
    image: `${SITE_URL}/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg`,
    url: "/blog/bangkok-airport-hotels-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-17",
    keywords:
      "Bangkok airport hotels 2026, Suvarnabhumi airport hotel, BKK layover hotel, Bangkok airport shuttle hotel, Novotel Suvarnabhumi Airport",
  },

  uaeExtendedStaySustainability: {
    title: "Extended Stays in the UAE: How Sustainable Are Hilton, Marriott, and Accor?",
    description:
      "Compare the sustainability approaches of Hilton, Marriott, Accor, and IHG for longer hotel stays in Dubai and Abu Dhabi, with practical advice for relocators.",
    image: `${SITE_URL}/manus-storage/dubai-middle-east-destination_1431ce58.png`,
    url: "/blog/uae-extended-stay-sustainability-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-17",
    keywords:
      "UAE extended stay hotels, sustainable hotels Dubai, sustainable hotels Abu Dhabi, Hilton Travel with Purpose, Marriott Serve 360, Accor Planet 21, IHG Green Engage",
  },

  tokyoStayGuide: {
    title: "Where to Stay in Tokyo: Best Neighborhoods for First-Timers (2026 Guide)",
    description: "Not sure where to stay in Tokyo? Compare Shinjuku, Shibuya, Asakusa, Ginza, and Ikebukuro — what each is best for and typical 2026 hotel prices.",
    image: `${SITE_URL}/manus-storage/tokyo-where-to-stay-hero_78be225b.jpg`,
    url: "/blog/where-to-stay-in-tokyo-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-12",
    keywords: "where to stay in Tokyo 2026, Tokyo neighborhoods, Shinjuku hotels, Shibuya hotels, Asakusa hotels, Ginza hotels, Ikebukuro hotels",
  },

  seoulStayGuide: {
    title: "Where to Stay in Seoul: Best Areas for First-Timers (2026 Guide)",
    description: "Not sure where to stay in Seoul? Compare Myeongdong, Gangnam, Hongdae, Itaewon, and Insadong — what each is best for and typical 2026 hotel prices.",
    image: `${SITE_URL}/manus-storage/seoul-where-to-stay-hero_050ef7b1.jpg`,
    url: "/blog/where-to-stay-in-seoul-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-12",
    keywords: "where to stay in Seoul 2026, Seoul districts, Myeongdong hotels, Gangnam hotels, Hongdae hotels, Itaewon hotels, Insadong hotels",
  },

  tokyoItinerary: {
    title: "4 Days in Tokyo: First-Timer Itinerary (2026) | The Stay & Wander",
    description: "Plan four practical days in Tokyo with Asakusa, Shibuya, modern Tokyo, and a Mount Fuji day trip — plus stay and activity planning links.",
    image: `${SITE_URL}/manus-storage/tokyo-where-to-stay-hero_78be225b.jpg`,
    url: "/itinerary/tokyo",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-12",
    keywords: "4 day Tokyo itinerary 2026, Tokyo first timer itinerary, Tokyo Asakusa Shibuya itinerary, Mount Fuji day trip",
  },

  seoulItinerary: {
    title: "5 Days in Seoul: First-Timer Itinerary (2026) | The Stay & Wander",
    description: "Plan five practical days in Seoul with Myeongdong, palaces, Gangnam, Nami Island, and Itaewon — plus stay and activity planning links.",
    image: `${SITE_URL}/manus-storage/seoul-where-to-stay-hero_050ef7b1.jpg`,
    url: "/itinerary/seoul",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-08-12",
    keywords: "5 day Seoul itinerary 2026, Seoul first timer itinerary, Myeongdong itinerary, Nami Island day trip, Gangnam itinerary",
  },

  baliFourStarHotelsGuide: {
    title: "Best 4-Star Hotels in Bali Under $100/Night (2026 Picks)",
    description:
      "Handpicked 4-star hotels across Bali that don't break the bank — real picks under $100/night, from Seminyak to Ubud.",
    image: `${SITE_URL}/manus-storage/blog-bali_5a40f78c.png`,
    url: "/blog/best-4-star-hotels-bali-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-20",
    keywords:
      "best 4 star hotels Bali 2026, Bali four star hotels, Bali hotel deals, Seminyak hotels, Ubud hotels, Uluwatu hotels",
  },

};

/**
 * Blog article metadata generator
 */
export function generateBlogMetadata(article: {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}): PageMetadata {
  return {
    title: `${article.title} | The Stay & Wander Blog`,
    description: article.excerpt,
    image: article.image,
    url: `/blog/${article.id}`,
    type: "article",
    author: article.author,
    publishedDate: article.date,
    keywords: `travel, ${article.category.toLowerCase()}, ${article.title}`,
  };
}

/**
 * Itinerary metadata generator
 */
export function generateItineraryMetadata(itinerary: {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: number;
  destinations: string[];
}): PageMetadata {
  return {
    title: `${itinerary.title} - ${itinerary.duration} Day Itinerary | The Stay & Wander`,
    description: itinerary.description,
    image: itinerary.image,
    url: `/itinerary/${itinerary.id}`,
    type: "article",
    keywords: `itinerary, ${itinerary.destinations.join(", ")}, travel planning`,
  };
}

/**
 * Generate structured data (JSON-LD) for pages
 */
export function generateStructuredData(
  type: "Organization" | "Article" | "BreadcrumbList",
  data: Record<string, unknown>
) {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.instagram.com/thestayandwander",
      "https://www.facebook.com/thestayandwander",
      "https://www.twitter.com/thestayandwander",
    ],
  };

  if (type === "Organization") {
    return baseOrganization;
  }

  if (type === "Article") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      ...data,
    };
  }

  if (type === "BreadcrumbList") {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      ...data,
    };
  }

  return null;
}
