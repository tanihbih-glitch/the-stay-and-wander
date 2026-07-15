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
    title: "The Stay & Wander - Discover Beautiful Places & Unique Travel Experiences",
    description:
      "Discover beautiful places, unique stays, and unforgettable journeys. Hand-picked hotels, custom itineraries, and travel inspiration for Europe, Asia & Brazil.",
    image: DEFAULT_IMAGE,
    url: "/",
    type: "website",
    keywords:
      "travel, hotels, itineraries, destinations, Europe, Asia, Brazil, travel planning",
  },

  about: {
    title: "About The Stay & Wander - Our Travel Philosophy",
    description:
      "Learn about The Stay & Wander's mission to inspire and guide travelers to discover beautiful places and create unforgettable memories.",
    image: DEFAULT_IMAGE,
    url: "/about",
    type: "website",
  },

  contact: {
    title: "Contact The Stay & Wander - Get in Touch",
    description:
      "Have questions about our itineraries or travel recommendations? Get in touch with The Stay & Wander team.",
    image: DEFAULT_IMAGE,
    url: "/contact",
    type: "website",
  },

  blog: {
    title: "Travel Blog - Tips, Guides & Inspiration | The Stay & Wander",
    description:
      "Expert travel guides, hotel reviews, packing tips, and insider stories from destinations around the world.",
    image: DEFAULT_IMAGE,
    url: "/blog",
    type: "website",
    keywords: "travel blog, travel guides, hotel reviews, packing tips, travel tips",
  },

  itineraries: {
    title: "Curated Travel Itineraries - Europe, Asia & Brazil | The Stay & Wander",
    description:
      "Explore our hand-picked travel itineraries for Tokyo, Mediterranean, Brazil, and more. Perfect for your next adventure.",
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

  destinationEurope: {
    title: "Europe Travel Guide - Best Cities & Destinations | The Stay & Wander",
    description:
      "Discover Europe's most enchanting cities and destinations. Travel guides, hotel recommendations, and insider tips for Paris, Rome, Barcelona, and more.",
    image: DEFAULT_IMAGE,
    url: "/destinations/europe",
    type: "website",
    keywords: "Europe, travel, cities, destinations, Paris, Rome, Barcelona",
  },

  destinationAsia: {
    title: "Asia Travel Guide - Best Cities & Destinations | The Stay & Wander",
    description:
      "Explore Asia's most vibrant destinations. Travel guides for Tokyo, Bangkok, Bali, and more with hotel recommendations and travel tips.",
    image: DEFAULT_IMAGE,
    url: "/destinations/asia",
    type: "website",
    keywords: "Asia, travel, cities, destinations, Tokyo, Bangkok, Bali",
  },

  destinationBrazil: {
    title: "Brazil Travel Guide - Best Cities & Destinations | The Stay & Wander",
    description:
      "Discover Brazil's most beautiful destinations. Travel guides for Rio, São Paulo, Salvador, and more with local insights and recommendations.",
    image: DEFAULT_IMAGE,
    url: "/destinations/brazil",
    type: "website",
    keywords: "Brazil, travel, cities, destinations, Rio, São Paulo, Salvador",
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
