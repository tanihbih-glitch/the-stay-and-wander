import { afterEach, describe, expect, it, vi } from "vitest";
import { registerMailchimpSubscribeRoute } from "./mailchimpSubscribe";

function captureHandler() {
  let handler: ((req: any, res: any) => Promise<void>) | undefined;
  const app = {
    post: (_path: string, callback: (req: any, res: any) => Promise<void>) => { handler = callback; },
  } as any;
  registerMailchimpSubscribeRoute(app);
  return handler;
}

function responseRecorder() {
  let statusCode = 200;
  let payload: unknown;
  const response = {
    setHeader: () => undefined,
    status(code: number) { statusCode = code; return response; },
    json(value: unknown) { payload = value; return response; },
  };
  return { response, get statusCode() { return statusCode; }, get payload() { return payload; } };
}

describe("Mailchimp subscribe endpoint", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("creates a pending tagged contact without exposing email data to the client response", async () => {
    process.env.MAILCHIMP_API_KEY = "test-key";
    process.env.MAILCHIMP_SERVER_PREFIX = "https://us10.admin.mailchimp.com/";
    process.env.MAILCHIMP_AUDIENCE_ID = "audience-id";
    let request: RequestInit | undefined;
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
      request = init;
      return new Response(JSON.stringify({ status: "pending" }), { status: 200 });
    }));

    const handler = captureHandler();
    const recorded = responseRecorder();
    await handler?.({
      ip: "203.0.113.22",
      socket: { remoteAddress: "203.0.113.22" },
      body: {
        email: "test@example.com",
        consent: true,
        consentTimestamp: "2026-10-28T12:00:00.000Z",
        sourcePage: "/blog/ski-in-ski-out-hotels-2026-2027",
        honeypot: "",
      },
    }, recorded.response);

    expect(recorded.statusCode).toBe(200);
    expect(recorded.payload).toEqual({ ok: true });
    expect(request?.method).toBe("PUT");
    const body = JSON.parse(String(request?.body));
    expect(body.status_if_new).toBe("pending");
    expect(body.timestamp_signup).toBe("2026-10-28T12:00:00.000Z");
    expect(body.tags).toEqual(["ski-2026-27", "source:blog/ski-in-ski-out-hotels-2026-2027"]);
  });

  it("silently ignores a filled honeypot without calling Mailchimp", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const handler = captureHandler();
    const recorded = responseRecorder();
    await handler?.({
      ip: "203.0.113.23",
      socket: { remoteAddress: "203.0.113.23" },
      body: { email: "bot@example.com", consent: true, sourcePage: "/blog/ski-in-ski-out-hotels-2026-2027", honeypot: "filled" },
    }, recorded.response);

    expect(recorded.statusCode).toBe(200);
    expect(recorded.payload).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
