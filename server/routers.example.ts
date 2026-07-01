/**
 * EXAMPLE: Affiliate Integration Routes
 * 
 * This file shows how to integrate Travelpayout, Booking.com, and other affiliate networks.
 * Copy these procedures into server/routers.ts and customize as needed.
 * 
 * Before using, ensure you have:
 * 1. API credentials from Travelpayout, Booking.com, etc.
 * 2. Environment variables set (see INTEGRATION_GUIDE.md)
 * 3. Database tables created (if using custom affiliate link management)
 */

import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";

/**
 * EXAMPLE 1: Travelpayout Flight Deals
 * 
 * Fetches real-time flight deals from Travelpayout API.
 * Returns affiliate links that earn commission on bookings.
 */
export const travelpayoutFlightDeals = publicProcedure
  .input(
    z.object({
      origin: z.string().min(3).max(3), // IATA code, e.g., "LHR"
      destination: z.string().min(3).max(3), // IATA code, e.g., "NRT"
      departDate: z.string(), // YYYY-MM-DD format
    })
  )
  .query(async ({ input }) => {
    const apiKey = process.env.TRAVELPAYOUT_API_KEY;
    if (!apiKey) {
      throw new Error("Travelpayout API key not configured");
    }

    try {
      const url = new URL("https://api.travelpayouts.com/v2/prices/latest");
      url.searchParams.set("origin", input.origin);
      url.searchParams.set("destination", input.destination);
      url.searchParams.set("depart_date", input.departDate);
      url.searchParams.set("token", apiKey);

      const response = await fetch(url.toString());

      if (!response.ok) {
        console.error(
          `Travelpayout API error: ${response.status} ${response.statusText}`
        );
        return [];
      }

      const data = (await response.json()) as {
        data?: Array<{
          origin: string;
          destination: string;
          price: number;
          airline: string;
          search_key: string;
        }>;
      };

      if (!data.data) return [];

      // Transform API response to include affiliate links
      return data.data.map((deal) => ({
        route: `${deal.origin} → ${deal.destination}`,
        price: deal.price,
        airline: deal.airline,
        // Travelpayout affiliate link format
        affiliateUrl: `https://www.travelpayouts.com/searches/${deal.search_key}?utm_source=staywander&utm_medium=affiliate&utm_campaign=flights`,
      }));
    } catch (error) {
      console.error("Error fetching Travelpayout deals:", error);
      return [];
    }
  });

/**
 * EXAMPLE 2: Booking.com Hotel Affiliate Links
 * 
 * Generates affiliate links for hotel searches on Booking.com.
 * You need to be a Booking.com affiliate partner.
 */
export const bookingComHotelLink = publicProcedure
  .input(
    z.object({
      destination: z.string(),
      checkIn: z.string(), // YYYY-MM-DD
      checkOut: z.string(), // YYYY-MM-DD
      guests: z.number().default(2),
    })
  )
  .query(({ input }) => {
    const affiliateId = process.env.BOOKING_AFFILIATE_ID;
    if (!affiliateId) {
      throw new Error("Booking.com affiliate ID not configured");
    }

    // Build Booking.com search URL with affiliate parameters
    const url = new URL("https://www.booking.com/searchresults.html");
    url.searchParams.set("ss", input.destination);
    url.searchParams.set("checkin", input.checkIn);
    url.searchParams.set("checkout", input.checkOut);
    url.searchParams.set("group_adults", input.guests.toString());
    url.searchParams.set("no_rooms", "1");
    url.searchParams.set("affiliate_id", affiliateId);

    return {
      destination: input.destination,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      affiliateUrl: url.toString(),
    };
  });

/**
 * EXAMPLE 3: Track Affiliate Clicks
 * 
 * Records when users click on affiliate links for analytics.
 * Helps you understand which affiliate networks drive conversions.
 */
export const trackAffiliateClick = publicProcedure
  .input(
    z.object({
      network: z.enum(["travelpayout", "booking", "aviasales", "other"]),
      category: z.enum(["flight", "hotel", "cruise", "car"]),
      referrer: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // In production, save this to database for analytics
    // Example: await db.insert(affiliateClicks).values({ ... })

    console.log(
      `[Affiliate Click] Network: ${input.network}, Category: ${input.category}, User: ${ctx.user?.id || "anonymous"}`
    );

    return {
      tracked: true,
      timestamp: new Date(),
    };
  });

/**
 * EXAMPLE 4: Get Cached Flight Deals
 * 
 * For better performance, cache flight deals in the database
 * and refresh them periodically (e.g., every 6 hours).
 */
export const getCachedFlightDeals = publicProcedure
  .input(
    z.object({
      origin: z.string(),
      destination: z.string(),
    })
  )
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // TODO: Query cached deals from database
    // Example:
    // const deals = await db
    //   .select()
    //   .from(flightDeals)
    //   .where(
    //     and(
    //       eq(flightDeals.origin, input.origin),
    //       eq(flightDeals.destination, input.destination),
    //       gt(flightDeals.expiresAt, new Date())
    //     )
    //   );

    return [];
  });

/**
 * EXAMPLE 5: Admin - Manage Custom Affiliate Links
 * 
 * Allows admins to add, edit, and manage affiliate links in the database.
 * Useful for manually adding links that aren't available via API.
 */
export const adminAffiliateRouter = router({
  // Add a new affiliate link
  addLink: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        category: z.enum(["flight", "hotel", "cruise", "car"]),
        url: z.string().url(),
        network: z.string(),
        commissionRate: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Check if user is admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // TODO: Insert into affiliateLinks table
      // Example:
      // const result = await db.insert(affiliateLinks).values({
      //   name: input.name,
      //   category: input.category,
      //   url: input.url,
      //   network: input.network,
      //   commissionRate: input.commissionRate,
      // });

      return { success: true, message: "Link added successfully" };
    }),

  // Get all affiliate links
  getLinks: publicProcedure
    .input(
      z.object({
        category: z.enum(["flight", "hotel", "cruise", "car"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // TODO: Query from affiliateLinks table
      // Example:
      // const links = await db
      //   .select()
      //   .from(affiliateLinks)
      //   .where(
      //     input.category
      //       ? eq(affiliateLinks.category, input.category)
      //       : undefined
      //   );

      return [];
    }),

  // Update an affiliate link
  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        url: z.string().url().optional(),
        commissionRate: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // TODO: Update affiliateLinks table
      return { success: true, message: "Link updated successfully" };
    }),

  // Delete an affiliate link
  deleteLink: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // TODO: Delete from affiliateLinks table
      return { success: true, message: "Link deleted successfully" };
    }),
});

/**
 * USAGE IN FRONTEND
 * 
 * Import and use these procedures in your React components:
 * 
 * import { trpc } from "@/lib/trpc";
 * 
 * export function FlightDeals() {
 *   const { data: deals } = trpc.affiliate.getFlightDeals.useQuery({
 *     origin: "LHR",
 *     destination: "NRT",
 *     departDate: "2026-07-15",
 *   });
 * 
 *   return (
 *     <div>
 *       {deals?.map(deal => (
 *         <a key={deal.route} href={deal.affiliateUrl} target="_blank">
 *           {deal.route}: ${deal.price}
 *         </a>
 *       ))}
 *     </div>
 *   );
 * }
 */
