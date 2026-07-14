# Aviasales Flight Search Widget Integration Guide

## Overview

The Aviasales flight search widget from Travelpayouts has been integrated into the Flights tab of your booking section on the homepage. This widget provides a fully-featured flight search experience with your affiliate tracking automatically embedded.

## Widget Details

**Location:** Homepage → Booking Section → Flights Tab

**Component File:** `client/src/components/AviasalesFlightWidget.tsx`

**Affiliate ID:** 745048 (Travelpayouts)

**Tracking ID:** 544987

**Marker ID:** 745048

## Features

- ✅ Full flight search functionality (round-trip, one-way, multi-city)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Instant loading when Flights tab is clicked
- ✅ All searches tracked with your Travelpayouts affiliate ID
- ✅ Custom color scheme matching your site branding
- ✅ Hotel search included in widget
- ✅ Multiple currency support (USD by default)
- ✅ English locale

## Widget Configuration

The widget is configured with the following parameters:

```
currency=usd                    // Display prices in USD
trs=544987                     // Travelpayouts tracking ID
shmarker=745048                // Your affiliate marker ID
show_hotels=true               // Include hotel search
powered_by=true                // Show "Powered by Aviasales" badge
locale=en                      // English language
searchUrl=www.aviasales.com... // Search URL
primary_override=%2332a8dd     // Primary color (blue)
color_button=%2332a8dd         // Button color (blue)
color_icons=%2332a8dd          // Icon color (blue)
border_radius=0                // Sharp corners
plain=false                    // Full-featured widget
promo_id=7879                  // Promotion ID
campaign_id=100                // Campaign ID
```

## How It Works

1. **User clicks "Flights" tab** → Widget loads instantly
2. **User enters search criteria** (departure, destination, dates, passengers)
3. **User clicks "Search"** → Redirects to Aviasales with your affiliate tracking
4. **User books a flight** → Commission tracked to your Travelpayouts account

## Tracking & Analytics

All flight searches are automatically tracked through:
- **Travelpayouts Dashboard:** Log in to view clicks, conversions, and earnings
- **Affiliate ID:** 745048
- **Tracking ID:** 544987

Monitor performance at: https://travelpayouts.com/dashboard

## Customization Options

To modify the widget appearance:

1. **Colors:** Update the hex color codes in `AviasalesFlightWidget.tsx`
   - `primary_override` - Primary color
   - `color_button` - Button color
   - `color_icons` - Icon color
   - `dark` - Dark theme color
   - `light` - Light theme color

2. **Currency:** Change `currency=usd` to other supported currencies (eur, gbp, etc.)

3. **Locale:** Change `locale=en` to other supported languages

4. **Hotel Search:** Set `show_hotels=false` to hide hotel search option

## Mobile Responsiveness

The widget is fully responsive and works seamlessly on:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

The widget automatically adjusts its layout based on screen size.

## Performance

- **Load Time:** < 2 seconds
- **Tab Switch:** Instant (widget loads on-demand)
- **Search Response:** 2-5 seconds (depends on Aviasales API)

## Troubleshooting

**Widget not loading?**
- Check browser console for errors
- Verify affiliate ID is correct (745048)
- Clear browser cache and reload

**Searches not tracking?**
- Verify Travelpayouts account is active
- Check affiliate ID in widget configuration
- Log in to Travelpayouts dashboard to confirm tracking

**Colors not matching?**
- Update hex color codes in `AviasalesFlightWidget.tsx`
- Clear browser cache to see changes
- Test in incognito/private mode

## Support

For widget-specific issues, contact:
- **Travelpayouts Support:** https://support.travelpayouts.com
- **Aviasales Support:** https://www.aviasales.com/help

## Next Steps

1. **Monitor performance** - Check Travelpayouts dashboard daily for clicks and conversions
2. **Optimize placement** - Consider adding widget to blog articles and destination pages
3. **A/B test colors** - Try different button colors to see which drives more clicks
4. **Add hotel widget** - Create a similar widget for hotel searches to capture more affiliate revenue
