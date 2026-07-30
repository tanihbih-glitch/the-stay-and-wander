import { Building2, MapPinned, Plane, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetaTags, pageMetadataConfig } from "@shared/seo";

const DUBAI_HOTEL_LINK = "https://booking.stay22.com/thestayandwander/r-lvU3PLVF";
const DUBAI_IMAGE = "/manus-storage/dubai-middle-east-destination_1431ce58.png";

const stayAreas = [
  {
    title: "Downtown Dubai",
    copy: "Choose Downtown for skyline views, evening walks, and a central base for the city’s signature experiences.",
  },
  {
    title: "Dubai Marina & JBR",
    copy: "A lively waterfront choice for beach time, dining, and a relaxed city-meets-sea atmosphere.",
  },
  {
    title: "Palm Jumeirah",
    copy: "Ideal for resort stays, generous pools, and a slower pace without giving up Dubai’s energy.",
  },
  {
    title: "Abu Dhabi",
    copy: "Pair Dubai with the UAE capital for grand architecture, cultural stops, and a quieter coastal contrast.",
  },
];

export default function BlogDubaiHotels() {
  const metadata = pageMetadataConfig.dubaiHotelGuide;
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
      <Header />

      <main>
        <section className="relative isolate min-h-[31rem] overflow-hidden bg-[#071d32] text-white sm:min-h-[35rem]">
          <img
            src={DUBAI_IMAGE}
            alt="Dubai skyline at night with the Burj Khalifa illuminated in gold"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,20,36,0.92),rgba(4,20,36,0.58)_55%,rgba(4,20,36,0.18))]" />
          <div className="container flex min-h-[31rem] items-end px-4 py-14 sm:min-h-[35rem] sm:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c56c]">
                Middle East · Hotel Guide
              </p>
              <h1 className="font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Best Hotels in Dubai &amp; Abu Dhabi for Every Kind of Stay
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">
                From skyline-facing city stays to beachfront resorts and a cultural stop in Abu Dhabi, plan a UAE escape with a base that suits your pace.
              </p>
              <a
                href={DUBAI_HOTEL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex"
              >
                <Button className="h-auto bg-[#f4a261] px-7 py-4 text-base font-semibold text-white hover:bg-[#df8745]">
                  Find Hotels in the UAE
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="container px-4 py-14 sm:py-18 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(18rem,0.72fr)] lg:gap-16">
            <article>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">A thoughtful UAE base</p>
              <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#17364a] sm:text-4xl">
                Start with the stay, then let the itinerary unfold
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-slate-700">
                <p>
                  Dubai works beautifully as a first stop for travellers drawn to architectural drama, desert landscapes, waterside restaurants, and design-led hotels. A short onward journey to Abu Dhabi adds museums, grand landmarks, and a calmer coastal rhythm.
                </p>
                <p>
                  The right neighbourhood makes a major difference. Think about the kind of trip you want to have before choosing: city views and walkability, a beach-and-resort reset, or an easy two-city pairing across the UAE.
                </p>
              </div>
            </article>

            <aside className="rounded-2xl border border-[#d9cfae] bg-[#f8f4e9] p-7 shadow-[0_18px_45px_rgba(23,54,74,0.08)] sm:p-8">
              <Plane className="h-8 w-8 text-[#b3842d]" aria-hidden="true" />
              <h2 className="mt-5 font-playfair text-2xl font-bold text-[#17364a]">Plan a Dubai–Abu Dhabi escape</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                Browse our five-day UAE itinerary for a balanced city, coast, and desert-inspired route.
              </p>
              <Link
                href="/itineraries"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0077b6] no-underline transition-colors hover:text-[#005c91]"
              >
                Explore Middle East itineraries <MapPinned className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-18 lg:grid-cols-4">
            {stayAreas.map(({ title, copy }) => (
              <Card key={title} className="border-slate-200 bg-white shadow-[0_14px_34px_rgba(23,54,74,0.06)]">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f0d9] text-[#b3842d]">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-playfair text-2xl font-bold text-[#17364a]">{title}</h2>
                  <p className="mt-3 leading-relaxed text-slate-600">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="mt-14 rounded-3xl bg-[#0077b6] px-6 py-10 text-center text-white shadow-[0_18px_45px_rgba(0,119,182,0.18)] sm:px-10">
            <Sparkles className="mx-auto h-7 w-7 text-[#f4c56c]" aria-hidden="true" />
            <h2 className="mt-4 font-playfair text-3xl font-bold">Find a stay that fits your UAE trip</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-blue-50">
              Compare hotel options across Dubai and Abu Dhabi, then build the rest of your journey around the stay you love.
            </p>
            <a href={DUBAI_HOTEL_LINK} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex">
              <Button className="h-auto bg-[#f4a261] px-7 py-4 font-semibold text-white hover:bg-[#df8745]">Search UAE Hotels</Button>
            </a>
          </section>

          <p className="mt-8 text-sm leading-relaxed text-slate-500">
            <strong className="font-semibold text-slate-700">Affiliate disclosure:</strong> The Stay &amp; Wander may earn a commission when you book through selected links, at no additional cost to you. This supports our independent travel guides.
          </p>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
