import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Clock3,
  Landmark,
  MapPin,
  Plane,
  Share2,
  Sparkles,
  Ticket,
} from "lucide-react";
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
import { BALI_EXPERIENCES_AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { generateMetaTags, pageMetadataConfig } from "@shared/seo";

const ARTICLE_URL = "https://thestayandwander.com/blog/things-to-do-in-bali-2026";
const SHARE_TEXT = "Things to Do in Bali: 50 Best Experiences for 2026";

export const articleMetadata = {
  title: "Things to Do in Bali: 50 Best Experiences for 2026",
  description:
    "Plan an unforgettable Bali trip with 50 memorable experiences across temples, beaches, food, nature, wellness, adventure, and island escapes — plus practical planning tips for 2026.",
  url: "/blog/things-to-do-in-bali-2026",
  image: "/manus-storage/bali-tegallalang-rice-terraces-hero_030f04ef.jpg",
  category: "BALI GUIDE · INDONESIA TRAVEL",
  author: "The Stay & Wander",
  publishedDate: "2026-07-30",
  readTime: "18 minutes",
};

type Experience = {
  number: number;
  title: string;
  location: string;
  cost: string;
  timing: string;
  overview: string;
  practical: string;
  tip: string;
};

type ExperienceCategory = {
  title: string;
  eyebrow: string;
  intro: string;
  experiences: readonly Experience[];
};

export const experienceCategories: readonly ExperienceCategory[] = [
  {
    title: "Culture and Temples",
    eyebrow: "Sacred Bali",
    intro:
      "Bali’s temple culture is lived rather than staged. Dress respectfully, follow local signs, and leave enough time to experience each site at its own rhythm instead of racing through a checklist.",
    experiences: [
      {
        number: 1,
        title: "Watch sunset at Tanah Lot Temple",
        location: "Beraban, south-west Bali",
        cost: "Entry fee plus optional transport",
        timing: "Arrive 60–90 minutes before sunset",
        overview:
          "Tanah Lot’s offshore rock setting makes it one of Bali’s most atmospheric sunset stops. The viewpoint is especially rewarding when the tide, sea spray, and low evening light create a dramatic silhouette around the temple.",
        practical:
          "Plan this as a late-afternoon outing from Canggu or Seminyak and expect the coastal paths to be busiest in the final hour before sunset. Bring small cash for parking, snacks, and any local access fees.",
        tip:
          "Insider tip: walk a little beyond the first cluster of viewpoints for more breathing room, then stay a few minutes after sunset when many day visitors begin leaving.",
      },
      {
        number: 2,
        title: "Visit Besakih Temple",
        location: "Mount Agung foothills, east Bali",
        cost: "Entry fee; consider a local guide for context",
        timing: "Morning for cooler conditions and clearer views",
        overview:
          "Besakih is Bali’s largest and most important temple complex, spread across the slopes of Mount Agung. Its layered courtyards and mountain setting reward travellers who want a fuller sense of the island’s Hindu traditions.",
        practical:
          "Allow at least half a day including the scenic drive from Ubud or the south. Modest clothing is essential, and a sarong is typically expected inside temple areas.",
        tip:
          "Insider tip: start early and pair the visit with Sidemen or a nearby countryside lunch rather than trying to combine it with the far south in one rushed day.",
      },
      {
        number: 3,
        title: "Explore Tirta Empul water temple",
        location: "Tampaksiring, near Ubud",
        cost: "Low-cost temple entry; purification activity may have local guidance",
        timing: "Early morning or late afternoon",
        overview:
          "Tirta Empul is known for its spring-fed purification pools, where visitors can observe or respectfully join a traditional cleansing sequence. The temple has a calmer, more intimate character when you arrive outside the busiest midday period.",
        practical:
          "Bring a change of clothes if you plan to enter the water, and follow the temple’s current rules on where visitors may participate. Give yourself time to dry off before moving on to another activity.",
        tip:
          "Insider tip: ask a guide or temple attendant about etiquette before entering the pools so you understand the appropriate order and any restrictions on participation.",
      },
      {
        number: 4,
        title: "See the Kecak dance at Uluwatu",
        location: "Uluwatu cliffs, Bukit Peninsula",
        cost: "Temple entry and performance ticket",
        timing: "Late afternoon through sunset",
        overview:
          "Uluwatu combines cliff-top sea views with a powerful evening Kecak performance, built around rhythmic chanting rather than a conventional orchestra. It is one of the island’s most visually memorable ways to experience Balinese performance traditions.",
        practical:
          "Book or arrive early for popular performance times, especially in peak travel periods, and leave time for the temple walk before taking your seat. Keep an eye on loose belongings around the cliff paths.",
        tip:
          "Insider tip: arrive well before the performance to explore the clifftop paths in cooler light, then choose a seat with a clear view of both the stage and the horizon.",
      },
      {
        number: 5,
        title: "Wander through Ubud Palace and the art market",
        location: "Central Ubud",
        cost: "Free to low-cost browsing; purchases vary",
        timing: "Morning for quieter lanes, evening for nearby dance shows",
        overview:
          "Ubud Palace and the market sit at the centre of town, making them an easy introduction to Balinese craft, textiles, carved wood, and everyday urban life. The surrounding streets are ideal for a slow morning of galleries, cafés, and side-lane discoveries.",
        practical:
          "Use the palace as an orientation point before branching into nearby shops and museums. If you intend to buy souvenirs, compare a few stalls and keep your luggage space in mind.",
        tip:
          "Insider tip: visit early for a calmer browse, then return in the evening if you want to pair the area with a traditional dance performance or dinner.",
      },
      {
        number: 6,
        title: "Join a Balinese cooking class",
        location: "Ubud, Canggu, Seminyak, and village kitchens",
        cost: "Mid-range small-group activity",
        timing: "Morning market visit or late-afternoon class",
        overview:
          "A cooking class turns Bali’s fragrant markets and home-style dishes into a hands-on experience rather than a meal you simply order. It is a relaxed way to learn about local ingredients, sambals, satays, and shared-table dining.",
        practical:
          "Choose a class that states its dietary accommodation policy clearly and check whether market transport is included. Most sessions are best planned on a slower sightseeing day because they can last several hours.",
        tip:
          "Insider tip: select a class with a market component if you want more cultural context, and bring a small notebook for seasoning proportions you may want to recreate later.",
      },
      {
        number: 7,
        title: "Book a purifying water ceremony with local guidance",
        location: "Ubud area and temple communities",
        cost: "Varies by host, donation, and transport",
        timing: "Morning; allow an unhurried half day",
        overview:
          "A guided purification experience can offer meaningful context around Balinese spiritual practices when it is approached respectfully and hosted through an appropriate local connection. It should feel like a cultural exchange, not a performance to rush through for a photo.",
        practical:
          "Choose a host who explains etiquette, dress, and the purpose of each step before you arrive. Bring a sarong, a towel, and clothing that you are comfortable changing after water rituals.",
        tip:
          "Insider tip: avoid scheduling this immediately before a long transfer or formal dinner; leave space for the experience to unfold without watching the clock.",
      },
    ],
  },
  {
    title: "Nature and Rice Terraces",
    eyebrow: "Green landscapes",
    intro:
      "The island’s volcanic geography shapes its best outdoor moments. Start early where you can, keep rain protection close in the wet season, and leave room for views that look even better when your schedule is not too rigid.",
    experiences: [
      {
        number: 8,
        title: "Walk the Tegallalang Rice Terraces",
        location: "North of Ubud",
        cost: "Small local access fee; optional swing or photo experiences cost extra",
        timing: "Sunrise to mid-morning",
        overview:
          "Tegallalang’s layered green terraces are the Bali image many visitors picture before arriving. Go early and the footpaths feel more peaceful, the light is softer, and the heat is easier to manage.",
        practical:
          "Wear shoes with grip because steps can be damp or uneven, and carry water for the short climbs between viewpoints. Treat the terraces as a working landscape by staying on designated paths and respecting local signs.",
        tip:
          "Insider tip: visit just after sunrise, then continue north for a quieter breakfast rather than lingering through the busiest photo-hour crowds.",
      },
      {
        number: 9,
        title: "Hike the Campuhan Ridge Walk",
        location: "Ubud",
        cost: "Free",
        timing: "Early morning or late afternoon",
        overview:
          "The Campuhan Ridge Walk is a simple, scenic Ubud escape with open grassland views and a gentle sense of space away from town traffic. It is ideal when you want a low-commitment outdoor activity between cafés, museums, or spa time.",
        practical:
          "Start before the strongest heat and bring water because shade can be limited along exposed stretches. The path is more about the landscape and slow walking than a difficult hike.",
        tip:
          "Insider tip: walk out early, then reward yourself with breakfast in Ubud rather than trying to fit the ridge into the hottest part of the day.",
      },
      {
        number: 10,
        title: "Chase waterfalls around Ubud",
        location: "Central Bali",
        cost: "Small entry fees and parking are common",
        timing: "Morning; allow time for stairs and swimming stops",
        overview:
          "The waterfalls around Ubud offer a welcome contrast to temples and terraces, with jungle paths, cool pools, and short bursts of adventure. Each site has its own access conditions, so treat a waterfall day as a flexible circuit rather than a race.",
        practical:
          "Pack swimwear, a towel, sandals with grip, and a dry bag for your phone. Ask locally about current water conditions after heavy rain, especially if you plan to swim beneath a fall.",
        tip:
          "Insider tip: choose two waterfalls maximum for a relaxed day; the stairs, heat, and traffic make an overpacked itinerary less enjoyable.",
      },
      {
        number: 11,
        title: "Visit Jatiluwih Rice Terraces",
        location: "Tabanan Regency",
        cost: "Entry fee; lunch and transport extra",
        timing: "Morning to early afternoon",
        overview:
          "Jatiluwih feels broader and quieter than the most photographed Ubud terraces, with long views over a living agricultural landscape. It is a strong choice for travellers who want to spend time walking rather than only stopping for a quick viewpoint photo.",
        practical:
          "Plan a dedicated half day from south Bali or Ubud, with time for a countryside lunch and a slow loop on the walking paths. Weather can shift quickly, so carry a light rain layer.",
        tip:
          "Insider tip: pair Jatiluwih with a small village café or a scenic return route instead of trying to squeeze it between beach plans in the south.",
      },
      {
        number: 12,
        title: "Watch sunrise at Mount Batur",
        location: "Kintamani",
        cost: "Guided hike and transport typically required",
        timing: "Pre-dawn start; summit for sunrise",
        overview:
          "A Mount Batur sunrise hike brings early effort, cool mountain air, and wide views over the caldera once daylight arrives. It is one of Bali’s most rewarding active mornings if you are comfortable with uneven volcanic terrain and a very early wake-up.",
        practical:
          "Use a reputable local guide, wear layers for the summit chill, and bring shoes with reliable grip. Your body will appreciate a lighter day afterward, especially if you are travelling from the coast.",
        tip:
          "Insider tip: book the hike for a day when you can nap or enjoy a slow spa afternoon afterward rather than planning another major excursion.",
      },
      {
        number: 13,
        title: "Take a yoga class overlooking the jungle",
        location: "Ubud and surrounding villages",
        cost: "Low to mid-range drop-in class",
        timing: "Early morning or sunset class",
        overview:
          "Ubud’s yoga studios make an easy reset between sightseeing days, with open-air shalas and a distinctly slower rhythm than the coast. Whether you are a committed practitioner or simply curious, a class can add balance to a more active itinerary.",
        practical:
          "Reserve popular sessions in advance during busy periods and arrive early enough to settle in without rushing. Most studios provide mats, but confirm the policy if you prefer your own equipment.",
        tip:
          "Insider tip: try a morning class before exploring Ubud, then keep the rest of the day deliberately light so the quieter pace carries through.",
      },
    ],
  },
  {
    title: "Beaches and Water",
    eyebrow: "Coast and islands",
    intro:
      "Bali’s coast changes dramatically by region, from surf-ready cliffs to calm island lagoons. Check sea conditions locally, protect yourself from the sun, and build travel time into any day that includes an island crossing.",
    experiences: [
      {
        number: 14,
        title: "Surf a beginner wave in Canggu",
        location: "Canggu and nearby west-coast beaches",
        cost: "Board rental or beginner lesson",
        timing: "Morning when conditions suit beginners",
        overview:
          "Canggu is a natural entry point for Bali surfing, with beach breaks, surf schools, and a lively post-session café culture. A first lesson is the easiest way to learn local safety, tides, and lineup etiquette without guessing.",
        practical:
          "Book with an instructor who matches the session to your experience level and current conditions. Wear a rash guard, use water-resistant sunscreen, and keep the rest of the morning open in case the tide timing shifts.",
        tip:
          "Insider tip: start with a group or private lesson rather than a solo rental, then decide whether you want a second session later in the trip.",
      },
      {
        number: 15,
        title: "Catch sunset at Seminyak Beach",
        location: "Seminyak",
        cost: "Free beach access; food and drinks vary",
        timing: "Late afternoon through sunset",
        overview:
          "Seminyak’s broad shoreline is one of the easiest places to end a south-Bali day with a casual sunset. It works equally well for a relaxed walk, an early dinner, or a low-key beach club stop depending on the mood you want.",
        practical:
          "Arrive before the sky changes color if you want time to find a comfortable spot, especially in high season. Keep valuables minimal and expect beach traffic to build around sunset.",
        tip:
          "Insider tip: walk a few minutes away from the busiest entrances for a calmer strip of sand and more room to watch the light change.",
      },
      {
        number: 16,
        title: "Snorkel at Blue Lagoon",
        location: "Padang Bai, east Bali",
        cost: "Equipment rental or guided boat trip",
        timing: "Morning for clearer water and calmer starts",
        overview:
          "Blue Lagoon is a compact east-Bali snorkelling stop with bright reef scenery close to shore or by short boat ride. It is a good option for travellers who want a water day without committing to a full island crossing.",
        practical:
          "Confirm the day’s visibility and sea conditions with your operator before paying for equipment or a trip. Bring a dry bag, reef-safe sun protection, and a towel for the transfer back.",
        tip:
          "Insider tip: combine Blue Lagoon with a relaxed Padang Bai lunch, but avoid packing too many temples and beaches into the same east-coast day.",
      },
      {
        number: 17,
        title: "Spend a day on Nusa Penida",
        location: "Nusa Penida, by fast boat from Sanur",
        cost: "Boat transfer, driver or tour, and local access fees",
        timing: "Full day; start with an early boat",
        overview:
          "Nusa Penida delivers dramatic cliffs, bright water, and some of the region’s most recognisable viewpoints. Its roads and distances mean it is best treated as a full-day excursion or an overnight trip rather than a casual add-on.",
        practical:
          "Book a reliable boat transfer, keep your schedule realistic, and expect uneven roads once you arrive. Bring water, a hat, and shoes suitable for steep or dusty paths at major viewpoints.",
        tip:
          "Insider tip: pick either the west or east side for a day trip; trying to cover every landmark usually means spending more time in a car than outside.",
      },
      {
        number: 18,
        title: "Swim and paddleboard in Nusa Dua",
        location: "Nusa Dua",
        cost: "Beach access is generally free; rentals vary",
        timing: "Morning around calmer conditions",
        overview:
          "Nusa Dua’s more sheltered stretches can be a gentler choice for swimming and paddleboarding than surf-focused west-coast beaches. It is particularly useful for families or travellers looking for a softer, resort-style water day.",
        practical:
          "Check tide and wind conditions before renting a paddleboard, and keep a simple plan for shade and hydration. Beach facilities vary by stretch, so choose your access point before arrival.",
        tip:
          "Insider tip: go early, when the water often feels calmer and you can finish before the strongest sun of the day.",
      },
      {
        number: 19,
        title: "Have a beachfront seafood dinner in Jimbaran",
        location: "Jimbaran Bay",
        cost: "Mid-range to premium depending on seafood selection",
        timing: "Sunset dinner",
        overview:
          "Jimbaran is made for a relaxed evening of grilled seafood with your feet close to the sand and the sky changing over the bay. It is less about a rushed meal and more about settling in for a long, coastal dinner.",
        practical:
          "Arrive before sunset to choose your table and ask for clear pricing before selecting seafood. A light layer can be useful once the sea breeze picks up after dark.",
        tip:
          "Insider tip: book a little earlier than peak dinner time for a better choice of tables and a quieter first hour by the water.",
      },
      {
        number: 20,
        title: "Take a boat to Nusa Lembongan",
        location: "Nusa Lembongan, by fast boat from Sanur",
        cost: "Return boat fare plus optional scooter, driver, or tour",
        timing: "Full day or overnight",
        overview:
          "Nusa Lembongan offers a slower island rhythm, sea views, and small coves that make a welcome contrast to Bali’s busier southern resort areas. It is an especially good escape for couples and travellers who want one or two quieter nights.",
        practical:
          "Leave generous time for boat logistics and pack lightly if you are staying overnight. If you rent a scooter, use it only if you are experienced and comfortable with local road conditions.",
        tip:
          "Insider tip: stay the night if your schedule allows; Lembongan is at its best before day-trippers arrive and after they leave.",
      },
      {
        number: 21,
        title: "Visit Suluban Beach",
        location: "Uluwatu, Bukit Peninsula",
        cost: "Low-cost access and parking",
        timing: "Daylight hours; check tides",
        overview:
          "Suluban’s cave-like access and cliff setting make it one of Bali’s most cinematic beaches. The journey down is part of the experience, with narrow steps and rocky passages leading toward surf and sea views.",
        practical:
          "Wear secure footwear for the stairs and check the tide before you go, as shoreline access and swimming conditions can change. Travel light because the climb back up is real.",
        tip:
          "Insider tip: pair Suluban with Uluwatu in the same area, but leave enough daylight for the return climb rather than arriving near sunset without a plan.",
      },
      {
        number: 22,
        title: "Try a freediving introduction in Amed",
        location: "Amed, east Bali",
        cost: "Introductory course or guided session",
        timing: "Morning when the sea is often calmer",
        overview:
          "Amed’s quieter east-coast setting is a natural base for freediving and reef-oriented water time. An introductory session focuses on breathing, safety, and controlled technique rather than pushing depth or performance.",
        practical:
          "Choose a certified instructor, be honest about your swimming confidence, and never freedive alone. Keep the day before and after relaxed, especially if you are also travelling long distances across the island.",
        tip:
          "Insider tip: stay in Amed for at least one night if possible; the dawn light and slower pace are part of why the experience feels different from the south.",
      },
      {
        number: 23,
        title: "Eat grilled fish in Amed",
        location: "Amed coastline, east Bali",
        cost: "Budget to mid-range local dinner",
        timing: "Sunset or early evening",
        overview:
          "Amed’s fishing-village character makes a simple grilled fish dinner feel especially fitting after a day in or near the water. The shoreline is quieter than the south, and the meal is best enjoyed without an ambitious evening schedule afterward.",
        practical:
          "Ask what was landed locally that day, confirm preparation and price, and choose a spot close enough to your accommodation that you do not need a late-night transfer. Mosquito repellent can be useful near the shore.",
        tip:
          "Insider tip: order a little before sunset, then take your time; the relaxed coastal mood is more memorable than trying to chase a nightlife plan elsewhere.",
      },
    ],
  },
  {
    title: "Food and Markets",
    eyebrow: "Taste the island",
    intro:
      "Bali’s food scene ranges from market breakfasts and classic warungs to inventive restaurant kitchens. Use these experiences to build flavour into the itinerary rather than treating every meal as an interruption between sights.",
    experiences: [
      {
        number: 24,
        title: "Eat babi guling at a local warung",
        location: "Ubud and across the island",
        cost: "Budget to mid-range meal",
        timing: "Lunch is often the most popular time",
        overview:
          "Babi guling is one of Bali’s best-known local dishes, with richly seasoned roast pork served alongside rice and accompaniments. It is a practical way to taste a classic Balinese meal in a no-frills, everyday setting.",
        practical:
          "Go hungry, ask about spice level, and note that it is not suitable for vegetarian or halal diets. Popular warungs can sell out, so an earlier lunch is often easier.",
        tip:
          "Insider tip: choose a busy local lunch spot rather than a heavily polished tourist version if you want the meal to feel more rooted in daily life.",
      },
      {
        number: 25,
        title: "Try Babi Guling or Bebek Betutu",
        location: "Ubud, Seminyak, and regional warungs",
        cost: "Budget to mid-range meal",
        timing: "Lunch or dinner",
        overview:
          "Bebek betutu, a deeply seasoned slow-cooked duck dish, is a useful alternative when you want a richer, slower meal with Balinese spice profiles. It turns a food stop into a proper dining experience rather than a quick snack.",
        practical:
          "Ask whether the dish needs advance ordering, because slow-cooked preparations can have limited daily portions. Vegetarian travellers should look for dedicated plant-based Balinese menus instead of assuming substitutions are available.",
        tip:
          "Insider tip: order one signature dish to share with sides if you are travelling as a pair, then leave space for a local dessert or fruit drink.",
      },
      {
        number: 26,
        title: "Visit a morning market",
        location: "Ubud, Gianyar, and local towns",
        cost: "Free to browse; food and purchases vary",
        timing: "Early morning",
        overview:
          "A morning market reveals the everyday ingredients behind Bali’s food culture: tropical fruit, herbs, flowers, snacks, spices, and household essentials. It is at its most vivid when vendors and local shoppers are still doing the real work of the day.",
        practical:
          "Arrive early, carry small cash, and expect a more functional market atmosphere than a curated souvenir experience. Ask before photographing stalls or people closely.",
        tip:
          "Insider tip: combine the market with a cooking class or local breakfast so the visit has a clear connection to what you will eat later.",
      },
      {
        number: 27,
        title: "Have a coffee in Canggu",
        location: "Canggu",
        cost: "Budget to mid-range café stop",
        timing: "Morning or post-surf break",
        overview:
          "Canggu’s café culture is easy to fold into a beach day, with coffee, breakfast bowls, and a social atmosphere that suits a slower start. It is a reliable choice when you need a work-friendly or weather-proof pause between outdoor plans.",
        practical:
          "Choose a café within walking distance of your next stop to avoid short but frustrating traffic hops. If you plan to work, confirm Wi-Fi and outlet access before settling in for hours.",
        tip:
          "Insider tip: order early and leave before the late-morning rush if you want the relaxed version of Canggu rather than the busiest tables.",
      },
      {
        number: 28,
        title: "Eat at a Ubud farm-to-table restaurant",
        location: "Ubud and surrounding villages",
        cost: "Mid-range to premium dining",
        timing: "Lunch or a planned dinner",
        overview:
          "Ubud’s farm-to-table kitchens make an easy bridge between Bali’s local produce and more contemporary dining. A thoughtful meal here works well after a morning in the rice fields or before an evening performance in town.",
        practical:
          "Reserve ahead for popular restaurants and let the staff know about dietary needs early. Dress comfortably but plan for the possibility of a cooler evening after rain.",
        tip:
          "Insider tip: choose lunch if you want the same quality with more daylight and a slightly calmer pace than the peak dinner window.",
      },
      {
        number: 29,
        title: "Try a beach club in Seminyak",
        location: "Seminyak",
        cost: "Spend varies; some venues have minimums or reservations",
        timing: "Late afternoon into sunset",
        overview:
          "A Seminyak beach club can be a polished way to combine pool time, snacks, music, and sunset views in one stop. It is best treated as an intentional half-day experience rather than an impulsive evening dash.",
        practical:
          "Check booking, minimum-spend, and dress requirements in advance, particularly for weekends or sunset tables. Keep expectations realistic about noise and crowds if you prefer quiet beach time.",
        tip:
          "Insider tip: arrive in the earlier afternoon, claim a comfortable base, and enjoy the gradual transition into sunset rather than arriving only for the busiest hour.",
      },
      {
        number: 30,
        title: "Book a sunset dinner in Uluwatu",
        location: "Uluwatu and Bukit Peninsula",
        cost: "Mid-range to premium dining",
        timing: "Sunset reservation",
        overview:
          "Uluwatu’s clifftop restaurants turn dinner into a view-led experience, especially after a temple visit or beach afternoon. The setting suits a celebratory meal, a couple’s evening, or simply a chance to slow down after a day of driving.",
        practical:
          "Book a table timed just before sunset and build in transfer time, because Bukit traffic can be slower than it appears on a map. Bring a light layer for breezy clifftops.",
        tip:
          "Insider tip: choose one scenic dinner in Uluwatu for the trip, then keep the rest of your meals flexible so the experience feels special rather than routine.",
      },
    ],
  },
  {
    title: "Wellness and Relaxation",
    eyebrow: "Slow down",
    intro:
      "Wellness in Bali can be as simple as a long massage, a quiet café morning, or a carefully chosen retreat. These are not filler activities: they make the more energetic days feel better and help the itinerary breathe.",
    experiences: [
      {
        number: 31,
        title: "Book a Balinese massage",
        location: "Across the island",
        cost: "Budget local spa to premium resort treatment",
        timing: "Late afternoon or recovery day",
        overview:
          "A Balinese massage is one of the easiest ways to add restoration to an active itinerary. It can be a modest local spa visit or a more immersive resort treatment depending on your budget and preferred setting.",
        practical:
          "Choose a reputable spa, state your pressure preference clearly, and avoid scheduling immediately after a long sun-heavy beach day if you are dehydrated. Leave enough time afterward to move slowly rather than rushing into traffic.",
        tip:
          "Insider tip: book the massage after a hike, surf lesson, or long transfer day so it supports the rest of your itinerary rather than competing with it.",
      },
      {
        number: 32,
        title: "Try sound healing in Ubud",
        location: "Ubud",
        cost: "Low to mid-range group session",
        timing: "Evening or a deliberately slow afternoon",
        overview:
          "Ubud’s sound-healing sessions offer a contemplative counterpoint to markets, museums, and motorbike traffic. They suit travellers who are curious about wellness practices and want an evening that is quieter than a restaurant or show.",
        practical:
          "Reserve a session with clear arrival instructions and leave your phone on silent once inside. Choose a time when you are not exhausted from a full-day excursion so you can actually settle into the experience.",
        tip:
          "Insider tip: pair sound healing with a light dinner nearby and avoid overplanning the evening; the effect is better when you do not need to rush away.",
      },
      {
        number: 33,
        title: "Join a yoga class in Canggu",
        location: "Canggu",
        cost: "Low to mid-range drop-in class",
        timing: "Morning or late afternoon",
        overview:
          "Canggu’s yoga scene gives beach-focused travellers an easy way to start or end the day with structure. Studios range from gentle flow classes to more challenging sessions, so you can choose an experience that matches your energy.",
        practical:
          "Book popular time slots ahead and check whether the class is beginner-friendly if you are new. Hydrate well in the tropical heat and leave a buffer for traffic if your studio is not walkable.",
        tip:
          "Insider tip: use a morning class to anchor a Canggu day, then head straight to breakfast or the beach instead of crossing town during peak traffic.",
      },
      {
        number: 34,
        title: "Soak in Toya Devasya hot springs",
        location: "Kintamani",
        cost: "Entry fee; food and transport extra",
        timing: "Late morning after Mount Batur or a cooler afternoon",
        overview:
          "The Toya Devasya hot springs offer a soothing Kintamani reset with views toward the caldera landscape. They are especially appealing after an early Mount Batur hike, when warm water and a slower pace feel earned.",
        practical:
          "Bring swimwear, a towel, and dry clothes for the drive afterward. Check current opening conditions and avoid arriving at the same peak moment as large tour groups if you want more space.",
        tip:
          "Insider tip: combine the springs with a scenic Kintamani lunch, but keep the afternoon flexible rather than forcing another long drive.",
      },
      {
        number: 35,
        title: "Stay at an Ubud wellness retreat",
        location: "Ubud and surrounding countryside",
        cost: "Mid-range to luxury, depending on programme",
        timing: "Two nights or more for the fullest effect",
        overview:
          "An Ubud wellness retreat can turn one part of a Bali trip into a deliberate pause, combining calmer accommodation with yoga, treatments, nourishing meals, or guided nature time. It is most valuable when you give it enough space in the itinerary to feel different from a normal hotel stay.",
        practical:
          "Compare programme inclusions, transfer logistics, and cancellation terms before booking. Choose a minimum two-night stay if you want the retreat rhythm to feel meaningful rather than compressed.",
        tip:
          "Insider tip: schedule the retreat midway through a longer Bali trip to reset after active beach and sightseeing days before moving on to another region.",
      },
    ],
  },
  {
    title: "Adventure and Unique Experiences",
    eyebrow: "Move differently",
    intro:
      "These experiences add a little more momentum to a Bali itinerary. Book responsible operators, match activities to your confidence, and resist stacking every adventure into the same high-energy day.",
    experiences: [
      {
        number: 36,
        title: "Cycle through countryside villages",
        location: "Ubud, Kintamani, and central Bali",
        cost: "Guided half-day ride",
        timing: "Morning for cooler temperatures",
        overview:
          "A countryside bike ride lets you see Bali at a human pace, passing temple gates, small farms, rice fields, and village roads that a car journey skips. It is a gentle adventure when routes and support are matched to your fitness level.",
        practical:
          "Choose a guided route with clear terrain information, water stops, and vehicle support if needed. Wear sun protection and avoid the hottest middle hours when cycling feels less forgiving.",
        tip:
          "Insider tip: pick a downhill-oriented route from higher ground if you want the scenery without turning the experience into an endurance test.",
      },
      {
        number: 37,
        title: "Ride an ATV through jungle trails",
        location: "Ubud and central Bali",
        cost: "Guided activity with equipment",
        timing: "Morning or early afternoon",
        overview:
          "An ATV ride adds muddy trails, jungle scenery, and a more playful edge to a Ubud-area day. It works well for travellers who want an organised thrill without needing advanced outdoor experience.",
        practical:
          "Wear clothes you do not mind getting dirty, follow the guide’s safety briefing, and confirm insurance or injury waiver details before departure. Rain can make the trail more dramatic but also more slippery.",
        tip:
          "Insider tip: schedule your ATV ride before a spa or pool afternoon, not before a formal dinner or long transfer when you may still be wet and muddy.",
      },
      {
        number: 38,
        title: "Raft the Ayung River",
        location: "Near Ubud",
        cost: "Guided rafting trip",
        timing: "Morning or early afternoon",
        overview:
          "Ayung River rafting mixes easygoing rapids with lush river scenery and a welcome dose of adventure close to Ubud. The emphasis is usually on a guided, social outing rather than extreme white-water performance.",
        practical:
          "Wear secure sandals, use the provided safety equipment, and ask about current river levels after heavy rain. Keep valuables in the operator’s dry storage rather than relying on a pocket.",
        tip:
          "Insider tip: treat rafting as the day’s main activity and leave time for a slow lunch and shower afterward instead of stacking another major excursion.",
      },
      {
        number: 39,
        title: "Visit a monkey forest responsibly",
        location: "Ubud",
        cost: "Entry fee",
        timing: "Morning or later afternoon",
        overview:
          "Ubud’s monkey forest offers a memorable walk among temples, giant trees, and long-tailed macaques, but it requires calm, respectful behaviour around wildlife. The experience is better when you treat it as a managed conservation setting, not a place to force close encounters.",
        practical:
          "Secure glasses, jewellery, snacks, and loose items before entering, and follow staff guidance if a monkey approaches. Do not feed, touch, or chase the animals for photographs.",
        tip:
          "Insider tip: visit at a quieter time and keep your camera ready from a respectful distance; patient observation produces better moments than trying to get a selfie.",
      },
      {
        number: 40,
        title: "Shop for silver in Celuk",
        location: "Celuk, between Ubud and Sanur",
        cost: "Free to browse; purchases vary",
        timing: "Daytime, paired with central Bali sights",
        overview:
          "Celuk is known for its silver craft traditions and makes a useful stop for travellers looking for a more specific souvenir than a standard market purchase. Workshops and galleries can reveal the process behind jewellery and small decorative pieces.",
        practical:
          "Compare craftsmanship, ask about materials and pricing, and keep receipts for higher-value purchases. Make the stop part of a route between Ubud and the south rather than a standalone drive.",
        tip:
          "Insider tip: buy only what you genuinely love; the best souvenir is a wearable or useful piece with a clear memory attached to the visit.",
      },
      {
        number: 41,
        title: "Learn a Balinese dance class",
        location: "Ubud and cultural studios",
        cost: "Low to mid-range workshop",
        timing: "Afternoon or early evening",
        overview:
          "A Balinese dance workshop makes performance culture more personal by introducing the hand, eye, posture, and rhythm details behind what you see on stage. It is enjoyable even for beginners because the aim is participation and appreciation, not perfection.",
        practical:
          "Wear comfortable clothes and choose a small-group class if you want more feedback. Plan it on a day when you are not carrying beach bags or rushing straight from a long transfer.",
        tip:
          "Insider tip: attend a dance performance later in the trip; you will notice far more once you have tried a few of the movements yourself.",
      },
      {
        number: 42,
        title: "Walk at sunrise on Sanur Beach",
        location: "Sanur",
        cost: "Free",
        timing: "Sunrise",
        overview:
          "Sanur’s east-facing shoreline is one of Bali’s gentler places to begin the day, with a paved waterfront path and a softer, early-morning atmosphere. It is a simple experience, but the calm light and local routine make it memorable.",
        practical:
          "Wake early, bring water and a light cover-up, and plan breakfast nearby afterward. The path is ideal for a relaxed walk rather than an all-day beach programme.",
        tip:
          "Insider tip: use Sanur sunrise as your first morning in Bali if you arrive tired; it sets a calmer pace than forcing a full sightseeing day immediately.",
      },
      {
        number: 43,
        title: "Take a photography tour in Ubud",
        location: "Ubud and nearby rice fields",
        cost: "Private or small-group guided tour",
        timing: "Sunrise, golden hour, or half-day",
        overview:
          "A photography tour helps you move beyond the obvious viewpoints by pairing local route knowledge with light-aware timing. It can be useful whether you shoot on a phone or camera because the value lies in the route, pacing, and perspective.",
        practical:
          "Choose a guide whose style matches your interests—landscape, portraits, street scenes, or food—and confirm transport and walking requirements. Bring backup battery power and rain protection for your equipment.",
        tip:
          "Insider tip: select sunrise or first light for better conditions and a calmer experience than a midday photo circuit.",
      },
    ],
  },
  {
    title: "Day Trips and Island Escapes",
    eyebrow: "Beyond the south",
    intro:
      "Bali rewards travellers who do not stay in one resort bubble for the entire trip. These longer excursions work best when you minimise backtracking and accept that the journey is part of the experience.",
    experiences: [
      {
        number: 44,
        title: "Spend a day on Nusa Penida",
        location: "Nusa Penida",
        cost: "Boat, local transport, and access fees",
        timing: "Full day or overnight",
        overview:
          "If you skipped Nusa Penida earlier in the trip, make it the centrepiece of an island-escape day rather than a rushed detour. The dramatic coastal views are the draw, but the pace of the day depends on boat schedules and road travel.",
        practical:
          "Reserve a reliable boat and driver, pack light, and choose a realistic route. A day trip is possible, but an overnight stay gives you more room for slower mornings and fewer crowds.",
        tip:
          "Insider tip: decide in advance whether you want viewpoints, beaches, or snorkelling; selecting one priority makes the logistics much more rewarding.",
      },
      {
        number: 45,
        title: "Slow down on Nusa Lembongan",
        location: "Nusa Lembongan",
        cost: "Boat fare, local transport, and accommodation if overnight",
        timing: "One night is ideal",
        overview:
          "Nusa Lembongan makes a good counterweight to Bali’s busier destinations, with coastal roads, seaweed-farming views, and an unhurried island scale. It is less about ticking off attractions and more about leaving enough space to look at the water.",
        practical:
          "Use a small bag for the boat crossing and confirm the drop-off conditions before departure. The island is easy to enjoy on foot in some areas, but transport planning still matters for wider exploration.",
        tip:
          "Insider tip: stay near the water and plan nothing ambitious for the evening; a simple sunset meal is often exactly the right amount of activity.",
      },
      {
        number: 46,
        title: "Drive to Munduk and its waterfalls",
        location: "North Bali",
        cost: "Transport, small entry fees, and optional guide",
        timing: "Full day or overnight from central/south Bali",
        overview:
          "Munduk offers cooler air, plantations, and forest waterfalls that feel distinct from the south’s beach rhythm. It is a strong choice for travellers who want to see a greener, less resort-focused side of the island.",
        practical:
          "Treat Munduk as a long journey from the south and consider an overnight stay if your itinerary allows. Bring a rain layer, solid walking shoes, and a flexible plan because mountain weather can change quickly.",
        tip:
          "Insider tip: choose one or two waterfall walks and a scenic lunch rather than attempting every listed stop in a single, exhausting drive.",
      },
      {
        number: 47,
        title: "Visit Lovina for a quieter north coast",
        location: "Lovina, north Bali",
        cost: "Transport and optional water activities",
        timing: "Overnight or multi-day north-Bali route",
        overview:
          "Lovina’s calmer north-coast pace offers a useful contrast to Seminyak, Canggu, and Uluwatu. It can work as part of a broader route through Munduk, Bedugul, or the island’s eastern side.",
        practical:
          "Plan an overnight if you are coming from the south; the distance makes a simple day trip feel rushed. Choose wildlife activities carefully and prioritise operators that emphasise respectful observation.",
        tip:
          "Insider tip: arrive before dark, settle into your accommodation, and use the first evening for a quiet seaside dinner rather than driving more after a long transfer.",
      },
      {
        number: 48,
        title: "Explore Amed’s coastal villages",
        location: "Amed, east Bali",
        cost: "Transport, accommodation, and optional snorkelling/diving",
        timing: "At least one night",
        overview:
          "Amed’s coastal villages are a welcome east-Bali base for travellers who value a slower pace, sea views, and a more local feel. It pairs naturally with snorkelling, freediving, and a scenic route via Kintamani or Sidemen.",
        practical:
          "Stay overnight to make the long drive worthwhile and keep your plans simple once you arrive. Road conditions and travel time mean Amed is best treated as a distinct chapter of the trip.",
        tip:
          "Insider tip: choose accommodation with a view and build in a no-plan morning; Amed’s quiet pace is part of the attraction.",
      },
      {
        number: 49,
        title: "Walk through Sidemen’s valley landscapes",
        location: "Sidemen, east-central Bali",
        cost: "Low-cost village walks; guide or driver optional",
        timing: "Early morning or late afternoon",
        overview:
          "Sidemen offers a gentler countryside chapter of Bali, with rice fields, village roads, and a sense of space that feels very different from the busier southern coast. It is ideal for travellers who want to trade a packed sightseeing day for slow walking and a view-led lunch.",
        practical:
          "Consider an overnight stay if you are travelling from the south, or make Sidemen part of a route between Ubud and east Bali. Wear shoes that can handle uneven paths and bring rain protection in changeable weather.",
        tip:
          "Insider tip: ask your accommodation or local host for a short walk matched to the conditions that day rather than following a fixed online route without local context.",
      },
      {
        number: 50,
        title: "Visit Bedugul and the lakeside highlands",
        location: "Central highlands, north of Ubud",
        cost: "Transport and individual attraction entry fees",
        timing: "Morning through early afternoon",
        overview:
          "Bedugul’s cooler air, lake views, and highland gardens make it a refreshing counterpoint to beach and jungle days. It is a good choice when you want a scenic drive with a completely different Bali climate and pace.",
        practical:
          "Pack a light layer because the highlands can feel noticeably cooler and wetter than the south. Combine one or two stops thoughtfully rather than trying to turn the day into a long list of roadside attractions.",
        tip:
          "Insider tip: visit on a day when you welcome cloud cover and cooler temperatures; Bedugul is about atmosphere as much as landmark collecting.",
      },
    ],
  },
] as const;

const relatedArticles = [
  {
    title: "Best Hotels in Bali for Every Budget 2026",
    copy: "Choose a Bali base that fits your budget, trip style, and preferred region.",
    href: "/blog/best-hotels-bali-2026",
  },
  {
    title: "Where to Stay in Bali: Best Areas for First-Timers",
    copy: "Compare Seminyak, Ubud, Canggu, and Uluwatu to choose the Bali base that fits your first trip.",
    href: "/blog/where-to-stay-in-bali-2026",
  },
  {
    title: "Tokyo vs Bangkok — Which Should You Visit First?",
    copy: "A practical comparison for planning your next Asia itinerary.",
    href: "/blog/tokyo-vs-bangkok-2026",
  },
  {
    title: "7 Best Cities to Visit in Europe This Summer",
    copy: "Keep the inspiration going with our favourite European city breaks.",
    href: "/blog/best-cities-europe-summer-2026",
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
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]">X</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#c9dde9] bg-white px-3 py-1.5 text-xs font-semibold text-[#0077b6] transition-colors hover:border-[#0077b6] hover:bg-[#edf8fd]">LinkedIn</a>
    </div>
  );
}

function ExperienceWidget({ label }: { label: string }) {
  return (
    <section className="my-12 rounded-3xl border border-[#eadfc6] bg-[#f8efe0] px-3 py-2 shadow-[0_18px_40px_rgba(23,54,74,0.06)]">
      <p className="px-5 pt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#b3842d]">Book trusted Bali experiences</p>
      <GetYourGuideTours
        label={label}
        showHeadline={false}
        showButton={false}
        cardStyle
        fallbackHref={BALI_EXPERIENCES_AFFILIATE_LINKS.tours}
        fallbackLabel="Browse Bali tours"
      />
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <section id={`experience-${experience.number}`} className="scroll-mt-28 rounded-3xl border border-[#dae4e9] bg-white p-6 shadow-[0_12px_28px_rgba(23,54,74,0.05)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b3842d]">Experience {experience.number}</p>
          <h3 className="mt-2 font-playfair text-2xl font-bold text-[#17364a] sm:text-3xl">{experience.title}</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5fa] px-3 py-1.5 text-xs font-semibold text-[#0077b6]"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {experience.location}</span>
      </div>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-[#f7fafb] px-4 py-3"><span className="font-semibold text-[#17364a]">Best time:</span> <span className="text-slate-600">{experience.timing}</span></div>
        <div className="rounded-xl bg-[#f7fafb] px-4 py-3"><span className="font-semibold text-[#17364a]">Typical cost:</span> <span className="text-slate-600">{experience.cost}</span></div>
      </div>
      <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-slate-700">
        <p>{experience.overview}</p>
        <p>{experience.practical}</p>
        <p className="rounded-xl bg-[#fff8ef] p-4 text-slate-700"><strong className="text-[#17364a]">{experience.tip}</strong></p>
      </div>
    </section>
  );
}

export default function BlogBaliExperiences() {
  const metadata = pageMetadataConfig.baliExperiencesGuide;
  const tags = generateMetaTags(metadata);

  return (
    <div className="min-h-screen bg-[#fdfcf9] pb-20 md:pb-0">
      <Head title={tags.title} description={tags.description} canonical={tags.canonical} ogTitle={tags.ogTitle} ogDescription={tags.ogDescription} ogImage={tags.ogImage} ogUrl={tags.ogUrl} keywords={tags.keywords} />
      <BlogArticleSchema title={articleMetadata.title} description={articleMetadata.description} image={`https://thestayandwander.com${articleMetadata.image}`} author={articleMetadata.author} datePublished={articleMetadata.publishedDate} url={ARTICLE_URL} />
      <Header />

      <main>
        <section className="relative isolate min-h-[34rem] overflow-hidden bg-[#0d1b2a] text-white sm:min-h-[39rem]">
          <img src={articleMetadata.image} alt="Sunlit Tegallalang rice terraces in Bali with layered emerald-green fields and soft tropical morning mist" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,27,42,0.92)_0%,rgba(13,27,42,0.74)_46%,rgba(13,27,42,0.16)_100%)]" />
          <div className="container flex min-h-[34rem] items-end px-4 py-14 sm:min-h-[39rem] sm:py-20">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c56c]">{articleMetadata.category}</p>
              <h1 className="font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{articleMetadata.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-100 sm:text-xl">From cliffside temples and rice terraces to island crossings, market breakfasts, and restorative spa time, use this 2026 guide to shape a Bali trip with real rhythm.</p>
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
              <div className="border-b border-[#d9e4ea] pb-8"><ShareRow placement="top" /></div>

              <section className="py-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b3842d]">A practical island guide</p>
                <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-[#17364a] sm:text-4xl">Bali is more than a beach destination</h2>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
                  <p>Bali can be a temple sunrise, a long lunch in Ubud, a surf lesson on the coast, or a slow boat to a quieter island. The best version of the trip is not the one that crams in every viewpoint; it is the one that pairs high-energy days with space to rest, eat well, and take the longer scenic road when it counts.</p>
                  <p>This guide brings together 50 experiences across culture, nature, food, water, wellness, and island escapes. Use it as a menu rather than a mandate: choose a handful from each region, cluster them geographically, and leave the rest for a future return.</p>
                </div>
                <div className="mt-8 rounded-2xl border-l-4 border-[#f4a261] bg-[#fff8ef] p-6 text-slate-700 shadow-[0_12px_30px_rgba(13,27,42,0.05)]">
                  <p className="font-semibold text-[#17364a]">Quick planning note</p>
                  <p className="mt-2 leading-relaxed">Traffic and weather can reshape a Bali day quickly. Build generous transfer buffers, start outdoors early, and keep a spa, café, or restaurant backup in mind for afternoon rain.</p>
                </div>
              </section>

              <ExperienceWidget label="Top Bali tours and experiences" />

              {experienceCategories.map((category, categoryIndex) => (
                <div key={category.title}>
                  <section className="mb-8 scroll-mt-28" id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b3842d]">{category.eyebrow}</p>
                    <h2 className="mt-2 font-playfair text-3xl font-bold text-[#17364a] sm:text-4xl">{category.title}</h2>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">{category.intro}</p>
                  </section>
                  <div className="space-y-6">{category.experiences.map((experience) => <ExperienceCard key={experience.number} experience={experience} />)}</div>
                  {categoryIndex === 0 && <ExperienceWidget label="Explore culture-led Bali activities" />}
                  {categoryIndex === 2 && <ExperienceWidget label="Find Bali beach and island experiences" />}
                </div>
              ))}

              <section className="mt-14 rounded-3xl border border-[#dae4e9] bg-white p-6 shadow-[0_16px_36px_rgba(23,54,74,0.06)] sm:p-8">
                <div className="flex items-center gap-3"><BedDouble className="h-6 w-6 text-[#0077b6]" aria-hidden="true" /><h2 className="font-playfair text-3xl font-bold text-[#17364a]">Where to stay in Bali</h2></div>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">Base yourself by the type of trip you want, then compare live availability and cancellation terms before booking. The areas below are a useful starting point rather than a fixed rule.</p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#d9e4ea]">
                  <table className="w-full min-w-[42rem] text-left text-sm">
                    <thead className="bg-[#17364a] text-white"><tr><th className="px-4 py-3 font-semibold">Area</th><th className="px-4 py-3 font-semibold">Best for</th><th className="px-4 py-3 font-semibold">Typical nightly budget</th><th className="px-4 py-3 font-semibold">Hotel search</th></tr></thead>
                    <tbody className="divide-y divide-[#e5edf1] text-slate-700">
                      {[['Seminyak','Upscale dining, beach clubs, and a polished base','$80–250+','Seminyak hotels'],['Canggu','Surf, cafés, social energy, and longer stays','$50–200+','Canggu hotels'],['Ubud','Culture, jungle views, wellness, and rice terraces','$45–220+','Ubud hotels'],['Uluwatu','Cliffs, surf, sunsets, and romantic stays','$70–300+','Uluwatu hotels'],['Nusa Dua','Resort comfort, calm water, and family-friendly beaches','$90–350+','Nusa Dua hotels']].map(([area, bestFor, budget, label]) => <tr key={area}><td className="px-4 py-4 font-semibold text-[#17364a]">{area}</td><td className="px-4 py-4">{bestFor}</td><td className="px-4 py-4">{budget}</td><td className="px-4 py-4"><a href={BALI_EXPERIENCES_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077b6] hover:text-[#005c91]">{label} ↗</a></td></tr>)}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-10 rounded-3xl border border-[#eadfc6] bg-[#fff8ef] p-6 sm:p-8">
                <div className="flex items-center gap-3"><Ticket className="h-6 w-6 text-[#b3842d]" aria-hidden="true" /><h2 className="font-playfair text-3xl font-bold text-[#17364a]">Bali budget guide for 2026</h2></div>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">Costs vary by season, region, and travel style. Use these broad bands to plan before checking live hotel, flight, and activity prices for your exact dates.</p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#eadfc6] bg-white">
                  <table className="w-full min-w-[38rem] text-left text-sm"><thead className="bg-[#f4a261] text-[#17364a]"><tr><th className="px-4 py-3 font-semibold">Travel style</th><th className="px-4 py-3 font-semibold">Daily guide</th><th className="px-4 py-3 font-semibold">What it can include</th></tr></thead><tbody className="divide-y divide-[#f0e4d4] text-slate-700"><tr><td className="px-4 py-4 font-semibold text-[#17364a]">Budget</td><td className="px-4 py-4">$45–80</td><td className="px-4 py-4">Guesthouse stays, warung meals, local transport, and selected low-cost sights.</td></tr><tr><td className="px-4 py-4 font-semibold text-[#17364a]">Mid-range</td><td className="px-4 py-4">$100–180</td><td className="px-4 py-4">Comfortable hotels, drivers for selected days, dining variety, and guided activities.</td></tr><tr><td className="px-4 py-4 font-semibold text-[#17364a]">Luxury</td><td className="px-4 py-4">$300+</td><td className="px-4 py-4">High-end villas or resorts, private transfers, spa time, and premium dining.</td></tr></tbody></table>
                </div>
              </section>

              <ExperienceWidget label="Reserve your final Bali experiences" />

              <section className="mt-12 rounded-3xl bg-[#0077b6] px-6 py-9 text-white shadow-[0_18px_40px_rgba(0,119,182,0.22)] sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f7d89a]">Build your Bali itinerary</p>
                <h2 className="mt-3 font-playfair text-3xl font-bold sm:text-4xl">Ready to turn the list into a real trip?</h2>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#e8f6fb]">Compare live hotel options, look for flights that work with your dates, and book the experiences that matter most before popular times sell out.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <a href={BALI_EXPERIENCES_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer"><Button className="h-auto w-full bg-white px-4 py-3 font-semibold text-[#0077b6] hover:bg-[#f8efe0]"><BedDouble className="mr-2 h-4 w-4" aria-hidden="true" /> Find Bali hotels</Button></a>
                  <a href={BALI_EXPERIENCES_AFFILIATE_LINKS.flights} target="_blank" rel="noopener noreferrer"><Button className="h-auto w-full bg-[#f4a261] px-4 py-3 font-semibold text-[#17364a] hover:bg-[#f0b078]"><Plane className="mr-2 h-4 w-4" aria-hidden="true" /> Search flights to Bali</Button></a>
                  <a href={BALI_EXPERIENCES_AFFILIATE_LINKS.tours} target="_blank" rel="noopener noreferrer"><Button className="h-auto w-full border border-white/50 bg-transparent px-4 py-3 font-semibold text-white hover:bg-white/10"><Sparkles className="mr-2 h-4 w-4" aria-hidden="true" /> Book Bali tours</Button></a>
                </div>
              </section>

              <section className="mt-14">
                <div className="flex items-center gap-3"><Landmark className="h-6 w-6 text-[#0077b6]" aria-hidden="true" /><h2 className="font-playfair text-3xl font-bold text-[#17364a]">Continue planning</h2></div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">{relatedArticles.map((article) => <Card key={article.href} className="border-[#dae4e9] bg-white shadow-[0_12px_28px_rgba(23,54,74,0.05)]"><CardContent className="p-6"><h3 className="font-playfair text-xl font-bold text-[#17364a]">{article.title}</h3><p className="mt-3 leading-relaxed text-slate-600">{article.copy}</p><Link href={article.href} className="mt-5 inline-flex items-center font-semibold text-[#0077b6] hover:text-[#005c91]">Read article <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></CardContent></Card>)}</div>
              </section>

              <section className="mt-12 border-t border-[#d9e4ea] pt-8"><ShareRow placement="bottom" /></section>
              <section className="mt-10 rounded-2xl border border-[#eadfc6] bg-[#fff8ef] p-5 text-sm leading-relaxed text-slate-600"><p className="font-semibold text-[#17364a]">Affiliate disclosure</p><p className="mt-2">Some links in this guide are affiliate links. If you book through them, The Stay &amp; Wander may earn a commission at no extra cost to you. We only share destinations and planning tools we believe can help you build a more considered trip.</p></section>
            </article>

            <aside className="space-y-7 lg:sticky lg:top-24 lg:self-start">
              <Card className="border-[#d7e7ee] bg-[#edf8fd] shadow-[0_16px_36px_rgba(23,54,74,0.06)]"><CardContent className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">Start here</p><h2 className="mt-3 font-playfair text-2xl font-bold text-[#17364a]">Build a realistic Bali route</h2><p className="mt-3 leading-relaxed text-slate-600">Choose a region for each two or three nights, then use one or two experiences from this guide per day. Less crossing of the island means more time actually enjoying it.</p><a href={BALI_EXPERIENCES_AFFILIATE_LINKS.hotels} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center font-semibold text-[#0077b6] hover:text-[#005c91]">Compare Bali hotels <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a></CardContent></Card>
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
