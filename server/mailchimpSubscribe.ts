import { createHash } from "node:crypto";
import type { Express, Request, Response } from "express";

const SOURCE_PAGE = "/blog/ski-in-ski-out-hotels-2026-2027";
const SUBSCRIBER_TAG = "ski-2026-27";
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const attempts = new Map<string, { count: number; resetAt: number }>();

function normalizeServerPrefix(value: string | undefined) {
  return (value ?? "")
    .replace(/^https?:\/\//, "")
    .split(".")[0]
    .replace(/\/$/, "");
}

function getClientKey(req: Request) {
  return (req.ip || req.socket.remoteAddress || "unknown").replace(/^::ffff:/, "");
}

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRateLimited(req: Request) {
  const now = Date.now();
  const key = getClientKey(req);
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function subscriberHash(email: string) {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export function registerMailchimpSubscribeRoute(app: Express) {
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-store");

    if (isRateLimited(req)) {
      res.setHeader("Retry-After", String(Math.ceil(WINDOW_MS / 1000)));
      res.status(429).json({ ok: false, message: "Too many attempts. Please try again later." });
      return;
    }

    const body = req.body as {
      email?: unknown;
      consent?: unknown;
      consentTimestamp?: unknown;
      sourcePage?: unknown;
      honeypot?: unknown;
    } | undefined;

    // A filled honeypot is treated as a harmless successful response so bots do not
    // receive a useful signal, while no contact is sent to Mailchimp.
    if (body?.honeypot) {
      res.status(200).json({ ok: true });
      return;
    }

    if (
      !isValidEmail(body?.email) ||
      body?.consent !== true ||
      body?.sourcePage !== SOURCE_PAGE
    ) {
      res.status(400).json({ ok: false, message: "Please enter a valid email address and confirm consent." });
      return;
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = normalizeServerPrefix(process.env.MAILCHIMP_SERVER_PREFIX);
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!apiKey || !serverPrefix || !audienceId) {
      res.status(503).json({ ok: false, message: "Signup is temporarily unavailable. Please try again shortly." });
      return;
    }

    const email = body.email.trim().toLowerCase();
    const consentTimestamp = typeof body.consentTimestamp === "string" && body.consentTimestamp
      ? body.consentTimestamp
      : new Date().toISOString();
    const apiUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members/${subscriberHash(email)}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${Buffer.from(`manus:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "pending",
          timestamp_signup: consentTimestamp,
          tags: [SUBSCRIBER_TAG, `source:${SOURCE_PAGE.slice(1)}`],
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        res.status(502).json({ ok: false, message: "We could not start the email confirmation. Please try again shortly." });
        return;
      }

      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({ ok: false, message: "We could not reach the email service. Please try again shortly." });
    }
  });
}

export const mailchimpSubscribeConstants = {
  sourcePage: SOURCE_PAGE,
  subscriberTag: SUBSCRIBER_TAG,
  maxRequestsPerWindow: MAX_REQUESTS_PER_WINDOW,
};
