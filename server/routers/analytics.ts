import { router, protectedProcedure, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
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
} from '../affiliateTracking';

export const analyticsRouter = router({
  // Track a click (public procedure for unauthenticated visitors)
  trackClick: publicProcedure
    .input(
      z.object({
        partner: z.string().min(1),
        category: z.string().min(1),
        source: z.string().min(1),
        destination: z.string().min(1),
        sessionId: z.string().optional(),
        referrer: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await trackAffiliateClick({
          partner: input.partner,
          category: input.category,
          source: input.source,
          destination: input.destination,
          sessionId: input.sessionId,
          referrer: input.referrer,
          userAgent: ctx.req.headers['user-agent'],
          ipAddress: ctx.req.ip,
          userId: ctx.user?.id,
        });
        return { success: true };
      } catch (error) {
        console.error('Error tracking click:', error);
        // Don't throw error to prevent blocking user navigation
        // Log the error but return success to maintain UX
        return { success: false, error: 'Failed to track click' };
      }
    }),

  // Track a conversion (admin only)
  trackConversion: protectedProcedure
    .input(
      z.object({
        clickId: z.number().optional(),
        partner: z.string(),
        category: z.string(),
        conversionType: z.string(),
        conversionValue: z.string().optional(),
        externalId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can track conversions',
        });
      }
      try {
        await trackAffiliateConversion({
          clickId: input.clickId,
          partner: input.partner,
          category: input.category,
          conversionType: input.conversionType,
          conversionValue: input.conversionValue,
          externalId: input.externalId,
        });
        return { success: true };
      } catch (error) {
        console.error('Error tracking conversion:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to track conversion',
        });
      }
    }),

  // Get analytics data (admin only)
  getClicksByPartner: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getClicksByPartner(input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting clicks by partner:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getClicksByCategory: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getClicksByCategory(input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting clicks by category:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getClicksBySource: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getClicksBySource(input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting clicks by source:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getConversionStats: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getConversionStats(input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting conversion stats:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getConversionRate: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getConversionRate(input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting conversion rate:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getRecentClicks: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional().default(50),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getRecentClicks(input.limit);
      } catch (error) {
        console.error('Error getting recent clicks:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),

  getTopSources: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional().default(10),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admins can view analytics',
        });
      }
      try {
        return await getTopSources(input.limit, input.startDate, input.endDate);
      } catch (error) {
        console.error('Error getting top sources:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch analytics',
        });
      }
    }),
});
