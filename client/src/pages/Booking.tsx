import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularRoutesWidgetBooking from "@/components/PopularRoutesWidgetBooking";
import GetYourGuideTours from "@/components/GetYourGuideTours";
import { useState } from "react";

export default function Booking() {
  const [activeTab, setActiveTab] = useState("hotels");

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Book Your Perfect Trip
          </h1>
          <p className="text-lg text-gray-600">
            Search hotels, flights, cruises and car rentals — all in one place
          </p>
        </div>
      </section>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 bg-transparent border-b-0">
              <TabsTrigger
                value="hotels"
                className="pb-4 border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
              >
                Find Hotels
              </TabsTrigger>
              <TabsTrigger
                value="flights"
                className="pb-4 border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
              >
                Search Flights
              </TabsTrigger>
              <TabsTrigger
                value="cruises"
                className="pb-4 border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
              >
                Browse Cruises
              </TabsTrigger>
              <TabsTrigger
                value="cars"
                className="pb-4 border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
              >
                Car Rentals
              </TabsTrigger>
              <TabsTrigger
                value="tours"
                className="pb-4 border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
              >
                Tours & Activities
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container py-12 px-4">
        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <div className="space-y-12">
            {/* Search Widget */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Find Your Perfect Hotel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Destination
                  </label>
                  <Input placeholder="City or hotel name" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Check-in
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Check-out
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Guests
                  </label>
                  <Input placeholder="2 guests" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg h-auto">
                Search Hotels on Booking.com
              </Button>
            </div>

            {/* Featured Destinations */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Featured Hotel Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    city: "Tokyo",
                    image: "/manus-storage/asia-destination_b126f0fb.png",
                    description: "Modern luxury in Japan's vibrant capital",
                  },
                  {
                    city: "Lisbon",
                    image: "/manus-storage/europe-destination_1b1208ab.png",
                    description: "Charming Portuguese coastal elegance",
                  },
                  {
                    city: "Rio de Janeiro",
                    image: "/manus-storage/brazil-destination_ea7c39d7.png",
                    description: "Beachfront paradise in Brazil",
                  },
                ].map((dest) => (
                  <Card key={dest.city} className="overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.city}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                        {dest.city}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {dest.description}
                      </p>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                        Browse Hotels
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Flights Tab */}
        {activeTab === "flights" && (
          <div className="space-y-12">
            {/* Search Widget */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Find the Best Flight Deals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    From
                  </label>
                  <Input placeholder="Departure city" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    To
                  </label>
                  <Input placeholder="Destination" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Depart
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Return
                  </label>
                  <Input type="date" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg h-auto">
                Search Flights on Aviasales
              </Button>
            </div>

            {/* Popular Routes Widget */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "#F4A261" }}>
                Popular Routes
              </h2>
              <PopularRoutesWidgetBooking />
            </div>
          </div>
        )}

        {/* Cruises Tab */}
        {activeTab === "cruises" && (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Browse Cruise Deals</h3>
            <p className="text-gray-500 mb-6">Mediterranean, Southeast Asia and South America cruise routes</p>
            <a href="https://www.cruisedirect.com" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold inline-block">
              Search Cruise Deals
            </a>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-600">
                <div className="text-3xl mb-2">🌊</div>
                <div className="font-bold text-blue-600">Mediterranean</div>
                <div className="text-sm text-gray-400 mb-3">Italy, Greece, Croatia</div>
                <a href="https://www.cruisedirect.com" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold inline-block">Explore</a>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-600">
                <div className="text-3xl mb-2">🌏</div>
                <div className="font-bold text-blue-600">Southeast Asia</div>
                <div className="text-sm text-gray-400 mb-3">Thailand, Vietnam</div>
                <a href="https://www.cruisedirect.com" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold inline-block">Explore</a>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-600">
                <div className="text-3xl mb-2">🌎</div>
                <div className="font-bold text-blue-600">South America</div>
                <div className="text-sm text-gray-400 mb-3">Brazil, Argentina</div>
                <a href="https://www.cruisedirect.com" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold inline-block">Explore</a>
              </div>
            </div>
          </div>
        )}

        {/* Car Rentals Tab */}
        {activeTab === "cars" && (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Find the Best Car Rental Deals</h3>
            <p className="text-gray-500 mb-6">Compare 500+ suppliers worldwide including Hertz, Avis, Enterprise</p>
            <div className="flex gap-4 justify-center mb-8 flex-wrap">
              <a href="https://www.discovercars.com" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold inline-block">
                Search Car Rentals
              </a>
              <a href="https://www.rentalcars.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold inline-block">
                Compare Prices
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">🚗</div>
                <div className="font-bold text-blue-600">Economy</div>
                <div className="text-sm text-gray-400">From $15/day</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">🚙</div>
                <div className="font-bold text-blue-600">SUV & Family</div>
                <div className="text-sm text-gray-400">From $35/day</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">🏎️</div>
                <div className="font-bold text-blue-600">Luxury</div>
                <div className="text-sm text-gray-400">From $80/day</div>
              </div>
            </div>
          </div>
        )}

        {/* Tours & Activities Tab */}
        {activeTab === "tours" && (
          <div className="space-y-12">
            <div className="p-4 text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Top-Rated Tours & Activities</h3>
              <p className="text-gray-500">Book instantly — free cancellation on most experiences</p>
            </div>
            <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
            <GetYourGuideTours />
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">
                  Your information is protected
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">
                  Best Price Guarantee
                </p>
                <p className="text-sm text-gray-600">
                  Lowest rates available
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">
                  Free Cancellation
                </p>
                <p className="text-sm text-gray-600">
                  Cancel anytime, no fees
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">24/7 Support</p>
                <p className="text-sm text-gray-600">
                  Always here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
