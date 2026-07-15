import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularRoutesWidgetBooking from "@/components/PopularRoutesWidgetBooking";

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
            <TabsList className="grid w-full grid-cols-4 bg-transparent border-b-0">
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
          <div className="space-y-12">
            {/* Search Widget */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Explore Cruise Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Destination
                  </label>
                  <Input placeholder="Where to?" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Departure Month
                  </label>
                  <Input type="month" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Duration (days)
                  </label>
                  <Input placeholder="7" type="number" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg h-auto">
                Search Cruises on CruiseDirect
              </Button>
            </div>

            {/* Cruise Routes */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Featured Cruise Routes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Mediterranean", duration: "7-14 days" },
                  { name: "Southeast Asia", duration: "10-21 days" },
                  { name: "South America", duration: "14-28 days" },
                ].map((cruise) => (
                  <Card key={cruise.name}>
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                        {cruise.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{cruise.duration}</p>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                        Explore Cruises
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Car Rentals Tab */}
        {activeTab === "cars" && (
          <div className="space-y-12">
            {/* Search Widget */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Rent a Car at Your Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Pick-up Location
                  </label>
                  <Input placeholder="City or airport" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Pick-up Date
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Return Date
                  </label>
                  <Input type="date" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg h-auto">
                Search Cars
              </Button>
            </div>

            {/* Popular Destinations */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Popular Car Rental Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { city: "Tokyo", country: "Japan" },
                  { city: "Lisbon", country: "Portugal" },
                  { city: "Rio de Janeiro", country: "Brazil" },
                ].map((dest) => (
                  <Card key={dest.city}>
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg font-bold text-gray-900 mb-1">
                        {dest.city}
                      </h3>
                      <p className="text-gray-600 mb-4">{dest.country}</p>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                        Browse Cars
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
