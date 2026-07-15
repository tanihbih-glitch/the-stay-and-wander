import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Itineraries() {
  const [activeFilter, setActiveFilter] = useState("all");

  const itineraries = [
    {
      id: 1,
      title: "10 Days in Tokyo & Seoul",
      region: "ASIA",
      duration: "10 Days",
      season: "Spring & Fall",
      budget: "$2,500 - $3,500",
      difficulty: "Moderate",
      image: "/manus-storage/itinerary-tokyo-seoul_dbb9c3ea.png",
      description:
        "Culture, temples, street food and K-pop districts across Japan and South Korea.",
      days: [
        {
          day: 1,
          title: "Arrival in Tokyo",
          morning: "Arrive at Narita Airport, transfer to hotel",
          afternoon: "Check-in and rest",
          evening: "Dinner in Shibuya",
        },
        {
          day: 2,
          title: "Tokyo Exploration",
          morning: "Visit Senso-ji Temple",
          afternoon: "Shopping in Harajuku",
          evening: "Karaoke in Shinjuku",
        },
        {
          day: 3,
          title: "Modern Tokyo",
          morning: "Tokyo Skytree observation deck",
          afternoon: "Akihabara electronics district",
          evening: "Dinner in Ginza",
        },
        {
          day: 4,
          title: "Day Trip to Mount Fuji",
          morning: "Early departure to Hakone",
          afternoon: "Mount Fuji views and hot springs",
          evening: "Return to Tokyo",
        },
        {
          day: 5,
          title: "Travel to Seoul",
          morning: "Flight to Seoul",
          afternoon: "Check-in and explore Myeongdong",
          evening: "Korean BBQ dinner",
        },
        {
          day: 6,
          title: "Seoul Culture",
          morning: "Gyeongbokgung Palace tour",
          afternoon: "Bukchon Hanok Village",
          evening: "Dongdaemun shopping",
        },
        {
          day: 7,
          title: "K-pop & Modern Seoul",
          morning: "K-pop museum visit",
          afternoon: "Gangnam district exploration",
          evening: "Han River park sunset",
        },
        {
          day: 8,
          title: "Day Trip to Nami Island",
          morning: "Nami Island scenic tour",
          afternoon: "Petite France village",
          evening: "Return to Seoul",
        },
        {
          day: 9,
          title: "Shopping & Relaxation",
          morning: "Spa and wellness",
          afternoon: "Insadong traditional market",
          evening: "Farewell dinner",
        },
        {
          day: 10,
          title: "Departure",
          morning: "Last-minute shopping",
          afternoon: "Depart for airport",
          evening: "Fly home",
        },
      ],
      hotels: [
        {
          city: "Tokyo",
          name: "Shinjuku Prince Hotel",
          nights: 4,
          pricePerNight: "$150-200",
        },
        {
          city: "Seoul",
          name: "Myeongdong Lotte Hotel",
          nights: 5,
          pricePerNight: "$120-180",
        },
      ],
      totalCost: "$3,200",
    },
    {
      id: 2,
      title: "Two-Week Mediterranean Escape",
      region: "EUROPE",
      duration: "14 Days",
      season: "Summer",
      budget: "$3,500 - $5,000",
      difficulty: "Easy",
      image: "/manus-storage/itinerary-mediterranean_27a74144.png",
      description:
        "Lisbon, Dubrovnik, Santorini and the Amalfi Coast in one perfect summer trip.",
      days: [
        {
          day: 1,
          title: "Lisbon Arrival",
          morning: "Arrive in Lisbon",
          afternoon: "Explore Alfama district",
          evening: "Fado music dinner",
        },
        {
          day: 2,
          title: "Lisbon Highlights",
          morning: "Belém Tower & Jerónimos Monastery",
          afternoon: "Pastéis de Nata tasting",
          evening: "Sunset at Miradouro",
        },
        {
          day: 3,
          title: "Sintra Day Trip",
          morning: "Pena Palace tour",
          afternoon: "Quinta da Regaleira",
          evening: "Return to Lisbon",
        },
        {
          day: 4,
          title: "Travel to Dubrovnik",
          morning: "Flight to Dubrovnik",
          afternoon: "Old Town exploration",
          evening: "Sunset walk on walls",
        },
        {
          day: 5,
          title: "Dubrovnik & Islands",
          morning: "Elaphiti Islands boat tour",
          afternoon: "Swimming and relaxation",
          evening: "Seafood dinner",
        },
        {
          day: 6,
          title: "Dubrovnik Culture",
          morning: "City walls complete walk",
          afternoon: "Local markets",
          evening: "Traditional dance show",
        },
        {
          day: 7,
          title: "Travel to Santorini",
          morning: "Flight to Athens, then ferry",
          afternoon: "Arrive in Santorini",
          evening: "Sunset in Oia",
        },
        {
          day: 8,
          title: "Santorini Beaches",
          morning: "Red Beach visit",
          afternoon: "Swimming in caldera",
          evening: "Dinner with sea views",
        },
        {
          day: 9,
          title: "Santorini Exploration",
          morning: "Akrotiri archaeological site",
          afternoon: "Wine tasting",
          evening: "Sunset from Fira",
        },
        {
          day: 10,
          title: "Travel to Amalfi",
          morning: "Ferry to Athens, flight to Naples",
          afternoon: "Arrive in Amalfi",
          evening: "Coastal walk",
        },
        {
          day: 11,
          title: "Amalfi Coast",
          morning: "Positano village exploration",
          afternoon: "Emerald Grotto boat tour",
          evening: "Lemon liqueur tasting",
        },
        {
          day: 12,
          title: "Ravello & Capri",
          morning: "Ravello hilltop town",
          afternoon: "Villa gardens",
          evening: "Return to Amalfi",
        },
        {
          day: 13,
          title: "Relax & Explore",
          morning: "Beach time",
          afternoon: "Local market shopping",
          evening: "Farewell dinner",
        },
        {
          day: 14,
          title: "Departure",
          morning: "Travel to Naples",
          afternoon: "Depart for airport",
          evening: "Fly home",
        },
      ],
      hotels: [
        {
          city: "Lisbon",
          name: "Memmo Alfama Hotel",
          nights: 3,
          pricePerNight: "$180-220",
        },
        {
          city: "Dubrovnik",
          name: "Hilton Imperial",
          nights: 3,
          pricePerNight: "$200-250",
        },
        {
          city: "Santorini",
          name: "Mystique Luxury Collection",
          nights: 4,
          pricePerNight: "$250-350",
        },
        {
          city: "Amalfi",
          name: "Hotel Lidomare",
          nights: 3,
          pricePerNight: "$180-220",
        },
      ],
      totalCost: "$4,500",
    },
    {
      id: 3,
      title: "Ultimate Brazil Adventure",
      region: "BRAZIL",
      duration: "14 Days",
      season: "Year-round",
      budget: "$2,500 - $4,000",
      difficulty: "Moderate",
      image: "/manus-storage/brazil-destination_ea7c39d7.png",
      description:
        "Rio de Janeiro, the Amazon, São Paulo and Florianópolis beaches in 14 days.",
      days: [
        {
          day: 1,
          title: "Rio Arrival",
          morning: "Arrive in Rio de Janeiro",
          afternoon: "Check-in and relax",
          evening: "Dinner in Copacabana",
        },
        {
          day: 2,
          title: "Rio Icons",
          morning: "Christ the Redeemer statue",
          afternoon: "Sugarloaf Mountain cable car",
          evening: "Beach sunset",
        },
        {
          day: 3,
          title: "Rio Beaches",
          morning: "Copacabana Beach",
          afternoon: "Ipanema exploration",
          evening: "Samba show",
        },
        {
          day: 4,
          title: "Rio Adventure",
          morning: "Corcovado hiking",
          afternoon: "Botanical gardens",
          evening: "Local restaurant",
        },
        {
          day: 5,
          title: "Travel to Amazon",
          morning: "Flight to Manaus",
          afternoon: "Amazon lodge check-in",
          evening: "Jungle night sounds",
        },
        {
          day: 6,
          title: "Amazon Exploration",
          morning: "Guided jungle trek",
          afternoon: "River boat tour",
          evening: "Wildlife observation",
        },
        {
          day: 7,
          title: "Amazon Deep Dive",
          morning: "Indigenous village visit",
          afternoon: "Piranha fishing",
          evening: "Campfire stories",
        },
        {
          day: 8,
          title: "Return to Rio",
          morning: "Flight back to Rio",
          afternoon: "Rest and relax",
          evening: "Dinner in Lapa",
        },
        {
          day: 9,
          title: "Travel to São Paulo",
          morning: "Flight to São Paulo",
          afternoon: "Museum exploration",
          evening: "Street art tour",
        },
        {
          day: 10,
          title: "São Paulo Culture",
          morning: "MASP museum",
          afternoon: "Liberdade neighborhood",
          evening: "Fine dining",
        },
        {
          day: 11,
          title: "Travel to Florianópolis",
          morning: "Flight to Florianópolis",
          afternoon: "Beach arrival",
          evening: "Sunset beach walk",
        },
        {
          day: 12,
          title: "Beach Paradise",
          morning: "Lagoa da Conceição",
          afternoon: "Lagoon activities",
          evening: "Seafood dinner",
        },
        {
          day: 13,
          title: "Island Exploration",
          morning: "Praia Mole Beach",
          afternoon: "Water sports",
          evening: "Beach party",
        },
        {
          day: 14,
          title: "Departure",
          morning: "Last beach time",
          afternoon: "Travel to airport",
          evening: "Fly home",
        },
      ],
      hotels: [
        {
          city: "Rio de Janeiro",
          name: "Copacabana Palace",
          nights: 4,
          pricePerNight: "$200-300",
        },
        {
          city: "Amazon",
          name: "Jungle Lodge",
          nights: 3,
          pricePerNight: "$150-200",
        },
        {
          city: "São Paulo",
          name: "Fasano São Paulo",
          nights: 2,
          pricePerNight: "$180-250",
        },
        {
          city: "Florianópolis",
          name: "Jurerê Beach Resort",
          nights: 3,
          pricePerNight: "$120-180",
        },
      ],
      totalCost: "$3,200",
    },
  ];

  const filteredItineraries =
    activeFilter === "all"
      ? itineraries
      : itineraries.filter((it) => it.region.toLowerCase() === activeFilter);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />

      {/* Page Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Your Perfect Trip, Already Planned
          </h1>
          <p className="text-lg text-gray-600">
            Expert day-by-day travel guides for Europe, Asia & Brazil
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 py-4 px-4">
        <div className="container flex gap-4 overflow-x-auto">
          {["all", "asia", "europe", "brazil"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-semibold text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Itineraries Grid */}
      <section className="py-12 px-4">
        <div className="container">
          <div className="space-y-8">
            {filteredItineraries.map((itinerary) => (
              <div key={itinerary.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h2 className="font-display text-3xl font-bold text-white mb-2">
                        {itinerary.title}
                      </h2>
                      <p className="text-gray-100 text-lg">
                        {itinerary.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trip Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      DURATION
                    </p>
                    <p className="font-bold text-gray-900">{itinerary.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      BEST SEASON
                    </p>
                    <p className="font-bold text-gray-900">{itinerary.season}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      BUDGET
                    </p>
                    <p className="font-bold text-gray-900">{itinerary.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      DIFFICULTY
                    </p>
                    <p className="font-bold text-gray-900">
                      {itinerary.difficulty}
                    </p>
                  </div>
                </div>

                {/* Day-by-Day Accordion */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Day-by-Day Itinerary
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {itinerary.days.map((dayItem) => (
                      <AccordionItem
                        key={dayItem.day}
                        value={`day-${dayItem.day}`}
                      >
                        <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 rounded-lg">
                          <span className="font-semibold text-gray-900">
                            Day {dayItem.day}: {dayItem.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 bg-gray-50 rounded-lg mt-1">
                          <div className="space-y-3">
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">
                                Morning
                              </p>
                              <p className="text-gray-600">
                                {dayItem.morning}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">
                                Afternoon
                              </p>
                              <p className="text-gray-600">
                                {dayItem.afternoon}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 mb-1">
                                Evening
                              </p>
                              <p className="text-gray-600">
                                {dayItem.evening}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Hotels Section */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Hotel Recommendations
                  </h3>
                  <div className="space-y-4">
                    {itinerary.hotels.map((hotel, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {hotel.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {hotel.city} • {hotel.nights} nights
                            </p>
                          </div>
                          <p className="font-bold text-blue-600">
                            {hotel.pricePerNight}
                          </p>
                        </div>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                          Check Availability on Booking.com
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="p-6 flex flex-col sm:flex-row gap-4">
                  <Link href={`/itinerary/${itinerary.id === 1 ? 'tokyo-seoul' : itinerary.id === 2 ? 'mediterranean' : 'brazil'}`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 h-auto">
                      View Full Itinerary
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 py-6 h-auto"
                  >
                    Download This Itinerary (PDF)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
