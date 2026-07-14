# Affiliate Links Setup Guide

This guide explains how to configure and use your Travelpayout and other affiliate links in The Stay & Wander website.

---

## 📋 Quick Start

### 1. Get Your Affiliate IDs

**Travelpayout:**
- Sign up at [travelpayouts.com](https://travelpayouts.com)
- Go to Settings → API Keys
- Copy your **Affiliate ID** and **API Token**

**Booking.com:**
- Sign up at [partner.booking.com](https://partner.booking.com)
- Go to Tools → Affiliate Links
- Copy your **Affiliate ID**

### 2. Update Configuration File

Open `client/src/lib/affiliateLinks.ts` and replace the placeholder values:

```typescript
// Line 21: Replace with your Travelpayout Affiliate ID
const TRAVELPAYOUT_AFFILIATE_ID = "YOUR_ACTUAL_AFFILIATE_ID";

// Line 40: Replace with your Booking.com Affiliate ID
const BOOKING_AFFILIATE_ID = "YOUR_ACTUAL_BOOKING_ID";
```

### 3. Add Your Travelpayout Search Keys

To get search keys from Travelpayout:

1. Go to [travelpayouts.com/developers/api](https://travelpayouts.com/developers/api)
2. Use the API to search for flights:
   ```bash
   curl "https://api.travelpayouts.com/v2/prices/latest?origin=LHR&destination=NRT&token=YOUR_TOKEN"
   ```
3. Copy the `search_key` from the response
4. Update the configuration:

```typescript
flights: {
  london_tokyo: {
    route: "London → Tokyo",
    searchKey: "YOUR_ACTUAL_SEARCH_KEY", // Paste here
    price: "From $620",
    link: generateTravelpayoutLink("YOUR_ACTUAL_SEARCH_KEY", "london-tokyo"),
    category: "flight",
    network: "travelpayout",
  },
}
```

---

## 🔗 Using Affiliate Links in Components

### Example 1: Display Flight Deals

```typescript
// client/src/components/FlightDeals.tsx
import { affiliateLinks, trackAffiliateClick } from "@/lib/affiliateLinks";
import { Button } from "@/components/ui/button";

export function FlightDeals() {
  const deals = Object.values(affiliateLinks.flights);

  return (
    <div className="grid grid-cols-3 gap-6">
      {deals.map((deal) => (
        <div key={deal.route} className="card">
          <h3>{deal.route}</h3>
          <p className="text-2xl font-bold">{deal.price}</p>
          <Button
            onClick={() => {
              trackAffiliateClick("travelpayout", "flight", deal.route);
              window.open(deal.link, "_blank");
            }}
          >
            Book Flight
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Hotel Search Widget

```typescript
// client/src/components/HotelWidget.tsx
import { affiliateLinks, generateBookingLink } from "@/lib/affiliateLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function HotelWidget() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {
    const link = generateBookingLink(destination, checkIn, checkOut);
    trackAffiliateClick("booking", "hotel", destination);
    window.open(link, "_blank");
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <Input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <Input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <Button onClick={handleSearch} className="w-full">
        Search Hotels
      </Button>
    </div>
  );
}
```

### Example 3: Itinerary Booking Links

```typescript
// client/src/components/ItineraryCard.tsx
import { affiliateLinks, trackAffiliateClick } from "@/lib/affiliateLinks";
import { Button } from "@/components/ui/button";

export function ItineraryCard({ itineraryKey }: { itineraryKey: string }) {
  const itinerary = affiliateLinks.itineraries[itineraryKey as keyof typeof affiliateLinks.itineraries];

  if (!itinerary) return null;

  return (
    <div className="card">
      <h2>{itinerary.title}</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            trackAffiliateClick("booking", "hotel", itinerary.title);
            window.open(itinerary.bookingLink, "_blank");
          }}
        >
          Book Hotel
        </Button>
        <Button
          onClick={() => {
            trackAffiliateClick("travelpayout", "flight", itinerary.title);
            window.open(itinerary.flightLink, "_blank");
          }}
        >
          Book Flight
        </Button>
      </div>
    </div>
  );
}
```

---

## 📊 Tracking Affiliate Clicks

The `trackAffiliateClick()` function logs clicks for analytics:

```typescript
import { trackAffiliateClick } from "@/lib/affiliateLinks";

// When user clicks a link
trackAffiliateClick("travelpayout", "flight", "london-tokyo");
```

**To send to your backend:**

1. Update the function in `client/src/lib/affiliateLinks.ts`:

```typescript
export function trackAffiliateClick(
  network: string,
  category: string,
  linkName: string
): void {
  // Send to your tRPC backend
  fetch("/api/trpc/analytics.trackAffiliateClick", {
    method: "POST",
    body: JSON.stringify({ network, category, linkName }),
  });
}
```

2. Create a tRPC procedure in `server/routers.ts`:

```typescript
analytics: {
  trackAffiliateClick: publicProcedure
    .input(z.object({
      network: z.string(),
      category: z.string(),
      linkName: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Save to database
      // await db.insert(affiliateClicks).values({ ... });
      return { tracked: true };
    }),
}
```

---

## 🔄 Updating Links

### Add a New Flight Deal

1. Get the search key from Travelpayout API
2. Add to `affiliateLinks.ts`:

```typescript
flights: {
  // ... existing flights
  paris_tokyo: {
    route: "Paris → Tokyo",
    searchKey: "NEW_SEARCH_KEY",
    price: "From $650",
    link: generateTravelpayoutLink("NEW_SEARCH_KEY", "paris-tokyo"),
    category: "flight",
    network: "travelpayout",
  },
}
```

3. No component changes needed! The new deal automatically appears everywhere.

### Update an Existing Link

Simply edit the value in `affiliateLinks.ts`:

```typescript
flights: {
  london_tokyo: {
    route: "London → Tokyo",
    searchKey: "UPDATED_SEARCH_KEY", // ← Update here
    price: "From $550", // ← Update price
    link: generateTravelpayoutLink("UPDATED_SEARCH_KEY", "london-tokyo"),
    category: "flight",
    network: "travelpayout",
  },
}
```

---

## 🎯 Best Practices

### 1. Organize by Category
Keep flights, hotels, cruises, and cars in separate sections for easy navigation.

### 2. Use Descriptive Keys
```typescript
// ✅ Good
flights: {
  london_tokyo: { ... },
  newyork_lisbon: { ... },
}

// ❌ Bad
flights: {
  flight1: { ... },
  flight2: { ... },
}
```

### 3. Track Campaign Names
Use meaningful campaign names for UTM tracking:

```typescript
link: generateTravelpayoutLink(searchKey, "homepage-hero") // ← Specific campaign
link: generateTravelpayoutLink(searchKey, "blog-article")  // ← Another campaign
```

### 4. Update Regularly
- Check Travelpayout for new deals weekly
- Update prices and search keys to keep content fresh
- Monitor which links convert best

### 5. Test Before Publishing
1. Copy the affiliate link
2. Open in a new browser window
3. Verify it tracks your affiliate ID
4. Check that the destination/dates are correct

---

## 🚀 Advanced Usage

### Dynamic Link Generation

Generate links on-the-fly based on user input:

```typescript
import { generateBookingLink } from "@/lib/affiliateLinks";

const userDestination = "Barcelona";
const userCheckIn = "2026-08-01";
const userCheckOut = "2026-08-08";

const link = generateBookingLink(userDestination, userCheckIn, userCheckOut);
window.open(link, "_blank");
```

### Conditional Links

Show different links based on user location or preferences:

```typescript
import { affiliateLinks } from "@/lib/affiliateLinks";

function getRecommendedFlights(userRegion: string) {
  if (userRegion === "EU") {
    return affiliateLinks.flights.london_tokyo; // European user
  }
  return affiliateLinks.flights.newyork_lisbon; // US user
}
```

### Link Analytics Dashboard

Create an admin page to monitor affiliate performance:

```typescript
// client/src/pages/AffiliateAnalytics.tsx
import { trpc } from "@/lib/trpc";

export function AffiliateAnalytics() {
  const { data: stats } = trpc.analytics.getAffiliateStats.useQuery();

  return (
    <div>
      {stats?.map(stat => (
        <div key={stat.linkName}>
          <h3>{stat.linkName}</h3>
          <p>Clicks: {stat.clicks}</p>
          <p>Conversions: {stat.conversions}</p>
          <p>Commission: ${stat.commission}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## ❓ Troubleshooting

### Links Not Tracking
- Verify affiliate ID is correct in `affiliateLinks.ts`
- Check that UTM parameters are included in the URL
- Ensure `trackAffiliateClick()` is being called

### Search Keys Expired
- Travelpayout search keys expire after 30 days
- Generate new keys regularly from the API
- Update `affiliateLinks.ts` with fresh keys

### Wrong Destination in Booking Link
- Double-check the destination spelling
- Use exact city names (e.g., "Rio de Janeiro" not "Rio")
- Test the link manually before publishing

---

## 📞 Support

For issues with:
- **Travelpayout**: [travelpayouts.com/support](https://travelpayouts.com/support)
- **Booking.com**: [partner.booking.com/help](https://partner.booking.com/help)
- **Website**: Check `INTEGRATION_GUIDE.md` for backend integration help

