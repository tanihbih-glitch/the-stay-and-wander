import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Car,
  Hotel,
  Mail,
  Plane,
  Ticket,
} from "lucide-react";
import Footer from "@/components/Footer";
import GetYourGuideTours from "@/components/GetYourGuideTours";
import Head from "@/components/Head";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import { DEALS_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import {
  buildMailchimpJsonpUrl,
  cleanMailchimpMessage,
  dealsMailchimpConfig,
  isValidEmailAddress,
  type MailchimpResponse,
} from "@/lib/mailchimp";

export const dealsPageMetadata = {
  title: "Best Travel Deals This Week — Hotels · Flights · Tours",
  description:
    "Discover this week's hand-picked hotel offers, flight fares, tours, and car-rental deals from The Stay & Wander.",
  url: "/deals",
  image: "https://thestayandwander.com/og-image.png",
  keywords:
    "travel deals, hotel deals, flight deals, tours, car rental deals, travel offers",
};

const hotelDeals = [
  { flag: "🇮🇩", city: "Bali", hotel: "Alaya Resort Ubud", price: "$89/night", href: DEALS_AFFILIATE_LINKS.hotels.bali },
  { flag: "🇵🇹", city: "Lisbon", hotel: "Bairro Alto Hotel", price: "$180/night", href: DEALS_AFFILIATE_LINKS.hotels.lisbon },
  { flag: "🇭🇷", city: "Dubrovnik", hotel: "Villa Dubrovnik", price: "$480/night", href: DEALS_AFFILIATE_LINKS.hotels.dubrovnik },
  { flag: "🇬🇷", city: "Santorini", hotel: "Mystique Hotel", price: "$380/night", href: DEALS_AFFILIATE_LINKS.hotels.santorini },
  { flag: "🇯🇵", city: "Tokyo", hotel: "Hotel Gracery Shinjuku", price: "$130/night", href: DEALS_AFFILIATE_LINKS.hotels.tokyo },
  { flag: "🇧🇷", city: "Rio de Janeiro", hotel: "Hotel Fasano", price: "$350/night", href: DEALS_AFFILIATE_LINKS.hotels.rio },
] as const;

const flightDeals = [
  { route: "Dubai → Bali", price: "$290", month: "September 2026" },
  { route: "Dubai → Tokyo", price: "$420", month: "October 2026" },
  { route: "Dubai → Bangkok", price: "$180", month: "August 2026" },
  { route: "London → Santorini", price: "$95", month: "July 2026" },
] as const;

const tourDeals = [
  { flag: "🇮🇩", place: "Bali", name: "Ubud Sacred Monkey Forest & Rice Terraces Tour", price: "$35/person", href: DEALS_AFFILIATE_LINKS.tours.bali },
  { flag: "🇧🇷", place: "Brazil", name: "Rocinha Favela Community Tour", price: "$25/person", href: DEALS_AFFILIATE_LINKS.tours.brazil },
  { flag: "🇭🇷", place: "Dubrovnik", name: "Sea Kayaking Around City Walls", price: "$45/person", href: DEALS_AFFILIATE_LINKS.tours.dubrovnik },
  { flag: "🇬🇷", place: "Santorini", name: "Caldera Catamaran Cruise", price: "$95/person", href: DEALS_AFFILIATE_LINKS.tours.santorini },
] as const;

const carDeals = [
  { title: "Economy", price: "$15/day" },
  { title: "SUV & Family", price: "$35/day" },
  { title: "Luxury", price: "$80/day" },
] as const;

function ExternalDealButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg bg-[#F4A261] px-5 py-3 text-sm font-bold text-[#17364a] no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#e89250] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] ${className}`}
    >
      {children}
    </a>
  );
}

export default function Deals() {
  const [email, setEmail] = useState("");
  const [signupState, setSignupState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [signupMessage, setSignupMessage] = useState("");
  const cleanupSignupRequest = useRef<(() => void) | null>(null);

  const canonicalUrl = `https://thestayandwander.com${dealsPageMetadata.url}`;

  useEffect(() => () => cleanupSignupRequest.current?.(), []);

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!isValidEmailAddress(normalizedEmail)) {
      setSignupState("error");
      setSignupMessage("Please enter a valid email address.");
      return;
    }

    cleanupSignupRequest.current?.();
    setSignupState("submitting");
    setSignupMessage("");

    const callbackName = `stayWanderDealsSignup${Date.now()}`;
    const callbackWindow = window as unknown as Window & Record<string, unknown>;
    const request = document.createElement("script");
    const removeRequest = () => {
      window.clearTimeout(timeoutId);
      request.remove();
      delete callbackWindow[callbackName];
      cleanupSignupRequest.current = null;
    };

    const fail = (message: string) => {
      removeRequest();
      setSignupState("error");
      setSignupMessage(message);
    };

    const timeoutId = window.setTimeout(() => {
      fail("Mailchimp did not respond. Please check your connection and try again.");
    }, 15000);

    callbackWindow[callbackName] = (response: MailchimpResponse) => {
      removeRequest();
      if (response.result === "success") {
        setSignupState("success");
        setSignupMessage("You’re subscribed. Your next travel deal is on its way.");
        setEmail("");
        return;
      }

      setSignupState("error");
      setSignupMessage(cleanMailchimpMessage(response.msg));
    };

    request.async = true;
    request.src = buildMailchimpJsonpUrl(normalizedEmail, callbackName);
    request.onerror = () => fail("Unable to contact Mailchimp. Please try again shortly.");
    cleanupSignupRequest.current = removeRequest;
    document.body.appendChild(request);
  }

  return (
    <div className="min-h-screen bg-[#fdfcf9] pb-20 md:pb-0">
      <Head
        title={dealsPageMetadata.title}
        description={dealsPageMetadata.description}
        canonical={canonicalUrl}
        ogTitle={dealsPageMetadata.title}
        ogDescription={dealsPageMetadata.description}
        ogImage={dealsPageMetadata.image}
        ogUrl={canonicalUrl}
        keywords={dealsPageMetadata.keywords}
      />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#0077B6] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,162,97,0.36),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.14),_transparent_34%)]" />
          <Plane className="absolute -right-10 -top-8 h-72 w-72 rotate-12 text-white/[0.07]" aria-hidden="true" />
          <div className="container relative px-4 py-20 sm:py-24 lg:py-28">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#ffe0bd]">Travel offers, thoughtfully selected</p>
            <h1 className="max-w-4xl font-playfair text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              This Week&apos;s Best Travel Deals
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-50 sm:text-xl">
              Hand-picked hotel deals, flight offers and tour discounts — updated every Monday
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-18 lg:py-20">
          <div className="container px-4">
            <div className="rounded-2xl bg-[#0077B6] px-6 py-7 text-white shadow-[0_16px_38px_rgba(0,119,182,0.18)] sm:px-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15"><Hotel className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffe0bd]">Stay well for less</p>
                  <h2 className="mt-1 font-playfair text-3xl font-bold">Hotel Deals — Free Cancellation</h2>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {hotelDeals.map((deal) => (
                <article key={deal.hotel} className="flex flex-col rounded-2xl border border-slate-200 bg-[#fdfcf9] p-6 shadow-[0_12px_28px_rgba(23,54,74,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(23,54,74,0.11)]">
                  <p className="text-sm font-bold text-[#0077B6]">{deal.flag} {deal.city}</p>
                  <h3 className="mt-4 font-playfair text-2xl font-bold text-[#17364a]">{deal.hotel}</h3>
                  <p className="mt-5 text-3xl font-bold text-[#F4A261]">From {deal.price}</p>
                  <span className="mt-4 inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Free Cancellation ✅
                  </span>
                  <ExternalDealButton href={deal.href} className="mt-6 w-full">Check Availability</ExternalDealButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17364a] py-14 text-white sm:py-18 lg:py-20">
          <div className="container px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f7c486]">Take off for less</p>
              <h2 className="mt-4 flex items-center gap-3 font-playfair text-3xl font-bold sm:text-4xl"><Plane className="h-8 w-8 text-[#F4A261]" aria-hidden="true" /> Flight Deals — Best Prices This Week</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {flightDeals.map((deal) => (
                <article key={deal.route} className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
                  <p className="text-lg font-semibold text-blue-100">{deal.route}</p>
                  <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-sm text-slate-300">From</span>
                    <span className="text-4xl font-bold text-[#F4A261]">{deal.price}</span>
                    <span className="pb-1 text-sm text-slate-300">return</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{deal.month}</p>
                  <ExternalDealButton href={DEALS_AFFILIATE_LINKS.flights} className="mt-6">Search Flights</ExternalDealButton>
                </article>
              ))}
            </div>
            <ExternalDealButton href={DEALS_AFFILIATE_LINKS.flights} className="mt-8 w-full py-4 text-base">Search All Flight Deals on Aviasales →</ExternalDealButton>
          </div>
        </section>

        <section className="bg-[#F8EFE0] py-14 sm:py-18 lg:py-20">
          <div className="container px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b96d3d]">Make the journey memorable</p>
              <h2 className="mt-4 flex items-center gap-3 font-playfair text-3xl font-bold text-[#17364a] sm:text-4xl"><Ticket className="h-8 w-8 text-[#F4A261]" aria-hidden="true" /> Featured Tours — Free Cancellation</h2>
            </div>
          </div>

          <GetYourGuideTours label="Explore more tours and activities" showHeadline={false} showButton={false} backgroundColor="#F8EFE0" />

          <div className="container px-4">
            <div className="grid gap-5 md:grid-cols-2">
              {tourDeals.map((deal) => (
                <article key={deal.name} className="flex flex-col rounded-2xl border border-[#e0d0bd] bg-white p-6 shadow-[0_12px_28px_rgba(23,54,74,0.07)]">
                  <p className="text-sm font-bold text-[#0077B6]">{deal.flag} {deal.place}</p>
                  <h3 className="mt-4 font-playfair text-2xl font-bold leading-snug text-[#17364a]">{deal.name}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff0d8] px-3 py-1 text-xs font-bold text-[#a85e1f]">⭐ Top Rated</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Free Cancellation</span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0077B6]">Instant Confirmation</span>
                  </div>
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-sm font-medium text-slate-500">From</span>
                    <span className="text-3xl font-bold text-[#F4A261]">{deal.price}</span>
                  </div>
                  <ExternalDealButton href={deal.href} className="mt-6 w-full">Book Tour</ExternalDealButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-18 lg:py-20">
          <div className="container px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b3842d]">Choose your own road</p>
              <h2 className="mt-4 flex items-center gap-3 font-playfair text-3xl font-bold text-[#17364a] sm:text-4xl"><Car className="h-8 w-8 text-[#F4A261]" aria-hidden="true" /> Car Rental Deals — Compare 500+ Suppliers</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {carDeals.map((deal) => (
                <article key={deal.title} className="rounded-2xl border border-slate-200 bg-[#fdfcf9] p-7 shadow-[0_12px_28px_rgba(23,54,74,0.06)]">
                  <Car className="h-7 w-7 text-[#0077B6]" aria-hidden="true" />
                  <h3 className="mt-5 font-playfair text-2xl font-bold text-[#17364a]">{deal.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">All destinations</p>
                  <p className="mt-4 text-3xl font-bold text-[#F4A261]">From {deal.price}</p>
                  <ExternalDealButton href={DEALS_AFFILIATE_LINKS.carRentals} className="mt-6 w-full">Compare Prices</ExternalDealButton>
                </article>
              ))}
            </div>
            <ExternalDealButton href={DEALS_AFFILIATE_LINKS.carRentals} className="mt-8 w-full py-4 text-base">Compare All Car Rental Prices — 365 Day Cookie · 70% Commission</ExternalDealButton>
          </div>
        </section>

        <section className="bg-[#0077B6] py-16 text-white sm:py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15"><Mail className="h-6 w-6" aria-hidden="true" /></span>
              <h2 className="mt-5 font-playfair text-3xl font-bold sm:text-4xl">Get Weekly Deals Delivered to Your Inbox</h2>
              <p className="mt-4 text-lg leading-relaxed text-blue-50">New hotel deals every Monday · Free itinerary guides · Subscriber-only offers</p>
              <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" noValidate>
                <label className="sr-only" htmlFor="deals-email">Email address</label>
                <input
                  id="deals-email"
                  name="EMAIL"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (signupState === "error") setSignupState("idle");
                  }}
                  placeholder="you@example.com"
                  required
                  disabled={signupState === "submitting"}
                  className="min-h-12 flex-1 rounded-lg border border-white/30 bg-white px-4 text-slate-900 placeholder:text-slate-500 shadow-sm outline-none transition focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261] disabled:cursor-wait disabled:opacity-75"
                />
                <button type="submit" disabled={signupState === "submitting"} className="min-h-12 rounded-lg bg-[#F4A261] px-7 text-sm font-bold text-[#17364a] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#e89250] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] disabled:cursor-wait disabled:opacity-75">{signupState === "submitting" ? "Subscribing…" : "Subscribe"}</button>
              </form>
              {signupState === "success" && <p className="mt-5 rounded-xl bg-emerald-500/20 px-5 py-4 text-sm font-semibold" role="status">{signupMessage}</p>}
              {signupState === "error" && <p className="mt-5 rounded-xl bg-red-500/20 px-5 py-4 text-sm font-semibold" role="alert">{signupMessage}</p>}
              <p className="mt-4 text-xs text-blue-100">Your email is submitted to our Mailchimp list. You can unsubscribe at any time.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#17364a] py-7 text-center text-sm text-slate-200">
          <div className="container px-4">
            <p className="flex items-center justify-center gap-2 leading-relaxed"><BadgeCheck className="h-4 w-4 shrink-0 text-[#F4A261]" aria-hidden="true" /> This page contains affiliate links. If you book through them, The Stay &amp; Wander may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
