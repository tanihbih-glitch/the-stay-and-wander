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

  baliHotelPricesGuide: {
    title: "Bali Hotel Prices 2026: Real Costs by Region (Seminyak, Ubud, Uluwatu)",
    description:
      "See exactly what you'll pay for hotels in Bali in 2026 — broken down by region, from budget to luxury. Real price ranges, no guessing.",
    image: `${SITE_URL}/manus-storage/blog-bali_5a40f78c.png`,
    url: "/blog/bali-hotel-prices-2026",
    type: "article",
    author: "The Stay & Wander",
    publishedDate: "2026-07-27",
    keywords:
      "Bali hotel prices 2026, Bali accommodation costs, Seminyak hotel prices, Ubud hotel prices, Uluwatu hotel prices, Canggu hotel prices",
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
