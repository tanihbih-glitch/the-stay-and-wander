import Head from "@/components/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, MapPin, DollarSign, Users, Calendar } from "lucide-react";
import { generateMetaTags } from "@shared/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularRoutesWidgetItinerary from "@/components/PopularRoutesWidgetItinerary";
import GetYourGuideTours from "@/components/GetYourGuideTours";

import TripComHotelWidget from "@/components/TripComHotelWidget";
import { useState } from "react";
import { useLocation } from "wouter";

// Hotel affiliate link mapping
const getHotelLink = (hotelName: string, itineraryId: string): string => {
  // Tokyo & Seoul hotels
  if (itineraryId === 'tokyo-seoul') {
    if (hotelName.includes('Shinjuku Prince')) return 'https://booking.stay22.com/thestayandwander/xaad-D11z0';
    if (hotelName.includes('Myeongdong Lotte')) return 'https://agoda.stay22.com/thestayandwander/xruji4-v14';
    if (hotelName.includes('Tokyo')) return 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF';
    if (hotelName.includes('Seoul')) return 'https://booking.stay22.com/thestayandwander/TFtgmasXPl';
  }
  // Mediterranean hotels
  if (itineraryId === 'mediterranean') {
    if (hotelName.includes('Memmo Alfama')) return 'https://booking.stay22.com/thestayandwander/_3gvRmesd0';
    if (hotelName.includes('Hilton Imperial')) return 'https://booking.stay22.com/thestayandwander/FBzzZenMr0';
    if (hotelName.includes('Mystique')) return 'https://booking.stay22.com/thestayandwander/GTP9FOQSFn';
    if (hotelName.includes('Lidomare')) return 'https://booking.stay22.com/thestayandwander/1ImQzDS7Rb';
    // Default Mediterranean link
    return 'https://booking.stay22.com/thestayandwander/_3gvRmesd0';
  }
  // Brazil hotels - all use same link
  if (itineraryId === 'brazil') {
    return 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN';
  }
  // Default fallback
  return 'https://booking.stay22.com/thestayandwander/cGvguWxCv2';
};

interface ItineraryData {
  id: string;
  title: string;
  headline: string;
  region: string;
  duration: string;
  description: string;
  image: string;
  destinations: number;
  hotels: number;
  activities: number;
  price: string;
  flightHeadline: string;
  days: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
    hotel?: string;
  }>;
}

const itineraries: Record<string, ItineraryData> = {
  "tokyo-seoul": {
    id: "tokyo-seoul",
    title: "10 Days in Tokyo & Seoul",
    headline: "Flights to Tokyo & Seoul",
    region: "ASIA",
    duration: "10 Days",
    description:
      "Culture, temples, street food and K-pop districts across Japan and South Korea.",
    image: "/manus-storage/itinerary-tokyo-seoul_dbb9c3ea.png",
    destinations: 4,
    hotels: 8,
    activities: 15,
    price: "$2,499",
    flightHeadline: "Flights to Tokyo & Seoul",
    days: [
      {
        day: 1,
        title: "Arrival in Tokyo",
        description: "Arrive at Narita or Haneda Airport. Transfer to hotel in Shibuya.",
        activities: ["Airport transfer", "Hotel check-in", "Evening stroll in Shibuya"],
        hotel: "Shibuya Excel Hotel Tokyu",
      },
      {
        day: 2,
        title: "Tokyo Exploration",
        description: "Explore Senso-ji Temple, Asakusa district, and Tsukiji market.",
        activities: ["Senso-ji Temple", "Asakusa district", "Tsukiji market tour"],
        hotel: "Shibuya Excel Hotel Tokyu",
      },
      {
        day: 3,
        title: "Modern Tokyo",
        description: "Visit teamLab Borderless, Shibuya Crossing, and Harajuku.",
        activities: ["teamLab Borderless", "Shibuya Crossing", "Harajuku shopping"],
        hotel: "Shibuya Excel Hotel Tokyu",
      },
      {
        day: 4,
        title: "Day Trip to Mt. Fuji",
        description: "Full-day excursion to Mt. Fuji and Lake Kawaguchi.",
        activities: ["Mt. Fuji views", "Lake Kawaguchi", "Traditional onsen"],
        hotel: "Shibuya Excel Hotel Tokyu",
      },
      {
        day: 5,
        title: "Travel to Seoul",
        description: "Bullet train to airport, fly to Seoul. Evening exploration.",
        activities: ["Bullet train", "Flight to Seoul", "Gangnam district"],
        hotel: "Myeongdong Hotel",
      },
      {
        day: 6,
        title: "Seoul Culture",
        description: "Gyeongbokgung Palace, Bukchon Hanok Village, Insadong.",
        activities: ["Gyeongbokgung Palace", "Bukchon Hanok Village", "Insadong art"],
        hotel: "Myeongdong Hotel",
      },
      {
        day: 7,
        title: "K-Pop & Modern Seoul",
        description: "Myeongdong shopping, Lotte World, Korean BBQ dinner.",
        activities: ["Myeongdong shopping", "Lotte World", "Korean BBQ"],
        hotel: "Myeongdong Hotel",
      },
      {
        day: 8,
        title: "Day Trip to Nami Island",
        description: "Scenic day trip to Nami Island and Korean folk village.",
        activities: ["Nami Island", "Korean folk village", "Garden walks"],
        hotel: "Myeongdong Hotel",
      },
      {
        day: 9,
        title: "Last-Minute Shopping",
        description: "Itaewon international district, last-minute souvenirs.",
        activities: ["Itaewon shopping", "Street food tour", "Sunset views"],
        hotel: "Myeongdong Hotel",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to airport for departure flight.",
        activities: ["Hotel checkout", "Airport transfer", "Departure"],
      },
    ],
  },
  mediterranean: {
    id: "mediterranean",
    title: "Two-Week Mediterranean Escape",
    headline: "Flights to Lisbon & Mediterranean",
    region: "EUROPE",
    duration: "14 Days",
    description:
      "Lisbon, Dubrovnik, Santorini and the Amalfi Coast in one perfect summer trip.",
    image: "/manus-storage/itinerary-mediterranean_27a74144.png",
    destinations: 4,
    hotels: 7,
    activities: 18,
    price: "$3,299",
    flightHeadline: "Flights to Lisbon & Mediterranean",
    days: [
      {
        day: 1,
        title: "Arrival in Lisbon",
        description: "Arrive at Humberto Delgado Airport. Transfer to hotel in Alfama.",
        activities: ["Airport transfer", "Hotel check-in", "Alfama exploration"],
        hotel: "Memmo Alfama Hotel",
      },
      {
        day: 2,
        title: "Lisbon Discovery",
        description: "Belém Tower, Jerónimos Monastery, Pastéis de Nata tasting.",
        activities: ["Belém Tower", "Jerónimos Monastery", "Pastéis de Nata"],
        hotel: "Memmo Alfama Hotel",
      },
      {
        day: 3,
        title: "Lisbon Culture",
        description: "São Jorge Castle, Tejo River cruise, Fado music dinner.",
        activities: ["São Jorge Castle", "Tejo River cruise", "Fado dinner"],
        hotel: "Memmo Alfama Hotel",
      },
      {
        day: 4,
        title: "Travel to Dubrovnik",
        description: "Flight to Dubrovnik. Evening city walls walk.",
        activities: ["Flight to Dubrovnik", "City walls", "Old town exploration"],
        hotel: "Hilton Imperial Dubrovnik",
      },
      {
        day: 5,
        title: "Dubrovnik Highlights",
        description: "Old town tour, Rector's Palace, cable car to Mount Srđ.",
        activities: ["Old town tour", "Rector's Palace", "Mount Srđ cable car"],
        hotel: "Hilton Imperial Dubrovnik",
      },
      {
        day: 6,
        title: "Island Hopping",
        description: "Day trip to Elaphiti Islands with swimming and snorkeling.",
        activities: ["Elaphiti Islands", "Swimming", "Snorkeling"],
        hotel: "Hilton Imperial Dubrovnik",
      },
      {
        day: 7,
        title: "Travel to Santorini",
        description: "Flight to Santorini. Sunset in Oia village.",
        activities: ["Flight to Santorini", "Oia sunset", "Village exploration"],
        hotel: "Astra Suites Santorini",
      },
      {
        day: 8,
        title: "Santorini Exploration",
        description: "Caldera views, volcanic beaches, Akrotiri archaeological site.",
        activities: ["Caldera views", "Volcanic beaches", "Akrotiri site"],
        hotel: "Astra Suites Santorini",
      },
      {
        day: 9,
        title: "Island Adventure",
        description: "Boat trip to Nea Kameni volcano and hot springs.",
        activities: ["Nea Kameni volcano", "Hot springs", "Boat cruise"],
        hotel: "Astra Suites Santorini",
      },
      {
        day: 10,
        title: "Travel to Amalfi Coast",
        description: "Flight to Naples, drive to Amalfi Coast. Positano.",
        activities: ["Flight to Naples", "Drive to Amalfi", "Positano check-in"],
        hotel: "Le Sirenuse Positano",
      },
      {
        day: 11,
        title: "Amalfi Coast Beauty",
        description: "Positano exploration, beach time, local restaurants.",
        activities: ["Positano beaches", "Cliff-side walks", "Local dining"],
        hotel: "Le Sirenuse Positano",
      },
      {
        day: 12,
        title: "Ravello & Salerno",
        description: "Day trip to Ravello gardens and Salerno.",
        activities: ["Ravello gardens", "Salerno exploration", "Coastal views"],
        hotel: "Le Sirenuse Positano",
      },
      {
        day: 13,
        title: "Relaxation Day",
        description: "Beach day, spa treatments, sunset dinner.",
        activities: ["Beach relaxation", "Spa treatments", "Sunset dinner"],
        hotel: "Le Sirenuse Positano",
      },
      {
        day: 14,
        title: "Departure",
        description: "Transfer to Naples airport for departure.",
        activities: ["Hotel checkout", "Airport transfer", "Departure"],
      },
    ],
  },
  brazil: {
    id: "brazil",
    title: "Ultimate Brazil Adventure",
    headline: "Flights to Rio de Janeiro & Brazil",
    region: "BRAZIL",
    duration: "14 Days",
    description:
      "Rio de Janeiro, the Amazon, São Paulo and Florianópolis beaches in 14 days.",
    image: "/manus-storage/brazil-destination_ea7c39d7.png",
    destinations: 4,
    hotels: 6,
    activities: 20,
    price: "$2,899",
    flightHeadline: "Flights to Rio de Janeiro & Brazil",
    days: [
      {
        day: 1,
        title: "Arrival in Rio",
        description: "Arrive at Galeão International Airport. Transfer to Copacabana.",
        activities: ["Airport transfer", "Hotel check-in", "Copacabana beach"],
        hotel: "Copacabana Palace",
      },
      {
        day: 2,
        title: "Rio Highlights",
        description: "Christ the Redeemer, Sugarloaf Mountain, Ipanema beach.",
        activities: ["Christ the Redeemer", "Sugarloaf Mountain", "Ipanema beach"],
        hotel: "Copacabana Palace",
      },
      {
        day: 3,
        title: "Rio Culture",
        description: "Favela tour, Lapa district, samba show dinner.",
        activities: ["Favela tour", "Lapa nightlife", "Samba show"],
        hotel: "Copacabana Palace",
      },
      {
        day: 4,
        title: "Adventure Day",
        description: "Hang gliding, paragliding, or hiking in Rio.",
        activities: ["Hang gliding", "Paragliding", "Mountain hiking"],
        hotel: "Copacabana Palace",
      },
      {
        day: 5,
        title: "Travel to Amazon",
        description: "Flight to Manaus. Jungle lodge check-in.",
        activities: ["Flight to Manaus", "Jungle lodge", "Evening jungle walk"],
        hotel: "Jungle Lodge",
      },
      {
        day: 6,
        title: "Amazon Exploration",
        description: "Boat tours, wildlife spotting, piranha fishing.",
        activities: ["Boat tours", "Wildlife spotting", "Piranha fishing"],
        hotel: "Jungle Lodge",
      },
      {
        day: 7,
        title: "Deep Amazon",
        description: "Multi-day jungle expedition, indigenous village visit.",
        activities: ["Jungle expedition", "Indigenous village", "Canopy walk"],
        hotel: "Jungle Lodge",
      },
      {
        day: 8,
        title: "Amazon Return",
        description: "Return from jungle, flight back to Rio.",
        activities: ["Jungle departure", "Flight to Rio", "Rest day"],
        hotel: "Copacabana Palace",
      },
      {
        day: 9,
        title: "Travel to São Paulo",
        description: "Flight to São Paulo. City exploration.",
        activities: ["Flight to São Paulo", "City tour", "Museum visit"],
        hotel: "Unique Hotel São Paulo",
      },
      {
        day: 10,
        title: "São Paulo Culture",
        description: "Art museums, street art tours, local cuisine.",
        activities: ["Art museums", "Street art tour", "Local dining"],
        hotel: "Unique Hotel São Paulo",
      },
      {
        day: 11,
        title: "Travel to Florianópolis",
        description: "Flight to Florianópolis. Beach resort check-in.",
        activities: ["Flight to Florianópolis", "Beach exploration", "Resort relax"],
        hotel: "Costão do Santinho",
      },
      {
        day: 12,
        title: "Beach Paradise",
        description: "Multiple beach visits, water sports, sunset.",
        activities: ["Beach hopping", "Water sports", "Sunset dinner"],
        hotel: "Costão do Santinho",
      },
      {
        day: 13,
        title: "Island Adventure",
        description: "Boat tour, snorkeling, beach exploration.",
        activities: ["Boat tour", "Snorkeling", "Beach exploration"],
        hotel: "Costão do Santinho",
      },
      {
        day: 14,
        title: "Departure",
        description: "Transfer to airport for international departure.",
        activities: ["Hotel checkout", "Airport transfer", "Departure"],
      },
    ],
  },
};

export default function ItineraryDetail() {
  const [location] = useLocation();
  const itineraryId = location.split("/").pop();
  const itinerary = itineraryId ? itineraries[itineraryId] : null;
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  // Generate unique meta tags for each itinerary
  const itineraryMetadata = itinerary ? {
    title: `${itinerary.title} - Custom Itinerary | The Stay & Wander`,
    description: `${itinerary.description} ${itinerary.duration} itinerary with ${itinerary.hotels} hotels and ${itinerary.activities} activities. Starting from ${itinerary.price}.`,
    image: itinerary.image,
    url: `/itinerary/${itinerary.id}`,
    keywords: `${itinerary.title}, ${itinerary.region}, travel itinerary, vacation planning`,
  } : null;
  const itineraryTags = itineraryMetadata ? generateMetaTags(itineraryMetadata) : null;

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Itinerary Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The itinerary you're looking for doesn't exist.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Browse All Itineraries
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {itineraryTags && (
        <Head
          title={itineraryTags.title}
          description={itineraryTags.description}
          canonical={itineraryTags.canonical}
          ogTitle={itineraryTags.ogTitle}
          ogDescription={itineraryTags.ogDescription}
          ogImage={itineraryTags.ogImage}
          ogUrl={itineraryTags.ogUrl}
          keywords={itineraryTags.keywords}
        />
      )}
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={itinerary.image}
          alt={itinerary.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="container">
            <p className="text-yellow-400 font-semibold mb-2">
              {itinerary.region}
            </p>
            <h1 className="font-display text-5xl font-bold text-white mb-4">
              {itinerary.title}
            </h1>
            <p className="text-white text-lg max-w-2xl">
              {itinerary.description}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <Calendar className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-bold text-gray-900">{itinerary.duration}</p>
            </div>
            <div>
              <MapPin className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">Destinations</p>
              <p className="font-bold text-gray-900">
                {itinerary.destinations} cities
              </p>
            </div>
            <div>
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">From</p>
              <p className="font-bold text-gray-900">{itinerary.price}</p>
            </div>
            <div>
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">Hotels</p>
              <p className="font-bold text-gray-900">{itinerary.hotels}</p>
            </div>
            <div>
              <MapPin className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">Activities</p>
              <p className="font-bold text-gray-900">{itinerary.activities}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Widget */}
      <section className="py-16 px-4 bg-white">
        <div className="container">
          <h2 style={{ fontFamily: '"Playfair Display", serif' }} className="text-4xl font-bold text-gray-900 mb-8">
            {itinerary.flightHeadline}
          </h2>
          <PopularRoutesWidgetItinerary />
        </div>
      </section>

      {/* Day-by-Day Timeline */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <h2 style={{ fontFamily: '"Playfair Display", serif' }} className="text-4xl font-bold text-gray-900 mb-12">
            Your Day-by-Day Itinerary
          </h2>

          <div className="space-y-4">
            {itinerary.days.map((dayData) => (
              <Card
                key={dayData.day}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => toggleDay(dayData.day)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {dayData.day}
                        </div>
                        <h3 className="font-display text-xl font-bold text-gray-900">
                          {dayData.title}
                        </h3>
                      </div>
                      {expandedDays.includes(dayData.day) && (
                        <div className="mt-4 ml-14">
                          <p className="text-gray-600 mb-4">{dayData.description}</p>
                          <div className="space-y-2 mb-4">
                            {dayData.activities.map((activity, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                <p className="text-gray-700">{activity}</p>
                              </div>
                            ))}
                          </div>
                          {dayData.hotel && (
                            <div>
                              <p className="text-sm text-gray-600 font-semibold mb-3">
                                🏨 {dayData.hotel}
                              </p>
                              <a
                                href={itinerary.id === 'tokyo-seoul' ? 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF' : itinerary.id === 'mediterranean' ? 'https://booking.stay22.com/thestayandwander/_3gvRmesd0' : 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                              >
                                Check Availability
                              </a>
                              <p className="text-xs text-gray-400 mt-1">Powered by Booking.com</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        expandedDays.includes(dayData.day) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GetYourGuide Tours & Activities */}
      <GetYourGuideTours 
        label={itinerary.id === 'tokyo-seoul' ? 'Book Your Tokyo & Seoul Tours Here' : itinerary.id === 'mediterranean' ? 'Book Your Mediterranean Tours Here' : 'Book Your Brazil Tours Here'}
        cardStyle={true}
        showHeadline={true}
        showButton={false}
      />

      {/* Trip.com Hotel Widget for Tokyo & Seoul itinerary */}
      {itinerary.id === 'tokyo-seoul' && <TripComHotelWidget />}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Book This Adventure?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Start planning your {itinerary.title.toLowerCase()} with our expert
            travel consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="block">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg h-auto">
                Book This Itinerary
              </Button>
            </a>
            <a 
              href={itinerary.id === 'tokyo-seoul' ? 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF' : itinerary.id === 'mediterranean' ? 'https://booking.stay22.com/thestayandwander/_3gvRmesd0' : 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN'}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-6 text-lg h-auto font-semibold">
                Download This Itinerary Free
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
