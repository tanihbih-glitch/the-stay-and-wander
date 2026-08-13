import type { Express, Request, Response } from "express";
import { timingSafeEqual } from "crypto";
import { getSearchConsoleConnection, upsertSearchConsoleConnection } from "./db";
import {
  buildGoogleSearchConsoleAuthorizationUrl,
  createGoogleSearchConsoleState,
  encryptSearchConsoleRefreshToken,
  exchangeGoogleSearchConsoleCode,
  GOOGLE_SEARCH_CONSOLE_PROPERTY,
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  verifySearchConsolePropertyAccess,
} from "./googleSearchConsoleOAuth";

const STATE_COOKIE = "gsc_oauth_state";
const STATE_MAX_AGE_MS = 10 * 60 * 1000;

function getStringQuery(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function getCookie(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const prefix = `${name}=`;
  const entry = cookieHeader.split(";").map(value => value.trim()).find(value => value.startsWith(prefix));
  return entry ? decodeURIComponent(entry.slice(prefix.length)) : undefined;
}

function isSecureRequest(req: Request): boolean {
  return req.secure || req.headers["x-forwarded-proto"] === "https";
}

function sendResult(res: Response, status: number, title: string, body: string) {
  res.status(status).type("html").send(`<!doctype html><html><head><title>${title}</title></head><body style="font-family:system-ui;max-width:42rem;margin:4rem auto;padding:0 1.5rem"><h1>${title}</h1><p>${body}</p></body></html>`);
}

export function registerGoogleSearchConsoleOAuthRoutes(app: Express) {
  app.get("/api/oauth/google-search-console/start", async (req: Request, res: Response) => {
    try {
      const existing = await getSearchConsoleConnection(GOOGLE_SEARCH_CONSOLE_PROPERTY);
      if (existing) {
        sendResult(res, 409, "Search Console monitoring is already connected", "Use the scheduled report rather than authorizing another account.");
        return;
      }
      const state = createGoogleSearchConsoleState();
      res.cookie(STATE_COOKIE, state, {
        httpOnly: true,
        secure: isSecureRequest(req),
        sameSite: "lax",
        maxAge: STATE_MAX_AGE_MS,
        path: "/api/oauth/google-search-console",
      });
      res.redirect(302, buildGoogleSearchConsoleAuthorizationUrl(state));
    } catch {
      sendResult(res, 500, "Search Console authorization could not start", "Confirm the OAuth client credentials and try again.");
    }
  });

  app.get("/api/oauth/google-search-console/callback", async (req: Request, res: Response) => {
    const code = getStringQuery(req, "code");
    const state = getStringQuery(req, "state");
    const expectedState = getCookie(req, STATE_COOKIE);
    res.clearCookie(STATE_COOKIE, { path: "/api/oauth/google-search-console" });

    if (!code || !state || !expectedState || !cryptoSafeEqual(state, expectedState)) {
      sendResult(res, 400, "Search Console authorization could not be verified", "Please return to the secure authorization link and try again.");
      return;
    }

    try {
      const tokens = await exchangeGoogleSearchConsoleCode(code);
      const refreshToken = tokens.refresh_token;
      const accessToken = tokens.access_token;
      if (!refreshToken || !accessToken) {
        sendResult(res, 400, "Google did not return a refresh token", "Revoke the app's prior access in your Google Account, then start the authorization again.");
        return;
      }
      const hasProperty = await verifySearchConsolePropertyAccess(accessToken);
      if (!hasProperty) {
        sendResult(res, 403, "The authorized account does not have this Search Console property", "Use a Google account that has access to thestayandwander.com in Search Console.");
        return;
      }
      await upsertSearchConsoleConnection({
        property: GOOGLE_SEARCH_CONSOLE_PROPERTY,
        refreshTokenEncrypted: encryptSearchConsoleRefreshToken(refreshToken),
        scope: tokens.scope || GOOGLE_SEARCH_CONSOLE_SCOPE,
      });
      sendResult(res, 200, "Search Console monitoring is connected", "Read-only access was verified for thestayandwander.com. You may close this window.");
    } catch {
      sendResult(res, 500, "Search Console authorization failed", "No token was saved. Please confirm the registered redirect URI and try again.");
    }
  });
}

function cryptoSafeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
