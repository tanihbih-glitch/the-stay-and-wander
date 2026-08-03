import { describe, expect, it } from 'vitest';
import { articleMetadata, comparisonRows, hotelSections, searchMetadata, STAY22_AFFILIATE_URL } from './BlogBaliFourStarHotels';

describe('Bali four-star hotel article data', () => {
  it('publishes at the requested route with the supplied Stay22 destination', () => {
    expect(articleMetadata.url).toBe('/blog/best-4-star-hotels-bali-2026');
    expect(STAY22_AFFILIATE_URL).toBe('https://booking.stay22.com/thestayandwander/r-lvU3PLVF');
    expect(searchMetadata.title).toBe('Best 4-Star Hotels in Bali Under $100/Night (2026 Picks)');
    expect(searchMetadata.description).toBe("Handpicked 4-star hotels across Bali that don't break the bank — real picks under $100/night, from Seminyak to Ubud.");
  });

  it('contains the eleven supplied hotel picks and ten comparison entries', () => {
    expect(hotelSections).toHaveLength(5);
    expect(hotelSections.flatMap((section) => section.hotels)).toHaveLength(11);
    expect(comparisonRows).toHaveLength(10);
    expect(comparisonRows.map((row) => row[0])).toContain('Sofitel');
  });
});
