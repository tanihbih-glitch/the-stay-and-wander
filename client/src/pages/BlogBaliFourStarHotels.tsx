import Head from '@/components/Head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import GetYourGuideTours from '@/components/GetYourGuideTours';
import BlogArticleSchema, { BreadcrumbSchema } from '@/components/BlogArticleSchema';
import PopularRoutesWidgetBlogSidebar from '@/components/PopularRoutesWidgetBlogSidebar';
import { AffiliateLink } from '@/components/AffiliateLink';
import { DISCOVERCARS_AFFILIATE_URL } from '@/lib/affiliateLinks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const STAY22_AFFILIATE_URL = 'https://booking.stay22.com/thestayandwander/r-lvU3PLVF';

export const articleMetadata = {
  title: 'Best 4 Star Hotels in Bali 2026 — Top Picks From $80/Night',
  description: 'Discover the best four-star hotels in Bali for 2026, from $80 per night, including standout stays in Seminyak, Ubud, Canggu, Uluwatu, and Nusa Dua.',
  url: '/blog/best-4-star-hotels-bali-2026',
  image: '/manus-storage/blog-bali_5a40f78c.png',
  keywords: 'best 4 star hotels Bali 2026, Bali four star hotels, Bali hotel deals, Seminyak hotels, Ubud hotels, Uluwatu hotels',
  author: 'The Stay & Wander',
  category: 'Hotel Reviews · Asia Travel',
  readTime: '9 minutes',
  publishDate: '2026-07-20',
};

type Hotel = {
  name: string;
  price: string;
  rating: string;
  description: string;
  location: string;
  bestFor: string;
};

type HotelSection = {
  heading: string;
  hotels: Hotel[];
};

export const hotelSections: HotelSection[] = [
  {
    heading: 'Best 4 Star Hotels in Seminyak:',
    hotels: [
      {
        name: 'The Layar — Private Pool Villas',
        price: 'From $165/night',
        rating: '9.4/10',
        description: 'Every villa has its own private pool. Set in 1.2 hectares of tropical gardens.',
        location: 'Central Seminyak · 5 minutes to beach.',
        bestFor: 'Couples and romantic getaways.',
      },
      {
        name: 'SALT of Palmar',
        price: 'From $110/night',
        rating: '9.2/10',
        description: 'Bold contemporary architecture. Stunning free-form pool and rooftop bar.',
        location: 'Seminyak.',
        bestFor: 'Design lovers and couples.',
      },
      {
        name: 'Layar Villas Seminyak',
        price: 'From $88/night',
        rating: '8.7/10',
        description: 'Rooftop infinity pool. Café strip location.',
        location: 'Seminyak.',
        bestFor: 'Digital nomads and solo travellers.',
      },
    ],
  },
  {
    heading: 'Best 4 Star Hotels in Ubud:',
    hotels: [
      {
        name: 'Alaya Resort Ubud',
        price: 'From $89/night',
        rating: '9.1/10',
        description: 'Infinity pool with jungle canopy views. Breakfast included. On-site spa.',
        location: 'Walking distance to Monkey Forest.',
        bestFor: 'Couples and wellness seekers.',
      },
      {
        name: 'Bisma Eight Ubud',
        price: 'From $130/night',
        rating: '9.3/10',
        description: 'Award-winning valley-view infinity pool. Excellent buffet breakfast included.',
        location: 'Ubud.',
        bestFor: 'Romantic getaways and photography.',
      },
      {
        name: 'Komaneka at Bisma',
        price: 'From $145/night',
        rating: '9.4/10',
        description: 'Infinity pool pours into treetops. Finest Balinese cuisine restaurant.',
        location: 'Bisma Street Ubud.',
        bestFor: 'Honeymooners and design lovers.',
      },
    ],
  },
  {
    heading: 'Best 4 Star Hotels in Canggu:',
    hotels: [
      {
        name: 'Katamama Hotel',
        price: 'From $120/night',
        rating: '9.3/10',
        description: 'Handcrafted by Balinese artisans. Hand-carved furniture and batik textiles. Rooftop cocktail bar.',
        location: 'Petitenget Canggu.',
        bestFor: 'Design lovers and cultural travellers.',
      },
      {
        name: 'Desa Potato Head',
        price: 'From $95/night',
        rating: '8.9/10',
        description: 'World-famous beach club access included. Multiple restaurants spa and cinema.',
        location: 'Petitenget Beach Canggu.',
        bestFor: 'Social travellers and groups.',
      },
    ],
  },
  {
    heading: 'Best 4 Star Hotels in Uluwatu:',
    hotels: [
      {
        name: 'Alila Villas Uluwatu',
        price: 'From $195/night',
        rating: '9.5/10',
        description: 'Clifftop infinity pool floating over Indian Ocean. Sleek contemporary architecture. Exceptional spa.',
        location: 'Uluwatu cliffs.',
        bestFor: 'Luxury seekers and couples.',
      },
      {
        name: 'Suarga Padang Padang',
        price: 'From $150/night',
        rating: '9.2/10',
        description: 'Multi-level jungle infinity pools. Above Padang Padang surf beach. Open-air pavilions.',
        location: 'Uluwatu.',
        bestFor: 'Surfers couples and design lovers.',
      },
    ],
  },
  {
    heading: 'Best 4 Star Hotels in Nusa Dua:',
    hotels: [
      {
        name: 'Sofitel Bali Nusa Dua Beach Resort',
        price: 'From $140/night',
        rating: '9.0/10',
        description: 'Vast lagoon pool and direct beachfront. Multiple restaurants and SO SPA. Extensive breakfast buffet.',
        location: 'Nusa Dua.',
        bestFor: 'Families couples and beach lovers.',
      },
    ],
  },
];

export const comparisonRows = [
  ['The Layar', 'Seminyak', '$165', 'Private pool', 'Couples'],
  ['SALT of Palmar', 'Seminyak', '$110', 'Rooftop', 'Design lovers'],
  ['Alaya Resort', 'Ubud', '$89', 'Jungle infinity', 'Wellness'],
  ['Bisma Eight', 'Ubud', '$130', 'Valley view', 'Romance'],
  ['Komaneka', 'Ubud', '$145', 'Jungle infinity', 'Honeymooners'],
  ['Katamama', 'Canggu', '$120', 'Rooftop', 'Boutique'],
  ['Desa Potato Head', 'Canggu', '$95', 'Beach club', 'Social'],
  ['Alila Villas', 'Uluwatu', '$195', 'Clifftop', 'Luxury'],
  ['Suarga', 'Uluwatu', '$150', 'Jungle levels', 'Surfers'],
  ['Sofitel', 'Nusa Dua', '$140', 'Lagoon', 'Families'],
];

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900">{hotel.name}</h3>
            <p className="mt-2 text-sm font-medium text-gray-500">{hotel.location}</p>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="text-xl font-bold text-yellow-600">{hotel.price}</p>
            <p className="mt-1 text-sm text-gray-600">Guest rating {hotel.rating}</p>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-gray-700">{hotel.description}</p>
        <p className="mt-4 text-sm font-semibold text-gray-800">Best for: {hotel.bestFor}</p>
        <AffiliateLink
          href={STAY22_AFFILIATE_URL}
          partner="Stay22"
          category="Hotels"
          source="Bali 4 Star Hotels Article"
          destination={hotel.name}
          className="mt-6 block"
        >
          <Button className="w-full bg-yellow-500 font-semibold text-gray-950 hover:bg-yellow-600">
            Check Availability
          </Button>
        </AffiliateLink>
      </CardContent>
    </Card>
  );
}

export default function BlogBaliFourStarHotels() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbItems = [
    { name: 'Home', url: 'https://thestayandwander.com' },
    { name: 'Blog', url: 'https://thestayandwander.com/blog' },
    { name: articleMetadata.title, url: canonicalUrl },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Head
        title={articleMetadata.title}
        description={articleMetadata.description}
        canonical={canonicalUrl}
        ogTitle={articleMetadata.title}
        ogDescription={articleMetadata.description}
        ogImage={articleMetadata.image}
        ogUrl={canonicalUrl}
        keywords={articleMetadata.keywords}
      />
      <BlogArticleSchema
        title={articleMetadata.title}
        description={articleMetadata.description}
        image={`https://thestayandwander.com${articleMetadata.image}`}
        author={articleMetadata.author}
        datePublished={articleMetadata.publishDate}
        url={canonicalUrl}
      />
      {BreadcrumbSchema(breadcrumbItems)}
      <Header />

      <section className="relative flex min-h-[28rem] items-end overflow-hidden bg-slate-900">
        <img
          src={articleMetadata.image}
          alt="A tropical Bali hotel pool framed by palm trees"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="container relative z-10 px-4 pb-12 pt-36 md:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">{articleMetadata.category}</p>
          <h1 className="max-w-4xl font-playfair text-4xl font-bold leading-tight text-white md:text-6xl">
            {articleMetadata.title}
          </h1>
        </div>
      </section>

      <main className="container grid gap-10 px-4 py-12 lg:grid-cols-3 lg:py-16">
        <article className="min-w-0 lg:col-span-2">
          <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-gray-200 pb-7 text-sm text-gray-600">
            <span>Published by: {articleMetadata.author}</span>
            <span>Category: {articleMetadata.category}</span>
            <span>Read time: {articleMetadata.readTime}</span>
          </div>

          <section className="mb-10">
            <p className="text-lg leading-relaxed text-gray-700">
              Bali&apos;s four-star hotel category is where the island truly shines. At this level you get everything — infinity pools, elegant design, genuine service, and that unmistakable Balinese atmosphere — without paying the $500+ per night prices of the ultra-luxury resorts. Most of Bali&apos;s best four-star hotels sit between $80 and $220 per night, making them the sweet spot for travellers who want a memorable experience without breaking the bank.
            </p>
          </section>

          <GetYourGuideTours
            label="Top-Rated Bali Tours & Activities"
            showHeadline={false}
            showButton={false}
            cardStyle
          />

          <aside className="mb-12 mt-2 border-l-4 border-yellow-400 bg-yellow-50 p-6 text-gray-800">
            <strong>Quick tip:</strong> Four-star hotel prices in Bali surge 40–60% during July–August and December–January. If you&apos;re travelling in peak season, book at least 6 weeks ahead. Most properties offer free cancellation — always book refundable rates.
          </aside>

          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">What Makes a Great 4 Star Hotel in Bali?</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-gray-700">
              <p><strong className="text-gray-900">Pool quality matters more than room size.</strong> In Bali, you&apos;ll spend as much time at the pool as in your room. The best four-star hotels have stunning infinity pools or multi-level pool areas with proper loungers and pool bar service.</p>
              <p><strong className="text-gray-900">Location determines your experience.</strong> Seminyak is for beach clubs and nightlife. Ubud is for culture and wellness. Canggu is for digital nomads and surf. Uluwatu is for clifftop drama and world-class waves.</p>
              <p><strong className="text-gray-900">Breakfast quality varies enormously.</strong> The best four-star hotels offer elaborate Indonesian and Western breakfast spreads.</p>
            </div>
          </section>

          <section className="mb-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <h2 className="font-playfair text-2xl font-bold">Average 4 Star Hotel Prices in Bali 2026:</h2>
            <p className="mt-4 leading-relaxed text-slate-100">Seminyak: $80–220/night · Ubud: $75–200/night · Canggu: $70–180/night · Uluwatu: $90–220/night · Nusa Dua: $100–250/night · Sanur: $65–160/night</p>
          </section>

          {hotelSections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900">{section.heading}</h2>
              <div className="mt-7 space-y-6">
                {section.hotels.map((hotel) => <HotelCard key={hotel.name} hotel={hotel} />)}
              </div>
            </section>
          ))}

          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Quick Comparison Table:</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    {['Hotel', 'Area', 'From', 'Standout', 'Best for'].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => <td key={`${row[0]}-${cell}`} className="whitespace-nowrap px-4 py-3">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">How to Get the Best 4 Star Hotel Rates in Bali:</h2>
            <p className="mt-6 leading-relaxed text-gray-700">Book with free cancellation always. Book 6-8 weeks ahead for peak season. Check Booking.com and Agoda for best Asia prices. Consider shoulder season — April May September October offer 80% experience at 60% price.</p>
            <div className="mt-7 rounded-xl border border-[#F4A261]/40 bg-[#fff8f3] p-5">
              <p className="leading-relaxed text-gray-800">🚗 Need a Car in Bali? Compare the best rental prices from 500+ suppliers worldwide.</p>
              <a href={DISCOVERCARS_AFFILIATE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <Button className="bg-[#F4A261] text-white hover:bg-[#e78b4d]">Search Car Rentals in Bali</Button>
              </a>
            </div>
            <AffiliateLink
              href={STAY22_AFFILIATE_URL}
              partner="Stay22"
              category="Hotels"
              source="Bali 4 Star Hotels Article"
              destination="Search All 4 Star Hotels in Bali"
              className="mt-7 block"
            >
              <Button className="bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700">Search All 4 Star Hotels in Bali</Button>
            </AffiliateLink>
          </section>

          <section className="mb-10 border-t border-gray-200 pt-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Related articles:</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a className="font-medium text-blue-700 hover:underline" href="/blog/best-hotels-bali-2026">Best Hotels in Bali 2026</a>
              <a className="font-medium text-blue-700 hover:underline" href="/blog/tokyo-vs-bangkok-2026">Tokyo vs Bangkok 2026</a>
              <a className="font-medium text-blue-700 hover:underline" href="/blog/best-cities-europe-summer-2026">7 Best Cities in Europe This Summer</a>
            </div>
          </section>

          <aside className="rounded-xl bg-gray-50 p-6 text-sm leading-relaxed text-gray-600">
            Affiliate disclosure: This article contains affiliate links. We earn a small commission when you book through our links at no extra cost to you.
          </aside>
        </article>

        <aside className="lg:col-span-1">
          <PopularRoutesWidgetBlogSidebar />
        </aside>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
