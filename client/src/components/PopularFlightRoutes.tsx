import { Plane, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * PopularFlightRoutes Component
 * Displays trending flight routes with quick links to Aviasales searches
 * Drives conversions by highlighting popular destinations
 */

interface FlightRoute {
  id: number;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  price: string;
  savings: string;
  image: string;
  searchUrl: string;
}

export default function PopularFlightRoutes() {
  const routes: FlightRoute[] = [
    {
      id: 1,
      from: "New York",
      fromCode: "JFK",
      to: "London",
      toCode: "LHR",
      price: "$450",
      savings: "Save 35%",
      image: "/manus-storage/hero-main_005302f1.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=JFK&destination=LHR&currency=usd",
    },
    {
      id: 2,
      from: "Los Angeles",
      fromCode: "LAX",
      to: "Tokyo",
      toCode: "NRT",
      price: "$520",
      savings: "Save 28%",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=LAX&destination=NRT&currency=usd",
    },
    {
      id: 3,
      from: "Miami",
      fromCode: "MIA",
      to: "Cancun",
      toCode: "CUN",
      price: "$180",
      savings: "Save 42%",
      image: "/manus-storage/brazil-destination_ea7c39d7.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=MIA&destination=CUN&currency=usd",
    },
    {
      id: 4,
      from: "San Francisco",
      fromCode: "SFO",
      to: "Bangkok",
      toCode: "BKK",
      price: "$480",
      savings: "Save 31%",
      image: "/manus-storage/asia-destination_b126f0fb.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=SFO&destination=BKK&currency=usd",
    },
    {
      id: 5,
      from: "Boston",
      fromCode: "BOS",
      to: "Paris",
      toCode: "CDG",
      price: "$420",
      savings: "Save 39%",
      image: "/manus-storage/europe-destination_de773d0d.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=BOS&destination=CDG&currency=usd",
    },
    {
      id: 6,
      from: "Seattle",
      fromCode: "SEA",
      to: "Bali",
      toCode: "DPS",
      price: "$550",
      savings: "Save 26%",
      image: "/manus-storage/blog-bali_5a40f78c.png",
      searchUrl:
        "https://aviasales.tpo.lu/f9QeB1mu?origin=SEA&destination=DPS&currency=usd",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2
              style={{ fontFamily: '"Playfair Display", serif' }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Popular Flight Routes
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover trending destinations with the best deals. Click any route
            to search flights instantly.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Card
              key={route.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Route Image */}
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Savings Badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {route.savings}
                </div>

                {/* Route Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-light">{route.from}</p>
                      <p className="text-lg font-bold">{route.fromCode}</p>
                    </div>
                    <Plane className="w-5 h-5" />
                    <div className="text-right">
                      <p className="text-sm font-light">{route.to}</p>
                      <p className="text-lg font-bold">{route.toCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Details */}
              <CardContent className="p-4">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Starting from</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {route.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Round-trip per person
                  </p>
                </div>

                {/* Search Button */}
                <a href={route.searchUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Search Flights
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Don't see your destination? Use the booking widget above to search
            any route.
          </p>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
