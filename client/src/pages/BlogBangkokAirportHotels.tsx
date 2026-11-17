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
const BANGKOK_BUDGET_GUIDE_URL = "/blog/bangkok-hotel-budget-breakdown-2026";
const BANGKOK_PRICE_INDEX_URL = "/blog/bangkok-hotel-price-index-2026";
export const MID_RANGE_STAY22_URL = "https://booking.stay22.com/thestayandwander/8S9p00Hygg-";
export const BUDGET_STAY22_URL = "https://booking.stay22.com/thestayandwander/ucN0nPA-z0-";

export const articleMetadata = {
  title: "Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers",
  description:
    "Where to stay near Bangkok's Suvarnabhumi Airport for a quick layover — in-terminal options, free-shuttle hotels, and essential timing tips.",
  url: "/blog/bangkok-airport-hotels-2026",
  image: "/manus-storage/bangkok-hotel-prices-hero_fb209c1a.jpg",
  keywords:
    "Bangkok airport hotels 2026, Suvarnabhumi airport hotel, BKK layover hotel, Bangkok airport shuttle hotel, Novotel Suvarnabhumi Airport",
  author: "The Stay & Wander",
  category: "Bangkok Hotels · Asia Travel",
  readTime: "7 minutes",
  publishDate: "2026-08-17",
  lastUpdated: "2026-11-17",
};

export const searchMetadata = {
  title: articleMetadata.title,
  description: articleMetadata.description,
};

export const layoverDecisionRows = [
  ["Transit under 24 hours", "Stay airside or choose a terminal-connected option only if your itinerary and immigration status allow it.", "Confirm whether you must clear immigration before selecting a hotel."],
  ["Overnight layover", "Choose the airport that matches your next flight and verify the property’s current transfer or access instructions.", "Do not assume a shuttle runs at every hour; confirm directly before booking."],
  ["Early flight", "Prioritize a terminal-connected or nearby stay and check the first available transport option for your departure date.", "Leave enough time for check-in, baggage, and security procedures."],
  ["Longer stay", "Use the Airport Rail Link or another verified public-transport option from Suvarnabhumi when the route and operating hours fit your itinerary.", "Compare the time and complexity of leaving the airport with staying close to the terminal."],
] as const;

export const bangkokAirportFaqs = [
  { question: "Which Bangkok airport should I use for a layover hotel?", answer: "Use the airport shown on your next flight. Suvarnabhumi and Don Mueang are separate airports, so a hotel near one is not automatically convenient for the other." },
  { question: "Are there hotels connected to Suvarnabhumi Airport?", answer: "Suvarnabhumi’s airport authority identifies terminal-connected and nearby transport options, but your immigration status and itinerary determine which accommodation is practical. Confirm access directly with the property." },
  { question: "Can I use the Airport Rail Link for a Bangkok airport layover?", answer: "Suvarnabhumi’s Airport Rail Link station is on Level B1 of the main terminal, with operating hours listed by the airport as 05:30–24:00. Check the current service information before relying on it for a tight connection." },
  { question: "Does Don Mueang have the Airport Rail Link?", answer: "This guide does not treat Don Mueang as an Airport Rail Link station. Don Mueang’s official airport information lists Terminal 1 for international flights and Terminal 2 for domestic flights, with passenger terminals operating 24 hours." },
  { question: "Can I travel between Suvarnabhumi and Don Mueang during a connection?", answer: "Suvarnabhumi Airport Authority lists a free airport shuttle for eligible passengers transferring between the airports, with onward-travel proof required. Confirm the current boarding details before travel." },
] as const;

export const selectionRows = [
  ["Miracle Transit Hotel", "Inside terminal (transit area)", "N/A — no shuttle needed", "$60–$100/night (or hourly)"],
  ["Novotel Suvarnabhumi Airport", "Connected via covered walkway", "Free, ~5 min walk", "$70–$130/night"],
  ["Sleep Box / Sleep 'n Fly capsule pods", "Inside terminal (departure area)", "N/A", "$10–$25 per few hours"],
  ["Best Western Airport Suvarnabhumi", "~10 min drive", "Free", "$30–$55/night"],
  ["Tara Court Suvarnabhumi", "~10 min drive", "Free", "$25–$45/night"],
  ["ibis Bangkok Impact", "~15 min drive", "Free (scheduled)", "$35–$60/night"],
  ["S Ratchada Airport Hotel", "~15 min drive", "Paid (on request)", "$20–$40/night"],
] as const;

type Hotel = { name: string; detail: string; stay22Url: string };

export const terminalHotels: readonly Hotel[] = [
  {
    name: "Miracle Transit Hotel",
    detail:
      "Sits inside Suvarnabhumi's transit area, past immigration, meaning you never need to clear customs if you're on a same-day connection. Rooms can be booked by the hour or overnight. This is the single best option if you have an international-to-international connection and want to avoid immigration lines entirely.",
    stay22Url: MID_RANGE_STAY22_URL,
  },
  {
    name: "Novotel Suvarnabhumi Airport",
    detail:
      "Connects to the terminal via a covered, air-conditioned walkway — no shuttle bus, no waiting outside. You'll clear immigration to reach it, so this only works if your layover allows entry into Thailand, but it's the most comfortable full-hotel option with the shortest possible walk.",
    stay22Url: MID_RANGE_STAY22_URL,
  },
  {
    name: "Sleep Box and similar capsule pods",
    detail:
      "Located within the terminal's departure area, and built for short rests between flights — a few hours of quiet and a bed without leaving the secure zone. Good for genuinely tight layovers where even a terminal hotel feels like too much of a detour.",
    stay22Url: MID_RANGE_STAY22_URL,
  },
];

export const shuttleHotels: readonly Hotel[] = [
  {
    name: "Best Western Airport Suvarnabhumi",
    detail: "Reliable free shuttle, straightforward budget option with predictable pickup times.",
    stay22Url: BUDGET_STAY22_URL,
  },
  {
    name: "Tara Court Suvarnabhumi",
    detail: "One of the cheaper options in this radius, popular with budget travelers who just need a clean bed and reliable transfer.",
    stay22Url: BUDGET_STAY22_URL,
  },
  {
    name: "ibis Bangkok Impact",
    detail: "A known, consistent brand if you want zero surprises; shuttle runs on a set schedule, so confirm pickup times align with your flight.",
    stay22Url: BUDGET_STAY22_URL,
  },
  {
    name: "S Ratchada Airport Hotel",
    detail: "Good value, though its shuttle is request-based rather than fixed-schedule, so call ahead to confirm timing rather than assuming a set departure.",
    stay22Url: BUDGET_STAY22_URL,
  },
];

function BookingButtons({ stay22Url }: { stay22Url: string }) {
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

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <h3 className="font-playfair text-2xl font-bold text-gray-900">{hotel.name}</h3>
      <p className="mt-3 leading-relaxed text-gray-700">{hotel.detail}</p>
      <BookingButtons stay22Url={hotel.stay22Url} />
    </article>
  );
}

export default function BlogBangkokAirportHotels() {
  const canonicalUrl = `https://thestayandwander.com${articleMetadata.url}`;
  const breadcrumbItems = [
    { name: "Home", url: "https://thestayandwander.com" },
    { name: "Blog", url: "https://thestayandwander.com/blog" },
    { name: articleMetadata.title, url: canonicalUrl },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Head title={searchMetadata.title} description={searchMetadata.description} canonical={canonicalUrl} ogTitle={articleMetadata.title} ogDescription={articleMetadata.description} ogImage={articleMetadata.image} ogUrl={canonicalUrl} keywords={articleMetadata.keywords} updatedDate={articleMetadata.lastUpdated} />
      <BlogArticleSchema title={articleMetadata.title} description={articleMetadata.description} image={`https://thestayandwander.com${articleMetadata.image}`} author={articleMetadata.author} datePublished={articleMetadata.publishDate} url={canonicalUrl} />
      {BreadcrumbSchema(breadcrumbItems)}
      <Header />

      <section className="relative flex min-h-[28rem] items-end overflow-hidden bg-slate-900">
        <img src={articleMetadata.image} alt="Bangkok at dusk for a Suvarnabhumi Airport layover" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="container relative z-10 px-4 pb-12 pt-36 md:pb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">{articleMetadata.category}</p>
          <h1 className="max-w-5xl font-playfair text-4xl font-bold leading-tight text-white md:text-6xl">{articleMetadata.title}</h1>
        </div>
      </section>

      <main className="container grid gap-10 px-4 py-12 lg:grid-cols-3 lg:py-16">
        <article className="min-w-0 lg:col-span-2">
          <a href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0077B6] transition-colors hover:text-[#005c91]"><ArrowLeft className="h-4 w-4" />Back to Blog</a>
          <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-gray-200 pb-7 text-sm text-gray-600"><span>Published by: {articleMetadata.author}</span><span>Category: {articleMetadata.category}</span><span>Read time: {articleMetadata.readTime}</span></div>

          <p className="text-lg leading-relaxed text-gray-700">If you&apos;ve got a long layover or an early flight out of Suvarnabhumi (BKK), the right hotel choice comes down to one thing: how much travel time you can afford to lose. Here&apos;s how to choose a base without treating airport proximity as a promise of a particular transfer time.</p>

          <section id="layover-decision" className="mt-12 scroll-mt-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0077B6]">Start with the connection</p>
            <h2 className="mt-3 font-playfair text-3xl font-bold text-gray-900">Which option fits your layover?</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-[760px] w-full text-left text-sm sm:text-base">
                <thead className="bg-slate-900 text-white"><tr><th className="px-4 py-3 font-semibold">Trip pattern</th><th className="px-4 py-3 font-semibold">Starting point</th><th className="px-4 py-3 font-semibold">Check before booking</th></tr></thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">{layoverDecisionRows.map((row) => <tr key={row[0]}><th scope="row" className="px-4 py-4 align-top font-semibold text-gray-900">{row[0]}</th><td className="px-4 py-4 align-top">{row[1]}</td><td className="px-4 py-4 align-top">{row[2]}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section id="terminal-and-airport-choice" className="mt-12 scroll-mt-28">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Terminal-connected stays and the two-airport choice</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">A terminal-connected or airside stay can reduce the number of transfers in a short connection, but it is only useful when the property’s access rules match your itinerary. Confirm whether you can remain in the secure transit area, whether immigration is required, and which terminal your next flight uses.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="font-playfair text-2xl font-bold text-gray-900">Suvarnabhumi (BKK)</h3><p className="mt-3 leading-relaxed text-gray-700">The airport authority lists the Airport Rail Link station on Level B1 of the main terminal and lists service hours of 05:30–24:00. It also lists terminal transport, airport hotels, and a shuttle connection to Don Mueang for eligible transferring passengers.</p><a className="mt-4 inline-flex font-semibold text-[#0077B6] hover:underline" href="https://suvarnabhumi.airportthai.co.th/service/airport-guide/detail/Transportation_BKK" target="_blank" rel="noopener noreferrer">Check AOT Suvarnabhumi transport details ↗</a></article>
              <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="font-playfair text-2xl font-bold text-gray-900">Don Mueang (DMK)</h3><p className="mt-3 leading-relaxed text-gray-700">Don Mueang’s airport authority identifies Terminal 1 for international flights and Terminal 2 for domestic flights, and lists passenger-terminal service as 24 hours. Choose a nearby stay based on the terminal and your actual departure airport, not the word “Bangkok” alone.</p><a className="mt-4 inline-flex font-semibold text-[#0077B6] hover:underline" href="https://donmueang.airportthai.co.th/about-us" target="_blank" rel="noopener noreferrer">Check AOT Don Mueang information ↗</a></article>
            </div>
          </section>

          <section id="airport-rail-link-stays" className="mt-12 scroll-mt-28">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Stays along the Airport Rail Link</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">For a longer layover or an airport-to-city stay, a hotel near an Airport Rail Link stop can be a practical alternative to staying beside the terminal. The verified point is the airport end of the route: Suvarnabhumi’s station is on Level B1 of the main terminal and the airport lists service from 05:30 to 24:00. Before choosing a neighborhood, check the current rail service, the walk between the hotel and station, luggage access, and your return buffer. This guide does not assign unverified journey times or recommend a specific station hotel.</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">Official transport reference: <a className="font-semibold text-[#0077B6] hover:underline" href="https://suvarnabhumi.airportthai.co.th/service/airport-guide/detail/Transportation_BKK" target="_blank" rel="noopener noreferrer">Suvarnabhumi Airport Authority transport page</a>.</p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Quick Selection Table</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-[680px] text-left text-sm sm:text-base">
                <thead className="bg-slate-900 text-white"><tr>{["Hotel", "Distance to Terminal", "Shuttle", "Price Range"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">{selectionRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${cell}`} className={`px-4 py-4 align-top ${index === 0 ? "font-semibold text-gray-900" : ""}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 text-sm italic text-gray-600">Prices reflect typical rates; capsule/transit hotels often price by the hour rather than per night.</p>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">In-Terminal / Connected Options</h2>
            <div className="mt-7 space-y-5">{terminalHotels.map((hotel) => <HotelCard key={hotel.name} hotel={hotel} />)}</div>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Nearby Free Shuttle Options (10–15 Minutes)</h2>
            <div className="mt-7 space-y-5">{shuttleHotels.map((hotel) => <HotelCard key={hotel.name} hotel={hotel} />)}</div>
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Essential Layover Tips</h2>
            <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-relaxed text-gray-700 marker:text-[#F4A261]">
              <li><strong>Baggage storage</strong> is available inside Suvarnabhumi on the 4th floor (Departure Hall) — useful if you want to explore or reach a nearby hotel without hauling luggage through immigration and back.</li>
              <li><strong>The Airport Rail Link (ARL)</strong> connects Suvarnabhumi to central Bangkok in about 30 minutes if you have enough time to leave the airport entirely — but factor in return travel time and security re-clearance, which can easily eat 90 minutes to 2 hours round trip.</li>
              <li><strong>Build in a minimum 90-minute immigration buffer</strong> for both entry and re-entry if you&apos;re leaving the airport — Suvarnabhumi&apos;s queues can vary significantly by time of day, and rushing back is the single most common layover mistake.</li>
              <li><strong>International-to-international connections</strong> on the same ticket often don&apos;t require immigration at all — check with your airline before assuming you need to clear customs, since this changes which hotel options are even relevant to you.</li>
              <li><strong>Late-night arrivals</strong> should confirm shuttle operating hours in advance — several nearby hotels reduce or suspend shuttle service between roughly midnight and 5 AM, meaning a taxi may be your only option during those hours.</li>
            </ul>
          </section>

          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Ready to Book Your Layover Stay?</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">Compare live rates and book directly through our search tools below.</p>
            <TripComHotelWidget className="my-8" title="Search Bangkok airport hotels on Trip.com" />
          </section>

          <section className="mt-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Things to Do in Bangkok</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">Extending your layover into a city visit? Browse activities before you go.</p>
            <div className="mt-6"><BangkokActivitiesWidget /></div>
          </section>

          <section id="airport-faq" className="mt-12 scroll-mt-28">
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Bangkok airport hotel FAQs</h2>
            <div className="mt-6 space-y-4">{bangkokAirportFaqs.map((faq) => <details key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5"><summary className="cursor-pointer font-semibold text-gray-900">{faq.question}</summary><p className="mt-3 leading-relaxed text-gray-700">{faq.answer}</p></details>)}</div>
          </section>

          <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-gray-800">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Plan the Rest of Your Bangkok Stay</h2>
            <div className="mt-4 flex flex-col gap-3">
              <a href={BANGKOK_STAY_GUIDE_URL} className="font-semibold text-[#0077B6] hover:underline">Where to Stay in Bangkok: Best Areas for First-Timers (2026 Guide) →</a>
              <a href={BANGKOK_BUDGET_GUIDE_URL} className="font-semibold text-[#0077B6] hover:underline">How Much Does a Hotel in Bangkok Really Cost? →</a>
              <a href={BANGKOK_PRICE_INDEX_URL} className="font-semibold text-[#0077B6] hover:underline">Bangkok Hotel Price Index 2026: Compare District Rates →</a>
            </div>
          </section>

          <aside className="mt-10 rounded-xl bg-gray-50 p-6 text-sm leading-relaxed text-gray-600">Affiliate disclosure: This article contains affiliate links. We earn a small commission when you book through our links at no extra cost to you.</aside>
          <p className="mt-8 text-center text-sm italic text-gray-500">Last checked: 17 November 2026. Airport facilities, operating hours, hotel access, and shuttle details can change; confirm directly with the airport or hotel before booking.</p>
        </article>
        <aside className="lg:col-span-1"><PopularRoutesWidgetBlogSidebar /></aside>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
