import { useState } from "react";
import Head from "@/components/Head";
import { useAuth } from "@/_core/hooks/useAuth";
import { ChevronDown } from "lucide-react";
import { pageMetadataConfig } from "@shared/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import NewsletterSignup from "@/components/NewsletterSignup";
import AviasalesFlightWidget from "@/components/AviasalesFlightWidget";
import PopularFlightRoutes from "@/components/PopularFlightRoutes";
import PopularRoutesWidget from "@/components/PopularRoutesWidget";
import GetYourGuideTours from "@/components/GetYourGuideTours";
import { DISCOVERCARS_AFFILIATE_URL } from "@/lib/affiliateLinks";


export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("hotels");

  const homeMetadata = pageMetadataConfig.home;

  return (
    <div className="min-h-screen bg-white">
      <Head
        title={homeMetadata.title}
        description={homeMetadata.description}
        canonical={`https://thestayandwander.com${homeMetadata.url}`}
        ogTitle={homeMetadata.title}
        ogDescription={homeMetadata.description}
        ogImage={homeMetadata.image}
        ogUrl={`https://thestayandwander.com${homeMetadata.url}`}
        keywords={homeMetadata.keywords}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/manus-storage/hero-main_005302f1.png"
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <div className="text-sm font-light tracking-widest mb-4 text-yellow-300">
            WELCOME TO THE STAY & WANDER
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Beautiful Places, Unique Stays & Unforgettable Journeys
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 text-gray-100">
            Hand-picked hotels, custom itineraries and travel inspiration for
            Europe, Asia & Brazil
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/itineraries" className="block">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-6 text-lg h-auto">
                Start Planning Your Trip
              </Button>
            </a>
            <a href="/itineraries" className="block">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg h-auto"
              >
                Browse Itineraries
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Booking Widget */}
      <section className="relative -mt-20 mb-20 z-20 px-4">
        <div className="container max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8 border-b">
              <TabsTrigger value="hotels" className="pb-3">
                Hotels
              </TabsTrigger>
              <TabsTrigger value="flights" className="pb-3">
                Flights
              </TabsTrigger>
              <TabsTrigger value="cruises" className="pb-3">
                Cruises
              </TabsTrigger>
              <TabsTrigger value="cars" className="pb-3">
                Car Rentals
              </TabsTrigger>
            </TabsList>

            {/* Hotels Tab */}
            <TabsContent value="hotels" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Destination
                  </label>
                  <Input placeholder="Where to?" />
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
                Search Hotels (Booking.com)
              </Button>
            </TabsContent>

            {/* Flights Tab */}
            <TabsContent value="flights" className="space-y-4">
              <AviasalesFlightWidget />
            </TabsContent>

            {/* Cruises Tab */}
            <TabsContent value="cruises" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Search Cruises (CruiseDirect)
              </Button>
            </TabsContent>

            {/* Car Rentals Tab */}
            <TabsContent value="cars" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <a href={DISCOVERCARS_AFFILIATE_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg h-auto">
                  Search Car Rentals
                </Button>
              </a>
            </TabsContent>
          </Tabs>

          {/* Trust Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p className="font-semibold mb-2">
              Trusted by 25,000+ Travellers
            </p>
            <p>
              Partnered with Booking.com, Aviasales, GetYourGuide & CruiseDirect
            </p>
          </div>
        </div>
      </section>

      {/* Popular Flight Routes Section */}
      <PopularFlightRoutes />

      {/* Destinations Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Where Will You Wander Next?
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked destinations across Europe, Asia & Brazil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Asia Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden group">
                <img
                  src="/manus-storage/asia-destination_b126f0fb.png"
                  alt="Asia"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 text-yellow-400 font-semibold text-sm">
                  ASIA
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Culture, temples & K-cool vibes
                </h3>
                <p className="text-gray-600 mb-6">
                  From Tokyo's electric streets to Seoul's creative districts —
                  Asia captivates like nowhere else.
                </p>
                <div className="flex gap-3">
                  <a href="https://thestayandwander.com/blog/tokyo-vs-bangkok-2026" className="flex-1">
                    <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
                      Explore Asia
                    </Button>
                  </a>
                  <a href="https://booking.stay22.com/thestayandwander/r-lvU3PLVF" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Find Hotels
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Europe Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden group">
                <img
                  src="/manus-storage/europe-destination_1b1208ab.png"
                  alt="Europe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 text-yellow-400 font-semibold text-sm">
                  EUROPE
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Sun-drenched escapes & timeless cities
                </h3>
                <p className="text-gray-600 mb-6">
                  Cobblestone streets, clifftop sunsets, and boutique hotels —
                  Europe delivers magic at every turn.
                </p>
                <div className="flex gap-3">
                  <a href="https://thestayandwander.com/blog/best-cities-europe-summer-2026" className="flex-1">
                    <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
                      Explore Europe
                    </Button>
                  </a>
                  <a href="https://booking.stay22.com/thestayandwander/_3gvRmesd0" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Find Hotels
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Brazil Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden group">
                <img
                  src="/manus-storage/brazil-destination_ea7c39d7.png"
                  alt="Brazil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 text-yellow-400 font-semibold text-sm">
                  BRAZIL
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Vibrant, wild & utterly unforgettable
                </h3>
                <p className="text-gray-600 mb-6">
                  From Carnival energy in Rio to the depths of the Amazon —
                  Brazil is unlike anywhere on earth.
                </p>
                <div className="flex gap-3">
                  <a href="https://thestayandwander.com/blog/brazil-travel-guide-2026" className="flex-1">
                    <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
                      Explore Brazil
                    </Button>
                  </a>
                  <a href="https://booking.stay22.com/thestayandwander/zRyDL-E_PN" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    >
                      Find Hotels
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Flight Deals Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-2">
              Best Flight Deals This Week
            </h2>
            <p className="text-yellow-300 font-semibold">
              Powered by Aviasales — updated daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { route: "Dubai → Tokyo", price: "From $420", month: "September 2026", link: "https://aviasales.tpo.lu/f9QeB1mu" },
              { route: "Abu Dhabi → London", price: "From $380", month: "October 2026", link: "https://aviasales.tpo.lu/f9QeB1mu" },
              { route: "Dubai → Bali", price: "From $290", month: "September 2026", link: "https://aviasales.tpo.lu/f9QeB1mu" },
            ].map((deal, idx) => (
              <Card key={idx} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    {deal.route}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{deal.month}</p>
                  <div className="text-3xl font-bold text-yellow-500 mb-6">
                    {deal.price}
                  </div>
                  <p className="text-xs text-gray-500 mb-4">return</p>
                  <a href={deal.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-[#F4A261] hover:bg-[#E89B4B] text-white">
                      Book This Flight
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-200 mt-8">
            Prices are indicative and subject to availability. Powered by
            Aviasales via Travelpayouts.
          </p>
        </div>
      </section>

      {/* Popular Routes Widget Section */}
      <PopularRoutesWidget />

      {/* GetYourGuide Tours Section */}
      <GetYourGuideTours />

      {/* Itinerary Previews */}
      <section className="py-20 px-4 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Your Perfect Trip, Already Planned
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Days in Tokyo & Seoul",
                image: "/manus-storage/itinerary-tokyo-seoul_dbb9c3ea.png",
                region: "ASIA",
                duration: "10 Days",
                description:
                  "Culture, temples, street food and K-pop districts across Japan and South Korea.",
                destinations: 4,
                hotels: 8,
                activities: 15,
              },
              {
                title: "Two-Week Mediterranean Escape",
                image: "/manus-storage/itinerary-mediterranean_27a74144.png",
                region: "EUROPE",
                duration: "14 Days",
                description:
                  "Lisbon, Dubrovnik, Santorini and the Amalfi Coast in one perfect summer trip.",
                destinations: 4,
                hotels: 7,
                activities: 18,
              },
              {
                title: "Ultimate Brazil Adventure",
                image: "/manus-storage/brazil-destination_ea7c39d7.png",
                region: "BRAZIL",
                duration: "14 Days",
                description:
                  "Rio de Janeiro, the Amazon, São Paulo and Florianópolis beaches in 14 days.",
                destinations: 4,
                hotels: 6,
                activities: 20,
              },
            ].map((itinerary, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 text-yellow-400 font-semibold text-sm">
                    {itinerary.region}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                    {itinerary.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                    {itinerary.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {itinerary.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-600 mb-6 py-3 border-t border-b">
                    <div>📍 {itinerary.destinations} Destinations</div>
                    <div>🏨 {itinerary.hotels} Hotels</div>
                    <div>🎯 {itinerary.activities} Activities</div>
                  </div>
                  <a href="https://thestayandwander.com/itineraries" className="block w-full">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                      View Full Itinerary
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSignup />

      {/* Blog Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Latest from the Blog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Hotels in Bali for Every Budget 2026",
                image: "/manus-storage/blog-bali_5a40f78c.png",
                category: "Hotel Reviews",
                excerpt: "Discover luxury, mid-range, and budget-friendly stays in Bali.",
                readTime: "5 min read",
              },
              {
                title: "7 Best Cities to Visit in Europe This Summer",
                image: "/manus-storage/blog-europe-cities_de773d0d.png",
                category: "Destination Guides",
                excerpt:
                  "From Lisbon to Prague, explore Europe's most enchanting cities.",
                readTime: "7 min read",
              },
              {
                title: "Tokyo vs Bangkok — Which Should You Visit First?",
                image: "/manus-storage/blog-tokyo-bangkok_0467868b.png",
                category: "Itinerary Ideas",
                excerpt:
                  "A detailed comparison to help you choose your next Asian adventure.",
                readTime: "6 min read",
              },
            ].map((post, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                    <span>By Travel Team</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
