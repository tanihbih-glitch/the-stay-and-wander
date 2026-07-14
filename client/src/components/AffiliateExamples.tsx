/**
 * EXAMPLE COMPONENTS: Using Affiliate Links
 * 
 * This file demonstrates how to use the centralized affiliateLinks configuration
 * in your components. Copy and adapt these examples for your needs.
 * 
 * Delete this file once you've integrated the patterns into your actual components.
 */

import { affiliateLinks, trackAffiliateClick, generateBookingLink } from "@/lib/affiliateLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

/**
 * EXAMPLE 1: Flight Deals Section
 * Shows how to display flight deals from the configuration
 */
export function FlightDealsExample() {
  const deals = Object.values(affiliateLinks.flights);

  const handleBookFlight = (deal: (typeof deals)[0]) => {
    // Track the click
    trackAffiliateClick(deal.network, deal.category, deal.route);
    
    // Open affiliate link
    window.open(deal.link, "_blank");
  };

  return (
    <section className="py-12 bg-blue-600">
      <div className="container">
        <h2 className="text-3xl font-bold text-white mb-8">Best Flight Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.route} className="bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{deal.route}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{deal.price}</p>
                <Button
                  onClick={() => handleBookFlight(deal)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Book This Flight
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 2: Hotel Search Widget
 * Shows how to generate dynamic Booking.com links based on user input
 */
export function HotelSearchWidgetExample() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut) {
      alert("Please fill in all fields");
      return;
    }

    // Generate link with user input
    const link = generateBookingLink(destination, checkIn, checkOut, parseInt(guests));
    
    // Track the click
    trackAffiliateClick("booking", "hotel", destination);
    
    // Open booking link
    window.open(link, "_blank");
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Hotel</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Destination
          </label>
          <input
            type="text"
            placeholder="City or hotel name"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Guests
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <Button
        onClick={handleSearch}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg h-auto"
      >
        Search Hotels on Booking.com
      </Button>
    </div>
  );
}

/**
 * EXAMPLE 3: Featured Hotel Destinations
 * Shows how to display pre-configured hotel deals
 */
export function FeaturedHotelsExample() {
  const hotels = Object.values(affiliateLinks.hotels);

  const handleBookHotel = (hotel: (typeof hotels)[0]) => {
    // Track the click
    trackAffiliateClick(hotel.network, hotel.category, `${hotel.city}-hotel`);
    
    // Open booking link
    window.open(hotel.link, "_blank");
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Hotel Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.city} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{hotel.city[0]}</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{hotel.city}</h3>
                <p className="text-gray-600 text-sm mb-2">{hotel.country}</p>
                <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>
                <Button
                  onClick={() => handleBookHotel(hotel)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Browse Hotels
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * EXAMPLE 4: Itinerary Booking Card
 * Shows how to display itinerary-specific affiliate links
 */
export function ItineraryBookingExample() {
  const itinerary = affiliateLinks.itineraries.tokyo_seoul;

  const handleBooking = (type: "hotel" | "flight") => {
    if (type === "hotel") {
      trackAffiliateClick("booking", "hotel", itinerary.title);
      window.open(itinerary.bookingLink, "_blank");
    } else {
      trackAffiliateClick("travelpayout", "flight", itinerary.title);
      window.open(itinerary.flightLink, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-4">{itinerary.title}</h3>
        <div className="flex gap-4">
          <Button
            onClick={() => handleBooking("hotel")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Hotels
          </Button>
          <Button
            onClick={() => handleBooking("flight")}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Book Flights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * EXAMPLE 5: Blog Article with Affiliate Links
 * Shows how to embed affiliate links in blog content
 */
export function BlogArticleExample() {
  const article = affiliateLinks.blog.bali_hotels;

  const handleBooking = () => {
    trackAffiliateClick("booking", article.category, article.articleTitle);
    window.open(article.bookingLink, "_blank");
  };

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{article.articleTitle}</h1>
      
      <div className="prose prose-lg mb-8">
        <p>
          Bali offers incredible value for travelers looking for luxury stays on a budget.
          From beachfront resorts to traditional villas, there's something for every traveler.
        </p>
        
        <h2>Where to Stay</h2>
        <p>
          Our top recommendations include luxury beachfront properties in Seminyak, cultural
          experiences in Ubud, and peaceful retreats in Sanur. Click below to explore available
          hotels and find the perfect match for your Bali getaway.
        </p>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Ready to Book Your Bali Hotel?</h3>
        <p className="text-gray-700 mb-4">
          Search and compare thousands of hotels in Bali with our partner Booking.com.
          We earn a small commission, which helps us create more travel guides like this one.
        </p>
        <Button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Search Hotels in Bali
        </Button>
      </div>
    </article>
  );
}

/**
 * EXAMPLE 6: Quick Links Component
 * Shows how to create a simple list of affiliate links
 */
export function QuickLinksExample() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Quick Booking Links</h3>
      <div className="space-y-2">
        {Object.entries(affiliateLinks.flights).map(([key, flight]) => (
          <a
            key={key}
            href={flight.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick(flight.network, flight.category, flight.route)}
            className="block p-3 bg-white rounded hover:bg-blue-50 transition-colors"
          >
            <div className="font-semibold text-gray-900">{flight.route}</div>
            <div className="text-sm text-gray-600">{flight.price}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
