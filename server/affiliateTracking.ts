/**
 * Affiliate tracking database helpers
 */

import { getDb } from './db';
import { affiliateClicks, affiliateConversions } from '../drizzle/schema';

export interface TrackClickParams {
  partner: string;
  category: string;
  source: string;
  destination: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  userId?: number;
}

export interface TrackConversionParams {
  clickId?: number;
  partner: string;
  category: string;
  conversionType: string;
  conversionValue?: string;
  externalId?: string;
  notes?: string;
}

/**
 * Track an affiliate link click
 */
export async function trackAffiliateClick(params: TrackClickParams) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.insert(affiliateClicks).values({
      partner: params.partner,
      category: params.category,
      source: params.source,
      destination: params.destination,
      sessionId: params.sessionId,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      referrer: params.referrer,
      userId: params.userId,
      timestamp: new Date(),
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    throw error;
  }
}

/**
 * Track an affiliate conversion
 */
export async function trackAffiliateConversion(params: TrackConversionParams) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const result = await db.insert(affiliateConversions).values({
      clickId: params.clickId,
      partner: params.partner,
      category: params.category,
      conversionType: params.conversionType,
      conversionValue: params.conversionValue,
      status: 'pending',
      externalId: params.externalId,
      notes: params.notes,
      timestamp: new Date(),
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error('Error tracking affiliate conversion:', error);
    throw error;
  }
}

/**
 * Get click statistics by partner
 */
export async function getClicksByPartner(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateClicks);

    // Group by partner
    const grouped: Record<string, number> = {};
    results.forEach((click: any) => {
      if (startDate && click.timestamp < startDate) return;
      if (endDate && click.timestamp > endDate) return;
      grouped[click.partner] = (grouped[click.partner] || 0) + 1;
    });

    return grouped;
  } catch (error) {
    console.error('Error getting clicks by partner:', error);
    throw error;
  }
}

/**
 * Get click statistics by category
 */
export async function getClicksByCategory(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateClicks);

    // Group by category
    const grouped: Record<string, number> = {};
    results.forEach((click: any) => {
      if (startDate && click.timestamp < startDate) return;
      if (endDate && click.timestamp > endDate) return;
      grouped[click.category] = (grouped[click.category] || 0) + 1;
    });

    return grouped;
  } catch (error) {
    console.error('Error getting clicks by category:', error);
    throw error;
  }
}

/**
 * Get click statistics by source
 */
export async function getClicksBySource(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateClicks);

    // Group by source
    const grouped: Record<string, number> = {};
    results.forEach((click: any) => {
      if (startDate && click.timestamp < startDate) return;
      if (endDate && click.timestamp > endDate) return;
      grouped[click.source] = (grouped[click.source] || 0) + 1;
    });

    return grouped;
  } catch (error) {
    console.error('Error getting clicks by source:', error);
    throw error;
  }
}

/**
 * Get conversion statistics
 */
export async function getConversionStats(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateConversions);

    const stats = {
      total: results.length,
      byPartner: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      totalValue: 0,
    };

    results.forEach((conversion: any) => {
      if (startDate && conversion.timestamp < startDate) return;
      if (endDate && conversion.timestamp > endDate) return;
      stats.byPartner[conversion.partner] = (stats.byPartner[conversion.partner] || 0) + 1;
      stats.byCategory[conversion.category] = (stats.byCategory[conversion.category] || 0) + 1;
      stats.byStatus[conversion.status] = (stats.byStatus[conversion.status] || 0) + 1;
      if (conversion.conversionValue) {
        stats.totalValue += parseFloat(conversion.conversionValue);
      }
    });

    return stats;
  } catch (error) {
    console.error('Error getting conversion stats:', error);
    throw error;
  }
}

/**
 * Get conversion rate (conversions / clicks)
 */
export async function getConversionRate(startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const clickResults = await db.select().from(affiliateClicks);
    const conversionResults = await db.select().from(affiliateConversions);

    let clicks = 0;
    let conversions = 0;

    clickResults.forEach((c: any) => {
      if (startDate && c.timestamp < startDate) return;
      if (endDate && c.timestamp > endDate) return;
      clicks++;
    });

    conversionResults.forEach((c: any) => {
      if (startDate && c.timestamp < startDate) return;
      if (endDate && c.timestamp > endDate) return;
      conversions++;
    });

    const rate = clicks > 0 ? (conversions / clicks) * 100 : 0;

    return {
      clicks,
      conversions,
      conversionRate: rate.toFixed(2),
    };
  } catch (error) {
    console.error('Error getting conversion rate:', error);
    throw error;
  }
}

/**
 * Get recent clicks
 */
export async function getRecentClicks(limit: number = 50) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateClicks);

    return results.slice(-limit).reverse();
  } catch (error) {
    console.error('Error getting recent clicks:', error);
    throw error;
  }
}

/**
 * Get top performing sources
 */
export async function getTopSources(limit: number = 10, startDate?: Date, endDate?: Date) {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    const results = await db.select().from(affiliateClicks);

    // Group by source and count
    const grouped: Record<string, number> = {};
    results.forEach((click: any) => {
      if (startDate && click.timestamp < startDate) return;
      if (endDate && click.timestamp > endDate) return;
      grouped[click.source] = (grouped[click.source] || 0) + 1;
    });

    // Sort and limit
    const sorted = Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([source, count]) => ({ source, count }));

    return sorted;
  } catch (error) {
    console.error('Error getting top sources:', error);
    throw error;
  }
}
