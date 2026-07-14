/**
 * Travelpayout Flight Deals Component
 * Displays real-time flight deals from Travelpayout API with affiliate tracking
 */

import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plane } from "lucide-react";
import { trackAffiliateClick } from "@/lib/affiliateLinks";

type FlightDeal = {
  route: string;
  origin: string;
  destination: string;
  price: number;
  airline: string;
  searchKey: string;
  affiliateUrl: string;
  currency: string;
};

export function TravelpayoutFlightDeals() {
  // Fetch popular flight deals
  const { data: deals, isLoading, error } = trpc.travelpayout.getPopularRoutes.useQuery();

  const handleBookFlight = (deal: FlightDeal) => {
    if (!deal) return;
    
    // Track the affiliate click
    trackAffiliateClick("travelpayout", "flight", deal.route);
    
    // Open affiliate link in new tab
    window.open(deal.affiliateUrl, "_blank");
  };

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Flight Deals</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            <p>Unable to load flight deals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container">
        <div className="flex items-center gap-3 mb-2">
          <Plane className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Best Flight Deals</h2>
        </div>
        <p className="text-gray-600 mb-8">Real-time prices from Travelpayout</p>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading flight deals...</span>
          </div>
        ) : !deals || deals.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-700">
            <p>No flight deals available at the moment. Please check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {deals.map((deal) => (
              <Card key={`${deal.origin}-${deal.destination}`} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{deal.route}</h3>
                    <p className="text-xs text-gray-500 mt-1">{deal.airline}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-3xl font-bold text-blue-600">
                      ${deal.price}
                    </p>
                    <p className="text-xs text-gray-500">{deal.currency}</p>
                  </div>

                  <Button
                    onClick={() => handleBookFlight(deal)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                  >
                    Book Now
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    Powered by Travelpayout
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            💡 Prices update daily. Book early for the best deals!
          </p>
        </div>
      </div>
    </section>
  );
}
