import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildCorporateTravelAutoReply,
  buildCorporateTravelNotification,
  sendCorporateTravelEmails,
} from "./corporateTravelEmail";
import { isApplicationRoute, sitemapRoutes } from "../shared/publicRoutes";
import { CORPORATE_TRAVEL_AFFILIATE_LINKS } from "../client/src/lib/affiliateLinks";

const projectRoot = resolve(process.cwd());
const readSource = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

const enquiry = {
  fullName: "Amina Okafor",
  companyName: "Northstar Energy",
  email: "amina@example.com",
  phone: "+234 801 234 5678",
  country: "Nigeria",
  travellerCount: "11–20",
  eventName: "ADIPEC 2026",
  destination: "Abu Dhabi UAE",
  startDate: "2026-11-03",
  endDate: "2026-11-08",
  budget: "$1,000–2,000",
  additionalRequirements: "Executive lounge access",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Corporate Travel page and contact workflow", () => {
  it("creates an email notification for the Corporate Travel inbox and a personalised auto-reply", () => {
    const notification = buildCorporateTravelNotification(enquiry);
    const autoReply = buildCorporateTravelAutoReply(enquiry);
    expect(notification.to).toEqual(["thestayandwander@thestayandwander.com"]);
    expect(notification.reply_to).toBe("amina@example.com");
    expect(notification.html).toContain("Northstar Energy");
    expect(autoReply.to).toEqual(["amina@example.com"]);
    expect(autoReply.html).toContain("within 24 hours");
  });

  it("delivers both the owner notification and customer auto-reply through Resend when configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "The Stay & Wander <hello@thestayandwander.com>");
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: "owner-email" }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: "auto-reply" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendCorporateTravelEmails(enquiry)).resolves.toEqual({
      delivered: true,
      autoReplySent: true,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    const ownerPayload = JSON.parse(calls[0][1].body as string);
    const autoReplyPayload = JSON.parse(calls[1][1].body as string);
    expect(calls[0][0]).toBe("https://api.resend.com/emails");
    expect(calls[0][1].headers).toMatchObject({ Authorization: "Bearer test-resend-key" });
    expect(ownerPayload).toMatchObject({
      from: "The Stay & Wander <hello@thestayandwander.com>",
      to: ["thestayandwander@thestayandwander.com"],
      reply_to: "amina@example.com",
    });
    expect(autoReplyPayload).toMatchObject({
      from: "The Stay & Wander <hello@thestayandwander.com>",
      to: ["amina@example.com"],
      subject: "We received your corporate travel request | The Stay & Wander",
    });
  });

  it("reports unconfigured and owner-notification failure states without sending unapproved live email", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM_EMAIL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendCorporateTravelEmails(enquiry)).resolves.toEqual({
      delivered: false,
      autoReplySent: false,
    });
    expect(fetchMock).not.toHaveBeenCalled();

    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "The Stay & Wander <hello@thestayandwander.com>");
    fetchMock.mockResolvedValueOnce(new Response("Temporary provider failure", {
      status: 503,
      statusText: "Service Unavailable",
    }));

    await expect(sendCorporateTravelEmails(enquiry)).rejects.toThrow(
      "Resend corporate travel email failed (503): Temporary provider failure"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("keeps the enquiry successful when the owner notification succeeds but the customer auto-reply fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("RESEND_FROM_EMAIL", "The Stay & Wander <hello@thestayandwander.com>");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: "owner-email" }), { status: 200 }))
      .mockResolvedValueOnce(new Response("Auto-reply provider failure", {
        status: 503,
        statusText: "Service Unavailable",
      }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendCorporateTravelEmails(enquiry)).resolves.toEqual({
      delivered: true,
      autoReplySent: false,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenCalledWith(
      "[Corporate Travel] Auto-reply delivery failed after the owner notification was sent",
      expect.any(Error)
    );
  });

  it("uses the requested public route and sitemap registration", () => {
    expect(isApplicationRoute("/corporate-travel")).toBe(true);
    expect(sitemapRoutes.some(route => route.path === "/corporate-travel")).toBe(true);
  });

  it("uses safe new-tab affiliate interactions and the requested contact schema", () => {
    const source = readSource("client/src/pages/CorporateTravel.tsx");
    expect(source).toContain('target="_blank" rel="noopener noreferrer"');
    expect(source).toContain("CORPORATE_TRAVEL_AFFILIATE_LINKS");
    expect(CORPORATE_TRAVEL_AFFILIATE_LINKS.flights).toBe("https://aviasales.tpo.lu/f9QeB1mu");
    expect(CORPORATE_TRAVEL_AFFILIATE_LINKS.carRentals).toBe("https://www.discovercars.com/?a_aid=Thestayandwander");
    expect(CORPORATE_TRAVEL_AFFILIATE_LINKS.tours).toBe("https://gyg.me/As25WS5K");
    expect(source).toContain("Corporate Travel Planning — Handled Completely");
    expect(source).toContain("TravelAgency");
    expect(source).toContain("trpc.corporateTravel.submitEnquiry.useMutation()");
  });
});
