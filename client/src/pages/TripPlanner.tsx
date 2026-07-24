import { useState } from "react";
import { Link } from "wouter";
import { Check, Compass, Loader2, LockKeyhole, MapPinned, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";

const INTERESTS = ["Food & wine", "Culture & history", "Nature", "Beaches", "Art & design", "Shopping", "Wellness", "Nightlife"];

const TIERS = [
  { key: "basic", name: "Basic", price: "$2", duration: "2 days", description: "A focused, easy-to-follow two-day plan.", eligible: (days: number) => days === 2 },
  { key: "standard", name: "Standard", price: "$5", duration: "5 days", description: "A thoughtful five-day itinerary with dining and practical notes.", eligible: (days: number) => days === 5 },
  { key: "premium", name: "Premium", price: "$10", duration: "7–10 days", description: "A richer journey with curated pacing and map-ready location lines.", eligible: (days: number) => days >= 7 && days <= 10 },
  { key: "concierge", name: "Concierge", price: "$15", duration: "7–10 days", description: "Our most personal itinerary, including one affected-parts revision pass.", eligible: (days: number) => days >= 7 && days <= 10 },
] as const;

type TierKey = (typeof TIERS)[number]["key"];
type PlannerAccess = { publicId: string; accessToken: string };

const initialForm = {
  destination: "",
  tripLength: "5",
  startDate: "",
  endDate: "",
  interests: ["Food & wine", "Culture & history"],
  budgetLevel: "Mid-range",
  travelStyle: "Couple",
  pace: "Balanced",
};

function itineraryBlocks(itinerary: string) {
  return itinerary.split(/\n{2,}/).filter(Boolean);
}

export default function TripPlanner() {
  const [form, setForm] = useState(initialForm);
  const [access, setAccess] = useState<PlannerAccess | null>(null);
  const [preview, setPreview] = useState("");
  const [selectedTier, setSelectedTier] = useState<TierKey>("standard");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [checkoutNotice, setCheckoutNotice] = useState("");

  const createPreview = trpc.tripPlanner.createPreview.useMutation();
  const createCheckout = trpc.tripPlanner.createCheckout.useMutation();
  const tripLength = Number(form.tripLength);
  const travelDates = [form.startDate, form.endDate].filter(Boolean).join(" to ");

  const setField = <K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setForm(current => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter(item => item !== interest)
        : [...current.interests, interest],
    }));
  };

  const handlePreview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setCheckoutNotice("");
    try {
      const result = await createPreview.mutateAsync({
        destination: form.destination,
        tripLength,
        travelDates: travelDates || undefined,
        interests: form.interests,
        budgetLevel: form.budgetLevel as "Budget" | "Mid-range" | "Luxury",
        travelStyle: form.travelStyle,
        pace: form.pace as "Relaxed" | "Balanced" | "Packed",
      });
      setPreview(result.previewItinerary);
      setAccess({ publicId: result.publicId, accessToken: result.accessToken });
      const firstEligible = TIERS.find(tier => tier.eligible(tripLength));
      if (firstEligible) setSelectedTier(firstEligible.key);
      window.setTimeout(() => document.getElementById("your-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We could not create your Day 1 preview. Please try again.");
    }
  };

  const handleCheckout = async () => {
    setError("");
    if (!access) return;
    if (!email.trim()) {
      setError("Enter your email so we can send your completed PDF itinerary.");
      return;
    }
    const chosenTier = TIERS.find(tier => tier.key === selectedTier);
    if (!chosenTier?.eligible(tripLength)) {
      setError("Choose a tier that matches your trip length.");
      return;
    }

    try {
      const result = await createCheckout.mutateAsync({ access, tier: selectedTier, customerEmail: email.trim() });
      const checkoutWindow = window.open(result.checkoutUrl, "_blank", "noopener,noreferrer");
      if (!checkoutWindow) {
        window.location.assign(result.checkoutUrl);
        return;
      }
      setCheckoutNotice("Stripe Checkout opened in a new tab. Return here anytime; your itinerary will also be delivered by email after payment.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We could not open secure checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f2] pb-20 text-[#17364a] md:pb-0">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#17364a] px-4 py-16 text-white sm:py-20">
          <img src="/manus-storage/hero-main_005302f1.png" alt="Scenic travel destination" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17364a] via-[#17364a]/90 to-[#17364a]/55" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(207,165,83,0.32),_transparent_55%)]" />
          <div className="container relative grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b05a]"><Compass className="size-4" /> Travel planning, made personal</p>
              <h1 className="font-display text-5xl font-bold leading-[1.03] sm:text-6xl">One unforgettable day is only the beginning.</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/78">Tell us how you want to travel. We’ll craft your first day free, then unlock the complete journey in the depth that suits your trip.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7b05a]">What you receive</p>
              <div className="mt-5 space-y-4 text-sm text-white/85">
                <p className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-[#d7b05a]" />A bespoke itinerary written around your pace, interests, and budget.</p>
                <p className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-[#d7b05a]" />A polished, printable PDF in the Stay &amp; Wander collection.</p>
                <p className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-[#d7b05a]" />Premium tiers include map-ready location lines for a future map-image add-on.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container -mt-7 px-4 pb-16 sm:-mt-9 sm:pb-24">
          <form onSubmit={handlePreview} className="rounded-2xl border border-[#d9d2c6] bg-white p-5 shadow-[0_18px_55px_rgba(23,54,74,0.12)] sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-[#e9e3d9] pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">Step 1</p>
                <h2 className="mt-1 font-display text-3xl font-bold text-[#17364a]">Shape your trip</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">Day 1 is free. Your details are used only to create the itinerary you request.</p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" required value={form.destination} onChange={event => setField("destination", event.target.value)} placeholder="e.g., Kyoto, Japan" className="h-11 border-[#d9d2c6] bg-[#fffefb]" />
              </div>
              <div className="space-y-2">
                <Label>Trip length</Label>
                <Select value={form.tripLength} onValueChange={value => setField("tripLength", value)}>
                  <SelectTrigger className="h-11 border-[#d9d2c6] bg-[#fffefb]"><SelectValue /></SelectTrigger>
                  <SelectContent>{Array.from({ length: 9 }, (_, index) => index + 2).map(days => <SelectItem key={days} value={String(days)}>{days} days</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <Input id="start-date" type="date" value={form.startDate} onChange={event => setField("startDate", event.target.value)} className="h-11 border-[#d9d2c6] bg-[#fffefb]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End date</Label>
                <Input id="end-date" type="date" min={form.startDate || undefined} value={form.endDate} onChange={event => setField("endDate", event.target.value)} className="h-11 border-[#d9d2c6] bg-[#fffefb]" />
              </div>
              <div className="space-y-2">
                <Label>Budget level</Label>
                <Select value={form.budgetLevel} onValueChange={value => setField("budgetLevel", value)}>
                  <SelectTrigger className="h-11 border-[#d9d2c6] bg-[#fffefb]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Budget">Budget</SelectItem><SelectItem value="Mid-range">Mid-range</SelectItem><SelectItem value="Luxury">Luxury</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Travel style</Label>
                <Select value={form.travelStyle} onValueChange={value => setField("travelStyle", value)}>
                  <SelectTrigger className="h-11 border-[#d9d2c6] bg-[#fffefb]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Solo">Solo</SelectItem><SelectItem value="Couple">Couple</SelectItem><SelectItem value="Friends">Friends</SelectItem><SelectItem value="Family">Family</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pace</Label>
                <Select value={form.pace} onValueChange={value => setField("pace", value)}>
                  <SelectTrigger className="h-11 border-[#d9d2c6] bg-[#fffefb]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Relaxed">Relaxed</SelectItem><SelectItem value="Balanced">Balanced</SelectItem><SelectItem value="Packed">Packed</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-medium text-[#17364a]">Interests <span className="font-normal text-slate-500">(select at least one)</span></legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {INTERESTS.map(interest => {
                  const selected = form.interests.includes(interest);
                  return (
                    <button key={interest} type="button" onClick={() => toggleInterest(interest)} aria-pressed={selected} className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${selected ? "border-[#17364a] bg-[#17364a] text-white" : "border-[#d9d2c6] bg-[#fffefb] text-[#38505e] hover:border-[#b3842d]"}`}>
                      {selected && <Check className="mr-1.5 inline size-3.5" />}{interest}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {error && <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
            <div className="mt-7 flex flex-col gap-4 border-t border-[#e9e3d9] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">No card required for your first-day preview.</p>
              <Button type="submit" disabled={createPreview.isPending} className="h-11 bg-[#17364a] px-6 text-white hover:bg-[#0e2839]">
                {createPreview.isPending ? <><Loader2 className="size-4 animate-spin" /> Crafting Day 1…</> : <><Sparkles className="size-4" /> Generate my free Day 1</>}
              </Button>
            </div>
          </form>
        </section>

        {preview && access && (
          <section id="your-preview" className="border-y border-[#d9d2c6] bg-[#f1ede4] px-4 py-16 sm:py-24">
            <div className="container max-w-5xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">Your free preview</p>
                <h2 className="mt-2 font-display text-4xl font-bold text-[#17364a]">Day 1 in {form.destination}</h2>
                <p className="mt-3 text-slate-600">Here is the opening day of your personal journey—fully yours to explore.</p>
              </div>

              <article className="mt-9 rounded-2xl border border-[#ddd6cb] bg-white p-6 shadow-[0_14px_38px_rgba(23,54,74,0.08)] sm:p-9">
                {itineraryBlocks(preview).map((block, index) => (
                  <p key={`${block.slice(0, 24)}-${index}`} className={`whitespace-pre-wrap text-[15px] leading-7 text-slate-700 ${block.startsWith("#") ? "font-display text-2xl font-bold leading-tight text-[#17364a]" : ""}`}>{block.replace(/^#+\s*/, "")}</p>
                ))}
              </article>

              <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#d5ccbf] bg-[#17364a] p-6 sm:p-9">
                <div className="pointer-events-none select-none opacity-30 blur-[5px]" aria-hidden="true">
                  <p className="font-display text-3xl font-bold text-white">Day 2 — The story continues</p>
                  <div className="mt-5 space-y-4 text-white"><p>Morning: Wander into the city’s quieter corners.</p><p>Afternoon: A table worth lingering over, chosen for your rhythm.</p><p>Evening: A final golden-hour moment, mapped to your interests.</p></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#17364a]/70 px-5 text-center text-white">
                  <LockKeyhole className="size-7 text-[#d7b05a]" />
                  <h3 className="mt-3 font-display text-3xl font-bold">Unlock Day 2 onward</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">Choose the edition designed for your trip length. Your complete itinerary is generated fresh after payment, so it reads as one cohesive document.</p>
                </div>
              </div>

              <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {TIERS.map(tier => {
                  const eligible = tier.eligible(tripLength);
                  const active = selectedTier === tier.key;
                  return (
                    <button key={tier.key} type="button" onClick={() => eligible && setSelectedTier(tier.key)} disabled={!eligible} className={`relative min-h-56 rounded-xl border p-5 text-left transition-all ${active && eligible ? "border-[#b3842d] bg-white shadow-[0_12px_28px_rgba(23,54,74,0.12)]" : "border-[#d8d1c5] bg-white/65"} ${eligible ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-50"}`}>
                      {active && eligible && <span className="absolute right-4 top-4 rounded-full bg-[#17364a] p-1 text-white"><Check className="size-3.5" /></span>}
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b3842d]">{tier.duration}</p>
                      <div className="mt-2 flex items-baseline gap-2"><h3 className="font-display text-2xl font-bold text-[#17364a]">{tier.name}</h3><span className="text-lg font-semibold text-[#17364a]">{tier.price}</span></div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{tier.description}</p>
                      {!eligible && <p className="mt-4 text-xs font-medium text-slate-500">Select a {tier.duration} trip to unlock.</p>}
                      {tier.key === "premium" || tier.key === "concierge" ? <p className="mt-4 flex items-start gap-1.5 text-xs leading-5 text-[#5b7180]"><MapPinned className="mt-0.5 size-3.5 shrink-0 text-[#b3842d]" />Map-ready location lines included.</p> : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-[#d9d2c6] bg-white p-5 sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Step 2</p><h3 className="mt-1 font-display text-2xl font-bold text-[#17364a]">Send the full itinerary to your inbox</h3><p className="mt-1 text-sm leading-6 text-slate-600">Your purchase unlocks a branded PDF download and sends the same link to your email.</p></div>
                  <div className="w-full lg:max-w-sm"><Label htmlFor="delivery-email">Email address</Label><Input id="delivery-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 h-11 border-[#d9d2c6]" /></div>
                  <Button type="button" onClick={handleCheckout} disabled={createCheckout.isPending} className="h-11 shrink-0 bg-[#b3842d] px-6 text-white hover:bg-[#946b20]">{createCheckout.isPending ? <><Loader2 className="size-4 animate-spin" /> Opening checkout…</> : `Unlock for ${TIERS.find(tier => tier.key === selectedTier)?.price ?? "$5"}`}</Button>
                </div>
                {checkoutNotice && <p className="mt-5 rounded-lg bg-[#edf5f6] px-4 py-3 text-sm text-[#17364a]">{checkoutNotice}</p>}
                <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500"><MapPinned className="mt-0.5 size-3.5 shrink-0 text-[#b3842d]" />Premium and Concierge itineraries contain `LOCATION:` lines for map pins. A Google Maps Static API or Mapbox Static Images API connection is needed to render map images in the final PDF.</p>
              </div>
            </div>
          </section>
        )}

        {!preview && <section className="container px-4 pb-20"><div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#e9e3d8] p-7 sm:flex-row sm:items-center"><div><p className="font-display text-2xl font-bold text-[#17364a]">Already have a stay in mind?</p><p className="mt-1 text-sm text-slate-600">Explore hotels, flights, cars, and activities from one place.</p></div><Button asChild variant="outline" className="border-[#17364a] text-[#17364a]"><Link href="/booking">Explore booking</Link></Button></div></section>}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
