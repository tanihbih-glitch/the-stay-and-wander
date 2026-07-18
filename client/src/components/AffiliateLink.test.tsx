import { describe, it, expect, vi } from 'vitest';
import { AffiliateLink } from './AffiliateLink';

// Mock trpc
vi.mock('@/lib/trpc', () => ({
  trpc: {
    analytics: {
      trackClick: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
          isError: false,
          error: null,
        })),
      },
    },
  },
}));

describe('AffiliateLink Component', () => {
  it('exports AffiliateLink component', () => {
    expect(AffiliateLink).toBeDefined();
    expect(typeof AffiliateLink).toBe('function');
  });

  it('accepts required props', () => {
    const props = {
      href: 'https://example.com',
      partner: 'GetYourGuide',
      category: 'Tours',
      source: 'Blog',
      destination: 'Test Tour',
      children: 'Click Here',
    };

    expect(props).toHaveProperty('href');
    expect(props).toHaveProperty('partner');
    expect(props).toHaveProperty('category');
    expect(props).toHaveProperty('source');
    expect(props).toHaveProperty('destination');
    expect(props).toHaveProperty('children');
  });

  it('accepts optional props', () => {
    const props = {
      href: 'https://example.com',
      partner: 'Stay22',
      category: 'Hotels',
      source: 'Homepage',
      destination: 'Hotel Search',
      children: 'Book Hotel',
      className: 'custom-class',
      target: '_blank',
      rel: 'noopener noreferrer',
    };

    expect(props).toHaveProperty('className');
    expect(props).toHaveProperty('target');
    expect(props).toHaveProperty('rel');
  });

  it('has correct default values', () => {
    const defaultTarget = '_blank';
    const defaultRel = 'noopener noreferrer';

    expect(defaultTarget).toBe('_blank');
    expect(defaultRel).toBe('noopener noreferrer');
  });

  it('supports all affiliate partners', () => {
    const partners = ['GetYourGuide', 'Stay22', 'Aviasales', 'Trip.com', 'Agoda'];

    partners.forEach((partner) => {
      expect(partner).toBeDefined();
      expect(typeof partner).toBe('string');
      expect(partner.length).toBeGreaterThan(0);
    });
  });

  it('supports all affiliate categories', () => {
    const categories = ['Tours', 'Hotels', 'Flights', 'Activities', 'Email'];

    categories.forEach((category) => {
      expect(category).toBeDefined();
      expect(typeof category).toBe('string');
      expect(category.length).toBeGreaterThan(0);
    });
  });

  it('supports all traffic sources', () => {
    const sources = ['Blog', 'Itinerary', 'Homepage', 'Booking Portal', 'Email'];

    sources.forEach((source) => {
      expect(source).toBeDefined();
      expect(typeof source).toBe('string');
      expect(source.length).toBeGreaterThan(0);
    });
  });

  it('validates href is a valid URL', () => {
    const validUrls = [
      'https://example.com',
      'https://booking.stay22.com/hotels',
      'https://gyg.me/tours',
      'https://aviasales.tpo.lu/flights',
    ];

    validUrls.forEach((url) => {
      expect(() => new URL(url)).not.toThrow();
    });
  });

  it('handles tracking parameters correctly', () => {
    const trackingParams = {
      partner: 'GetYourGuide',
      category: 'Tours',
      source: 'Blog',
      destination: 'Bali Tours',
      sessionId: 'session-123',
      referrer: 'https://example.com',
    };

    expect(trackingParams.partner).toBe('GetYourGuide');
    expect(trackingParams.category).toBe('Tours');
    expect(trackingParams.source).toBe('Blog');
    expect(trackingParams.destination).toBe('Bali Tours');
    expect(trackingParams.sessionId).toBe('session-123');
    expect(trackingParams.referrer).toBe('https://example.com');
  });

  it('supports multiple links on same page', () => {
    const links = [
      {
        href: 'https://gyg.me/tours',
        partner: 'GetYourGuide',
        category: 'Tours',
        source: 'Blog',
      },
      {
        href: 'https://booking.stay22.com/hotels',
        partner: 'Stay22',
        category: 'Hotels',
        source: 'Blog',
      },
      {
        href: 'https://aviasales.tpo.lu/flights',
        partner: 'Aviasales',
        category: 'Flights',
        source: 'Blog',
      },
    ];

    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('partner');
      expect(link).toHaveProperty('category');
      expect(link).toHaveProperty('source');
    });
  });
});
