/**
 * Centralized Affiliate Links Configuration
 * 
 * This file contains all affiliate links for Travelpayout and other networks.
 * Update your tracking IDs and links here, then use them across the entire app.
 * 
 * USAGE:
 * import { affiliateLinks } from '@/lib/affiliateLinks';
 * 
 * // Access flight deals
 * const flightLink = affiliateLinks.flights.london_tokyo;
 * 
 * // Access hotel deals
 * const hotelLink = affiliateLinks.hotels.tokyo;
 */

/**
 * Travelpayout Configuration
 * 
 * Get your Travelpayout affiliate ID from: https://travelpayouts.com/developers/api
 * Replace 'YOUR_TRAVELPAYOUT_AFFILIATE_ID' with your actual ID
 */
const TRAVELPAYOUT_AFFILIATE_ID = "YOUR_TRAVELPAYOUT_AFFILIATE_ID";
const TRAVELPAYOUT_UTM_SOURCE = "staywander";
const TRAVELPAYOUT_UTM_MEDIUM = "affiliate";

/**
 * Travelpayouts Deep Link for Flight Bookings
 * This is the main flight booking link with your affiliate tracking
 */
const TRAVELPAYOUTS_FLIGHT_LINK = "https://aviasales.tpo.lu/f9QeB1mu";

/**
 * Shared DiscoverCars affiliate destination for every car-rental action.
 */
export const DISCOVERCARS_AFFILIATE_URL = "https://www.discovercars.com/?a_aid=Thestayandwander";

/**
 * Helper function to generate Travelpayout search links
 * @param searchKey - The search key from Travelpayout API
 * @param campaign - Campaign name for tracking
 * @returns Full affiliate URL with tracking parameters
 */
function generateTravelpayoutLink(
  searchKey: string,
  campaign: string = "deals"
): string {
  return TRAVELPAYOUTS_FLIGHT_LINK;
}

/**
 * Booking.com Configuration
 * 
 * Get your Booking.com affiliate ID from: https://partner.booking.com
 * Replace 'YOUR_BOOKING_AFFILIATE_ID' with your actual ID
 */
const BOOKING_AFFILIATE_ID = "YOUR_BOOKING_AFFILIATE_ID";

/**
 * Helper function to generate Booking.com hotel search links
 * @param destination - Hotel destination or city
 * @param checkIn - Check-in date (YYYY-MM-DD)
 * @param checkOut - Check-out date (YYYY-MM-DD)
 * @param guests - Number of guests (default: 2)
 * @returns Full Booking.com affiliate URL
 */
function generateBookingLink(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests: number = 2
): string {
  const url = new URL("https://www.booking.com/searchresults.html");
  url.searchParams.set("ss", destination);
  url.searchParams.set("checkin", checkIn);
  url.searchParams.set("checkout", checkOut);
  url.searchParams.set("group_adults", guests.toString());
  url.searchParams.set("no_rooms", "1");
  url.searchParams.set("affiliate_id", BOOKING_AFFILIATE_ID);
  return url.toString();
}

/**
 * Pre-configured Affiliate Links
 * 
 * Add your Travelpayout search keys here. You can find these in your Travelpayout dashboard
 * or by making API calls to get flight/hotel deals.
 */
export const affiliateLinks = {
  /**
   * Flight Deals
   * Format: { route: "Origin → Destination", searchKey: "...", price: "..." }
   */
  flights: {
    london_tokyo: {
      route: "London → Tokyo",
      searchKey: "london-tokyo",
      price: "From $620",
      link: TRAVELPAYOUTS_FLIGHT_LINK,
      category: "flight",
      network: "travelpayout",
    },
    newyork_lisbon: {
      route: "New York → Lisbon",
      searchKey: "newyork-lisbon",
      price: "From $380",
      link: TRAVELPAYOUTS_FLIGHT_LINK,
      category: "flight",
      network: "travelpayout",
    },
    dubai_bali: {
      route: "Dubai → Bali",
      searchKey: "dubai-bali",
      price: "From $290",
      link: TRAVELPAYOUTS_FLIGHT_LINK,
      category: "flight",
      network: "travelpayout",
    },
  },

  /**
   * Hotel Deals
   * Format: { city: "City Name", checkIn: "YYYY-MM-DD", checkOut: "YYYY-MM-DD", ... }
   */
  hotels: {
    tokyo: {
      city: "Tokyo",
      country: "Japan",
      description: "Modern luxury in Japan's vibrant capital",
      checkIn: "2026-07-15",
      checkOut: "2026-07-22",
      guests: 2,
      link: generateBookingLink("Tokyo", "2026-07-15", "2026-07-22", 2),
      category: "hotel",
      network: "booking",
    },
    lisbon: {
      city: "Lisbon",
      country: "Portugal",
      description: "Charming Portuguese coastal elegance",
      checkIn: "2026-07-15",
      checkOut: "2026-07-22",
      guests: 2,
      link: generateBookingLink("Lisbon", "2026-07-15", "2026-07-22", 2),
      category: "hotel",
      network: "booking",
    },
    rio: {
      city: "Rio de Janeiro",
      country: "Brazil",
      description: "Beachfront paradise in Brazil",
      checkIn: "2026-07-15",
      checkOut: "2026-07-22",
      guests: 2,
      link: generateBookingLink("Rio de Janeiro", "2026-07-15", "2026-07-22", 2),
      category: "hotel",
      network: "booking",
    },
  },

  /**
   * Cruise Deals
   * Add your cruise affiliate links here
   */
  cruises: {
    mediterranean: {
      name: "Mediterranean",
      duration: "7-14 days",
      link: "https://www.cruisedirect.com/search?region=mediterranean&utm_source=staywander",
      category: "cruise",
      network: "cruisedirect",
    },
    southeast_asia: {
      name: "Southeast Asia",
      duration: "10-21 days",
      link: "https://www.cruisedirect.com/search?region=southeast-asia&utm_source=staywander",
      category: "cruise",
      network: "cruisedirect",
    },
    south_america: {
      name: "South America",
      duration: "14-28 days",
      link: "https://www.cruisedirect.com/search?region=south-america&utm_source=staywander",
      category: "cruise",
      network: "cruisedirect",
    },
  },

  /**
   * Car Rental Deals
   * Add your car rental affiliate links here
   */
  carRentals: {
    tokyo: {
      city: "Tokyo",
      country: "Japan",
      link: DISCOVERCARS_AFFILIATE_URL,
      category: "car",
      network: "discovercars",
    },
    lisbon: {
      city: "Lisbon",
      country: "Portugal",
      link: DISCOVERCARS_AFFILIATE_URL,
      category: "car",
      network: "discovercars",
    },
    rio: {
      city: "Rio de Janeiro",
      country: "Brazil",
      link: DISCOVERCARS_AFFILIATE_URL,
      category: "car",
      network: "discovercars",
    },
  },

  /**
   * Itinerary-Specific Links
   * Links for featured itineraries that lead to booking pages
   */
  itineraries: {
    tokyo_seoul: {
      title: "10 Days in Tokyo & Seoul",
      bookingLink: generateBookingLink("Tokyo", "2026-07-15", "2026-07-25", 2),
      flightLink: TRAVELPAYOUTS_FLIGHT_LINK,
    },
    mediterranean: {
      title: "Two-Week Mediterranean Escape",
      bookingLink: generateBookingLink("Barcelona", "2026-07-15", "2026-07-29", 2),
      flightLink: TRAVELPAYOUTS_FLIGHT_LINK,
    },
    brazil_adventure: {
      title: "Ultimate Brazil Adventure",
      bookingLink: generateBookingLink("Rio de Janeiro", "2026-07-15", "2026-07-29", 2),
      flightLink: TRAVELPAYOUTS_FLIGHT_LINK,
    },
  },

  /**
   * Blog Article Links
   * Affiliate links featured in blog posts
   */
  blog: {
    bali_hotels: {
      articleTitle: "Best Hotels in Bali for Every Budget 2026",
      bookingLink: generateBookingLink("Bali", "2026-07-15", "2026-07-22", 2),
      category: "hotel",
    },
    europe_flights: {
      articleTitle: "7 Best Cities to Visit in Europe This Summer",
      flightLink: TRAVELPAYOUTS_FLIGHT_LINK,
      category: "flight",
    },
  },
};

/**
 * Helper function to track affiliate clicks
 * Call this whenever a user clicks on an affiliate link
 * 
 * @param network - Network name (e.g., "travelpayout", "booking")
 * @param category - Category (e.g., "flight", "hotel")
 * @param linkName - Identifier for the specific link
 */
export function trackAffiliateClick(
  network: string,
  category: string,
  linkName: string
): void {
  // Log to console for development
  console.log(
    `[Affiliate Click] Network: ${network}, Category: ${category}, Link: ${linkName}`
  );

  // In production, send this to your analytics backend
  // Example: fetch('/api/analytics/affiliate-click', { ... })
}

/**
 * Export helper functions for dynamic link generation
 */
export { generateTravelpayoutLink, generateBookingLink };

/**
 * Configuration object for easy reference
 */
export const affiliateConfig = {
  travelpayout: {
    affiliateId: TRAVELPAYOUT_AFFILIATE_ID,
    utmSource: TRAVELPAYOUT_UTM_SOURCE,
    utmMedium: TRAVELPAYOUT_UTM_MEDIUM,
  },
  booking: {
    affiliateId: BOOKING_AFFILIATE_ID,
  },
};
