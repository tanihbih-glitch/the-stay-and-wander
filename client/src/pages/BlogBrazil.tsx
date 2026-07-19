import Head from '@/components/Head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PopularRoutesWidgetBlogSidebar from '@/components/PopularRoutesWidgetBlogSidebar';
import { Share2, Facebook, Twitter } from 'lucide-react';

const articleMetadata = {
  title: 'Brazil Travel Guide 2026 — Everything You Need to Know',
  description: 'Planning a trip to Brazil in 2026? Our complete Brazil travel guide covers Rio de Janeiro, the Amazon, São Paulo and Florianópolis — with hotels, tours, budget tips and everything you need to know.',
  url: '/blog/brazil-travel-guide-2026',
  image: '/manus-storage/blog-brazil.png',
  keywords: 'Brazil travel guide, Rio de Janeiro, Amazon, São Paulo, Florianópolis, Brazil hotels, Brazil tours',
  author: 'The Stay & Wander',
  category: 'Brazil Travel',
  readTime: '11 minutes',
  publishDate: '2026-07-17',
};

const getAffiliateLink = (city: string): string => {
  switch (city) {
    case 'rio':
      return 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN';
    case 'amazon':
      return 'https://booking.stay22.com/thestayandwander/9lYbziHE4c';
    case 'sao-paulo':
      return 'https://booking.stay22.com/thestayandwander/5x2vv0_ZR9';
    case 'florianopolis':
      return 'https://booking.stay22.com/thestayandwander/8nvt_gi849';
    default:
      return 'https://booking.stay22.com/thestayandwander/zRyDL-E_PN';
  }
};

const rioHotels = [
  { budget: 'Budget', name: 'Selina Rio de Janeiro', price: '$35/night', highlights: 'Santa Teresa neighbourhood, Rooftop pool, Social atmosphere' },
  { budget: 'Mid-range', name: 'Hotel Santa Teresa', price: '$150/night', highlights: 'Historic hilltop hotel, Pool and city views' },
  { budget: 'Luxury', name: 'Hotel Fasano Rio de Janeiro', price: '$350/night', highlights: 'Ipanema, Rooftop pool, One of Rio\'s finest addresses' },
];

const amazonHotels = [
  { budget: 'Budget', name: 'Hostel Manaus', price: '$20/night', highlights: 'City centre base before heading into the jungle' },
  { budget: 'Mid-range', name: 'Anavilhanas Jungle Lodge', price: '$250/night', highlights: 'All inclusive, Deep in rainforest, River views and guided excursions' },
  { budget: 'Luxury', name: 'Juma Lodge', price: '$420/night', highlights: 'Treehouse cabins, The ultimate Amazon experience' },
];

const saoPauloHotels = [
  { budget: 'Budget', name: 'Selina São Paulo', price: '$30/night', highlights: 'Vila Madalena neighbourhood, Design hostel' },
  { budget: 'Mid-range', name: 'Hotel Unique São Paulo', price: '$180/night', highlights: 'Jardins district, Rooftop pool, Award-winning architecture' },
  { budget: 'Luxury', name: 'Rosewood São Paulo', price: '$450/night', highlights: 'Pinheiros district, One of the finest hotels in South America' },
];

const florianopolisHotels = [
  { budget: 'Budget', name: 'Albergue da Juventude', price: '$25/night', highlights: 'Lagoa area, Basic but well-located' },
  { budget: 'Mid-range', name: 'Pousada dos Sonhos', price: '$90/night', highlights: 'Lagoa da Conceição, Garden pool, Charming pousada style' },
  { budget: 'Luxury', name: 'Ponta dos Ganchos Resort', price: '$500/night', highlights: 'Private island resort near Florianópolis, One of Brazil\'s finest hotels' },
];

export default function BlogBrazil() {
  return (
    <>
      <Head {...articleMetadata} canonical={`https://thestayandwander.com${articleMetadata.url}`} />
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-b from-green-600 to-green-400 overflow-hidden">
          <img
            src="/manus-storage/blog-brazil.png"
            alt="Brazil Travel Guide"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
            <p className="text-yellow-400 text-sm font-semibold mb-2 uppercase tracking-wider">BRAZIL TRAVEL · DESTINATION GUIDES</p>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
              Brazil Travel Guide 2026 — Everything You Need to Know
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Complete guide to Rio, the Amazon, São Paulo and Florianópolis with hotels, tours, budget tips and everything you need to know
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Main Content */}
          <article className="flex-1 prose prose-lg max-w-none">
            {/* Article Header */}
            <div className="mb-8 pb-8 border-b">
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-4">
                <span>Published by The Stay & Wander</span>
                <span>Category: Brazil Travel</span>
                <span>Read time: 11 minutes</span>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Facebook size={18} />
                  Share on Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
                  <Twitter size={18} />
                  Share on Twitter
                </button>
              </div>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Brazil is unlike anywhere else on earth. It is the country of Carnival and samba, of the world's greatest rainforest and some of its most spectacular beaches, of football passion and vibrant city life that never seems to stop. At 8.5 million square kilometres it is the fifth largest country in the world — big enough to feel like several countries rolled into one, each region with its own distinct character, food, and culture.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                This guide covers everything you need to plan an unforgettable Brazil trip in 2026 — where to go, where to stay, what to eat, how to get around, and how to do it safely and affordably.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <p className="text-gray-800">
                  <strong>Quick tip:</strong> The best time to visit Brazil is April to October — the dry season. Avoid the wet season (November to March) unless you specifically want to visit the Amazon when river levels are highest. Carnival takes place in February or March and is extraordinary but extremely busy — book accommodation 6 months ahead if you plan to go.
                </p>
              </div>
            </section>

            {/* Rio de Janeiro Section */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Rio de Janeiro — The Marvellous City</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Rio is Brazil's most iconic city and one of the most dramatically beautiful cities on earth. Surrounded by mountains, rainforest, and the Atlantic Ocean, with Christ the Redeemer watching over everything from above, Rio delivers an instant and unforgettable first impression.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Must see in Rio:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Christ the Redeemer on Corcovado Mountain — book the official tram from Cosme Velho station</li>
                  <li>• Sugarloaf Mountain cable car for the city's most dramatic panorama</li>
                  <li>• Ipanema and Copacabana beaches — the heart of Rio's famous beach culture</li>
                  <li>• Santa Teresa neighbourhood for bohemian art, restaurants and fado</li>
                  <li>• Lapa at night for Rio's legendary samba bars and Carnaval energy year-round</li>
                  <li>• Tijuca National Forest — the world's largest urban rainforest</li>
                  <li>• Maracanã Stadium tour for football history</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-6"><strong>Best time to visit Rio:</strong> May to October for dry weather and fewer crowds. Avoid January and February if you dislike extreme heat and rain.</p>

              {/* Rio Hotels */}
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Where to Stay in Rio:</h3>
              <div className="space-y-4 mb-8">
                {rioHotels.map((hotel, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-yellow-600 mb-1">{hotel.budget}</p>
                          <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">{hotel.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">✓ {hotel.highlights}</p>
                      <a href={getAffiliateLink('rio')} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                          Check Availability →
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">Powered by Booking.com</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <p className="text-gray-800">
                  <strong>Safety note:</strong> Rio is vibrant and wonderful but requires awareness. Use Uber over street taxis. Keep valuables at your hotel. Follow your hotel's advice on which areas to avoid after dark. Millions visit safely every year.
                </p>
              </div>

              {/* GetYourGuide Widget - Rio */}
              <div className="my-8 py-6 border-t border-b">
                <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOURS & EXPERIENCES IN RIO DE JANEIRO</p>
                <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
              </div>
            </section>

            {/* Amazon Section */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">The Amazon Rainforest</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                No trip to Brazil is truly complete without experiencing the Amazon. The world's largest rainforest covers 5.5 million square kilometres and is home to 10% of all species on earth. The gateway city is Manaus — a surprisingly sophisticated city of 2 million people deep in the jungle — from where river boats take you to jungle lodges with no roads, no mobile signal, and extraordinary wildlife.
              </p>

              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Must do in the Amazon:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Stay at a jungle lodge at least 2 nights — the further from Manaus the better</li>
                  <li>• Canoe through flooded forest (igapó) at sunrise</li>
                  <li>• Piranha fishing from a simple boat with a bamboo rod</li>
                  <li>• Encounter Amazon river dolphins — the mythical pink boto</li>
                  <li>• Night walk guided by torchlight to spot tarantulas, tree frogs and sleeping parrots</li>
                  <li>• Visit the Meeting of the Waters where the Rio Negro and Amazon run side by side without mixing for 6km</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-6"><strong>Getting there:</strong> Fly from Rio or São Paulo to Manaus (Eduardo Gomes International Airport) — approximately 4 hours. Then transfer by river boat 1–2 hours to your jungle lodge.</p>

              {/* Amazon Hotels */}
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Where to Stay in the Amazon:</h3>
              <div className="space-y-4 mb-8">
                {amazonHotels.map((hotel, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-yellow-600 mb-1">{hotel.budget}</p>
                          <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">{hotel.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">✓ {hotel.highlights}</p>
                      <a href={getAffiliateLink('amazon')} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                          Check Availability →
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">Powered by Booking.com</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-orange-50 p-6 rounded-lg mb-8">
                <p className="text-gray-800">
                  <strong>Essential Amazon kit:</strong> DEET mosquito repellent (strong), antimalarial medication (consult your doctor before travelling), yellow fever vaccination (required for Brazil), long-sleeved lightweight shirts, waterproof sandals, head torch.
                </p>
              </div>

              {/* GetYourGuide Widget - Amazon */}
              <div className="my-8 py-6 border-t border-b">
                <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOURS & EXPERIENCES IN THE AMAZON</p>
                <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
              </div>
            </section>

            {/* São Paulo Section */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">São Paulo — South America's Greatest City</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                São Paulo is Brazil's economic powerhouse and one of the world's great cities — often overlooked by tourists in favour of Rio but infinitely rewarding for those who visit. It has arguably the best restaurant scene in South America, the continent's best nightlife, world-class museums, and the largest Japanese community outside Japan.
              </p>

              <div className="bg-purple-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Must see in São Paulo:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Avenida Paulista — the city's grand boulevard, home to MASP (one of Latin America's great art museums)</li>
                  <li>• Vila Madalena — the street art neighbourhood, especially Beco do Batman alley</li>
                  <li>• Liberdade — the Japanese district with 1.5 million Japanese-Brazilians, extraordinary ramen and sake bars</li>
                  <li>• Ibirapuera Park — São Paulo's Central Park</li>
                  <li>• São Paulo nightlife — the Baixo Augusta area has some of South America's best bars and clubs</li>
                </ul>
              </div>

              {/* São Paulo Hotels */}
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Where to Stay in São Paulo:</h3>
              <div className="space-y-4 mb-8">
                {saoPauloHotels.map((hotel, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-yellow-600 mb-1">{hotel.budget}</p>
                          <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">{hotel.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">✓ {hotel.highlights}</p>
                      <a href={getAffiliateLink('sao-paulo')} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                          Check Availability →
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">Powered by Booking.com</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-pink-50 p-6 rounded-lg mb-8">
                <p className="text-gray-800">
                  <strong>Must eat in São Paulo:</strong> São Paulo-style pizza (thin crust, extraordinary variety), temakeria hand-rolled sushi cones, pão de queijo cheese bread rolls, brigadeiro chocolate truffles, and a traditional feijoada black bean stew on a Saturday.
                </p>
              </div>

              {/* GetYourGuide Widget - São Paulo */}
              <div className="my-8 py-6 border-t border-b">
                <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOURS & EXPERIENCES IN SÃO PAULO</p>
                <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
              </div>
            </section>

            {/* Florianópolis Section */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Florianópolis — The Magic Island</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Florianópolis is Brazil's best-kept beach secret — an island in the south of the country with 42 beaches, a stunning inland lagoon, world-class surf, and a completely different pace and feel from Rio or São Paulo. It is cleaner, safer, and more relaxed than the big cities, and offers a genuinely beautiful natural environment.
              </p>

              <div className="bg-cyan-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Must do in Florianópolis:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lagoa da Conceição — the island's stunning inland lagoon, perfect for kitesurfing and paddleboarding with a great bar scene</li>
                  <li>• Joaquina Beach — powerful surf and enormous sand dunes you can sandboard</li>
                  <li>• Praia Mole — the island's most beautiful beach</li>
                  <li>• Ilha do Campeche — a protected marine reserve accessible only by boat with extraordinary snorkelling</li>
                  <li>• Santo Antônio de Lisboa — the island's most charming colonial village with waterfront oyster restaurants</li>
                </ul>
              </div>

              {/* Florianópolis Hotels */}
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Where to Stay in Florianópolis:</h3>
              <div className="space-y-4 mb-8">
                {florianopolisHotels.map((hotel, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-yellow-600 mb-1">{hotel.budget}</p>
                          <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">{hotel.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">✓ {hotel.highlights}</p>
                      <a href={getAffiliateLink('florianopolis')} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                          Check Availability →
                        </Button>
                      </a>
                      <p className="text-xs text-gray-500 mt-2">Powered by Booking.com</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* GetYourGuide Widget - Florianópolis */}
              <div className="my-8 py-6 border-t border-b">
                <p className="text-sm font-semibold text-yellow-600 mb-4">🎫 TOURS & EXPERIENCES IN FLORIANÓPOLIS</p>
                <div data-gyg-widget="auto" data-gyg-partner-id="YOPATWV"></div>
              </div>
            </section>

            {/* Practical Information */}
            <section className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">Practical Brazil Travel Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Getting to Brazil</h3>
                  <p className="text-gray-700 mb-4">
                    Major international airports are Rio de Janeiro Galeão (GIG) and São Paulo Guarulhos (GRU). São Paulo is the main international hub with the most direct flights from Europe, North America and the Middle East.
                  </p>
                  <a href="https://aviasales.tpo.lu/f9QeB1mu" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">🟡 Search Flights to Brazil →</Button>
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Getting around Brazil</h3>
                  <p className="text-gray-700">
                    Domestic flights are the best way to cover Brazil's enormous distances. LATAM, Azul, and Gol are the main carriers. Book ahead — last-minute domestic fares are expensive. Buses are comfortable for shorter routes (Rio to São Paulo is 6 hours by bus, $15–30).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Language</h3>
                  <p className="text-gray-700">
                    Portuguese is the official language. English is spoken in major tourist areas and upmarket hotels but is limited elsewhere. Download Google Translate with Portuguese offline pack before you go — the camera translation feature is invaluable for menus and signs.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Currency</h3>
                  <p className="text-gray-700">
                    Brazilian Real (BRL). $1 USD ≈ R$5. Brazil is affordable for international visitors — a mid-range meal costs R$40–80, a domestic beer R$8–15. Use Wise or Revolut cards for the best exchange rates. ATMs at Banco do Brasil and Bradesco work reliably with foreign cards.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Safety</h3>
                  <p className="text-gray-700">
                    Brazil has a reputation that exceeds the reality for most tourist destinations. Follow basic precautions — use Uber over street taxis, keep valuables secure, avoid displaying expensive phones and cameras in crowded areas, and follow your hotel's local advice. Rio requires more caution than São Paulo or Florianópolis. Millions of tourists visit Brazil safely every year.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Health</h3>
                  <p className="text-gray-700">
                    Yellow fever vaccination is required or strongly recommended for most of Brazil. Malaria prophylaxis is recommended for the Amazon region — consult your doctor at least 4 weeks before travel. Travel insurance is essential.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Best apps for Brazil</h3>
                  <p className="text-gray-700">
                    99 and Cabify for ride-hailing (safer than street taxis). iFood for food delivery. Google Maps works well in cities. Maps.me for offline maps essential in the Amazon.
                  </p>
                </div>
              </div>
            </section>

            {/* Budget Breakdown */}
            <section className="mb-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">Budget Breakdown for Brazil</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-semibold text-gray-900">Budget traveller</span>
                  <span className="text-lg font-bold text-yellow-600">$60–80/day</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-semibold text-gray-900">Mid-range traveller</span>
                  <span className="text-lg font-bold text-yellow-600">$120–180/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Luxury traveller</span>
                  <span className="text-lg font-bold text-yellow-600">$300–600/day</span>
                </div>
              </div>
              <p className="text-gray-700 mt-6">
                A 14-day Brazil trip including international flights typically costs $1,800–$3,200 per person mid-range.
              </p>
            </section>

            {/* Final CTA */}
            <section className="mb-12 p-8 bg-green-50 rounded-lg">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Ready to Book Your Brazil Trip?</h3>
              <p className="text-gray-700 mb-6">All hotels in this guide are bookable with free cancellation on most properties.</p>
              <div className="flex flex-col md:flex-row gap-4">
                <a href="https://booking.stay22.com/thestayandwander/zRyDL-E_PN" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                    Search All Brazil Hotels →
                  </Button>
                </a>
                <a href="https://aviasales.tpo.lu/f9QeB1mu" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                    Search Flights to Brazil →
                  </Button>
                </a>
                <a href="https://gyg.me/As25WS5K" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                    Book Brazil Tours & Experiences →
                  </Button>
                </a>
              </div>
            </section>

            {/* Related Articles */}
            <section className="mb-12 pb-12 border-t pt-8">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
              <ul className="space-y-3">
                <li><a href="/blog/best-hotels-bali-2026" className="text-blue-600 hover:underline">Best Hotels in Bali for Every Budget (2026)</a></li>
                <li><a href="/blog/best-cities-europe-summer-2026" className="text-blue-600 hover:underline">7 Best Cities to Visit in Europe This Summer (2026)</a></li>
                <li><a href="/blog/tokyo-vs-bangkok-2026" className="text-blue-600 hover:underline">Tokyo vs Bangkok: Which Should You Visit First? (2026)</a></li>
              </ul>
            </section>

            {/* Affiliate Disclaimer */}
            <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-600">
              <p>
                This article contains affiliate links. If you book through our links, we earn a small commission at no extra cost to you. Thank you for supporting The Stay & Wander.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <PopularRoutesWidgetBlogSidebar />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}
