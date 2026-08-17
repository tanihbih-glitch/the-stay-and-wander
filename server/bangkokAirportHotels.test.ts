import { describe, expect, it } from "vitest";
import { BANGKOK_ACTIVITIES_WIDGET_URL } from "../client/src/components/BangkokActivitiesWidget";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import {
  articleMetadata,
  BUDGET_STAY22_URL,
  MID_RANGE_STAY22_URL,
  searchMetadata,
  selectionRows,
  shuttleHotels,
  terminalHotels,
} from "../client/src/pages/BlogBangkokAirportHotels";
import { pageMetadataConfig } from "../shared/seo";

describe("Bangkok Airport hotel layover article", () => {
  it("uses the requested title, description, canonical route, and SSR metadata", () => {
    expect(articleMetadata.title).toBe("Where to Stay Near Bangkok Airport (Suvarnabhumi) for Quick Layovers");
    expect(articleMetadata.url).toBe("/blog/bangkok-airport-hotels-2026");
    expect(searchMetadata.description).toBe("Where to stay near Bangkok's Suvarnabhumi Airport for a quick layover — in-terminal options, free-shuttle hotels, and essential timing tips.");
    expect(pageMetadataConfig.bangkokAirportHotels.url).toBe(articleMetadata.url);
    expect(selectionRows).toHaveLength(7);
  });

  it("uses the mid-range link for terminal hotels and the budget link for each named shuttle hotel", () => {
    expect(terminalHotels.map((hotel) => hotel.stay22Url)).toEqual([MID_RANGE_STAY22_URL, MID_RANGE_STAY22_URL, MID_RANGE_STAY22_URL]);
    expect(shuttleHotels.map((hotel) => hotel.stay22Url)).toEqual([BUDGET_STAY22_URL, BUDGET_STAY22_URL, BUDGET_STAY22_URL, BUDGET_STAY22_URL]);
    expect(shuttleHotels.map((hotel) => hotel.name)).toEqual([
      "Best Western Airport Suvarnabhumi",
      "Tara Court Suvarnabhumi",
      "ibis Bangkok Impact",
      "S Ratchada Airport Hotel",
    ]);
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });

  it("uses the requested Bangkok activities widget configuration", () => {
    expect(BANGKOK_ACTIVITIES_WIDGET_URL).toBe("https://tpwidg.com/content?currency=USD&trs=544987&shmarker=745048&locale=en&city_id=4&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497");
  });
});
