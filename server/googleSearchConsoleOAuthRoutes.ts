import type { Express, Request, Response } from "express";
import { consumeSearchConsoleOAuthState, createSearchConsoleOAuthState, getSearchConsoleConnection, upsertSearchConsoleConnection } from "./db";
import {
  buildGoogleSearchConsoleAuthorizationUrl,
  createGoogleSearchConsoleState,
  encryptSearchConsoleRefreshToken,
  exchangeGoogleSearchConsoleCode,
  GOOGLE_SEARCH_CONSOLE_PROPERTY,
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  GOOGLE_SEARCH_CONSOLE_STATE_TTL_MS,
  hashGoogleSearchConsoleState,
  verifySearchConsolePropertyAccess,
} from "./googleSearchConsoleOAuth";

function getStringQuery(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function sendResult(res: Response, status: number, title: string, body: string) {
  res.status(status).type("html").send(`<!doctype html><html><head><title>${title}</title></head><body style="font-family:system-ui;max-width:42rem;margin:4rem auto;padding:0 1.5rem"><h1>${title}</h1><p>${body}</p></body></html>`);
}

function logOAuthFailure(stage: string, error?: unknown) {
  const detail = error instanceof Error ? error.message : undefined;
  console.error("[Search Console OAuth] authorization failure", { stage, detail });
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
      await createSearchConsoleOAuthState(
        hashGoogleSearchConsoleState(state),
        new Date(Date.now() + GOOGLE_SEARCH_CONSOLE_STATE_TTL_MS)
      );
      res.redirect(302, buildGoogleSearchConsoleAuthorizationUrl(state));
    } catch (error) {
      logOAuthFailure("authorization_start", error);
      sendResult(res, 500, "Search Console authorization could not start", "Confirm the OAuth client credentials and try again.");
    }
  });

  app.get("/api/oauth/google-search-console/callback", async (req: Request, res: Response) => {
    const code = getStringQuery(req, "code");
    const state = getStringQuery(req, "state");

    if (!code || !state || !(await consumeSearchConsoleOAuthState(hashGoogleSearchConsoleState(state)))) {
      logOAuthFailure("state_validation");
      sendResult(res, 400, "Search Console authorization could not be verified", "Please return to the secure authorization link and try again.");
      return;
    }

    try {
      const tokens = await exchangeGoogleSearchConsoleCode(code);
      const refreshToken = tokens.refresh_token;
      const accessToken = tokens.access_token;
      if (!refreshToken || !accessToken) {
        logOAuthFailure("missing_refresh_token");
        sendResult(res, 400, "Google did not return a refresh token", "Revoke the app's prior access in your Google Account, then start the authorization again.");
        return;
      }
      const hasProperty = await verifySearchConsolePropertyAccess(accessToken);
      if (!hasProperty) {
        logOAuthFailure("property_access_denied");
        sendResult(res, 403, "The authorized account does not have this Search Console property", "Use a Google account that has access to thestayandwander.com in Search Console.");
        return;
      }
      await upsertSearchConsoleConnection({
        property: GOOGLE_SEARCH_CONSOLE_PROPERTY,
        refreshTokenEncrypted: encryptSearchConsoleRefreshToken(refreshToken),
        scope: tokens.scope || GOOGLE_SEARCH_CONSOLE_SCOPE,
      });
      sendResult(res, 200, "Search Console monitoring is connected", "Read-only access was verified for thestayandwander.com. You may close this window.");
    } catch (error) {
      logOAuthFailure("callback_exchange_or_persistence", error);
      sendResult(res, 500, "Search Console authorization failed", "No token was saved. Please confirm the registered redirect URI and try again.");
    }
  });
}
