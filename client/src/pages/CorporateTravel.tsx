import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronRight, ExternalLink, Loader2, Mail, MapPin, Plane, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Head from "@/components/Head";
import { trpc } from "@/lib/trpc";
import { CORPORATE_TRAVEL_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { generateMetaTags, pageMetadataConfig } from "@shared/seo";

const metadata = generateMetaTags(pageMetadataConfig.corporateTravel);
const HERO_IMAGE = "/manus-storage/corporate-travel-hero_9abcd7f4.png";
const STAY22 = CORPORATE_TRAVEL_AFFILIATE_LINKS.hotels;
const FLIGHTS = CORPORATE_TRAVEL_AFFILIATE_LINKS.flights;
const CARS = CORPORATE_TRAVEL_AFFILIATE_LINKS.carRentals;
const TOURS = CORPORATE_TRAVEL_AFFILIATE_LINKS.tours;
const INSURANCE = CORPORATE_TRAVEL_AFFILIATE_LINKS.insurance;

type ExternalCtaProps = { href: string; children: React.ReactNode; className?: string };

function ExternalCta({ href, children, className = "" }: ExternalCtaProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

const audience = [
  ["🏢", "Executive Teams", "C-suite and senior leadership travel"],
  ["🎪", "Conference Delegates", "ADIPEC · GITEX · Abu Dhabi Sustainability Week"],
  ["🌍", "Remote Teams", "Annual retreats and international offsites"],
  ["🤝", "Client Entertainment", "Incentive trips and reward travel programmes"],
  ["🚀", "Growing Companies", "Startup and scale-up team retreats"],
];

const events = [
  {
    accent: "bg-red-500",
    badge: "ENERGY · ABU DHABI",
    title: "ADIPEC 2026",
    dates: "November 4–7 2026",
    venue: "ADNEC Abu Dhabi UAE",
    description: "The world's largest energy exhibition — 180,000+ delegates from 160 countries. Hotels near ADNEC are filling fast.",
    attendees: "180,000+ delegates",
    countries: "160+ nations",
    urgency: "⚠️ Limited hotel availability near ADNEC for November 4–7",
    cta: "Secure ADIPEC Hotels Now",
  },
  {
    accent: "bg-[#0077B6]",
    badge: "TECHNOLOGY · DUBAI",
    title: "GITEX Global 2026",
    dates: "October 2026 (exact dates TBC)",
    venue: "Dubai World Trade Centre",
    description: "The world's largest technology show — 180,000+ tech leaders, investors and innovators from 170+ countries. Dubai hotels sell out months in advance.",
    attendees: "180,000+ visitors",
    countries: "170+ nations",
    urgency: "⚠️ Book Dubai hotels early — GITEX week sells out completely",
    cta: "Secure GITEX Hotels Now",
  },
  {
    accent: "bg-emerald-500",
    badge: "SUSTAINABILITY · ABU DHABI",
    title: "Abu Dhabi Sustainability Week 2027",
    dates: "January 2027",
    venue: "ADNEC Abu Dhabi UAE",
    description: "The world's most influential platform for sustainability — government leaders, energy executives and innovators from 150+ countries shaping the future of clean energy.",
    attendees: "50,000+ delegates",
    countries: "150+ nations",
    urgency: "⚠️ January dates fill Abu Dhabi hotels from October onwards",
    cta: "Secure ADSW Hotels Now",
  },
];

const abudhabiHotels = [
  ["Crowne Plaza ADNEC", "On-site · From $280/night", "On-site · 5 mins to ADNEC · Conference facilities"],
  ["Aloft Abu Dhabi", "5 mins · From $180/night", "Modern · Walking distance · Free cancellation"],
  ["Centro Capital Centre", "5 mins · From $150/night", "Budget business · Shuttle available · Free cancellation"],
  ["Hyatt Capital Gate", "10 mins · From $300/night", "Iconic leaning tower · Luxury · Spa"],
  ["Rosewood Abu Dhabi", "10 mins · From $450/night", "Ultra luxury · Corniche · Executive lounge"],
  ["Emirates Palace Mandarin Oriental", "15 mins · From $800/night", "Iconic · VIP · UAE's most famous hotel"],
];

const dubaiHotels = [
  ["Novotel World Trade Centre", "On-site · From $220/night"],
  ["Conrad Dubai", "5 mins · From $350/night"],
  ["Swissotel Al Ghurair", "10 mins · From $200/night"],
  ["Radisson Blu Dubai DWTC", "5 mins · From $180/night"],
  ["Shangri-La Dubai", "10 mins · From $400/night"],
  ["Armani Hotel Dubai", "15 mins · From $600/night"],
];

const services = [
  ["🏨", "Premium Hotel Booking", "Hand-picked hotels at the best rates near event venues and business districts worldwide. Free cancellation on all bookings.", "Search Hotels", STAY22],
  ["✈️", "Business & Economy Flights", "Compare fares across 700+ airlines worldwide. Best prices for delegates flying into Abu Dhabi and Dubai.", "Search Flights", FLIGHTS],
  ["🚗", "Executive Transfers & Car Rental", "Compare 500+ car rental suppliers. Executive transfers and chauffeur vehicles at all major UAE and global destinations.", "Compare Cars", CARS],
  ["🎯", "Team Experiences & Activities", "Desert safaris, dhow cruises, team building and cultural experiences in Abu Dhabi and Dubai for corporate delegates.", "Browse Experiences", TOURS],
  ["🗺️", "Complete Itinerary Design", "Day-by-day corporate travel plans — hotels, transport, experiences, dining — in a branded PDF delivered within 48 hours.", "Request Itinerary", "#proposal"],
  ["🛡️", "Corporate Travel Insurance", "Medical, cancellation and equipment coverage for international business travel. Instant quotes available.", "Get Insurance Quote", INSURANCE],
];

const destinations = [
  ["🇦🇪", "Abu Dhabi UAE", "ADIPEC · ADSW · Formula E · From $150/night", STAY22],
  ["🇦🇪", "Dubai UAE", "GITEX · Arabian Travel Market · From $180/night", STAY22],
  ["🇯🇵", "Tokyo Japan", "Technology · Finance · Luxury · From $130/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.tokyo],
  ["🇵🇹", "Lisbon Portugal", "Web Summit · Tech Hub · From $45/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.lisbon],
  ["🇮🇩", "Bali Indonesia", "Executive Retreats · Wellness · From $89/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.bali],
  ["🇧🇷", "São Paulo Brazil", "Latin America Business · From $180/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.saoPaulo],
  ["🇬🇷", "Santorini Greece", "Executive Incentive Travel · From $250/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.santorini],
  ["🇭🇷", "Dubrovnik Croatia", "Leadership Retreats · From $165/night", CORPORATE_TRAVEL_AFFILIATE_LINKS.destinationHotels.dubrovnik],
];

const packages: Array<[string, string, string, string[]]> = [
  ["Executive", "From $500", "1–4 travellers", ["Hotel recommendations and booking links", "Flight comparison", "Day-by-day itinerary PDF", "Restaurant and dining guide", "Airport transfer recommendations", "48-hour delivery"]],
  ["Team Retreat", "From $1,000", "5–20 travellers", ["Everything in Executive plus", "Group hotel block recommendations", "Team building activity itinerary", "Group dining reservations guide", "Full logistics and transport plan", "Branded PDF with company logo", "72-hour delivery"]],
  ["Incentive Programme", "From $2,000", "20–100+ travellers", ["Everything in Team plus", "Full programme design", "Destination selection consultation", "Group rates negotiation support", "Event planning and themed experiences", "Complete delegate management", "5-day delivery"]],
];

const markets = [
  ["🇺🇸", "USA", "Fortune 500 and tech company travel"],
  ["🇬🇧", "UK", "Finance and professional services"],
  ["🇨🇦", "Canada", "Energy and mining sector"],
  ["🇦🇺", "Australia", "Asia Pacific business travel"],
  ["🇮🇳", "India", "IT and consulting sector"],
  ["🇳🇬", "Nigeria", "Energy, finance and government travel"],
];

const initialForm = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "USA",
  travellerCount: "1–4",
  eventName: "ADIPEC 2026",
  destination: "Abu Dhabi UAE",
  startDate: "",
  endDate: "",
  budget: "Under $500",
  additionalRequirements: "",
};

const corporateTravelSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: "The Stay & Wander Corporate Travel",
  url: "https://thestayandwander.com/corporate-travel",
  email: "thestayandwander@thestayandwander.com",
  description: "Corporate travel planning for business travellers, executive teams, conference delegates, retreats, and incentive programmes worldwide.",
  areaServed: ["USA", "UK", "Canada", "Australia", "India", "Nigeria", "UAE"],
  serviceType: ["Corporate travel planning", "Hotel procurement", "Flight search", "Executive itinerary design", "Team retreat planning"],
};

function scrollToProposal() {
  document.getElementById("proposal")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submitEnquiry = trpc.corporateTravel.submitEnquiry.useMutation();

  const updateField = (field: keyof typeof initialForm, value: string) => setForm(current => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const result = await submitEnquiry.mutateAsync({
        ...form,
        country: form.country as "USA" | "UK" | "Canada" | "Australia" | "India" | "Nigeria" | "UAE" | "Other",
        travellerCount: form.travellerCount as "1–4" | "5–10" | "11–20" | "21–50" | "50+",
        eventName: form.eventName as "ADIPEC 2026" | "GITEX 2026" | "Abu Dhabi Sustainability Week 2027" | "Other UAE Event" | "Non-event Business Travel" | "Corporate Retreat" | "Incentive Programme",
        destination: form.destination as "Abu Dhabi UAE" | "Dubai UAE" | "Tokyo Japan" | "Bali Indonesia" | "Lisbon Portugal" | "Dubrovnik Croatia" | "Santorini Greece" | "São Paulo Brazil" | "Other",
        budget: form.budget as "Under $500" | "$500–1,000" | "$1,000–2,000" | "$2,000–5,000" | "$5,000+",
        additionalRequirements: form.additionalRequirements || undefined,
      });
      setMessage(
        result.autoReplySent
          ? "Thank you! We will send your personalised corporate travel proposal within 24 hours. A confirmation has been emailed to you."
          : "Thank you! We will send your personalised corporate travel proposal within 24 hours."
      );
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We could not send your request. Please try again.");
    }
  };

  const selectClass = "mt-2 h-11 w-full rounded-md border border-[#d7cbb9] bg-white px-3 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20";
  const inputClass = "mt-2 h-11 w-full rounded-md border border-[#d7cbb9] bg-white px-3 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20";

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-5 md:grid-cols-2" noValidate>
      <label className="text-sm font-semibold text-[#0D1B2A]">Full Name<input required className={inputClass} value={form.fullName} onChange={event => updateField("fullName", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Company Name<input required className={inputClass} value={form.companyName} onChange={event => updateField("companyName", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Email Address<input required type="email" className={inputClass} value={form.email} onChange={event => updateField("email", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Phone Number with country code<input required type="tel" className={inputClass} value={form.phone} onChange={event => updateField("phone", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Country<select className={selectClass} value={form.country} onChange={event => updateField("country", event.target.value)}>{["USA", "UK", "Canada", "Australia", "India", "Nigeria", "UAE", "Other"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Number of Travellers<select className={selectClass} value={form.travellerCount} onChange={event => updateField("travellerCount", event.target.value)}>{["1–4", "5–10", "11–20", "21–50", "50+"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Event or Conference<select className={selectClass} value={form.eventName} onChange={event => updateField("eventName", event.target.value)}>{["ADIPEC 2026", "GITEX 2026", "Abu Dhabi Sustainability Week 2027", "Other UAE Event", "Non-event Business Travel", "Corporate Retreat", "Incentive Programme"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Destination<select className={selectClass} value={form.destination} onChange={event => updateField("destination", event.target.value)}>{["Abu Dhabi UAE", "Dubai UAE", "Tokyo Japan", "Bali Indonesia", "Lisbon Portugal", "Dubrovnik Croatia", "Santorini Greece", "São Paulo Brazil", "Other"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Travel start date<input required type="date" className={inputClass} value={form.startDate} onChange={event => updateField("startDate", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A]">Travel return date<input required type="date" className={inputClass} value={form.endDate} onChange={event => updateField("endDate", event.target.value)} /></label>
      <label className="text-sm font-semibold text-[#0D1B2A] md:col-span-2">Budget per person<select className={selectClass} value={form.budget} onChange={event => updateField("budget", event.target.value)}>{["Under $500", "$500–1,000", "$1,000–2,000", "$2,000–5,000", "$5,000+"].map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="text-sm font-semibold text-[#0D1B2A] md:col-span-2">Additional Requirements<textarea className="mt-2 min-h-32 w-full rounded-md border border-[#d7cbb9] bg-white px-3 py-3 text-sm text-[#0D1B2A] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20" value={form.additionalRequirements} onChange={event => updateField("additionalRequirements", event.target.value)} /></label>
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 md:col-span-2" role="alert">{error}</p>}
      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800 md:col-span-2" role="status">{message}</p>}
      <div className="md:col-span-2"><button type="submit" disabled={submitEnquiry.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#F4A261] px-6 py-3 font-semibold text-[#0D1B2A] transition hover:bg-[#e8904e] disabled:cursor-not-allowed disabled:opacity-70">{submitEnquiry.isPending && <Loader2 className="h-4 w-4 animate-spin" />}Send My Travel Request<ArrowRight className="h-4 w-4" /></button></div>
    </form>
  );
}

export default function CorporateTravel() {
  return (
    <div className="min-h-screen bg-white text-[#0D1B2A]">
      <Head {...metadata}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema) }} />
      </Head>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[#0D1B2A]">
          <img src={HERO_IMAGE} alt="Executive business traveller in a premium hotel lobby" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-[#0D1B2A]/70" />
          <div className="container flex min-h-[560px] items-center py-24 md:min-h-[640px]">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-2 text-sm font-bold tracking-[0.22em] text-[#F4A261]"><BriefcaseBusiness className="h-4 w-4" /> GLOBAL CORPORATE TRAVEL</p>
              <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">Corporate Travel Planning — Handled Completely</h1>
              <p className="mt-6 max-w-2xl text-lg font-medium text-[#F4A261] sm:text-xl">Hotels · Flights · Transfers · Itineraries for Global Business Travellers</p>
              <div className="mt-10 flex flex-wrap gap-4"><a href="#proposal" className="inline-flex items-center gap-2 rounded-md bg-[#F4A261] px-6 py-3 font-semibold text-[#0D1B2A] transition hover:bg-[#e8904e]">Get a Free Travel Proposal <ArrowRight className="h-4 w-4" /></a><Link href="/itineraries" className="inline-flex items-center gap-2 rounded-md border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10">View Our Destinations <ChevronRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
        </section>

        <section className="bg-[#0077B6] py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#F4A261]">CORPORATE TRAVEL, CURATED</p><h2 className="mt-3 text-center font-display text-3xl font-bold text-white sm:text-4xl">Trusted by Business Travellers Worldwide</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{audience.map(([icon, title, description]) => <article key={title} className="rounded-xl bg-white p-5 text-center shadow-sm"><span className="text-2xl">{icon}</span><h3 className="mt-3 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>

        <section className="bg-[#0D1B2A] py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#F4A261]">UPCOMING MAJOR EVENTS — SECURE YOUR ACCOMMODATION NOW</p><h2 className="mt-3 text-center font-display text-3xl font-bold text-[#F4A261] sm:text-4xl">Events that deserve a head start</h2><p className="mt-4 text-center text-white/80">Hotels near Abu Dhabi and Dubai venues fill up months in advance</p><div className="mt-10 grid gap-6 lg:grid-cols-3">{events.map(event => <article key={event.title} className="overflow-hidden rounded-xl bg-white shadow-xl"><div className={`h-2 ${event.accent}`} /><div className="p-7"><p className="text-xs font-bold tracking-[0.16em] text-[#0077B6]">{event.badge}</p><h3 className="mt-3 font-display text-2xl font-bold">{event.title}</h3><p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700"><CalendarDays className="h-4 w-4 text-[#0077B6]" />{event.dates}</p><p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-[#0077B6]" />{event.venue}</p><p className="mt-5 text-sm leading-6 text-slate-600">{event.description}</p><div className="mt-5 flex gap-2"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{event.attendees}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{event.countries}</span></div><p className="mt-5 text-sm font-semibold text-[#b66e24]">{event.urgency}</p><a href="#proposal" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#F4A261] px-4 py-2.5 text-sm font-bold text-[#0D1B2A] transition hover:bg-[#e8904e]">{event.cta}<ArrowRight className="h-4 w-4" /></a></div></article>)}</div><div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#F4A261] p-6 md:flex-row"><p className="max-w-3xl font-display text-xl font-bold text-[#0D1B2A]">Planning to attend multiple UAE events in 2026–2027? We can bundle ADIPEC, GITEX and ADSW accommodation into one seamless travel plan.</p><a href="#proposal" className="shrink-0 rounded-md bg-[#0D1B2A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#172b40]">Request Multi-Event Package</a></div></div></section>

        <section className="bg-white py-20"><div className="container"><p className="text-sm font-bold tracking-[0.18em] text-[#0077B6]">EVENT HOTEL GUIDES</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Hand-Picked Hotels Near Event Venues</h2><div className="mt-10 grid gap-8 lg:grid-cols-2"><HotelColumn title="🇦🇪 Best Hotels Near ADNEC — ADIPEC & ADSW" hotels={abudhabiHotels} /><HotelColumn title="🇦🇪 Best Hotels Near DWTC — GITEX 2026" hotels={dubaiHotels} /></div></div></section>

        <section className="bg-[#F8EFE0] py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#0077B6]">OUR SERVICES</p><h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">What We Handle For You</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(([icon, title, description, cta, href]) => <article key={title} className="rounded-xl bg-white p-7 shadow-sm"><span className="text-3xl">{icon}</span><h3 className="mt-4 font-display text-xl font-bold">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{description}</p>{href.startsWith("#") ? <a href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0077B6] hover:text-[#005f91]">{cta}<ArrowRight className="h-4 w-4" /></a> : <ExternalCta href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0077B6] hover:text-[#005f91]">{cta}</ExternalCta>}</article>)}</div></div></section>

        <section className="bg-white py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#0077B6]">GLOBAL DESTINATIONS</p><h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">Our Most Popular Corporate Destinations</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{destinations.map(([flag, city, detail, href]) => <article key={city} className="rounded-xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md"><span className="text-2xl">{flag}</span><h3 className="mt-3 font-display text-xl font-bold">{city}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{detail}</p><ExternalCta href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0077B6]">Check Availability</ExternalCta></article>)}</div></div></section>

        <section className="bg-[#0077B6] py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#F4A261]">FIXED PRICE PACKAGES — DELIVERED WITHIN 48 HOURS</p><h2 className="mt-3 text-center font-display text-3xl font-bold text-white sm:text-4xl">Corporate Travel Packages</h2><div className="mt-10 grid gap-6 lg:grid-cols-3">{packages.map(([name, price, audienceSize, includes], index) => <article key={name} className={`relative rounded-xl p-7 ${index === 1 ? "bg-[#F8EFE0] shadow-xl" : "bg-white"}`}>{index === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F4A261] px-4 py-1 text-xs font-bold text-[#0D1B2A]">MOST POPULAR</span>}<h3 className="font-display text-2xl font-bold">{name}</h3><p className="mt-3 text-3xl font-bold text-[#0077B6]">{price}</p><p className="mt-1 text-sm font-semibold text-slate-600">For {audienceSize}</p><ul className="mt-6 space-y-3">{includes.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" />{item}</li>)}</ul><a href="#proposal" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#F4A261] px-4 py-3 text-sm font-bold text-[#0D1B2A] transition hover:bg-[#e8904e]">Request {name} Package<ArrowRight className="h-4 w-4" /></a></article>)}</div></div></section>

        <section className="bg-white py-20"><div className="container"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#0077B6]">GLOBAL MARKETS</p><h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">Serving Corporate Travellers Worldwide</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">{markets.map(([flag, country, tagline]) => <article key={country} className="rounded-xl border border-slate-200 p-5 text-center"><span className="text-3xl">{flag}</span><h3 className="mt-3 font-display text-lg font-bold">{country}</h3><p className="mt-2 text-sm leading-5 text-slate-600">{tagline}</p></article>)}</div></div></section>

        <section id="proposal" className="scroll-mt-24 bg-[#F8EFE0] py-20"><div className="container max-w-5xl"><div className="rounded-2xl bg-white p-6 shadow-xl sm:p-10"><p className="text-center text-sm font-bold tracking-[0.18em] text-[#0077B6]">COMPLIMENTARY PROPOSAL</p><h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">Get Your Free Corporate Travel Proposal</h2><p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">Complete the form below and receive a customised travel proposal within 24 hours</p><ContactForm /></div></div></section>

        <section className="bg-white py-14"><div className="container max-w-5xl"><p className="text-sm leading-7 text-slate-600">The Stay &amp; Wander provides corporate travel planning for business travellers, conference delegates and executive teams worldwide. We specialise in hotel procurement, flight search, car rental comparison and complete itinerary design for ADIPEC 2026 Abu Dhabi, GITEX 2026 Dubai, and Abu Dhabi Sustainability Week 2027. Trusted by companies from USA, UK, Canada, Australia, India and Nigeria. Contact us for UAE event hotel bookings and global corporate travel planning across Europe, Asia and Brazil.</p><div className="mt-8 flex gap-3 rounded-lg border border-[#F4A261]/50 bg-[#F8EFE0] p-5 text-sm leading-6 text-slate-700"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0077B6]" /><p>This page contains affiliate links. When you book through our links we earn a small commission at no extra cost to you. All hotel and service recommendations are genuine and independently selected.</p></div></div></section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function HotelColumn({ title, hotels }: { title: string; hotels: string[][] }) {
  return <div><h3 className="font-display text-xl font-bold text-[#0D1B2A]">{title}</h3><div className="mt-5 space-y-3">{hotels.map(([name, details, tags]) => <article key={name} className="rounded-xl border border-slate-200 p-5 sm:flex sm:items-center sm:justify-between sm:gap-5"><div><h4 className="font-semibold text-[#0D1B2A]">{name}</h4><p className="mt-1 text-sm font-bold text-[#b66e24]">{details}</p>{tags && <p className="mt-2 text-xs text-slate-600">{tags}</p>}</div><ExternalCta href={STAY22} className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-md border border-[#0077B6] px-4 py-2 text-sm font-bold text-[#0077B6] transition hover:bg-[#0077B6] hover:text-white sm:mt-0">Check Availability</ExternalCta></article>)}</div></div>;
}
