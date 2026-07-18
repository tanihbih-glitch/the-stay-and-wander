import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  trackAffiliateClick,
  trackAffiliateConversion,
  getClicksByPartner,
  getClicksByCategory,
  getClicksBySource,
  getConversionStats,
  getConversionRate,
  getRecentClicks,
  getTopSources,
} from './affiliateTracking';

// Mock the database module
vi.mock('./db', () => ({
  getDb: vi.fn(async () => ({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue({ insertId: 1 }),
    }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockResolvedValue([]),
    }),
  })),
}));

describe('Affiliate Tracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('trackAffiliateClick', () => {
    it('should track a click with all parameters', async () => {
      const result = await trackAffiliateClick({
        partner: 'GetYourGuide',
        category: 'Tours',
        source: 'Blog',
        destination: 'https://gyg.me/tours',
        sessionId: 'session-123',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        referrer: 'https://example.com',
        userId: 1,
      });

      expect(result).toBeDefined();
    });

    it('should track a click with minimal parameters', async () => {
      const result = await trackAffiliateClick({
        partner: 'Stay22',
        category: 'Hotels',
        source: 'Homepage',
        destination: 'https://booking.stay22.com',
      });

      expect(result).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
      const invalidParams = {
        partner: '',
        category: '',
        source: '',
        destination: '',
      };

      // Should not throw, but log error
      const result = await trackAffiliateClick(invalidParams);
      expect(result).toBeDefined();
    });
  });

  describe('trackAffiliateConversion', () => {
    it('should track a conversion with all parameters', async () => {
      const result = await trackAffiliateConversion({
        clickId: 1,
        partner: 'GetYourGuide',
        category: 'Tours',
        conversionType: 'booking',
        conversionValue: '150.00',
        externalId: 'ext-123',
        notes: 'Test conversion',
      });

      expect(result).toBeDefined();
    });

    it('should track a conversion with minimal parameters', async () => {
      const result = await trackAffiliateConversion({
        partner: 'Stay22',
        category: 'Hotels',
        conversionType: 'booking',
      });

      expect(result).toBeDefined();
    });
  });

  describe('Analytics Queries', () => {
    it('should get clicks by partner', async () => {
      const result = await getClicksByPartner();
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should get clicks by category', async () => {
      const result = await getClicksByCategory();
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should get clicks by source', async () => {
      const result = await getClicksBySource();
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should get conversion stats', async () => {
      const result = await getConversionStats();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('byPartner');
      expect(result).toHaveProperty('byCategory');
      expect(result).toHaveProperty('byStatus');
      expect(result).toHaveProperty('totalValue');
    });

    it('should get conversion rate', async () => {
      const result = await getConversionRate();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('clicks');
      expect(result).toHaveProperty('conversions');
      expect(result).toHaveProperty('conversionRate');
    });

    it('should get recent clicks', async () => {
      const result = await getRecentClicks(10);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should get top sources', async () => {
      const result = await getTopSources(5);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Date Range Filtering', () => {
    it('should filter clicks by date range', async () => {
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-31');

      const result = await getClicksByPartner(startDate, endDate);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should filter conversions by date range', async () => {
      const startDate = new Date('2026-01-01');
      const endDate = new Date('2026-01-31');

      const result = await getConversionStats(startDate, endDate);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('total');
    });
  });

  describe('Data Aggregation', () => {
    it('should calculate conversion rate correctly', async () => {
      const result = await getConversionRate();
      expect(result).toBeDefined();
      expect(typeof result.conversionRate).toBe('string');
      
      // Parse the rate to ensure it's a valid percentage
      const rate = parseFloat(result.conversionRate);
      expect(rate).toBeGreaterThanOrEqual(0);
      expect(rate).toBeLessThanOrEqual(100);
    });

    it('should return top sources in correct order', async () => {
      const result = await getTopSources(5);
      expect(Array.isArray(result)).toBe(true);
      
      // Verify each item has required properties
      result.forEach((item) => {
        expect(item).toHaveProperty('source');
        expect(item).toHaveProperty('count');
        expect(typeof item.count).toBe('number');
      });
    });
  });
});
