import { ArrowRight, BedDouble, CalendarDays, Clock3, Landmark, MapPin, Plane, Share2, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import BlogArticleSchema from "@/components/BlogArticleSchema";
import GetYourGuideTours from "@/components/GetYourGuideTours";
import PopularRoutesWidgetBlogSidebar from "@/components/PopularRoutesWidgetBlogSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LISBON_ARTICLE_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { generateMetaTags, pageMetadataConfig } from "@shared/seo";

const ARTICLE_URL = "https://thestayandwander.com/blog/where-to-stay-lisbon-2026";
const SHARE_TEXT = "Where to Stay in Lisbon 2026 — Best Neighbourhoods and Hotels for Every Budget";

export const articleMetadata = {
  title: "Where to Stay in Lisbon 2026 — Best Neighbourhoods and Hotels for Every Budget",
  description:
    "Not sure where to stay in Lisbon in 2026? Our complete neighbourhood guide covers Alfama, Chiado, Bairro Alto, Belém and beyond — with hand-picked hotels from $45/night.",
  url: "/blog/where-to-stay-lisbon-2026",
  image: "/manus-storage/lisbon-yellow-tram-hero_11c0dde1.jpg",
  category: "HOTEL REVIEWS · EUROPE TRAVEL",
  author: "The Stay & Wander",
  publishedDate: "2026-07-30",
  readTime: "10 minutes",
};

export const neighborhoodPicks = [
  {
    name: "Alfama",
    eyebrow: "Historic Lisbon",
    bestFor: "First-time visitors, atmosphere seekers, and unhurried city breaks",
    stayStyle: "Hillside guesthouses, characterful apartments, and intimate boutique stays",
    copy:
      "Lisbon's oldest quarter is the choice for tiled facades, lanes that reward wandering, and mornings that begin with a view. Alfama feels especially memorable for a first visit, but its steep, cobbled streets make it better for travellers comfortable with stairs and short uphill walks.",
    detail: "Choose a stay near São Vicente, the Sé, or a tram-connected edge of the neighbourhood for an easier arrival with luggage.",
  },
  {
    name: "Chiado & Baixa",
    eyebrow: "Central and polished",
    bestFor: "Walkability, galleries, dining, shopping, and a polished first Lisbon base",
    stayStyle: "Design-forward city hotels, serviced apartments, and refined boutiques",
    copy:
      "For a seamless, central Lisbon stay, Chiado and Baixa place cafés, major sights, riverfront walks, and practical transport within easy reach. Chiado brings theatre, bookshops, and elegant streets; nearby Baixa is a practical base when you want to keep the daily logistics simple.",
    detail: "This is one of the easiest choices for a short stay, a first visit, or anyone who prefers flatter walking routes between key sights.",
  },
  {
    name: "Bairro Alto & Príncipe Real",
    eyebrow: "Creative Lisbon",
    bestFor: "Nightlife, design-led stays, restaurants, and late-evening energy",
    stayStyle: "Boutique hotels, stylish townhouses, and apartment-style stays",
    copy:
      "Bairro Alto is lively after dark, while neighbouring Príncipe Real adds leafy squares, independent shops, and a slightly calmer rhythm. Stay here if you want to step into Lisbon's restaurant and bar scene, then retreat to a more design-conscious pocket of the city.",
    detail: "Ask your hotel about room orientation if you are sensitive to late-night street noise; Príncipe Real is often the quieter compromise.",
  },
  {
    name: "Belém",
    eyebrow: "Riverside and cultural",
    bestFor: "Museums, riverside walks, families, and a slower-paced Lisbon chapter",
    stayStyle: "Contemporary riverside hotels, apartment stays, and spacious family rooms",
    copy:
      "Belém works beautifully for travellers who want room to breathe between cultural stops and riverside sunsets. It is less central for late-night city energy, but the payoff is a calmer setting with a more open, spacious feel than Lisbon's old-town hills.",
    detail: "Use Belém as a relaxed full-stay base if quiet matters most, or combine it with central Lisbon for a longer itinerary.",
  },
  {
    name: "Avenida & Estrela",
    eyebrow: "Calm and connected",
    bestFor: "Longer stays, business trips, families, and travellers who want a local rhythm",
    stayStyle: "Classic hotels, garden-adjacent guesthouses, and residential apartments",
    copy:
      "Avenida da Liberdade and Estrela offer a more composed side of Lisbon without cutting you off from the centre. They suit travellers who value reliable transport, quieter evenings, and enough space to slow down between museum visits, meals, and day trips.",
    detail: "This is a strong all-round option when you want central access without the buzz of Bairro Alto or the steepest Alfama lanes.",
  },
] as const;

function ShareRow({ placement }: { placement: "top" | "bottom" }) {
  const encodedUrl = encodeURIComponent(ARTICLE_URL);
  const encodedText = encodeURIComponent(SHARE_TEXT);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${placement === "bottom" ? "justify-center" : ""}`}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#17364a]">
        <Share2 className="h-4 w-4 text-[#0077b6]" aria-hidden="true" />
        Share this guide
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]"
      >
        LinkedIn
      </a>
    </div>
  );
}

function HotelAvailabilityButton({ neighbourhood }: { neighbourhood: string }) {
  return (
    <a href={LISBON_ARTICLE_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="block">
      <Button className="h-auto w-full bg-[#0077b6] px-5 py-3 font-semibold text-white hover:bg-[#005c91]">
        Check Availability in {neighbourhood}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
    </a>
  );
}

export default function BlogLisbonHotels() {
  const metadata = pageMetadataConfig.lisbonHotelGuide;
  const tags = generateMetaTags(metadata);

  return (
    <div className="min-h-screen bg-[#fdfcf9] pb-20 md:pb-0">
      <Head
        title={tags.title}
        description={tags.description}
        canonical={tags.canonical}
        ogTitle={tags.ogTitle}
        ogDescription={tags.ogDescription}
        ogImage={tags.ogImage}
        ogUrl={tags.ogUrl}
        keywords={tags.keywords}
      />
      <BlogArticleSchema
        title={articleMetadata.title}
        description={articleMetadata.description}
        image={`https://thestayandwander.com${articleMetadata.image}`}
        author={articleMetadata.author}
        datePublished={articleMetadata.publishedDate}
        url={ARTICLE_URL}
      />
      <Header />

      <main>
        <section className="relative isolate min-h-[34rem] overflow-hidden bg-[#0d1b2a] text-white sm:min-h-[38rem]">
          <img
            src={articleMetadata.image}
            alt="Yellow Lisbon tram on a cobblestone street at sunset, with the Tagus River in the distance"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,27,42,0.92)_0%,rgba(13,27,42,0.74)_42%,rgba(13,27,42,0.16)_100%)]" />
          <div className="container flex min-h-[34rem] items-end px-4 py-14 sm:min-h-[38rem] sm:py-20">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c56c]">{articleMetadata.category}</p>
              <h1 className="font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {articleMetadata.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-100 sm:text-xl">
                Choose a Lisbon base that matches your rhythm, from Alfama's old-world atmosphere to Belém's riverside calm, with hotel ideas for every style of trip.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#f4c56c]" aria-hidden="true" /> Updated July 30, 2026</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#f4c56c]" aria-hidden="true" /> {articleMetadata.readTime} read</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-16">
            <article>
              <div className="border-b border-[#d9e4ea] pb-8">
                <ShareRow placement="top" />
              </div>

              <section className="py-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">A neighbourhood-first Lisbon plan</p>
                <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#17364a] sm:text-4xl">Start with the feel of your stay</h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
                  <p>
                    Lisbon rewards a little forethought. The city changes character quickly from one hill to the next: one address places you among historic lanes and tram bells, another puts cafés, galleries, museums, and transport at your door. Start by choosing the pace you want before comparing rooms.
                  </p>
                  <p>
                    This guide focuses on five practical bases. Each has a distinct mood, a clear reason to choose it, and a few trade-offs worth knowing before you commit. Use the hotel links as a starting point, then compare live availability, room type, location, and cancellation terms for your dates.
                  </p>
                </div>
                <div className="mt-8 rounded-2xl border-l-4 border-[#f4a261] bg-[#fff8ef] p-6 text-slate-700 shadow-[0_12px_30px_rgba(13,27,42,0.05)]">
                  <p className="font-semibold text-[#17364a]">Quick booking note</p>
                  <p className="mt-2 leading-relaxed">Lisbon's hills are part of the charm, but they shape the experience. If you are travelling with young children, heavy luggage, or limited mobility, prioritise a lift-equipped hotel near a main avenue, tram line, or metro stop.</p>
                </div>
              </section>

              <section className="mb-10 rounded-3xl border border-[#eadfc6] bg-[#f8efe0] px-3 py-2 shadow-[0_18px_40px_rgba(23,54,74,0.06)]">
                <p className="px-5 pt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Discover Lisbon beyond the hotel</p>
                <GetYourGuideTours
                  label="Lisbon tours and experiences"
                  showHeadline={false}
                  showButton={false}
                  cardStyle
                  fallbackHref={LISBON_ARTICLE_AFFILIATE_LINKS.tours}
                  fallbackLabel="Browse Lisbon tours"
                />
              </section>

              <section className="space-y-10">
                {neighborhoodPicks.map((neighbourhood) => (
                  <section key={neighbourhood.name} id={neighbourhood.name.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b3842d]">{neighbourhood.eyebrow}</p>
                        <h2 className="mt-2 font-playfair text-3xl font-bold text-[#17364a] sm:text-4xl">Where to stay in {neighbourhood.name}</h2>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5fa] px-3 py-1.5 text-xs font-semibold text-[#0077b6]"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Lisbon base</span>
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-slate-700">{neighbourhood.copy}</p>
                    <div className="mt-6 grid gap-4 rounded-2xl border border-[#dae4e9] bg-white p-5 shadow-[0_12px_28px_rgba(23,54,74,0.05)] sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Best for</p>
                        <p className="mt-2 leading-relaxed text-slate-700">{neighbourhood.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Stay style</p>
                        <p className="mt-2 leading-relaxed text-slate-700">{neighbourhood.stayStyle}</p>
                      </div>
                    </div>
                    <p className="mt-5 rounded-xl bg-[#f7fafb] p-4 leading-relaxed text-slate-600"><strong className="text-[#17364a]">Local-fit note:</strong> {neighbourhood.detail}</p>
                    <div className="mt-6"><HotelAvailabilityButton neighbourhood={neighbourhood.name} /></div>

                    {neighbourhood.name === "Belém" && (
                      <div className="mt-10 rounded-3xl border border-[#eadfc6] bg-[#f8efe0] px-3 py-2 shadow-[0_18px_40px_rgba(23,54,74,0.06)]">
                        <p className="px-5 pt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Plan your Belém day</p>
                        <GetYourGuideTours
                          label="Belém tours and experiences"
                          showHeadline={false}
                          showButton={false}
                          cardStyle
                          fallbackHref={LISBON_ARTICLE_AFFILIATE_LINKS.tours}
                          fallbackLabel="Browse Lisbon tours"
                        />
                      </div>
                    )}
                  </section>
                ))}
              </section>

              <section className="mt-12 rounded-3xl bg-[#0077b6] px-6 py-10 text-white shadow-[0_18px_45px_rgba(0,119,182,0.2)] sm:px-10">
                <Sparkles className="h-7 w-7 text-[#f4c56c]" aria-hidden="true" />
                <h2 className="mt-4 font-playfair text-3xl font-bold">Build a Lisbon stay around the way you travel</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-blue-50">Compare hotel availability for your dates, then add flights and experiences once your neighbourhood is chosen. Live prices and room terms can change, so review the booking details before you confirm.</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={LISBON_ARTICLE_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    <Button className="h-auto w-full bg-[#f4a261] px-6 py-3.5 font-semibold text-white hover:bg-[#df8745] sm:w-auto"><BedDouble className="mr-2 h-4 w-4" aria-hidden="true" /> Search All Lisbon Hotels</Button>
                  </a>
                  <a href={LISBON_ARTICLE_AFFILIATE_LINKS.flights} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    <Button variant="outline" className="h-auto w-full border-white/60 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-[#0077b6] sm:w-auto"><Plane className="mr-2 h-4 w-4" aria-hidden="true" /> Search Flights to Lisbon</Button>
                  </a>
                  <a href={LISBON_ARTICLE_AFFILIATE_LINKS.tours} target="_blank" rel="noopener noreferrer" className="inline-flex">
                    <Button variant="outline" className="h-auto w-full border-white/60 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-[#0077b6] sm:w-auto"><Landmark className="mr-2 h-4 w-4" aria-hidden="true" /> Book Lisbon Tours</Button>
                  </a>
                </div>
              </section>

              <section className="mt-12 border-t border-[#d9e4ea] pt-10">
                <h2 className="font-playfair text-2xl font-bold text-[#17364a]">Continue planning</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Link href="/blog/best-cities-europe-summer-2026" className="group rounded-2xl border border-[#d8e4e9] bg-white p-5 no-underline shadow-[0_12px_28px_rgba(23,54,74,0.05)] transition hover:-translate-y-0.5 hover:border-[#0077b6]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b3842d]">Europe guide</p>
                    <p className="mt-2 font-playfair text-xl font-bold leading-snug text-[#17364a]">7 Best Cities in Europe</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0077b6]">Read article <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
                  </Link>
                  <Link href="/itinerary/mediterranean" className="group rounded-2xl border border-[#d8e4e9] bg-white p-5 no-underline shadow-[0_12px_28px_rgba(23,54,74,0.05)] transition hover:-translate-y-0.5 hover:border-[#0077b6]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b3842d]">Itinerary</p>
                    <p className="mt-2 font-playfair text-xl font-bold leading-snug text-[#17364a]">Mediterranean Itinerary</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0077b6]">Explore route <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
                  </Link>
                  <Link href="/blog/tokyo-vs-bangkok-2026" className="group rounded-2xl border border-[#d8e4e9] bg-white p-5 no-underline shadow-[0_12px_28px_rgba(23,54,74,0.05)] transition hover:-translate-y-0.5 hover:border-[#0077b6]">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b3842d]">City comparison</p>
                    <p className="mt-2 font-playfair text-xl font-bold leading-snug text-[#17364a]">Tokyo vs Bangkok</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0077b6]">Read comparison <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
                  </Link>
                </div>
              </section>

              <section className="mt-12 rounded-2xl bg-[#f3f6f7] p-6">
                <ShareRow placement="bottom" />
              </section>

              <section className="mt-8 rounded-2xl border border-[#eadfc6] bg-[#fffaf1] p-6 text-sm leading-relaxed text-slate-600">
                <p><strong className="font-semibold text-[#17364a]">Affiliate disclosure:</strong> This article contains selected affiliate links. If you book through them, The Stay &amp; Wander may earn a small commission at no additional cost to you. It helps support our independent travel guides.</p>
              </section>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-[#d9cfae] bg-[#f8f4e9] shadow-[0_18px_45px_rgba(23,54,74,0.08)]">
                <CardContent className="p-7">
                  <MapPin className="h-7 w-7 text-[#b3842d]" aria-hidden="true" />
                  <h2 className="mt-4 font-playfair text-2xl font-bold text-[#17364a]">Choose the right Lisbon base</h2>
                  <p className="mt-3 leading-relaxed text-slate-700">Historic Alfama suits atmosphere, Chiado keeps you central, Bairro Alto adds nightlife, and Belém slows the tempo beside the river.</p>
                  <a href={LISBON_ARTICLE_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex">
                    <Button className="bg-[#f4a261] text-white hover:bg-[#df8745]">Search Lisbon Hotels</Button>
                  </a>
                </CardContent>
              </Card>
              <PopularRoutesWidgetBlogSidebar />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
