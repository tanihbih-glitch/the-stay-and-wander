import BangkokActivitiesWidget from "@/components/BangkokActivitiesWidget";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "@/components/Head";
import MobileBottomNav from "@/components/MobileBottomNav";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";
import TripComHotelWidget, { TRIP_COM_HOTEL_WIDGET_URL } from "@/components/TripComHotelWidget";
import { ArrowLeft } from "lucide-react";

const BANGKOK_STAY_GUIDE_URL = "/blog/where-to-stay-in-bangkok-2026";

export const articleMetadata = {
  title: "How Much Does a Hotel in Bangkok Really Cost in 2026? (Budget to Luxury Breakdown)",
  description:
    "Bangkok hotel prices in 2026, broken down from hostels to 5-star luxury — real ranges, top picks, and booking tips for every budget.",
  url: "/blog/bangkok-hotel-budget-breakdown-2026",
  image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
  keywords:
    "Bangkok hotel prices 2026, Bangkok hotel cost, Bangkok budget hotels, Bangkok luxury hotels, Bangkok hostel prices, Bangkok hotel booking tips",
  author: "The Stay & Wander",
  category: "Bangkok Hotels · Asia Travel",
  readTime: "8 minutes",
  publishDate: "2026-08-17",
};

export const searchMetadata = {
  title: articleMetadata.title,
  description: articleMetadata.description,
};

export const nightlyRateRows = [
  ["Hostel", "$10–$20", "Dorm bed or basic private room, shared bathroom common"],
  ["Mid-Range / Boutique", "$30–$80", "Private en-suite room, AC, often a pool"],
  ["5-Star Luxury", "$120–$300+", "Full-service resort-style hotel, spa, multiple restaurants"],
] as const;

type HotelPick = {
  name: string;
  detail: string;
};

type HotelTier = {
  heading: string;
  expectation: string;
  stay22Url: string;
  picks: readonly HotelPick[];
};

export const hotelTiers: readonly HotelTier[] = [
  {
    heading: "Budget Tier: Hostels ($10–$20/night)",
    expectation:
      "What to expect: clean dorm beds or basic private rooms, shared or en-suite bathrooms depending on the property, AC in the room (though not always in shared hallways), and usually a common area or rooftop. Wi-Fi is standard; breakfast sometimes is, sometimes isn't.",
    stay22Url: "https://booking.stay22.com/thestayandwander/ucN0nPA-z0-",
    picks: [
      {
        name: "Lub d Bangkok Siam",
        detail:
          "Siam neighborhood, walking distance to major malls and BTS Siam station. A well-known backpacker favorite with a strong social scene.",
      },
      {
        name: "NapPark Hostel",
        detail:
          "Khao San Road area, close to the backpacker strip and Old City temples. Good for travelers prioritizing nightlife and budget over quiet.",
      },
    ],
  },
  {
    heading: "Mid-Range Tier: Boutique Hotels ($30–$80/night)",
    expectation:
      "What to expect: private en-suite rooms, reliable AC, often a small pool, and a genuine boutique feel — this tier is where Bangkok offers the strongest value-to-experience ratio on this list.",
    stay22Url: "https://booking.stay22.com/thestayandwander/8S9p00Hygg-",
    picks: [
      {
        name: "Chatrium Residence Sathorn",
        detail:
          "Sathorn district, quieter and more residential while still centrally located near the BTS Saphan Taksin river connection.",
      },
      {
        name: "Ibis Bangkok Sukhumvit",
        detail:
          "Sukhumvit, close to nightlife, dining, and multiple BTS stations. A reliable, no-surprises pick for first-timers.",
      },
    ],
  },
  {
    heading: "Luxury Tier: 5-Star Hotels ($120–$300+/night)",
    expectation:
      "What to expect: full-service resort-style properties, spa facilities, multiple on-site restaurants, and — for the riverside options — some of the best skyline and Chao Phraya River views in the city.",
    stay22Url: "https://booking.stay22.com/thestayandwander/RMACbPYy60-",
    picks: [
      {
        name: "Mandarin Oriental Bangkok",
        detail:
          "Riverside, one of Bangkok's most iconic luxury addresses, with direct boat access to major sights.",
      },
      {
        name: "The Peninsula Bangkok",
        detail:
          "Riverside, known for its spa, infinity pool, and consistently ranked among Bangkok's top luxury stays.",
      },
    ],
  },
];

function BookingButtons({ hotel, stay22Url }: { hotel: string; stay22Url: string }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <a
        href={TRIP_COM_HOTEL_WIDGET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-[#F4A261] px-5 py-3 text-sm font-semibold text-[#0D1B2A] shadow-sm transition-colors hover:bg-[#e78b4d] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:ring-offset-2"
      >
        Search on Trip.com
      </a>
      <a
        href={stay22Url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-[#F4A261] bg-white px-5 py-3 text-sm font-semibold text-[#0D1B2A] shadow-sm transition-colors hover:bg-[#fff8f3] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:ring-offset-2"
      >
        View on Stay22
      </a>
    </div>
  );
}

function HotelPickCard({ hotel, stay22Url }: { hotel: HotelPick; stay22Url: string }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <h3 className="font-playfair text-2xl font-bold text-gray-900">{hotel.name}</h3>
      <p className="mt-3 leading-relaxed text-gray-700">{hotel.detail}</p>
      <BookingButtons hotel={hotel.name} stay22Url={stay22Url} />
    </article>
  );
}

export default function BlogBangkokHotelBudgetBreakdown() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbItems = [
    { name: "Home", url: "https://thestayandwander.com" },
    { name: "Blog", url: "https://thestayandwander.com/blog" },
    { name: articleMetadata.title, url: canonicalUrl },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Head
        title={searchMetadata.title}
        description={searchMetadata.description}
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
          alt="Bangkok riverside hotels at blue-and-gold twilight"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="container relative z-10 px-4 pb-12 pt-36 md:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
            {articleMetadata.category}
          </p>
          <h1 className="max-w-5xl font-playfair text-4xl font-bold leading-tight text-white md:text-6xl">
            {articleMetadata.title}
          </h1>
        </div>
      </section>

      <main className="container grid gap-10 px-4 py-12 lg:grid-cols-3 lg:py-16">
        <article className="min-w-0 lg:col-span-2">
          <a
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0077B6] transition-colors hover:text-[#005c91]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </a>

          <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-gray-200 pb-7 text-sm text-gray-600">
            <span>Published by: {articleMetadata.author}</span>
            <span>Category: {articleMetadata.category}</span>
            <span>Read time: {articleMetadata.readTime}</span>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Bangkok hotel prices span a wider range than most cities its size — a clean hostel bed and a five-star suite can sit a few blocks apart. Here&apos;s what you&apos;ll actually pay at each level, and how to book smart.
            </p>
          </div>

          <aside className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-gray-800">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Choose Your Bangkok Area First</h2>
            <p className="mt-3 leading-relaxed">
              Costs are only one part of the decision. Our <a href={BANGKOK_STAY_GUIDE_URL} className="font-semibold text-[#0077B6] hover:underline">Where to Stay in Bangkok guide</a> compares Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn for first-timers.
            </p>
          </aside>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Quick Summary: Nightly Rates by Tier</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-left text-sm sm:text-base">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    {['Tier', 'Nightly Rate (USD)', 'What You Get'].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {nightlyRateRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${cell}`} className={`px-4 py-4 align-top ${index === 0 ? "font-semibold text-gray-900" : ""}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm italic text-gray-600">Rates reflect typical shoulder-season pricing. High season and holiday weeks push all three tiers higher — see below.</p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Cost Factors: Season and Hidden Costs</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
              <p><strong className="text-gray-900">High vs. low season.</strong> Bangkok&apos;s high season runs <strong>November through February</strong>, when cooler, drier weather draws the most visitors — expect rates 20–40% above shoulder-season pricing, especially around Christmas and New Year. Low season (June–October) brings the biggest discounts, though also the most rain. April, around Songkran (Thai New Year, mid-April), sees a short but sharp price spike regardless of season.</p>
              <p><strong className="text-gray-900">Local taxes.</strong> Most hotels quote rates that already include Thailand&apos;s 7% VAT and a standard service charge, but budget guesthouses and some independent hostels don&apos;t always show this upfront — check before booking, since it can add a noticeable amount at checkout.</p>
              <p><strong className="text-gray-900">Deposit rules.</strong> Many mid-range and luxury hotels place a temporary hold on your card at check-in (commonly 1,000–3,000 THB, or more at luxury properties) to cover incidentals. This isn&apos;t a charge, but it can briefly reduce your available credit — worth knowing before you travel with a tight card limit.</p>
              <p><strong className="text-gray-900">Weekday vs. weekend.</strong> Business-district areas like Silom see lower rates on weekends, when corporate travel demand disappears — the opposite pattern from leisure-focused areas like Sukhumvit.</p>
            </div>
          </section>

          {hotelTiers.map((tier) => (
            <section key={tier.heading} className="mt-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900">{tier.heading}</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">{tier.expectation}</p>
              <div className="mt-7 space-y-5">
                {tier.picks.map((hotel) => <HotelPickCard key={hotel.name} hotel={hotel} stay22Url={tier.stay22Url} />)}
              </div>
            </section>
          ))}

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Booking Strategy: How to Get the Best Deal</h2>
            <ol className="mt-6 list-decimal space-y-4 pl-6 text-lg leading-relaxed text-gray-700 marker:font-semibold marker:text-[#F4A261]">
              <li><strong>Book 4–8 weeks ahead for mid-range and luxury.</strong> Bangkok&apos;s best boutique and luxury properties fill up faster than the sheer volume of hotels in the city might suggest — waiting until the last minute usually means paying more, not less.</li>
              <li><strong>Compare Agoda and Booking.com directly</strong> — Agoda often has an edge on Southeast Asian properties specifically, since it&apos;s based in the region, while Booking.com sometimes wins on cancellation flexibility.</li>
              <li><strong>Use Klook or similar platforms for bundled deals</strong> — some properties offer better effective rates when booked alongside an airport transfer or activity package rather than as a standalone room.</li>
              <li><strong>Check weekday rates for business-district hotels</strong> (Silom, Sathorn) — booking a Sunday–Thursday stay in these areas can be noticeably cheaper than the same room on a weekend.</li>
            </ol>
          </section>

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ready to Book Your Bangkok Stay?</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">Compare live rates across hundreds of properties and book directly through our search tool below.</p>
            <TripComHotelWidget className="my-8" title="Search Bangkok hotels on Trip.com" />
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Things to Do in Bangkok</h2>
            <div className="mt-6"><BangkokActivitiesWidget /></div>
          </section>

          <section className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Related Bangkok planning</h2>
            <div className="mt-4 flex flex-col gap-3">
              <a href={BANGKOK_STAY_GUIDE_URL} className="font-semibold text-[#0077B6] hover:underline">Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide) →</a>
              <a href="/blog/bangkok-airport-hotels-2026" className="font-semibold text-[#0077B6] hover:underline">Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers →</a>
            </div>
          </section>

          <aside className="mt-10 rounded-xl bg-gray-50 p-6 text-sm leading-relaxed text-gray-600">
            Affiliate disclosure: This article contains affiliate links. We earn a small commission when you book through our links at no extra cost to you.
          </aside>

          <p className="mt-8 text-center text-sm italic text-gray-500">Prices are approximate and based on typical 2026 rates; always confirm current pricing directly when booking.</p>
        </article>

        <aside className="lg:col-span-1"><PopularRoutesWidgetBlogSidebar /></aside>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
