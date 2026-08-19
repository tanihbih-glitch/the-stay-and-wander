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
  it("uses the requested canonical title and published crawler description", () => {
    expect(articleMetadata.title).toBe("Extended Stays in the UAE: How Sustainable Are Hilton, Marriott, and Accor?");
    expect(articleMetadata.url).toBe("/blog/uae-extended-stay-sustainability-2026");
    expect(searchMetadata.description).toBe("Compare the sustainability approaches of Hilton, Marriott, Accor, and IHG for longer hotel stays in Dubai and Abu Dhabi, with practical advice for relocators.");
    expect(pageMetadataConfig.uaeExtendedStaySustainability.url).toBe(articleMetadata.url);
  });

  it("includes all supplied hotel groups and the requested secure booking destinations", () => {
    expect(comparisonRows.map((row) => row[0])).toEqual(["Hilton", "Marriott", "Accor", "IHG"]);
    expect(EXTENDED_STAY_STAY22_URL).toBe("https://booking.stay22.com/thestayandwander/8S9p00Hygg-");
    expect(TRIP_COM_HOTEL_WIDGET_URL).toBe("https://www.trip.com/partners/ad/S18723294?Allianceid=9322314&SID=324726991&trip_sub1=");
  });
});
