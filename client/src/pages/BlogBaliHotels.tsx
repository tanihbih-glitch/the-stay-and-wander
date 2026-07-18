import { useState } from 'react';
import Head from '@/components/Head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { pageMetadataConfig } from '@shared/seo';
import PopularRoutesWidgetBlogSidebar from '@/components/PopularRoutesWidgetBlogSidebar';
import { AffiliateLink } from '@/components/AffiliateLink';

const articleMetadata = {
  title: 'Best Hotels in Bali for Every Budget (2026) — From $30 to $500/Night',
  description: 'Looking for the best hotels in Bali in 2026? We\'ve hand-picked the top stays for every budget — from $30 budget guesthouses to $500/night luxury villas. Find your perfect Bali hotel here.',
  url: '/blog/best-hotels-bali-2026',
  image: '/manus-storage/blog-bali.png',
  keywords: 'best hotels in Bali, Bali hotels budget, luxury hotels Bali, Ubud hotels, Seminyak hotels, Bali travel guide',
  author: 'The Stay & Wander',
  category: 'Hotel Reviews',
  readTime: '8 minutes',
  publishDate: '2026-07-15',
};

const hotels = [
  {
    id: 1,
    name: 'Pondok Ayu Guest House',
    location: 'Seminyak',
    price: '$32/night',
    rating: '8.6/10',
    description: 'One of Seminyak\'s best-kept secrets. Pondok Ayu offers clean, air-conditioned rooms with a small pool, free breakfast, and walking distance to the beach — all for under $35 a night. Staff are incredibly helpful with arranging day trips and scooter rentals.',
    highlights: ['Free breakfast included', '8-minute walk to Seminyak Beach', 'Best for: Solo travellers, couples on a budget'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 2,
    name: 'Bisma Cottages',
    location: 'Ubud',
    price: '$38/night',
    rating: '8.4/10',
    description: 'Nestled in the heart of Ubud, Bisma Cottages offers traditional Balinese bungalows surrounded by tropical gardens. The rice terrace views from the pool are genuinely stunning for the price. Walking distance to the Ubud Monkey Forest and central market.',
    highlights: ['Pool included', '5-minute walk to Ubud Palace', 'Best for: Culture lovers, solo travellers'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 3,
    name: 'The Layar Guesthouse',
    location: 'Canggu',
    price: '$45/night',
    rating: '8.7/10',
    description: 'Canggu\'s coolest budget option. The Layar sits right in the heart of Canggu\'s café strip, with a rooftop terrace, social common areas, and some of the best people-watching in Bali. Perfect for digital nomads or solo travellers who want to meet other like-minded explorers.',
    highlights: ['Rooftop terrace', 'Canggu café strip', 'Best for: Digital nomads, solo travellers'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 4,
    name: 'Alaya Resort Ubud',
    location: 'Ubud',
    price: '$89/night',
    rating: '9.1/10',
    description: 'Alaya is where mid-range meets luxury in Ubud. The infinity pool overlooking the jungle canopy is genuinely breathtaking, the rooms are beautifully designed with local Balinese craftsmanship, and the spa offers treatments at a fraction of what you\'d pay at a five-star resort.',
    highlights: ['Infinity pool', 'Jungle views', 'On-site spa, highly rated', 'Best for: Couples, wellness seekers'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 5,
    name: 'Katamama Hotel',
    location: 'Seminyak',
    price: '$120/night',
    rating: '9.3/10',
    description: 'Katamama is one of Bali\'s finest boutique hotels — handcrafted entirely by Balinese artisans using traditional techniques. Every room tells a story. The rooftop bar has some of the best cocktails in Seminyak, and the location puts you within walking distance of the island\'s best beach clubs and restaurants.',
    highlights: ['Boutique luxury', 'Private pool suites', 'Rooftop bar, stunning', 'Best for: Design lovers, couples celebrating'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 6,
    name: 'Komaneka at Bisma',
    location: 'Ubud',
    price: '$145/night',
    rating: '9.4/10',
    description: 'Consistently ranked among Ubud\'s most beautiful hotels. The architecture blends seamlessly into the jungle valley, the infinity pool seems to pour directly into the treetops, and the restaurant serves some of the finest Balinese cuisine on the island. Exceptional value at this price point.',
    highlights: ['Valley views', 'Award-winning design', 'Serene, artistic, deeply Balinese', 'Best for: Romantic getaways, honeymoons'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 7,
    name: 'Bulgari Resort Bali',
    location: 'Uluwatu',
    price: '$820/night',
    rating: '9.6/10',
    description: 'One of the most dramatic hotel locations on earth. Bulgari Bali sits on a clifftop above the Indian Ocean in Uluwatu, with private villas that have their own plunge pools and uninterrupted ocean views. The 200-step private staircase down to the beach is unforgettable. If you\'re going to splurge once in your life — this is the place.',
    highlights: ['Clifftop', 'Private villas', 'Private beach', 'Best for: Honeymoons, milestone celebrations'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 8,
    name: 'Four Seasons Resort at Sayan',
    location: 'Ubud',
    price: '$650/night',
    rating: '9.7/10',
    description: 'The Four Seasons Sayan is arguably the most architecturally stunning hotel in Southeast Asia. Built into a river valley surrounded by rice paddies, you arrive via a bridge over the jungle canopy to reach the floating lotus pond lobby. The spa, the food, the rooms — everything here is exceptional.',
    highlights: ['River valley', 'Iconic architecture', 'Rice paddy valley, river views', 'Best for: Ultimate luxury, architecture lovers'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
  {
    id: 9,
    name: 'Amanusa',
    location: 'Nusa Dua',
    price: '$1,100/night',
    rating: '9.8/10',
    description: 'Aman resorts are the gold standard of luxury travel and Amanusa is their Bali masterpiece. Set on Nusa Dua\'s most pristine stretch of coastline, with sweeping views of the Indian Ocean, a private beach club, and the hushed calm that every Aman property delivers. One of the most special hotels in Asia.',
    highlights: ['Aman brand', 'Golf course and private beach', 'Private beach', 'Best for: Serious luxury travellers, complete privacy'],
    bookingLink: 'https://aviasales.tpo.lu/f9QeB1mu',
  },
];

export default function BlogBaliHotels() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Head
        title={articleMetadata.title}
        description={articleMetadata.description}
        canonical={`https://thestayandwander.com${articleMetadata.url}`}
        ogTitle={articleMetadata.title}
        ogDescription={articleMetadata.description}
        ogImage={articleMetadata.image}
        ogUrl={`https://thestayandwander.com${articleMetadata.url}`}
        keywords={articleMetadata.keywords}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-96 flex items-center justify-center overflow-hidden">
        <img
          src={articleMetadata.image}
          alt="Best Hotels in Bali"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            {articleMetadata.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Hand-picked hotels across every budget — from $30 to $1,100/night
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Article Meta */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Published by: {articleMetadata.author}</span>
              <span>Category: {articleMetadata.category}</span>
              <span>Read time: {articleMetadata.readTime}</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Bali remains one of the most searched travel destinations in the world — and for good reason. Whether you're dreaming of a clifftop infinity pool in Uluwatu, a lush jungle retreat in Ubud, or a budget-friendly surfer's guesthouse in Seminyak, Bali delivers. But with thousands of hotels across the island, choosing where to stay can feel overwhelming.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We've done the research for you. This guide covers the best hotels in Bali in 2026 across every budget — so you can stop scrolling and start booking.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <p className="text-gray-800">
                <strong>💡 Quick tip:</strong> Bali hotel prices surge during July–August and December–January. If you're travelling this summer, book at least 6–8 weeks ahead to lock in the best rates with free cancellation.
              </p>
            </div>
          </section>

          {/* GetYourGuide Widget - After Intro */}
          <section className="mb-12 py-8 border-t border-b">
            <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOP-RATED BALI TOURS & ACTIVITIES</p>
            <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
          </section>

          {/* What to Know */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              What to Know Before You Book a Hotel in Bali
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Location is everything</h3>
                <p className="text-gray-700">Bali is bigger than most visitors expect. Seminyak and Kuta are best for nightlife and beach clubs. Ubud is for culture, rice terraces, and wellness. Uluwatu is for clifftop sunsets and world-class surf. Canggu is for digital nomads and trendy cafes. Nusa Dua is for luxury resort vibes and calm beaches.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Free cancellation matters</h3>
                <p className="text-gray-700">Book with free cancellation whenever possible — Bali weather and flight schedules can be unpredictable. Most hotels on Booking.com offer this at no extra cost.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Breakfast included is worth it</h3>
                <p className="text-gray-700">Balinese breakfasts are elaborate and delicious. Hotels that include breakfast typically offer far better value than those that don't.</p>
              </div>
            </div>
          </section>

          {/* Budget Hotels */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
              Best Budget Hotels in Bali (Under $50/Night)
            </h2>
            <div className="space-y-8">
              {hotels.slice(0, 3).map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{hotel.price}</p>
                        <p className="text-sm text-gray-600">⭐ {hotel.rating}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{hotel.description}</p>
                    <div className="mb-6 space-y-2">
                      {hotel.highlights.map((highlight, idx) => (
                        <p key={idx} className="text-sm text-gray-600">✅ {highlight}</p>
                      ))}
                    </div>
                    <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                        Check Availability & Book This Hotel
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Mid-Range Hotels */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
              Best Mid-Range Hotels in Bali ($50–$150/Night)
            </h2>
            <div className="space-y-8">
              {hotels.slice(3, 6).map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{hotel.price}</p>
                        <p className="text-sm text-gray-600">⭐ {hotel.rating}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{hotel.description}</p>
                    <div className="mb-6 space-y-2">
                      {hotel.highlights.map((highlight, idx) => (
                        <p key={idx} className="text-sm text-gray-600">✅ {highlight}</p>
                      ))}
                    </div>
                    <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                        Check Availability & Book This Hotel
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Luxury Hotels */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
              Best Luxury Hotels in Bali ($200–$500+/Night)
            </h2>
            <div className="space-y-8">
              {hotels.slice(6, 9).map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{hotel.price}</p>
                        <p className="text-sm text-gray-600">⭐ {hotel.rating}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{hotel.description}</p>
                    <div className="mb-6 space-y-2">
                      {hotel.highlights.map((highlight, idx) => (
                        <p key={idx} className="text-sm text-gray-600">✅ {highlight}</p>
                      ))}
                    </div>
                    <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                        Check Availability & Book This Hotel
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Time to Visit */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              Best Time to Visit Bali
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Dry season (May–September)</h3>
                <p className="text-gray-700">Peak season — warm, sunny, and busy. Book hotels at least 6–8 weeks in advance. July and August are the busiest and most expensive months.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Shoulder season (April & October)</h3>
                <p className="text-gray-700">Offers the best value — great weather with fewer crowds and lower hotel prices. Highly recommended if your dates are flexible.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Wet season (November–March)</h3>
                <p className="text-gray-700">Brings daily rain showers but also the lowest hotel prices, lush green landscapes, and a more authentic Bali experience. Many travellers actually prefer this time.</p>
              </div>
            </div>
          </section>

          {/* How to Get Best Deals */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              How to Get the Best Hotel Deals in Bali
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>✅ Book directly through Booking.com for the best price guarantee and free cancellation on most properties. Filter by "Free cancellation" to protect your booking from any itinerary changes.</li>
              <li>✅ Compare dates. Moving your check-in one day earlier or later can sometimes save 20–30% — especially for mid-range hotels during peak season.</li>
              <li>✅ Look beyond the obvious areas. Hotels in Ubud's outskirts, Sanur, or the Bukit Peninsula offer comparable quality to Seminyak at significantly lower prices.</li>
            </ul>
            <div className="mt-6 p-6 bg-blue-50 rounded-lg">
              <p className="text-gray-800 mb-4">
                <strong>🔵 Ready to book?</strong>
              </p>
              <AffiliateLink
                href="https://aviasales.tpo.lu/f9QeB1mu"
                partner="Stay22"
                category="Hotels"
                source="Blog"
                destination="Search All Bali Hotels"
                className="block"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Search All Bali Hotels on Booking.com
                </Button>
              </AffiliateLink>
            </div>
          </section>

          {/* Final Thoughts */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              Final Thoughts — Which Bali Hotel Is Right For You?
            </h2>
            <p className="text-gray-700 mb-4">
              Bali has a hotel for every traveller and every budget. If you're on a tight budget, Canggu and Ubud offer incredible value with genuine character. Mid-range travellers are spoiled with choice — Alaya and Katamama punch well above their price point. And for luxury, Bali's top resorts compete with the finest in the world at a fraction of the price you'd pay in Europe.
            </p>
            <p className="text-gray-700 mb-4">
              Whatever your budget, book with free cancellation and book early for summer travel — Bali's best hotels sell out fast.
            </p>
          </section>

          {/* GetYourGuide Widget - After Final Hotel */}
          <section className="mb-12 py-8 border-t border-b">
            <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 COMPLETE YOUR BALI TRIP — BOOK ACTIVITIES</p>
            <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
          </section>

          {/* Related Articles */}
          <section className="mb-12 pb-12 border-t pt-8">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
              You might also like:
            </h3>
            <ul className="space-y-3">
              <li><a href="/blog/europe-cities" className="text-blue-600 hover:underline">7 Best Cities to Visit in Europe This Summer</a></li>
              <li><a href="/blog/tokyo-bangkok" className="text-blue-600 hover:underline">Tokyo vs Bangkok — Which Should You Visit First?</a></li>
              <li><a href="/itineraries/tokyo-seoul" className="text-blue-600 hover:underline">10 Days in Tokyo & Seoul — Complete Itinerary</a></li>
            </ul>
          </section>

          {/* Affiliate Disclaimer */}
          <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-600">
            <p>
              This article contains affiliate links. If you book through our links, we earn a small commission at no extra cost to you. Thank you for supporting The Stay & Wander.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PopularRoutesWidgetBlogSidebar />
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
