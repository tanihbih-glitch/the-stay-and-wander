# The Stay & Wander — Full-Stack Integration Guide

Your website has been upgraded to full-stack with database and backend capabilities. This guide covers file storage integration and connecting affiliate networks like Travelpayout and Booking.com.

---

## 📁 File Storage Setup

The website includes built-in S3 file storage via the `storagePut()` helper. Files are automatically served through `/manus-storage/` paths.

### How File Storage Works

**Backend (Server-side):**
```typescript
// server/storage.ts already has the helper configured
import { storagePut } from "./server/storage";

// Upload a file to S3
const { key, url } = await storagePut(
  `affiliate-deals/booking-${Date.now()}.json`,
  JSON.stringify(dealData),
  "application/json"
);
// Returns: { key: "affiliate-deals/booking-...", url: "/manus-storage/affiliate-deals/booking-..." }
```

**Frontend (React):**
```typescript
// Use the returned URL directly in your components
<img src="/manus-storage/affiliate-deals/thumbnail.png" alt="Deal" />
```

### Best Practices

1. **Store metadata in database, files in S3:**
   - Database: Save `{ fileKey, fileUrl, fileName, mimeType, uploadedAt }`
   - S3: Store the actual file bytes
   - Never store large files in database columns

2. **Organize file paths by category:**
   ```
   affiliate-deals/{category}/{timestamp}-{id}.json
   user-uploads/{userId}/{fileName}
   blog-images/{articleId}/{fileName}
   ```

3. **Handle file uploads from frontend:**
   ```typescript
   // Frontend: User selects file
   const handleFileUpload = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);
     await trpc.uploads.create.useMutation().mutateAsync({ file });
   };

   // Backend: Receive and store
   uploads: {
     create: protectedProcedure
       .input(z.object({ file: z.instanceof(File) }))
       .mutation(async ({ input, ctx }) => {
         const buffer = await input.file.arrayBuffer();
         const { key, url } = await storagePut(
           `user-uploads/${ctx.user.id}/${input.file.name}`,
           Buffer.from(buffer),
           input.file.type
         );
         // Save metadata to database
         return { key, url };
       })
   }
   ```

---

## 🔗 Affiliate Network Integration

### Option 1: Travelpayout Integration

Travelpayout provides flight and hotel deals via API. Here's how to integrate:

#### Step 1: Get Your API Key

1. Sign up at [Travelpayout.com](https://travelpayout.com)
2. Go to Settings → API Keys
3. Copy your API token

#### Step 2: Store API Credentials

```bash
# Add to your environment secrets
TRAVELPAYOUT_API_KEY=your_api_key_here
TRAVELPAYOUT_AFFILIATE_ID=your_affiliate_id
```

#### Step 3: Create Backend Procedure

Add this to `server/routers.ts`:

```typescript
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  // ... existing routes

  affiliate: router({
    // Fetch flight deals from Travelpayout
    getFlightDeals: publicProcedure
      .input(z.object({
        origin: z.string(),
        destination: z.string(),
        departDate: z.string(),
      }))
      .query(async ({ input }) => {
        const response = await fetch(
          `https://api.travelpayouts.com/v2/prices/latest?` +
          `origin=${input.origin}&destination=${input.destination}&` +
          `depart_date=${input.departDate}&token=${process.env.TRAVELPAYOUT_API_KEY}`
        );
        
        if (!response.ok) throw new Error('Travelpayout API error');
        
        const data = await response.json();
        
        // Transform and cache results
        return data.data.map(deal => ({
          route: `${deal.origin} → ${deal.destination}`,
          price: deal.price,
          airline: deal.airline,
          url: `https://www.travelpayouts.com/searches/${deal.search_key}?utm_source=your_site&utm_medium=affiliate&utm_campaign=deals`
        }));
      }),

    // Fetch hotel deals from Travelpayout
    getHotelDeals: publicProcedure
      .input(z.object({
        location: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
      }))
      .query(async ({ input }) => {
        const response = await fetch(
          `https://api.travelpayouts.com/v2/hotel_prices/` +
          `?location=${input.location}&` +
          `check_in=${input.checkIn}&check_out=${input.checkOut}&` +
          `token=${process.env.TRAVELPAYOUT_API_KEY}`
        );
        
        if (!response.ok) throw new Error('Travelpayout API error');
        
        const data = await response.json();
        return data;
      }),
  }),
});
```

#### Step 4: Use in Frontend

```typescript
// client/src/pages/Home.tsx
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: flightDeals, isLoading } = trpc.affiliate.getFlightDeals.useQuery({
    origin: "LHR",
    destination: "NRT",
    departDate: "2026-07-15",
  });

  return (
    <div>
      {flightDeals?.map(deal => (
        <a href={deal.url} key={deal.route} target="_blank" rel="noopener noreferrer">
          {deal.route}: ${deal.price}
        </a>
      ))}
    </div>
  );
}
```

---

### Option 2: Booking.com Affiliate Integration

Booking.com provides affiliate links and widgets for hotels and flights.

#### Step 1: Join Booking.com Affiliate Program

1. Go to [Booking.com Partner Program](https://partner.booking.com)
2. Sign up and get your affiliate ID
3. Request access to the Search Box Widget

#### Step 2: Add Booking.com Widget

The simplest approach is to use Booking.com's pre-built search widget:

```typescript
// client/src/components/BookingWidget.tsx
import { useEffect } from "react";

export default function BookingWidget() {
  useEffect(() => {
    // Load Booking.com widget script
    const script = document.createElement("script");
    script.src = "https://www.booking.com/s/35_6/a76db27d";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Booking.com widget will render here */}
      <div id="booking_com_widget"></div>
    </div>
  );
}
```

#### Step 3: Create Affiliate Links Programmatically

```typescript
// server/routers.ts
export const appRouter = router({
  affiliate: router({
    // Generate Booking.com affiliate link
    generateBookingLink: publicProcedure
      .input(z.object({
        hotelId: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
      }))
      .query(({ input }) => {
        const affiliateId = process.env.BOOKING_AFFILIATE_ID;
        const url = new URL("https://www.booking.com/hotel");
        url.searchParams.set("ss", input.hotelId);
        url.searchParams.set("checkin", input.checkIn);
        url.searchParams.set("checkout", input.checkOut);
        url.searchParams.set("affiliate_id", affiliateId);
        
        return { url: url.toString() };
      }),
  }),
});
```

---

### Option 3: Custom Affiliate Link Management

Store affiliate links in the database for easy management:

#### Step 1: Create Database Table

```typescript
// drizzle/schema.ts
import { mysqlTable, varchar, text, timestamp, int } from "drizzle-orm/mysql-core";

export const affiliateLinks = mysqlTable("affiliate_links", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // "flight", "hotel", "cruise", "car"
  url: text("url").notNull(),
  affiliateNetwork: varchar("affiliate_network", { length: 100 }).notNull(), // "booking", "travelpayout", "aviasales"
  commissionRate: varchar("commission_rate", { length: 50 }),
  isActive: int("is_active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
```

#### Step 2: Create Admin Procedures

```typescript
// server/routers.ts
import { adminProcedure, protectedProcedure } from "./_core/trpc";
import { db } from "./db";

export const appRouter = router({
  affiliate: router({
    // Admin: Add affiliate link
    addLink: adminProcedure
      .input(z.object({
        name: z.string(),
        category: z.enum(["flight", "hotel", "cruise", "car"]),
        url: z.string().url(),
        affiliateNetwork: z.string(),
        commissionRate: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await db.insert(affiliateLinks).values({
          name: input.name,
          category: input.category,
          url: input.url,
          affiliateNetwork: input.affiliateNetwork,
          commissionRate: input.commissionRate,
        });
        return result;
      }),

    // Public: Get links by category
    getLinks: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        const links = await db
          .select()
          .from(affiliateLinks)
          .where(eq(affiliateLinks.category, input.category));
        return links;
      }),
  }),
});
```

---

## 🚀 Connecting Everything Together

### Example: Flight Deals Section with Affiliate Links

```typescript
// client/src/components/FlightDealsSection.tsx
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function FlightDealsSection() {
  const { data: deals, isLoading } = trpc.affiliate.getFlightDeals.useQuery({
    origin: "LHR",
    destination: "NRT",
    departDate: "2026-07-15",
  });

  if (isLoading) return <div>Loading deals...</div>;

  return (
    <section className="py-20 bg-blue-600">
      <div className="container">
        <h2 className="text-3xl font-bold text-white mb-12">Best Flight Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals?.map(deal => (
            <div key={deal.route} className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{deal.route}</h3>
              <p className="text-3xl font-bold text-yellow-500 mb-4">${deal.price}</p>
              <Button 
                onClick={() => window.open(deal.url, '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 📊 Tracking Affiliate Conversions

### Add Conversion Tracking to Database

```typescript
// drizzle/schema.ts
export const affiliateConversions = mysqlTable("affiliate_conversions", {
  id: int("id").autoincrement().primaryKey(),
  affiliateLinkId: int("affiliate_link_id").notNull(),
  userId: int("user_id"),
  referrerUrl: text("referrer_url"),
  conversionValue: varchar("conversion_value", { length: 50 }),
  status: varchar("status", { length: 50 }).default("pending"), // "pending", "confirmed", "cancelled"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

### Track Clicks

```typescript
// server/routers.ts
export const appRouter = router({
  affiliate: router({
    trackClick: publicProcedure
      .input(z.object({
        linkId: z.number(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.insert(affiliateConversions).values({
          affiliateLinkId: input.linkId,
          userId: ctx.user?.id,
          referrerUrl: input.referrer,
        });
        return { tracked: true };
      }),
  }),
});
```

---

## 🔐 Environment Variables

Add these to your project secrets:

```bash
# Travelpayout
TRAVELPAYOUT_API_KEY=your_api_key
TRAVELPAYOUT_AFFILIATE_ID=your_affiliate_id

# Booking.com
BOOKING_AFFILIATE_ID=your_booking_affiliate_id

# Aviasales (if using)
AVIASALES_AFFILIATE_ID=your_aviasales_id

# Other networks
GETOURGUIDE_AFFILIATE_ID=your_id
CRUISEDIRECT_AFFILIATE_ID=your_id
```

---

## ✅ Next Steps

1. **Get API credentials** from Travelpayout, Booking.com, and other networks
2. **Add environment variables** via the Management UI (Settings → Secrets)
3. **Run database migration:** `pnpm db:push`
4. **Implement affiliate procedures** in `server/routers.ts`
5. **Update frontend components** to use the new procedures
6. **Test affiliate links** to ensure tracking works
7. **Monitor conversions** via the database

---

## 📚 Resources

- [Travelpayout API Docs](https://travelpayouts.com/developers/api)
- [Booking.com Partner Program](https://partner.booking.com)
- [Manus File Storage Guide](./README.md)
- [tRPC Documentation](https://trpc.io)

---

## 💡 Tips

- **Cache affiliate data:** Store API responses in the database to reduce API calls
- **Use background jobs:** Schedule periodic updates of flight/hotel deals
- **Track performance:** Monitor which affiliate links convert best
- **A/B test CTAs:** Test different button text and colors for affiliate links
- **Disclose affiliations:** Always clearly indicate affiliate links per FTC guidelines

