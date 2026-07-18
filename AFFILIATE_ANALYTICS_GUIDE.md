# Affiliate Analytics Dashboard Implementation Guide

## Overview

The Affiliate Analytics Dashboard tracks clicks and conversions from all affiliate partners (GetYourGuide, Stay22, Aviasales, Trip.com) across The Stay & Wander website. This guide explains the system architecture and how to integrate click tracking into existing affiliate links.

## System Architecture

### Database Schema

Two main tables store affiliate data:

1. **affiliateClicks** - Tracks every click on an affiliate link
   - `id`: Unique identifier
   - `partner`: Affiliate partner name (GetYourGuide, Stay22, Aviasales, Trip.com)
   - `category`: Link category (Tours, Hotels, Flights, Activities)
   - `source`: Page where the link was clicked (Blog, Itinerary, Homepage, Booking Portal)
   - `destination`: Target URL
   - `sessionId`: Visitor session identifier
   - `ipAddress`: Visitor IP address
   - `userAgent`: Browser information
   - `referrer`: Page referrer
   - `userId`: Logged-in user ID (if applicable)
   - `timestamp`: Click timestamp
   - `createdAt`: Record creation timestamp

2. **affiliateConversions** - Tracks conversions from affiliate partners
   - `id`: Unique identifier
   - `clickId`: Reference to affiliate click (optional)
   - `partner`: Affiliate partner name
   - `category`: Link category
   - `conversionType`: Type of conversion (booking, purchase, etc.)
   - `conversionValue`: Monetary value of the conversion
   - `status`: Conversion status (pending, confirmed, cancelled)
   - `externalId`: External conversion ID from partner
   - `notes`: Additional notes
   - `timestamp`: Conversion timestamp
   - `createdAt`: Record creation timestamp

### Server-Side Components

#### affiliateTracking.ts
Server-side helpers for tracking and analytics:
- `trackAffiliateClick()` - Log a click event
- `trackAffiliateConversion()` - Log a conversion event
- `getClicksByPartner()` - Get click statistics by partner
- `getClicksByCategory()` - Get click statistics by category
- `getClicksBySource()` - Get click statistics by source page
- `getConversionStats()` - Get conversion statistics
- `getConversionRate()` - Calculate conversion rate
- `getRecentClicks()` - Get recent click events
- `getTopSources()` - Get top performing traffic sources

#### routers/analytics.ts
tRPC procedures for the frontend:
- `trackClick` - Mutation to track a click (protected)
- `trackConversion` - Mutation to track a conversion (admin only)
- `getClicksByPartner` - Query for partner analytics (admin only)
- `getClicksByCategory` - Query for category analytics (admin only)
- `getClicksBySource` - Query for source analytics (admin only)
- `getConversionStats` - Query for conversion statistics (admin only)
- `getConversionRate` - Query for conversion rate (admin only)
- `getRecentClicks` - Query for recent clicks (admin only)
- `getTopSources` - Query for top sources (admin only)

### Frontend Components

#### AffiliateLink.tsx
Wrapper component for tracking affiliate link clicks:
```tsx
<AffiliateLink
  href="https://gyg.me/tours"
  partner="GetYourGuide"
  category="Tours"
  source="Blog"
  destination="Bali Tours"
>
  Book Tours
</AffiliateLink>
```

#### AffiliateAnalytics.tsx
Admin dashboard for viewing analytics:
- Located at `/admin/analytics`
- Restricted to admin users only
- Shows key metrics: total clicks, conversions, conversion rate, estimated revenue
- Displays charts for clicks by partner, clicks by category
- Lists top traffic sources
- Shows conversion status breakdown
- Date range filtering (7d, 30d, 90d, all time)

## Integration Guide

### Step 1: Replace Affiliate Links with AffiliateLink Component

Instead of using plain `<a>` tags for affiliate links, use the `AffiliateLink` component:

**Before:**
```tsx
<a href="https://gyg.me/tours" target="_blank" rel="noopener noreferrer">
  Book Tours
</a>
```

**After:**
```tsx
import { AffiliateLink } from '@/components/AffiliateLink';

<AffiliateLink
  href="https://gyg.me/tours"
  partner="GetYourGuide"
  category="Tours"
  source="Blog"
  destination="Bali Tours"
>
  Book Tours
</AffiliateLink>
```

### Step 2: Identify Link Parameters

For each affiliate link, determine:

1. **partner**: One of: `GetYourGuide`, `Stay22`, `Aviasales`, `Trip.com`, `Agoda`
2. **category**: One of: `Tours`, `Hotels`, `Flights`, `Activities`, `Email`
3. **source**: Where the link appears: `Blog`, `Itinerary`, `Homepage`, `Booking Portal`, `Email`
4. **destination**: Human-readable description of the link destination

### Step 3: Update Existing Pages

Update affiliate links on these pages:

#### Blog Articles
- Best Hotels in Bali
- Best Cities in Europe
- Tokyo vs Bangkok
- Brazil Travel Guide
- Flight Deals

Replace all hotel booking buttons, tour links, and flight search links with `AffiliateLink` components.

#### Itinerary Pages
- Tokyo & Seoul
- Mediterranean
- Brazil

Replace all hotel availability buttons and tour activity links with `AffiliateLink` components.

#### Homepage
- Replace tour recommendation links
- Replace hotel search links
- Replace flight search links

#### Booking Portal
- Replace all hotel search buttons
- Replace all tour activity buttons
- Replace all flight search buttons

### Step 4: Configure Tracking Parameters

Use these guidelines for tracking parameters:

**GetYourGuide Links:**
```tsx
<AffiliateLink
  href={affiliateLinks.getyourguide.tours.asia}
  partner="GetYourGuide"
  category="Tours"
  source="Blog" // or "Itinerary", "Homepage"
  destination="Bali Tours"
>
  Book Tours
</AffiliateLink>
```

**Stay22 Hotel Links:**
```tsx
<AffiliateLink
  href={affiliateLinks.stay22.hotels.tokyo}
  partner="Stay22"
  category="Hotels"
  source="Blog" // or "Itinerary", "Homepage"
  destination="Tokyo Hotels"
>
  Check Availability
</AffiliateLink>
```

**Aviasales Flight Links:**
```tsx
<AffiliateLink
  href={affiliateLinks.aviasales.flights.asia}
  partner="Aviasales"
  category="Flights"
  source="Blog" // or "Itinerary", "Homepage"
  destination="Cheap Flights to Asia"
>
  Search Flights
</AffiliateLink>
```

**Trip.com Hotel Links:**
```tsx
<AffiliateLink
  href={affiliateLinks.tripcom.hotels.asia}
  partner="Trip.com"
  category="Hotels"
  source="Blog" // or "Itinerary", "Homepage"
  destination="Asia Hotels"
>
  Search Hotels
</AffiliateLink>
```

## Analytics Dashboard

### Accessing the Dashboard

1. Log in as an admin user
2. Navigate to `/admin/analytics`
3. View real-time analytics data

### Key Metrics

- **Total Clicks**: Total number of affiliate link clicks
- **Total Conversions**: Total number of conversions from clicks
- **Conversion Rate**: Percentage of clicks that resulted in conversions
- **Est. Revenue**: Estimated revenue based on conversion values

### Charts and Visualizations

1. **Clicks by Partner**: Bar chart showing clicks per affiliate partner
2. **Clicks by Category**: Pie chart showing click distribution by category
3. **Top Traffic Sources**: Horizontal bar chart showing top pages/sources
4. **Conversion Status**: Breakdown of pending, confirmed, and cancelled conversions

### Date Range Filtering

Use the date range buttons to filter analytics:
- Last 7 Days
- Last 30 Days
- Last 90 Days
- All Time

## Conversion Tracking

### Webhook Integration

To track conversions from affiliate partners:

1. **GetYourGuide**: Set up webhook at GetYourGuide partner dashboard
   - Webhook URL: `https://thestayandwander.com/api/trpc/analytics.trackConversion`
   - Include external conversion ID in webhook payload

2. **Stay22/Booking.com**: Set up conversion pixel or webhook
   - Track booking completions
   - Include booking ID and amount

3. **Aviasales**: Set up conversion tracking
   - Track flight bookings
   - Include booking reference

4. **Trip.com**: Set up conversion pixel
   - Track hotel bookings
   - Include booking confirmation

### Manual Conversion Entry

For partners without webhook support, manually log conversions:

```tsx
const trackConversionMutation = trpc.analytics.trackConversion.useMutation();

trackConversionMutation.mutate({
  clickId: 123,
  partner: 'GetYourGuide',
  category: 'Tours',
  conversionType: 'booking',
  conversionValue: '150.00',
  externalId: 'booking-456',
});
```

## Testing

### Unit Tests

Run the affiliate tracking tests:
```bash
pnpm test -- server/affiliateTracking.test.ts
```

### Manual Testing

1. Click an affiliate link on the website
2. Wait 2-3 seconds for tracking
3. Check the analytics dashboard
4. Verify the click appears in the dashboard

### Browser Console

Monitor tracking in browser console:
```javascript
// Check if tracking mutation is called
console.log('Tracking click...');

// Verify session ID
console.log(sessionStorage.getItem('sessionId'));
```

## Performance Considerations

1. **Async Tracking**: Click tracking is asynchronous and doesn't block link navigation
2. **Database Indexing**: Ensure indexes on `partner`, `category`, `source`, and `timestamp` columns
3. **Data Retention**: Archive old analytics data (>1 year) to maintain performance
4. **Query Optimization**: Use date range filters to limit query results

## Security

1. **Admin-Only Access**: Analytics dashboard is restricted to admin users
2. **Input Validation**: All tracking parameters are validated on the server
3. **Rate Limiting**: Consider implementing rate limiting on tracking endpoints
4. **Data Privacy**: Ensure IP addresses and user agents are handled per privacy policy

## Troubleshooting

### Clicks Not Being Tracked

1. Check browser console for errors
2. Verify `AffiliateLink` component is being used
3. Check network tab for failed tracking requests
4. Verify database connection

### Dashboard Shows Zero Data

1. Ensure affiliate links are using `AffiliateLink` component
2. Wait 5-10 minutes for data to appear
3. Check database for records in `affiliateClicks` table
4. Verify admin user role is set correctly

### Conversion Rate Calculation Issues

1. Verify conversions are being tracked separately
2. Check `affiliateConversions` table for records
3. Ensure conversion timestamps are within click date range
4. Verify conversion status is set correctly

## Future Enhancements

1. **Real-time Dashboard**: Add WebSocket support for real-time updates
2. **Advanced Filtering**: Add filters by date range, partner, category, source
3. **Export Reports**: Add CSV/PDF export functionality
4. **Predictive Analytics**: Use ML to predict conversion rates
5. **A/B Testing**: Track performance of different link placements
6. **Revenue Tracking**: Integrate with accounting system for actual revenue
7. **Affiliate Payouts**: Automate payout calculations based on conversions
8. **Custom Alerts**: Set up alerts for conversion milestones

## Support

For questions or issues with the affiliate analytics system, contact the development team or refer to the inline code documentation.
