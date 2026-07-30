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
