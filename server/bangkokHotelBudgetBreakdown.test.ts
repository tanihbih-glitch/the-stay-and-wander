import { describe, expect, it } from "vitest";
import { BANGKOK_ACTIVITIES_WIDGET_URL } from "../client/src/components/BangkokActivitiesWidget";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import {
  articleMetadata,
  hotelTiers,
  nightlyRateRows,
  searchMetadata,
} from "../client/src/pages/BlogBangkokHotelBudgetBreakdown";
import { pageMetadataConfig } from "../shared/seo";

describe("Bangkok hotel budget breakdown article", () => {
  it("preserves the visible article title and canonical route while using the approved budget-to-luxury snippet", () => {
    expect(articleMetadata.title).toBe("How Much Does a Hotel in Bangkok Really Cost in 2026? (Budget to Luxury Breakdown)");
    expect(articleMetadata.url).toBe("/blog/bangkok-hotel-budget-breakdown-2026");
    expect(searchMetadata.title).toBe("Bangkok Daily Budget 2026: What a Day Really Costs");
    expect(searchMetadata.description).toBe("How much does a day in Bangkok really cost? See what hotels, food and getting around add up to, from backpacker to comfortable, and plan your budget.");
    expect(searchMetadata.title.length).toBeLessThanOrEqual(60);
    expect(searchMetadata.description.length).toBeLessThanOrEqual(155);
    expect(pageMetadataConfig.bangkokHotelBudgetBreakdown.url).toBe(articleMetadata.url);
    expect(nightlyRateRows).toHaveLength(3);
    expect(nightlyRateRows.map((row) => row[1])).toEqual(["$8–$35", "$35–$150", "$120–$850+"]);
  });

  it("uses the requested tier-specific Stay22 links and common Trip.com destination", () => {
    expect(hotelTiers.map((tier) => tier.stay22Url)).toEqual([
      "https://booking.stay22.com/thestayandwander/ucN0nPA-z0-",
      "https://booking.stay22.com/thestayandwander/8S9p00Hygg-",
      "https://booking.stay22.com/thestayandwander/RMACbPYy60-",
    ]);
    expect(hotelTiers.flatMap((tier) => tier.picks.map((hotel) => hotel.name))).toEqual([
      "Lub d Bangkok Siam",
      "NapPark Hostel",
      "Chatrium Residence Sathorn",
      "Ibis Bangkok Sukhumvit",
      "Mandarin Oriental Bangkok",
      "The Peninsula Bangkok",
    ]);
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });

  it("uses the requested Bangkok activities widget configuration", () => {
    expect(BANGKOK_ACTIVITIES_WIDGET_URL).toBe("https://tpwidg.com/content?currency=USD&trs=544987&shmarker=745048&locale=en&city_id=4&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497");
  });
});
