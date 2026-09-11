import { describe, expect, it } from "vitest";
import { TRIP_COM_HOTEL_WIDGET_URL } from "../client/src/components/TripComHotelWidget";
import {
  articleMetadata,
  comparisonRows,
  EXTENDED_STAY_STAY22_URL,
  searchMetadata,
} from "../client/src/pages/BlogUaeExtendedStaySustainability";
import { pageMetadataConfig } from "../shared/seo";

describe("UAE extended-stay sustainability article", () => {
  it("preserves its visible article title while using the CTR-focused crawler snippet", () => {
    expect(articleMetadata.title).toBe("Extended Stays in the UAE: How Sustainable Are Hilton, Marriott, and Accor?");
    expect(articleMetadata.url).toBe("/blog/uae-extended-stay-sustainability-2026");
    expect(searchMetadata.title).toBe("UAE Extended Stays 2026: 4 Brands | The Stay & Wander");
    expect(searchMetadata.description).toBe("Compare Hilton, Marriott, Accor and IHG for a longer Dubai or Abu Dhabi stay, including kitchens, laundry, sustainability details and practical fit.");
    expect(pageMetadataConfig.uaeExtendedStaySustainability.url).toBe(articleMetadata.url);
  });

  it("includes all supplied hotel groups and the requested secure booking destinations", () => {
    expect(comparisonRows.map((row) => row[0])).toEqual(["Hilton", "Marriott", "Accor", "IHG"]);
    expect(EXTENDED_STAY_STAY22_URL).toBe("https://booking.stay22.com/thestayandwander/8S9p00Hygg-");
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });
});
