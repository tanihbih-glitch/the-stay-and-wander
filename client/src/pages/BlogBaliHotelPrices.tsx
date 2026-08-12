import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";
import TripComHotelWidget from "@/components/TripComHotelWidget";
import ArticleFAQ from "@/components/ArticleFAQ";
import { baliHotelPricesFaqs } from "@shared/articleFaqs";
import { ArrowLeft } from "lucide-react";

export const articleMetadata = {
  title: "Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)",
  description:
    "Not sure where to stay in Bali? Compare Seminyak, Ubud, Uluwatu, and Canggu — what each is best for, and what you'll pay in 2026.",
  url: "/blog/bali-hotel-prices-2026",
  image: "/manus-storage/blog-bali_5a40f78c.png",
  keywords:
    "where to stay in Bali 2026, best areas in Bali for first timers, Seminyak hotels, Ubud hotels, Uluwatu hotels, Canggu hotels, Bali hotel prices",
  author: "The Stay & Wander",
  category: "Hotel Reviews · Asia Travel",
  readTime: "5 minutes",
  publishDate: "2026-07-27",
};

export const searchMetadata = {
  title: "Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)",
  description:
    "Not sure where to stay in Bali? Compare Seminyak, Ubud, Uluwatu, and Canggu — what each is best for, and what you'll pay in 2026.",
};

export const priceSnapshot = [
  ["Seminyak", "$40–70/night", "$80–150/night", "$200+/night"],
  ["Ubud", "$30–60/night", "$75–130/night", "$180+/night"],
  ["Uluwatu", "$50–90/night", "$100–180/night", "$250+/night"],
  ["Canggu", "$35–65/night", "$70–140/night", "$190+/night"],
];

export const savingsTips = [
  {
    emphasis: "Book shoulder season",
    copy: " (April–June, September–October) for the best rates without monsoon risk",
  },
  {
    emphasis: "Compare regions, not just properties",
    copy: " — a mid-range Ubud villa often beats a budget Seminyak hotel on both price and experience",
  },
  {
    emphasis: "Watch for multi-night discounts",
    copy: ", especially outside peak season",
  },
  {
    emphasis: "Factor in transport",
    copy: " — staying in one region and day-tripping to another (e.g., based in Ubud, day-tripping to Uluwatu) can be more cost-effective than splitting your stay",
  },
];

export default function BlogBaliHotelPrices() {
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
          alt="Bali hotel pool surrounded by tropical palms"
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
              Not sure where to stay in Bali? Seminyak, Ubud, Uluwatu, and Canggu each suit a different kind of first trip — from beach clubs and nightlife to rice-terrace stays, clifftop surf, or longer remote-work bases.
            </p>
            <p>Use this guide to choose the area that fits your trip, then use the regional price table below as supporting detail for what you&apos;ll pay in 2026.</p>
          </div>

          <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <h2 className="font-playfair text-3xl font-bold">Quick Price Snapshot</h2>
            <div className="mt-6 overflow-x-auto rounded-xl bg-white/10 ring-1 ring-white/15">
              <table className="min-w-full text-left text-sm sm:text-base">
                <thead className="bg-white/10 text-yellow-200">
                  <tr>
                    {["Region", "Budget", "Mid-Range", "Luxury"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-100">
                  {priceSnapshot.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${cell}`} className={`whitespace-nowrap px-4 py-3 ${index === 0 ? "font-semibold text-white" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm italic leading-relaxed text-slate-200">
              Prices reflect typical double-occupancy rooms, shoulder season. Peak season — July/August and December — can run 20–40% higher.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Seminyak: Beach Clubs and Nightlife, at a Price</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Seminyak carries a premium because of its beachfront location and proximity to Bali&apos;s biggest beach clubs and restaurants. Budget travelers can still find solid guesthouses inland from the main strip for under $50/night, but anything with a pool and beach access typically starts around $80–100.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>What drives the price up here:</strong> direct beach access, walking distance to nightlife, infinity pools with sunset views.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ubud: The Best Value-to-Experience Ratio</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Ubud consistently offers the best value in Bali. You can find genuinely beautiful accommodations — rice terrace views, private pools, traditional architecture — for less than you&apos;d pay for a basic hotel room in Seminyak.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>What drives the price up here:</strong> proximity to the main rice terraces (Tegalalang), wellness/yoga retreat packages, and villas with jungle or river views.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Uluwatu: Cliffs, Surf, and the Highest Price Tag</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Uluwatu is Bali&apos;s most expensive region on average, driven by its clifftop luxury resorts and dramatic ocean views. Budget options exist but are limited — most accommodations here lean mid-range to luxury.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>What drives the price up here:</strong> clifftop infinity pools, proximity to surf breaks, and a growing number of high-end resort openings in the past few years.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Canggu: The Digital Nomad Middle Ground</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Canggu sits between Seminyak&apos;s price point and Ubud&apos;s value, popular with longer-stay travelers and remote workers. Monthly stay discounts are common here if you&apos;re planning an extended trip.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Tips to Save on Bali Accommodation in 2026</h2>
            <ul className="mt-6 space-y-4 pl-6 text-lg leading-relaxed text-gray-700 marker:text-[#D4AF37]">
              {savingsTips.map((tip) => (
                <li key={tip.emphasis}>
                  <strong>{tip.emphasis}</strong>
                  {tip.copy}
                </li>
              ))}
            </ul>
          </section>

          <ArticleFAQ faqs={baliHotelPricesFaqs} />

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ready to Find Your Bali Stay?</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Compare live rates across hundreds of properties and book directly through our search tool below.
            </p>
            <TripComHotelWidget className="my-8" title="Search Bali hotels on Trip.com" />
            <p className="text-center text-sm italic text-gray-500">
              Prices are approximate and based on typical 2026 rates; always confirm current pricing directly when booking.
            </p>
          </section>
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
