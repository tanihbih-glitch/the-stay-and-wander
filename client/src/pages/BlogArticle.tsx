/**
 * Individual Blog Article Page with Contextual Affiliate Links
 * Each article includes strategic affiliate links for flights and hotels
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { affiliateLinks, trackAffiliateClick } from "@/lib/affiliateLinks";
import { ChevronRight, MapPin, Plane, Hotel } from "lucide-react";
import { Link } from "wouter";

interface ArticleContent {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  content: React.ReactNode;
}

/**
 * Article 1: Best Hotels in Bali for Every Budget 2026
 */
const BaliHotelsArticle: ArticleContent = {
  id: 1,
  title: "Best Hotels in Bali for Every Budget 2026",
  author: "Sarah Chen",
  date: "June 15, 2026",
  category: "Hotel Reviews",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  readTime: "5 min read",
  content: (
    <div className="space-y-6 text-gray-700 leading-relaxed">
      <p>
        Bali remains one of the world's most sought-after destinations, and for good reason. From pristine beaches to lush rice terraces, this Indonesian paradise offers something for every traveler. But finding the right accommodation can make or break your trip. In this guide, we'll explore the best hotels in Bali across different price ranges.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Luxury Hotels: Ultimate Indulgence</h2>
      <p>
        If you're looking to splurge, Bali's luxury hotels offer world-class amenities and breathtaking views. Properties like Four Seasons Resort and Bulgari Resort Bali provide private pools, Michelin-starred restaurants, and personalized service that will make your stay unforgettable.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Hotel className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Ready to Book Your Bali Luxury Hotel?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Search and compare thousands of luxury hotels in Bali with our partner Booking.com. We earn a small commission, which helps us create more travel guides like this one.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("booking", "hotel", "Bali-luxury-hotels");
                window.open("https://www.booking.com/searchresults.html?ss=Bali", "_blank");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Browse Luxury Hotels in Bali
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Mid-Range Hotels: Best Value</h2>
      <p>
        For most travelers, mid-range hotels offer the perfect balance of comfort and value. Areas like Seminyak and Canggu have excellent options that provide modern amenities without the luxury price tag. You'll find boutique hotels with stylish rooms, good restaurants, and easy access to beaches and nightlife.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Budget-Friendly Stays: Backpacker Paradise</h2>
      <p>
        Bali is famous for its budget accommodations. Ubud and Kuta offer countless guesthouses and hostels where you can stay comfortably for $20-50 per night. Many include breakfast, and you'll meet fellow travelers from around the world.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Pro Tip: Book Early for Better Rates</h3>
            <p className="text-sm text-gray-700 mb-4">
              Booking 2-3 months in advance typically gets you the best prices. Use our affiliate link to Booking.com to compare prices across all hotel categories.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("booking", "hotel", "Bali-all-hotels");
                window.open("https://www.booking.com/searchresults.html?ss=Bali", "_blank");
              }}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-100"
            >
              Compare All Hotels in Bali
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Top Neighborhoods to Stay</h2>
      <ul className="space-y-3">
        <li><strong>Seminyak:</strong> Beach vibes, restaurants, and nightlife</li>
        <li><strong>Ubud:</strong> Cultural center with rice terraces and art galleries</li>
        <li><strong>Canggu:</strong> Trendy area popular with surfers and digital nomads</li>
        <li><strong>Kuta:</strong> Budget-friendly beach town with backpacker scene</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Getting to Bali</h2>
      <p>
        Once you've booked your hotel, you'll need flights. Bali is served by Ngurah Rai International Airport (DPS), with connections from major cities worldwide. Check our flight deals section for the best prices to Bali.
      </p>

      <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Plane className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Find the Best Flight Deals to Bali</h3>
            <p className="text-sm text-gray-700 mb-4">
              Use Travelpayout to search and compare flights to Bali from your city. Get real-time prices and book directly through our affiliate link.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("travelpayout", "flight", "Bali-flights");
                window.open(affiliateLinks.flights.dubai_bali?.link || "https://travelpayouts.com", "_blank");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Search Flights to Bali
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600 italic">
        Have you stayed in a great hotel in Bali? Share your recommendations in the comments below!
      </p>
    </div>
  ),
};

/**
 * Article 2: 7 Best Cities to Visit in Europe This Summer
 */
const EuropeCitiesArticle: ArticleContent = {
  id: 2,
  title: "7 Best Cities to Visit in Europe This Summer",
  author: "Marcus Johnson",
  date: "June 10, 2026",
  category: "Destination Guides",
  image: "/manus-storage/blog-europe-cities_de773d0d.png",
  readTime: "7 min read",
  content: (
    <div className="space-y-6 text-gray-700 leading-relaxed">
      <p>
        Summer is the perfect time to explore Europe. Long days, warm weather, and vibrant outdoor scenes make it ideal for city exploration. Here are seven European cities that should be on your summer bucket list.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Lisbon, Portugal</h2>
      <p>
        Lisbon is a hidden gem that combines historic charm with modern vibrancy. Wander through the narrow streets of Alfama, visit the iconic Belém Tower, and enjoy fresh seafood overlooking the Tagus River. The city is also incredibly affordable compared to other European capitals.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Hotel className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Book Your Lisbon Hotel</h3>
            <p className="text-sm text-gray-700 mb-4">
              Lisbon offers excellent value for accommodation. From luxury riverside hotels to charming guesthouses in Alfama, find your perfect stay.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("booking", "hotel", "Lisbon-hotels");
                window.open(affiliateLinks.hotels.lisbon?.link || "https://booking.com", "_blank");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Search Hotels in Lisbon
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Barcelona, Spain</h2>
      <p>
        Barcelona is a city of art, architecture, and beaches. Gaudí's Sagrada Familia is a must-see, and the Gothic Quarter offers medieval charm. Relax on Barceloneta Beach and enjoy tapas in the bustling Las Ramblas.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Rome, Italy</h2>
      <p>
        The Eternal City needs no introduction. From the Colosseum to the Vatican, Rome is packed with history and culture. Summer crowds can be intense, so book accommodations early and visit major sites in early morning or late evening.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Prague, Czech Republic</h2>
      <p>
        Prague is one of Europe's most beautiful cities, with stunning architecture, affordable prices, and excellent beer. The Charles Bridge offers romantic views, and the Old Town Square is perfect for people-watching.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Amsterdam, Netherlands</h2>
      <p>
        Canals, bicycles, and museums make Amsterdam unique. Summer is perfect for cycling along the waterways and enjoying outdoor cafés. The Anne Frank House and Van Gogh Museum are must-visits.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Vienna, Austria</h2>
      <p>
        Vienna is elegant and sophisticated. Visit Schönbrunn Palace, enjoy classical music concerts, and sip coffee in historic cafés. The Danube River offers scenic walks and bike rides.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">7. Athens, Greece</h2>
      <p>
        Athens is the birthplace of Western civilization. The Acropolis and Parthenon are iconic, and the nearby Greek islands offer beach escapes. Summer weather is perfect for exploring ancient ruins.
      </p>

      <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Plane className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Find Flights to Europe</h3>
            <p className="text-sm text-gray-700 mb-4">
              Compare flight prices to all these European cities. Book early for summer travel to get the best deals.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("travelpayout", "flight", "Europe-cities-flights");
                window.open(affiliateLinks.flights.newyork_lisbon?.link || "https://travelpayouts.com", "_blank");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Search Flights to Europe
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Travel Tips</h2>
      <ul className="space-y-3">
        <li>Book accommodations 2-3 months in advance for summer travel</li>
        <li>Consider visiting shoulder season (May or September) for fewer crowds</li>
        <li>Get a Eurail Pass if visiting multiple countries</li>
        <li>Learn basic phrases in local languages to enhance your experience</li>
      </ul>
    </div>
  ),
};

/**
 * Article 3: Tokyo vs Bangkok — Which Should You Visit First?
 */
const TokyoBangkokArticle: ArticleContent = {
  id: 3,
  title: "Tokyo vs Bangkok — Which Should You Visit First?",
  author: "Emma Rodriguez",
  date: "June 5, 2026",
  category: "Itinerary Ideas",
  image: "/manus-storage/blog-tokyo-bangkok_0467868b.png",
  readTime: "6 min read",
  content: (
    <div className="space-y-6 text-gray-700 leading-relaxed">
      <p>
        Both Tokyo and Bangkok are incredible Asian destinations, but they offer very different experiences. If you can only visit one, here's how to decide—and why visiting both is ideal.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Tokyo: Modern Meets Traditional</h2>
      <p>
        Tokyo is a megacity of contrasts. Ultra-modern skyscrapers stand next to ancient temples. Neon-lit streets lead to peaceful gardens. The food scene is world-class, from Michelin-starred restaurants to humble ramen shops. Summer in Tokyo can be hot and humid, but it's also festival season.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Bangkok: Chaotic and Vibrant</h2>
      <p>
        Bangkok is sensory overload in the best way. Bustling night markets, ornate temples, and street food on every corner create an intoxicating atmosphere. The city is more affordable than Tokyo and offers a more "exotic" experience for first-time Asia visitors.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Hotel className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Book Hotels in Tokyo or Bangkok</h3>
            <p className="text-sm text-gray-700 mb-4">
              Find the perfect accommodation in either city. Tokyo offers everything from luxury hotels to capsule hotels, while Bangkok has excellent value options.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  trackAffiliateClick("booking", "hotel", "Tokyo-hotels");
                  window.open(affiliateLinks.hotels.tokyo?.link || "https://booking.com", "_blank");
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Tokyo Hotels
              </Button>
              <Button
                onClick={() => {
                  trackAffiliateClick("booking", "hotel", "Bangkok-hotels");
                  window.open("https://www.booking.com/searchresults.html?ss=Bangkok", "_blank");
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Bangkok Hotels
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Cost Comparison</h2>
      <p>
        Bangkok is generally cheaper than Tokyo. Meals, accommodation, and activities are all more affordable. If budget is a concern, Bangkok offers better value. However, Tokyo's efficiency and cleanliness might justify the higher cost for some travelers.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Which Should You Visit First?</h2>
      <p>
        <strong>Visit Bangkok first if:</strong> You want an intense, immersive cultural experience; you're on a tight budget; you prefer chaos and spontaneity.
      </p>
      <p>
        <strong>Visit Tokyo first if:</strong> You prefer organized, clean cities; you love technology and modern culture; you want a gentler introduction to Asia.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">The Best Solution: Visit Both!</h2>
      <p>
        Why choose? A 10-day itinerary visiting both cities is ideal. Fly into Bangkok, spend 4-5 days exploring, then take a short flight to Tokyo for another 4-5 days. You'll experience the full spectrum of Southeast Asian culture.
      </p>

      <div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
        <div className="flex items-start gap-4">
          <Plane className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Find Flights to Tokyo or Bangkok</h3>
            <p className="text-sm text-gray-700 mb-4">
              Compare prices and book your flights. Many airlines offer good deals on routes to both cities.
            </p>
            <Button
              onClick={() => {
                trackAffiliateClick("travelpayout", "flight", "Tokyo-Bangkok-flights");
                window.open(affiliateLinks.flights.london_tokyo?.link || "https://travelpayouts.com", "_blank");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Search Flights Now
            </Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Final Verdict</h2>
      <p>
        Both cities are must-visits for any Asia enthusiast. If you're torn, flip a coin—you can't go wrong either way. And if you fall in love with Asia (which you will), you'll be back to visit the other city soon enough.
      </p>
    </div>
  ),
};

// Map articles by ID
const articlesMap: Record<number, ArticleContent> = {
  1: BaliHotelsArticle,
  2: EuropeCitiesArticle,
  3: TokyoBangkokArticle,
};

interface BlogArticleProps {
  articleId?: number;
}

export default function BlogArticle({ articleId = 1 }: BlogArticleProps) {
  const article = articlesMap[articleId] || BaliHotelsArticle;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />

      {/* Hero Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {article.category}
            </span>
            <h1 style={{ fontFamily: '"Playfair Display", serif' }} className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Metadata */}
      <section className="py-6 px-4 border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <span>{article.author}</span>
            </div>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {article.content}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container">
          <h2 style={{ fontFamily: '"Playfair Display", serif' }} className="text-3xl font-bold text-gray-900 mb-8">
            More Travel Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(articlesMap)
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 style={{ fontFamily: '"Playfair Display", serif' }} className="font-bold text-gray-900 mb-2">
                      {relatedArticle.title}
                    </h3>
                    <Link href={`/blog/${relatedArticle.id}`}>
                      <Button variant="outline" className="text-sm" size="sm">
                        Read More <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
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
