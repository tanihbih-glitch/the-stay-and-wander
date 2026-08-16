import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema, { BreadcrumbSchema } from "@/components/BlogArticleSchema";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";
import TripComHotelWidget from "@/components/TripComHotelWidget";
import ArticleFAQ from "@/components/ArticleFAQ";
import RelatedAsiaStayGuides from "@/components/RelatedAsiaStayGuides";
import { baliHotelPricesFaqs } from "@shared/articleFaqs";
import { ArrowLeft } from "lucide-react";

export const articleMetadata = {
  title: "Where to Stay in Bali: Best Areas for First-Timers (2026 Guide)",
  description:
    "Find the best area to stay in Bali for a first trip — Seminyak for beach clubs, Ubud for culture, Uluwatu for surf, or Canggu for cafés.",
  url: "/blog/where-to-stay-in-bali-2026",
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
    "Find the best area to stay in Bali for a first trip — Seminyak for beach clubs, Ubud for culture, Uluwatu for surf, or Canggu for cafés.",
};

export const priceSnapshot = [
  ["Seminyak", "$40–70/night", "$80–150/night", "$200+/night"],
  ["Ubud", "$30–60/night", "$75–130/night", "$180+/night"],
  ["Uluwatu", "$50–90/night", "$100–180/night", "$250+/night"],
  ["Canggu", "$35–65/night", "$70–140/night", "$190+/night"],
];

export const savingsTips = [
  {
    emphasis: "Match the base to your trip rhythm",
    copy: " — Seminyak suits dining and beach clubs, Ubud suits culture and wellness, Uluwatu suits cliffs and surf, and Canggu suits cafés and longer stays.",
  },
  {
    emphasis: "Plan around Bali traffic",
    copy: " — choosing one well-connected base and taking day trips is often more relaxing than changing hotels repeatedly.",
  },
  {
    emphasis: "Use the stay guide as a practical filter",
    copy: " — it helps you decide which areas fit before comparing individual properties and nightly rates.",
  },
  {
    emphasis: "Reserve peak dates early",
    copy: " — July, August, and December are the most competitive periods for the most convenient first-timer bases.",
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
            <h2 className="font-playfair text-3xl font-bold">Bali Area-at-a-Glance for First-Timers</h2>
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
              Use these typical shoulder-season ranges as a planning reference once you have chosen an area. July, August, and December are busier and can run 20–40% higher.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Seminyak: Best for Beach Clubs, Dining, and First-Time Bali Energy</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Choose Seminyak when you want an easy, social first Bali base with beach clubs, restaurants, boutiques, and sunset drinks close by. It is especially convenient for travellers who prefer to walk or take short rides between daytime beach plans and dinner reservations.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>First-timer fit:</strong> beach access, walkable dining and nightlife, and a lively resort atmosphere. Stay slightly inland when you want the same neighbourhood with more room in the budget.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ubud: Best for Culture, Rice Terraces, and Wellness</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Choose Ubud if your first Bali trip is centred on temples, rice terraces, cafés, yoga, and a slower inland pace. It makes a strong all-round base for travellers who want culture and nature close to hand rather than a beach-club scene.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>First-timer fit:</strong> traditional character, wellness stays, and lush surroundings. Consider staying near central Ubud for walkability or farther out for a quieter rice-field or jungle setting.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Uluwatu: Best for Cliffs, Surf, and Resort Time</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Choose Uluwatu when dramatic coastlines, surf beaches, and slow resort days matter more than being near Bali&apos;s busiest restaurant districts. It is ideal for a couple&apos;s trip or a relaxed beach-focused stay, but it is less central for sightseeing across the island.
            </p>
            <p className="mt-5 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-gray-800">
              <strong>First-timer fit:</strong> clifftop sunsets, surf breaks, and a more self-contained resort feel. Build in transport time if you also want frequent visits to Seminyak, Canggu, or Ubud.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Canggu: Best for Cafés, Surf, and Longer Stays</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Choose Canggu if you want surf access, independent cafés, a social remote-work scene, and an energetic but less polished feel than Seminyak. It works particularly well for longer stays, though traffic can make a centrally located hotel especially useful.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">How to Choose Your Bali Base</h2>
            <ul className="mt-6 space-y-4 pl-6 text-lg leading-relaxed text-gray-700 marker:text-[#D4AF37]">
              {savingsTips.map((tip) => (
                <li key={tip.emphasis}>
                  <strong>{tip.emphasis}</strong>
                  {tip.copy}
                </li>
              ))}
            </ul>
          </section>

          <RelatedAsiaStayGuides current="bali" />

          <ArticleFAQ faqs={baliHotelPricesFaqs} />

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ready to Choose Your Bali Stay?</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Once you know whether Seminyak, Ubud, Uluwatu, or Canggu fits your first trip, compare live availability across properties in that area.
            </p>
            <TripComHotelWidget className="my-8" title="Search Bali hotels on Trip.com" />
            <p className="text-center text-sm italic text-gray-500">
              Area guidance is designed for trip planning; always confirm current availability, location, and booking details directly before reserving.
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
