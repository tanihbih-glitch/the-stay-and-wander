import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Compass, HandHeart, Mail, MapPinned, Plane } from "lucide-react";

export const aboutPageMetadata = {
  title: "About The Stay & Wander | Travel Guides, Stays & Itineraries",
  description:
    "Learn how The Stay & Wander helps travellers discover beautiful places, unique stays, honest recommendations, and unforgettable journeys across Europe, Asia, Brazil and the Middle East.",
  url: "/about",
  image: "https://thestayandwander.com/og-image.png",
  keywords:
    "about The Stay & Wander, travel guides, curated hotels, travel itineraries, honest travel recommendations",
};

const reasonsToWander = [
  {
    icon: MapPinned,
    title: "Beautiful places, thoughtfully chosen",
    copy: "We look beyond the obvious to help you find destinations and stays that make a trip feel memorable.",
  },
  {
    icon: Compass,
    title: "Planning made practical",
    copy: "Our day-by-day itineraries bring the best parts of a destination into a clear, usable plan.",
  },
  {
    icon: HandHeart,
    title: "Recommendations you can trust",
    copy: "We only feature places and travel tools we would genuinely recommend to a friend.",
  },
];

export default function About() {
  const canonicalUrl = `https://thestayandwander.com${aboutPageMetadata.url}`;

  return (
    <div className="min-h-screen bg-[#fdfcf9] pb-20 md:pb-0">
      <Head
        title={aboutPageMetadata.title}
        description={aboutPageMetadata.description}
        canonical={canonicalUrl}
        ogTitle={aboutPageMetadata.title}
        ogDescription={aboutPageMetadata.description}
        ogImage={aboutPageMetadata.image}
        ogUrl={canonicalUrl}
        keywords={aboutPageMetadata.keywords}
      />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#17364a] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.24),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_34%)]" />
          <Compass className="absolute -right-12 -top-10 h-72 w-72 rotate-12 text-white/[0.06] sm:right-8" aria-hidden="true" />
          <div className="container relative px-4 py-20 sm:py-24 lg:py-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#e5c66b]">
              Discover · Stay · Explore
            </p>
            <h1 className="max-w-3xl font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              About The Stay &amp; Wander
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Travel should feel exciting long before you arrive. We are here to make the route from inspiration to an unforgettable journey simpler and more personal.
            </p>
          </div>
        </section>

        <section className="container px-4 py-14 sm:py-18 lg:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">Our approach</p>
              <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#17364a] sm:text-4xl">
                A more considered way to plan a trip
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-700">
                <p>
                  The Stay &amp; Wander is a travel resource dedicated to helping travellers discover beautiful places, unique stays and unforgettable journeys across Europe, Asia, Brazil and the Middle East.
                </p>
                <p className="font-semibold tracking-wide text-[#b3842d]">
                  Europe · Asia · Brazil · Middle East
                </p>
                <p>
                  We hand-pick hotels for every budget, create detailed day-by-day itineraries and find the best flight deals so you can spend less time planning and more time exploring.
                </p>
                <p>
                  Our recommendations are always honest — we only feature places we would genuinely recommend to a friend.
                </p>
              </div>
            </div>

            <aside className="rounded-2xl border border-[#d9cfae] bg-[#f8f4e9] p-7 shadow-[0_18px_45px_rgba(23,54,74,0.08)] sm:p-8">
              <Plane className="h-8 w-8 text-[#b3842d]" aria-hidden="true" />
              <h2 className="mt-5 font-playfair text-2xl font-bold text-[#17364a]">Travel with more confidence</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                From a quick city break to a multi-stop adventure, our guides are built to help you choose with clarity.
              </p>
              <a
                href="mailto:thestayandwander@thestayandwander.com"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0077b6] no-underline transition-colors hover:text-[#005c91]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                thestayandwander@thestayandwander.com
              </a>
            </aside>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-18">
            {reasonsToWander.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_14px_34px_rgba(23,54,74,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f0d9] text-[#b3842d]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-playfair text-2xl font-bold text-[#17364a]">{title}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
