import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

/**
 * Travelpayout Router
 * Procedures for fetching real flight deals from Travelpayout API
 */
export const travelpayoutRouter = router({
  /**
   * Fetch flight deals for a specific route
   * Returns real-time prices with affiliate tracking
   */
  getFlightDeals: publicProcedure
    .input(
      z.object({
        origin: z.string().min(3).max(3), // IATA code, e.g., "LHR"
        destination: z.string().min(3).max(3), // IATA code, e.g., "NRT"
        departDate: z.string(), // YYYY-MM-DD format
      })
    )
    .query(async ({ input }) => {
      const apiToken = process.env.TRAVELPAYOUT_API_TOKEN;
      const affiliateId = process.env.TRAVELPAYOUT_AFFILIATE_ID;

      if (!apiToken) {
        console.error("Travelpayout API token not configured");
        return [];
      }

      try {
        const url = new URL("https://api.travelpayouts.com/v2/prices/latest");
        url.searchParams.set("origin", input.origin);
        url.searchParams.set("destination", input.destination);
        url.searchParams.set("depart_date", input.departDate);
        url.searchParams.set("token", apiToken);

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

        if (!data.data || data.data.length === 0) {
          return [];
        }

        // Transform API response to include affiliate links
        return data.data.map((deal) => ({
          origin: deal.origin,
          destination: deal.destination,
          route: `${deal.origin} → ${deal.destination}`,
          price: deal.price,
          airline: deal.airline,
          searchKey: deal.search_key,
          // Travelpayout affiliate link format
          affiliateUrl: `https://www.travelpayouts.com/searches/${deal.search_key}?utm_source=thestayandwander&utm_medium=affiliate&utm_campaign=flights&affiliate_id=${affiliateId}`,
          currency: "USD",
        }));
      } catch (error) {
        console.error("Error fetching Travelpayout deals:", error);
        return [];
      }
    }),

  /**
   * Get popular routes with flight deals
   * Useful for homepage featured deals section
   */
  getPopularRoutes: publicProcedure.query(async () => {
    const apiToken = process.env.TRAVELPAYOUT_API_TOKEN;
    const affiliateId = process.env.TRAVELPAYOUT_AFFILIATE_ID;

    if (!apiToken) {
      console.error("Travelpayout API token not configured");
      return [];
    }

    // Popular routes to fetch deals for
    const routes = [
      { origin: "LHR", destination: "NRT", name: "London → Tokyo" },
      { origin: "JFK", destination: "LIS", name: "New York → Lisbon" },
      { origin: "DXB", destination: "DPS", name: "Dubai → Bali" },
      { origin: "CDG", destination: "FCO", name: "Paris → Rome" },
      { origin: "ORD", destination: "GRU", name: "Chicago → São Paulo" },
    ];

    try {
      const deals = await Promise.all(
        routes.map(async (route) => {
          const url = new URL("https://api.travelpayouts.com/v2/prices/latest");
          url.searchParams.set("origin", route.origin);
          url.searchParams.set("destination", route.destination);
          url.searchParams.set("depart_date", "2026-08-01");
          url.searchParams.set("token", apiToken);

          const response = await fetch(url.toString());

          if (!response.ok) {
            return null;
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

          if (!data.data || data.data.length === 0) {
            return null;
          }

          const bestDeal = data.data[0];

          return {
            route: route.name,
            origin: route.origin,
            destination: route.destination,
            price: bestDeal.price,
            airline: bestDeal.airline,
            searchKey: bestDeal.search_key,
            affiliateUrl: `https://www.travelpayouts.com/searches/${bestDeal.search_key}?utm_source=thestayandwander&utm_medium=affiliate&utm_campaign=featured&affiliate_id=${affiliateId}`,
            currency: "USD",
          };
        })
      );

      return deals.filter((deal) => deal !== null);
    } catch (error) {
      console.error("Error fetching popular routes:", error);
      return [];
    }
  }),

  /**
   * Search flights with custom parameters
   * Used by the booking widget
   */
  searchFlights: publicProcedure
    .input(
      z.object({
        origin: z.string().min(3).max(3),
        destination: z.string().min(3).max(3),
        departDate: z.string(),
        returnDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const apiToken = process.env.TRAVELPAYOUT_API_TOKEN;
      const affiliateId = process.env.TRAVELPAYOUT_AFFILIATE_ID;

      if (!apiToken) {
        return [];
      }

      try {
        const url = new URL("https://api.travelpayouts.com/v2/prices/latest");
        url.searchParams.set("origin", input.origin);
        url.searchParams.set("destination", input.destination);
        url.searchParams.set("depart_date", input.departDate);
        if (input.returnDate) {
          url.searchParams.set("return_date", input.returnDate);
        }
        url.searchParams.set("token", apiToken);

        const response = await fetch(url.toString());

        if (!response.ok) {
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

        if (!data.data) {
          return [];
        }

        return data.data.map((deal) => ({
          origin: deal.origin,
          destination: deal.destination,
          price: deal.price,
          airline: deal.airline,
          searchKey: deal.search_key,
          affiliateUrl: `https://www.travelpayouts.com/searches/${deal.search_key}?utm_source=thestayandwander&utm_medium=affiliate&utm_campaign=search&affiliate_id=${affiliateId}`,
          currency: "USD",
        }));
      } catch (error) {
        console.error("Error searching flights:", error);
        return [];
      }
    }),
});
