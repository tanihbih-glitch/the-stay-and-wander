import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";
import TripComHotelWidget from "@/components/TripComHotelWidget";
import ArticleFAQ from "@/components/ArticleFAQ";
import RelatedAsiaStayGuides from "@/components/RelatedAsiaStayGuides";
import { bangkokHotelPricesFaqs } from "@shared/articleFaqs";
import { ArrowLeft } from "lucide-react";

export const articleMetadata = {
  title: "Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)",
  description:
    "Find the best area to stay in Bangkok for a first trip — Sukhumvit for transit, Riverside for temples, Khao San Road for energy, and Sathorn for quiet.",
  url: "/blog/where-to-stay-in-bangkok-2026",
  image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
  keywords:
    "where to stay in Bangkok 2026, best areas in Bangkok for first timers, Sukhumvit hotels, Silom hotels, Bangkok riverside hotels, Khao San Road hotels, Sathorn hotels",
  author: "The Stay & Wander",
  category: "Hotel Reviews · Asia Travel",
  readTime: "6 minutes",
  publishDate: "2026-08-03",
};

export const searchMetadata = {
  title: "Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide)",
  description:
    "Find the best area to stay in Bangkok for a first trip — Sukhumvit for transit, Riverside for temples, Khao San Road for energy, and Sathorn for quiet.",
};

export const priceSnapshot = [
  ["Sukhumvit", "$25–45/night", "$60–120/night", "$180+/night"],
  ["Silom", "$30–50/night", "$65–130/night", "$200+/night"],
  ["Riverside", "$35–60/night", "$80–160/night", "$250+/night"],
  ["Khao San Road", "$10–25/night", "$40–80/night", "$120+/night"],
  ["Sathorn", "$30–55/night", "$70–140/night", "$210+/night"],
];

const areaGuides = [
  {
    title: "Sukhumvit: Best for Easy Transit, Dining, and Nightlife",
    copy: "Choose Sukhumvit when you want the easiest all-round first-timer base. It stretches along the BTS Skytrain with plentiful hotels, restaurants, shopping, and quick connections to the rest of the city.",
    driver: "a BTS-connected stay, wide hotel choice, and effortless access to dining, malls, rooftop bars, and nightlife around Thonglor and Ekkamai.",
  },
  {
    title: "Silom: Best for Central Sightseeing and a Local City Feel",
    copy: "Choose Silom for a central base near a major BTS/MRT interchange, rooftop bars, markets, and easy access toward the river. It has a more business-district feel during the day, balanced by restaurants and nightlife after dark.",
    driver: "central transport, access to Patpong night market and rooftop bars, and a convenient position between the river and Sukhumvit.",
  },
  {
    title: "Riverside: Best for Scenery, Temples, and a Special-Stay Feel",
    copy: "Choose the Chao Phraya Riverside when you want river views, hotel facilities, and boat access to major temples such as Wat Arun and the Grand Palace. It is a polished, slower-paced choice for travellers who want the hotel itself to be part of the experience.",
    driver: "river views, boat access, temple sightseeing, and a concentration of boutique and luxury hotels.",
  },
  {
    title: "Khao San Road: Best for Budget Trips and Old City Temples",
    copy: "Choose Khao San Road if you want a sociable, budget-minded base within walking distance of Bangkok's Old City temples. It is lively and convenient for short stays, but less suited to travellers who prioritise quiet evenings or rapid BTS access.",
    driver: "backpacker energy, budget accommodation, and walkable access to the Old City’s temple zone.",
  },
  {
    title: "Sathorn: Best for a Quieter, Central Base",
    copy: "Choose Sathorn if you want a more residential and composed base without giving up central connections. It is well suited to longer stays and travellers who like the option of a river ferry connection without sleeping in the busiest nightlife areas.",
    driver: "a calmer central setting, access to BTS Saphan Taksin and the river ferry, plus a strong choice of serviced apartments.",
  },
];

export const savingsTips = [
  {
    emphasis: "Prioritise BTS or MRT access",
    copy: " — Bangkok traffic means a station near your hotel can matter more than being broadly described as central.",
  },
  {
    emphasis: "Choose the sightseeing rhythm first",
    copy: " — Riverside and Khao San Road suit temple-heavy days, while Sukhumvit, Silom, and Sathorn make a flexible city-wide base.",
  },
  {
    emphasis: "Use the stay guide before comparing properties",
    copy: " — narrowing the neighbourhood makes it easier to assess hotel location, transport, and the style of experience you want.",
  },
  {
    emphasis: "Check your exact dates after selecting an area",
    copy: " — November to February is the busiest period, while business-district areas can have different weekday and weekend patterns.",
  },
];

export default function BlogBangkokHotelPrices() {
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
          alt="Bangkok's Chao Phraya River and riverside hotels at blue-and-gold twilight"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="container relative z-10 px-4 pb-12 pt-36 md:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
            {articleMetadata.category}
          </p>
          <h1 className="max-w-4xl font-playfair text-4xl font-bold leading-tight text-white md:text-6xl">
            {articleMetadata.title}
          </h1>
        </div>
      </section>

      <main className="container grid gap-10 px-4 py-12 lg:grid-cols-3 lg:py-16">
        <article className="min-w-0 lg:col-span-2">
          <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0077B6] transition-colors hover:text-[#005c91]">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </a>

          <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-gray-200 pb-7 text-sm text-gray-600">
            <span>Published by: {articleMetadata.author}</span>
            <span>Category: {articleMetadata.category}</span>
            <span>Read time: {articleMetadata.readTime}</span>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>Not sure where to stay in Bangkok? Sukhumvit, Silom, Riverside, Khao San Road, and Sathorn each offer a different first-time experience — from BTS-connected nightlife and business-district value to river views, backpacker energy, or a quieter central base.</p>
            <p>Use this guide to choose the area that suits your trip, then use the area-by-area price table below as supporting detail for what you&apos;ll pay in 2026.</p>
          </div>

          <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <h2 className="font-playfair text-3xl font-bold">Bangkok Area-at-a-Glance for First-Timers</h2>
            <div className="mt-6 overflow-x-auto rounded-xl bg-white/10 ring-1 ring-white/15">
              <table className="min-w-full text-left text-sm sm:text-base">
                <thead className="bg-white/10 text-yellow-200">
                  <tr>{["Area", "Budget", "Mid-Range", "Luxury"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-100">
                  {priceSnapshot.map((row) => (
                    <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${cell}`} className={`whitespace-nowrap px-4 py-3 ${index === 0 ? "font-semibold text-white" : ""}`}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm italic leading-relaxed text-slate-200">Use these typical shoulder-season ranges as a planning reference once you have chosen an area. November to February is busier and can run 15–30% higher.</p>
          </section>

          <aside className="mt-8 rounded-2xl border border-[#F4A261]/50 bg-[#fff8f3] p-6 text-gray-800">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Need a Bangkok Hotel Budget Breakdown?</h2>
            <p className="mt-3 leading-relaxed">See typical 2026 costs from hostels through five-star riverside stays, plus booking factors and specific hotel picks for each tier.</p>
            <a href="/blog/bangkok-hotel-budget-breakdown-2026" className="mt-4 inline-flex font-semibold text-[#0077B6] hover:underline">Read: How Much Does a Hotel in Bangkok Really Cost? →</a>
            <a href="/blog/bangkok-airport-hotels-2026" className="mt-3 block font-semibold text-[#0077B6] hover:underline">Flying through BKK? Read: Where to Stay Near Bangkok Airport →</a>
          </aside>

          {areaGuides.map((area) => (
            <section key={area.title} className="mt-12">
              <h2 className="font-playfair text-3xl font-bold text-gray-900">{area.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">{area.copy}</p>
              <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800"><strong>First-timer fit:</strong> {area.driver}</p>
            </section>
          ))}

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">How to Choose Your Bangkok Base</h2>
            <ul className="mt-6 space-y-4 pl-6 text-lg leading-relaxed text-gray-700 marker:text-[#D4AF37]">
              {savingsTips.map((tip) => <li key={tip.emphasis}><strong>{tip.emphasis}</strong>{tip.copy}</li>)}
            </ul>
          </section>

          <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Bangkok or Tokyo? Compare the Trip Style</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">Planning a broader Asia trip? Our city-by-city comparison helps you weigh neighbourhood feel, food, transport, and trip style before you choose.</p>
            <a href="/blog/tokyo-vs-bangkok-2026" className="mt-5 inline-flex font-semibold text-[#0077B6] hover:text-[#005c91] hover:underline">Read Tokyo vs Bangkok: Which Should You Visit First? →</a>
          </section>

          <RelatedAsiaStayGuides current="bangkok" />

          <ArticleFAQ faqs={bangkokHotelPricesFaqs} />

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ready to Choose Your Bangkok Stay?</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">Once you know which Bangkok area fits your first trip, compare live availability across properties in that neighbourhood.</p>
            <TripComHotelWidget className="my-8" title="Search Bangkok hotels on Trip.com" />
            <p className="text-center text-sm italic text-gray-500">Area guidance is designed for trip planning; always confirm current availability, location, and booking details directly before reserving.</p>
          </section>
        </article>

        <aside className="lg:col-span-1"><PopularRoutesWidgetBlogSidebar /></aside>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
