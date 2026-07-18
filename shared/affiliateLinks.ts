/**
 * Centralized affiliate links configuration
 * All affiliate URLs managed in one place for easy tracking and updates
 */

export const affiliateLinks = {
  // GetYourGuide
  getyourguide: {
    partnerId: 'YOPATWV',
    baseUrl: 'https://gyg.me',
    tours: {
      europe: 'https://gyg.me/JwtO7kBb',
      asia: 'https://gyg.me/0eA5eqhT',
      brazil: 'https://gyg.me/As25WS5K',
    },
  },

  // Stay22 Booking.com
  stay22: {
    baseUrl: 'https://booking.stay22.com/thestayandwander',
    hotels: {
      // Asia
      tokyo: 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF',
      bangkok: 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF',
      bali: 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF',
      seoul: 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF',
      
      // Europe
      lisbon: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0',
      dubrovnik: 'https://booking.stay22.com/thestayandwander/FBzzZenMr0',
      budapest: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0',
      porto: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0',
      athens: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0',
      ljubljana: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0',
      kotor: 'https://booking.stay22.com/thestayandwander/FBzzZenMr0',
      
      // Brazil
      rio: 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN',
      amazon: 'https://booking.stay22.com/thestayandwander/9lYbziHE4c',
      saoPaulo: 'https://booking.stay22.com/thestayandwander/5x2vv0_ZR9',
      florianopolis: 'https://booking.stay22.com/thestayandwander/8nvt_gi849',
      
      // General search
      general: 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF',
    },
    agoda: {
      tokyo: 'https://agoda.stay22.com/thestayandwander/thngueyN2R',
    },
  },

  // Aviasales
  aviasales: {
    baseUrl: 'https://aviasales.tpo.lu',
    flights: {
      general: 'https://aviasales.tpo.lu/f9QeB1mu',
      asia: 'https://aviasales.tpo.lu/f9QeB1mu',
      brazil: 'https://aviasales.tpo.lu/f9QeB1mu',
    },
  },

  // Trip.com
  tripcom: {
    baseUrl: 'https://www.trip.com/t',
    hotels: {
      asia: 'https://www.trip.com/t/tUMFPimoXV2',
    },
  },

  // Mailchimp
  mailchimp: {
    audienceId: '48ee0dc10117e46d5a5e32365',
    formId: '420603a8e8e11623f80d61e27',
  },
};

/**
 * Affiliate partner types for tracking
 */
export enum AffiliatePartner {
  GETYOURGUIDE = 'getyourguide',
  STAY22 = 'stay22',
  AGODA = 'agoda',
  AVIASALES = 'aviasales',
  TRIPCOM = 'tripcom',
  MAILCHIMP = 'mailchimp',
}

/**
 * Affiliate link categories for analytics
 */
export enum AffiliateLinkCategory {
  HOTEL = 'hotel',
  FLIGHT = 'flight',
  TOUR = 'tour',
  EMAIL = 'email',
}

/**
 * Get affiliate link with tracking parameters
 */
export const getTrackingUrl = (
  partner: AffiliatePartner,
  category: AffiliateLinkCategory,
  source: string,
  baseUrl: string
): string => {
  const params = new URLSearchParams({
    utm_source: 'thestayandwander',
    utm_medium: partner,
    utm_campaign: category,
    utm_content: source,
  });

  // For partners that support UTM parameters
  if (baseUrl.includes('?')) {
    return `${baseUrl}&${params.toString()}`;
  }
  return `${baseUrl}?${params.toString()}`;
};
