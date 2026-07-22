import { useState } from 'react';
import Head from '@/components/Head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PopularRoutesWidgetBlogSidebar from '@/components/PopularRoutesWidgetBlogSidebar';
import { DISCOVERCARS_AFFILIATE_URL } from '@/lib/affiliateLinks';

const getAffiliateLink = (cityId: number): string => {
  const links: { [key: number]: string } = {
    1: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0', // Lisbon
    2: 'https://booking.stay22.com/thestayandwander/FBzzZenMr0', // Dubrovnik
    3: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0', // Budapest
    4: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0', // Porto
    5: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0', // Athens
    6: 'https://booking.stay22.com/thestayandwander/_3gvRmesd0', // Ljubljana
    7: 'https://booking.stay22.com/thestayandwander/FBzzZenMr0', // Kotor
  };
  return links[cityId] || 'https://booking.stay22.com/thestayandwander/_3gvRmesd0';
};

const articleMetadata = {
  title: '7 Best Cities to Visit in Europe This Summer (2026) — And Exactly Where to Stay',
  description: 'Planning a European summer trip in 2026? Here are the 7 best cities to visit in Europe this summer — with hand-picked hotel recommendations for every budget. Book now before prices rise.',
  url: '/blog/best-cities-europe-summer-2026',
  image: '/manus-storage/blog-europe-cities.png',
  keywords: 'best cities Europe summer, Europe travel guide, European cities to visit, summer travel Europe, Lisbon, Dubrovnik, Budapest, Porto, Athens',
  author: 'The Stay & Wander',
  category: 'Europe Travel',
  readTime: '9 minutes',
  publishDate: '2026-07-15',
};

const cities = [
  {
    id: 1,
    name: 'Lisbon, Portugal',
    emoji: '🇵🇹',
    bestFor: 'First-time Europe visitors, food lovers, budget travellers',
    description: 'Lisbon is having a moment — and rightfully so. Portugal\'s sun-drenched capital offers the perfect combination of history, culture, food, and nightlife at prices that feel impossibly reasonable for a Western European capital. Cobblestone hills, vintage trams, pastel-coloured buildings, and some of the freshest seafood in Europe make Lisbon an easy favourite.',
    neighborhoods: [
      { name: 'Chiado', desc: 'central, elegant, walkable to everything' },
      { name: 'Alfama', desc: 'historic, atmospheric, fado music at every corner' },
      { name: 'Príncipe Real', desc: 'boutique hotels, great restaurants, quieter feel' },
    ],
    bestTime: 'June and September — July and August are busy and hot (35°C+)',
    dontMiss: 'Pastéis de Belém for the world\'s best custard tart, a sunset at Miradouro da Graça, and a day trip to Sintra\'s fairy-tale palaces.',
    hotels: [
      { budget: 'Budget', name: 'The Independente Hostel & Suites', price: '$45/night', highlights: 'Stunning historic building, Rooftop terrace' },
      { budget: 'Mid-range', name: 'Bairro Alto Hotel', price: '$180/night', highlights: 'Iconic Lisbon boutique hotel, Rooftop with city views' },
      { budget: 'Luxury', name: 'Bairro Alto Hotel Superior', price: '$320/night', highlights: 'Design icon, The best address in Lisbon' },
    ],
  },
  {
    id: 2,
    name: 'Dubrovnik, Croatia',
    emoji: '🇭🇷',
    bestFor: 'Couples, Game of Thrones fans, coastal scenery',
    description: 'Few cities in Europe are as immediately breathtaking as Dubrovnik. The UNESCO-listed walled Old Town, the impossibly blue Adriatic Sea, and the dramatic limestone cliffs create a setting that feels almost cinematic. Walk the city walls at sunrise before the crowds arrive and you\'ll understand why Dubrovnik consistently tops every European bucket list.',
    neighborhoods: [
      { name: 'Old Town', desc: 'most atmospheric, expensive, book far in advance' },
      { name: 'Lapad', desc: 'quieter, beach access, 10-minute bus to Old Town' },
      { name: 'Pile', desc: 'gateway to Old Town, more affordable than inside the walls' },
    ],
    bestTime: 'June or September — July and August see massive cruise ship crowds and peak prices',
    dontMiss: 'The City Walls walk, Lokrum Island day trip, sunset kayaking around the old walls, and the cable car to Mount Srđ.',
    hotels: [
      { budget: 'Budget', name: 'Hostel Angelina Old Town', price: '$55/night', highlights: 'Inside the Old Town walls, Rooftop views of the Adriatic' },
      { budget: 'Mid-range', name: 'Hotel Stari Grad', price: '$165/night', highlights: 'Boutique hotel inside the walls, Stunning terrace' },
      { budget: 'Luxury', name: 'Villa Dubrovnik', price: '$480/night', highlights: 'Clifftop, Private beach, Legendary service' },
    ],
  },
  {
    id: 3,
    name: 'Budapest, Hungary',
    emoji: '🇭🇺',
    bestFor: 'Value travellers, architecture lovers, nightlife',
    description: 'Budapest is Europe\'s best-value capital — full stop. Two cities (Buda and Pest) separated by the Danube, connected by some of the most beautiful bridges in the world. Grand thermal baths, extraordinary ruin bars, a jaw-dropping Parliament building, and a food scene that punches well above its weight — all at prices roughly half what you\'d pay in Paris or Amsterdam.',
    neighborhoods: [
      { name: 'District V (Belváros)', desc: 'central, walkable, classic Budapest feel' },
      { name: 'District VII (Jewish Quarter)', desc: 'ruin bars, nightlife, incredible energy' },
      { name: 'District I (Castle District)', desc: 'historic, quiet, stunning views' },
    ],
    bestTime: 'June–August — warm, festivals, outdoor baths at their best',
    dontMiss: 'Széchenyi Thermal Bath, the Great Market Hall, a Danube river cruise at night, and a ruin bar crawl in District VII.',
    hotels: [
      { budget: 'Budget', name: 'Maverick City Lodge', price: '$28/night', highlights: 'Stylish design hostel, District VII location' },
      { budget: 'Mid-range', name: 'Aria Hotel Budapest', price: '$145/night', highlights: 'Music-themed boutique, Rooftop bar with Parliament views' },
      { budget: 'Luxury', name: 'Four Seasons Hotel Gresham Palace', price: '$420/night', highlights: 'Art Nouveau masterpiece, Danube riverfront' },
    ],
  },
  {
    id: 4,
    name: 'Porto, Portugal',
    emoji: '🇵🇹',
    bestFor: 'Wine lovers, photographers, off-the-beaten-path seekers',
    description: 'Porto is Lisbon\'s cooler, grittier, more authentic cousin — and many travellers end up preferring it. The UNESCO-listed Ribeira waterfront, the port wine caves of Vila Nova de Gaia, the extraordinary azulejo tile facades, and the legendary francesinha sandwich make Porto one of Europe\'s most rewarding cities. It\'s also noticeably cheaper than Lisbon.',
    neighborhoods: [
      { name: 'Ribeira', desc: 'waterfront, most photogenic, lively atmosphere' },
      { name: 'Bonfim', desc: 'up-and-coming, local feel, great cafes' },
      { name: 'Aliados', desc: 'central, grand boulevard, good transport links' },
    ],
    bestTime: 'June and September — July gets busy but the Douro Valley day trip is spectacular all summer',
    dontMiss: 'Livraria Lello bookshop, a port wine tasting in Vila Nova de Gaia, sunset on Dom Luís I Bridge, and a day trip up the Douro Valley by train.',
    hotels: [
      { budget: 'Budget', name: 'Gallery Hostel', price: '$35/night', highlights: 'Award-winning design, Bonfim neighbourhood' },
      { budget: 'Mid-range', name: 'Torel Avantgarde', price: '$120/night', highlights: 'Art hotel, Panoramic city views' },
      { budget: 'Luxury', name: 'The Yeatman', price: '$350/night', highlights: 'Wine hotel, Overlooking Porto and the Douro' },
    ],
  },
  {
    id: 5,
    name: 'Athens, Greece',
    emoji: '🇬🇷',
    bestFor: 'History lovers, island hoppers, food scene',
    description: 'Athens is having a serious renaissance. Long overshadowed by the Greek islands, the capital has emerged as one of Europe\'s most exciting city destinations — a thriving food scene, world-class rooftop bars with Acropolis views, and the greatest concentration of ancient history anywhere on earth. Use Athens as your base for island hopping to Santorini, Mykonos, or the underrated Aegina.',
    neighborhoods: [
      { name: 'Plaka', desc: 'beneath the Acropolis, most atmospheric, tourist-friendly' },
      { name: 'Monastiraki', desc: 'flea market, street food, incredible energy' },
      { name: 'Koukaki', desc: 'local, residential, best value, 10-minute walk to Acropolis' },
    ],
    bestTime: 'June and September — July and August are very hot (38°C+) and crowded',
    dontMiss: 'Acropolis at sunrise, the National Archaeological Museum, the Athens food tour in Monastiraki, and a ferry to Hydra for a perfect day trip.',
    hotels: [
      { budget: 'Budget', name: 'Athens Backpackers', price: '$32/night', highlights: 'Rooftop bar with Acropolis views, Makrygianni area' },
      { budget: 'Mid-range', name: 'Hotel Grande Bretagne', price: '$210/night', highlights: 'Historic landmark, Syntagma Square, Rooftop pool' },
      { budget: 'Luxury', name: 'NEW Hotel Athens', price: '$280/night', highlights: 'Design hotel, Philippe Starck interiors, Central location' },
    ],
  },
  {
    id: 6,
    name: 'Ljubljana, Slovenia',
    emoji: '🇸🇮',
    bestFor: 'Hidden gem seekers, nature lovers, sustainable travel',
    description: 'Ljubljana is Europe\'s best-kept secret and one of the continent\'s most liveable, loveable small capitals. The car-free old town, the hilltop castle, the outdoor cafe culture along the Ljubljanica River, and the extraordinary day trips to Lake Bled and Triglav National Park make Slovenia\'s capital a revelation for travellers who\'ve already done the obvious European cities.',
    neighborhoods: [
      { name: 'Old Town', desc: 'most atmospheric, walkable, car-free' },
      { name: 'Krakovo', desc: 'local neighbourhood, riverside, charming' },
      { name: 'Center', desc: 'modern, transport links, wider choice of hotels' },
    ],
    bestTime: 'June–August — warm, Lake Bled is at its best, outdoor markets in full swing',
    dontMiss: 'Ljubljana Castle, Metelkova alternative art district, the Central Market, and the unmissable day trip to Lake Bled — one of the most photographed places in Europe.',
    hotels: [
      { budget: 'Budget', name: 'Hostel Celica', price: '$30/night', highlights: 'Former prison converted to design hostel, Metelkova' },
      { budget: 'Mid-range', name: 'Hotel Cubo', price: '$130/night', highlights: 'Boutique design hotel, Old Town, Excellent breakfast' },
      { budget: 'Luxury', name: 'Intercontinental Ljubljana', price: '$220/night', highlights: 'Best views in the city, Rooftop infinity pool' },
    ],
  },
  {
    id: 7,
    name: 'Kotor, Montenegro',
    emoji: '🇲🇪',
    bestFor: 'Adventurous travellers, medieval history, Adriatic beauty',
    description: 'Kotor is the Adriatic\'s most underrated gem. Nestled between dramatic limestone mountains and a stunning bay, the UNESCO-listed medieval old town is one of the best-preserved in Europe — and because Montenegro hasn\'t yet been fully discovered by mass tourism, prices are still remarkably reasonable. The views from the ancient city walls are worth every step of the climb.',
    neighborhoods: [
      { name: 'Old Town', desc: 'most atmospheric, inside the medieval walls' },
      { name: 'Dobrota', desc: 'waterfront, quieter, beautiful bay views' },
      { name: 'Prčanj', desc: 'village feel, most affordable, 10 minutes from Old Town' },
    ],
    bestTime: 'June and September — July and August bring cruise ship crowds but the bay is spectacular',
    dontMiss: 'The city walls climb to St John\'s Fortress, the Bay of Kotor boat tour, a day trip to Perast and Our Lady of the Rocks, and sunset from the fortress walls.',
    hotels: [
      { budget: 'Budget', name: 'Old Town Hostel Kotor', price: '$22/night', highlights: 'Inside the medieval walls, Social atmosphere' },
      { budget: 'Mid-range', name: 'Hotel Vardar', price: '$95/night', highlights: 'Historic hotel, Old Town square, Excellent location' },
      { budget: 'Luxury', name: 'Cattaro Design Hotel', price: '$185/night', highlights: 'Boutique, Old Town, Bay views from every room' },
    ],
  },
];

export default function BlogEuropeCities() {
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
          alt="Best Cities to Visit in Europe"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            {articleMetadata.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            7 unforgettable European cities for summer 2026 — with hand-picked hotels for every budget
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
              Europe in summer is pure magic. Long golden evenings, rooftop bars, ancient cities buzzing with life, and beaches that rival anywhere in the world. But with dozens of incredible destinations to choose from, deciding where to go can feel paralysing.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We've narrowed it down for you. These are the 7 best cities to visit in Europe in summer 2026 — a mix of iconic favourites and hidden gems — with honest neighbourhood guides and hand-picked hotel recommendations for every budget.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <p className="text-gray-800">
                <strong>💡 Book now.</strong> European summer hotel prices rise 30–50% between now and August. Every city on this list is seeing record demand in 2026. Book with free cancellation to protect your flexibility.
              </p>
            </div>
          </section>

          {/* How We Chose */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              How We Chose These Cities
            </h2>
            <p className="text-gray-700">
              We selected cities based on four criteria: summer weather, cultural richness, value for money, and how well they reward first-time visitors. Every city on this list delivers a memorable experience regardless of your budget.
            </p>
          </section>

          {/* Cities */}
          {cities.map((city, idx) => (
            <section key={city.id} className="mb-16 pb-16 border-b last:border-b-0">
              <div className="mb-8">
                <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
                  {idx + 1}. {city.name} {city.emoji}
                </h2>
                <p className="text-lg text-yellow-600 font-semibold mb-4">
                  Best for: {city.bestFor}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">{city.description}</p>
              </div>

              {/* Neighborhoods */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Best neighbourhoods to stay:</h3>
                <ul className="space-y-2">
                  {city.neighborhoods.map((nb, i) => (
                    <li key={i} className="text-gray-700">
                      <strong>{nb.name}</strong> — {nb.desc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Time & Don't Miss */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best time to visit:</h3>
                  <p className="text-gray-700">{city.bestTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Don't miss:</h3>
                  <p className="text-gray-700">{city.dontMiss}</p>
                </div>
              </div>

              {/* Hotels */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Where to Stay in {city.name.split(',')[0]}:</h3>
                <div className="space-y-4">
                  {city.hotels.map((hotel, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm font-semibold text-yellow-600 mb-1">{hotel.budget}</p>
                            <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                          </div>
                          <p className="text-lg font-bold text-yellow-600">{hotel.price}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">✓ {hotel.highlights}</p>
                        <a href={getAffiliateLink(city.id)} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                            Check Availability →
                          </Button>
                        </a>
                        <p className="text-xs text-gray-500 mt-2">Powered by Booking.com</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <a href={getAffiliateLink(city.id)} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
                    Search All {city.name.split(',')[0]} Hotels →
                  </Button>
                </a>
              </div>

              {/* GetYourGuide Widget - After Each City */}
              <div className="mb-8 py-6 border-t border-b">
                <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOURS & EXPERIENCES IN {city.name.split(',')[0].toUpperCase()}</p>
                <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
              </div>
            </section>
          ))}

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              Europe Summer 2026 — Quick Comparison Guide
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left font-semibold">City</th>
                    <th className="border p-3 text-left font-semibold">Country</th>
                    <th className="border p-3 text-left font-semibold">Vibe</th>
                    <th className="border p-3 text-left font-semibold">Budget/Night</th>
                    <th className="border p-3 text-left font-semibold">Crowds</th>
                    <th className="border p-3 text-left font-semibold">Best Month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-3">Lisbon</td><td className="border p-3">Portugal</td><td className="border p-3">Relaxed, cultural</td><td className="border p-3">$45+</td><td className="border p-3">High</td><td className="border p-3">June/Sept</td></tr>
                  <tr><td className="border p-3">Dubrovnik</td><td className="border p-3">Croatia</td><td className="border p-3">Dramatic, romantic</td><td className="border p-3">$55+</td><td className="border p-3">Very High</td><td className="border p-3">June/Sept</td></tr>
                  <tr><td className="border p-3">Budapest</td><td className="border p-3">Hungary</td><td className="border p-3">Vibrant, value</td><td className="border p-3">$28+</td><td className="border p-3">Medium</td><td className="border p-3">June–Aug</td></tr>
                  <tr><td className="border p-3">Porto</td><td className="border p-3">Portugal</td><td className="border p-3">Authentic, scenic</td><td className="border p-3">$35+</td><td className="border p-3">Medium</td><td className="border p-3">June/Sept</td></tr>
                  <tr><td className="border p-3">Athens</td><td className="border p-3">Greece</td><td className="border p-3">Historic, buzzing</td><td className="border p-3">$32+</td><td className="border p-3">High</td><td className="border p-3">June/Sept</td></tr>
                  <tr><td className="border p-3">Ljubljana</td><td className="border p-3">Slovenia</td><td className="border p-3">Hidden gem, calm</td><td className="border p-3">$30+</td><td className="border p-3">Low</td><td className="border p-3">June–Aug</td></tr>
                  <tr><td className="border p-3">Kotor</td><td className="border p-3">Montenegro</td><td className="border p-3">Dramatic, unspoilt</td><td className="border p-3">$22+</td><td className="border p-3">Medium</td><td className="border p-3">June/Sept</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* GetYourGuide Widget - Bottom of Article */}
          <section className="mb-12 py-8 border-t border-b">
            <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 BROWSE ALL EUROPEAN TOURS & EXPERIENCES</p>
            <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
          </section>

          {/* Final GetYourGuide Widget */}
          <section className="mb-12 py-6 border-t border-b">
            <p className="text-sm font-semibold text-yellow-600 mb-4">Browse All European Tours</p>
            <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
          </section>

          {/* Booking Tips */}
          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              Tips for Booking Hotels in Europe This Summer
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Book refundable rates</h3>
                <p className="text-gray-700">European summer can bring flight disruptions, heatwaves, and itinerary changes. Always book hotels with free cancellation — most properties on Booking.com offer this at no extra cost.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Don't wait</h3>
                <p className="text-gray-700">Summer 2026 European hotel inventory is tracking 20–30% lower than demand. The hotels listed in this guide are already filling up for July and August. Book now, cancel later if plans change.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Go shoulder season if you can</h3>
                <p className="text-gray-700">June and September offer 80% of the summer experience at 60% of the price and 40% of the crowds. It's genuinely the best way to do Europe.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mix cities and coastal towns</h3>
                <p className="text-gray-700">Two or three cities paired with a coastal destination gives you the ideal European summer balance — history and culture plus beach and relaxation.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12 p-8 bg-blue-50 rounded-lg">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
              Ready to Book Your European Summer?
            </h3>
            <p className="text-gray-700 mb-6">
              All hotels in this guide are bookable through Booking.com with price matching and free cancellation on most properties. Click any "Check Availability" link above to see live prices for your dates.
            </p>
            <div className="mb-6 rounded-xl border border-[#F4A261]/40 bg-[#fff8f3] p-5">
              <p className="text-gray-800">🚗 Renting a Car in Europe? Compare the best prices across all major suppliers.</p>
              <a href={DISCOVERCARS_AFFILIATE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <Button className="bg-[#F4A261] text-white hover:bg-[#e78b4d]">Search Car Rentals in Europe</Button>
              </a>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <a href="https://booking.stay22.com/thestayandwander/_3gvRmesd0" target="_blank" rel="noopener noreferrer">
                <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                  Search All European Hotels — Best Prices →
                </Button>
              </a>
              <a href="https://gyg.me/JwtO7kBb" target="_blank" rel="noopener noreferrer">
                <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                  Browse European Tours →
                </Button>
              </a>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12 pb-12 border-t pt-8">
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h3>
            <ul className="space-y-3">
              <li><a href="/blog/best-hotels-bali-2026" className="text-blue-600 hover:underline">Best Hotels in Bali for Every Budget (2026)</a></li>
              <li><a href="/blog/tokyo-bangkok" className="text-blue-600 hover:underline">Tokyo vs Bangkok — Which Should You Visit First?</a></li>
              <li><a href="/itineraries/tokyo-seoul" className="text-blue-600 hover:underline">10 Days in Tokyo & Seoul — Complete Day-by-Day Itinerary</a></li>
              <li><a href="/itineraries/mediterranean" className="text-blue-600 hover:underline">Two-Week Mediterranean Summer Escape — Full Itinerary</a></li>
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
