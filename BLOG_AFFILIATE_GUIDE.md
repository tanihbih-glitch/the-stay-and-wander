# Blog Affiliate Integration Guide

## Overview

Your blog articles now include strategic, contextual affiliate links for flights and hotels. Each article has been enhanced with multiple affiliate CTAs that naturally fit the content, maximizing conversion opportunities while maintaining editorial integrity.

## What's New

### 1. Individual Article Pages (`client/src/pages/BlogArticle.tsx`)

Each blog article now has a dedicated full-page view with:
- **Full article content** with rich formatting
- **Contextual affiliate links** embedded throughout the article
- **Related articles section** at the bottom for cross-promotion
- **Author metadata** and reading time
- **Hero image** for visual appeal

### 2. Article Structure

Articles include three types of affiliate CTAs:

#### Type 1: Hotel Booking CTAs (Blue boxes)
```
- Located in hotel-related sections
- Includes "Book Hotels in [City]" buttons
- Links to Booking.com with destination pre-filled
- Tracks clicks for analytics
```

#### Type 2: Flight Deal CTAs (Green boxes)
```
- Located in transportation/getting-there sections
- Includes "Search Flights to [Destination]" buttons
- Links to Travelpayout with affiliate tracking
- Uses your affiliate ID (745048)
```

#### Type 3: Pro Tips (Yellow boxes)
```
- Contextual advice with affiliate links
- Encourages early booking with booking links
- Blends naturally with article content
```

## Available Articles

### Article 1: Best Hotels in Bali for Every Budget 2026
- **URL:** `/blog/1`
- **Affiliate Links:** 3 hotel CTAs, 1 flight CTA
- **Focus:** Luxury, mid-range, and budget hotels
- **Affiliate Opportunities:** Hotel bookings, flights to Bali

### Article 2: 7 Best Cities to Visit in Europe This Summer
- **URL:** `/blog/2`
- **Affiliate Links:** 2 hotel CTAs, 1 flight CTA
- **Focus:** European cities (Lisbon, Barcelona, Rome, Prague, Amsterdam, Vienna, Athens)
- **Affiliate Opportunities:** Hotel bookings in each city, flights to Europe

### Article 3: Tokyo vs Bangkok — Which Should You Visit First?
- **URL:** `/blog/3`
- **Affiliate Links:** 2 hotel CTAs (Tokyo & Bangkok), 1 flight CTA
- **Focus:** Comparison and decision guide
- **Affiliate Opportunities:** Hotels in both cities, flights to Asia

## How Affiliate Links Work

### Tracking
All affiliate clicks are tracked using the `trackAffiliateClick()` function:
```typescript
trackAffiliateClick("network", "type", "context")
// Example: trackAffiliateClick("booking", "hotel", "Bali-luxury-hotels")
```

This data is stored in `client/src/lib/affiliateLinks.ts` and can be logged to your database for analytics.

### Link Structure

**Travelpayout Flight Links:**
```
https://www.travelpayouts.com/searches/{search_key}?utm_source=thestayandwander&utm_medium=affiliate&utm_campaign=flights&affiliate_id=745048
```

**Booking.com Hotel Links:**
```
https://www.booking.com/searchresults.html?ss={destination}
```

## Adding More Articles

To add new blog articles with affiliate links:

1. **Create article data** in `BlogArticle.tsx`:
```typescript
const MyNewArticle: ArticleContent = {
  id: 4,
  title: "Article Title",
  author: "Author Name",
  date: "Date",
  category: "Category",
  image: "/path/to/image",
  readTime: "X min read",
  content: (
    <div className="space-y-6">
      {/* Article content with affiliate CTAs */}
    </div>
  ),
};
```

2. **Add to articles map**:
```typescript
const articlesMap: Record<number, ArticleContent> = {
  1: BaliHotelsArticle,
  2: EuropeCitiesArticle,
  3: TokyoBangkokArticle,
  4: MyNewArticle, // Add here
};
```

3. **Update Blog.tsx** if adding to the blog list:
```typescript
const articles = [
  // ... existing articles
  {
    id: 4,
    title: "Article Title",
    category: "Category",
    image: "/path/to/image",
    excerpt: "Article excerpt",
    author: "Author Name",
    date: "Date",
    readTime: "X min read",
  },
];
```

## Affiliate CTA Templates

### Hotel Booking CTA Template
```tsx
<div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
  <div className="flex items-start gap-4">
    <Hotel className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-bold text-gray-900 mb-2">Book Your [City] Hotel</h3>
      <p className="text-sm text-gray-700 mb-4">
        Description of hotel options and value proposition.
      </p>
      <Button
        onClick={() => {
          trackAffiliateClick("booking", "hotel", "[City]-hotels");
          window.open("https://www.booking.com/searchresults.html?ss=[City]", "_blank");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Search Hotels in [City]
      </Button>
    </div>
  </div>
</div>
```

### Flight Deal CTA Template
```tsx
<div className="bg-green-50 border-l-4 border-green-600 p-6 my-6">
  <div className="flex items-start gap-4">
    <Plane className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-bold text-gray-900 mb-2">Find Flights to [Destination]</h3>
      <p className="text-sm text-gray-700 mb-4">
        Description of flight deals and booking tips.
      </p>
      <Button
        onClick={() => {
          trackAffiliateClick("travelpayout", "flight", "[Route]-flights");
          window.open(affiliateLinks.flights.[route]?.link || "https://travelpayouts.com", "_blank");
        }}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Search Flights to [Destination]
      </Button>
    </div>
  </div>
</div>
```

## Analytics & Optimization

### Tracking Data
All clicks are tracked with:
- **Network:** travelpayout, booking, etc.
- **Type:** flight, hotel, etc.
- **Context:** Specific article/section context

### Future Enhancements
1. **Database logging:** Store affiliate clicks in database for analytics
2. **Conversion tracking:** Integrate with affiliate networks' conversion APIs
3. **A/B testing:** Test different CTA placements and copy
4. **Revenue dashboard:** Create admin dashboard to view affiliate earnings

## SEO Considerations

- Articles are optimized for search with proper heading hierarchy
- Meta descriptions should be added to each article
- Internal linking between related articles improves SEO
- Affiliate links use `target="_blank"` to keep users on site

## Best Practices

1. **Natural Integration:** Affiliate links should feel natural, not forced
2. **Value First:** Provide genuine value in article content before asking for conversions
3. **Multiple CTAs:** 2-3 well-placed CTAs per article is optimal
4. **Clear Value Proposition:** Explain why users should book through your links
5. **Transparency:** Consider adding a note about affiliate relationships

## Troubleshooting

### Links Not Working
- Check that affiliate IDs are correctly configured in `affiliateLinks.ts`
- Verify URLs are properly formatted with destination parameters
- Test links in incognito/private mode

### Tracking Not Working
- Ensure `trackAffiliateClick()` is being called before link opens
- Check browser console for errors
- Verify database connection if logging to database

## Next Steps

1. **Monitor performance:** Track which articles drive most clicks
2. **Add more articles:** Expand blog with more destination guides
3. **Optimize CTAs:** Test different button copy and placements
4. **Integrate analytics:** Build dashboard to view affiliate earnings
5. **Add more networks:** Integrate Airbnb, Expedia, or other travel partners
