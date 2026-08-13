import { describe, expect, it } from "vitest";
import {
  buildGoogleSearchConsoleAuthorizationUrl,
  createGoogleSearchConsoleState,
  decryptSearchConsoleRefreshToken,
  encryptSearchConsoleRefreshToken,
  findAuthorizedSearchConsoleProperty,
  GOOGLE_SEARCH_CONSOLE_PROPERTY,
  GOOGLE_SEARCH_CONSOLE_REDIRECT_URI,
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  GOOGLE_SEARCH_CONSOLE_URL_PREFIX_PROPERTY,
  hashGoogleSearchConsoleState,
  validateGoogleSearchConsoleOAuthClient,
} from "./googleSearchConsoleOAuth";

describe("Google Search Console OAuth client", () => {
  it("is accepted by Google's token endpoint before authorization", async () => {
    await expect(validateGoogleSearchConsoleOAuthClient()).resolves.toBe(true);
  }, 20_000);

  it("requests only the registered callback and Search Console read-only scope", () => {
    const url = new URL(buildGoogleSearchConsoleAuthorizationUrl("test-state"));
    expect(url.searchParams.get("redirect_uri")).toBe(GOOGLE_SEARCH_CONSOLE_REDIRECT_URI);
    expect(url.searchParams.get("scope")).toBe(GOOGLE_SEARCH_CONSOLE_SCOPE);
    expect(url.searchParams.get("access_type")).toBe("offline");
  });

  it("creates opaque state values with stable, non-reversible persistence hashes", () => {
    const state = createGoogleSearchConsoleState();
    expect(state).not.toContain(".");
    expect(hashGoogleSearchConsoleState(state)).toHaveLength(64);
    expect(hashGoogleSearchConsoleState(state)).not.toContain(state);
    expect(hashGoogleSearchConsoleState(`${state}tampered`)).not.toBe(hashGoogleSearchConsoleState(state));
  });

  it("accepts the exact URL-prefix property when the domain property is unavailable", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response(JSON.stringify({
      siteEntry: [{ siteUrl: GOOGLE_SEARCH_CONSOLE_URL_PREFIX_PROPERTY }],
    }), { status: 200 })) as typeof fetch;
    await expect(findAuthorizedSearchConsoleProperty("read-only-token")).resolves.toBe(GOOGLE_SEARCH_CONSOLE_URL_PREFIX_PROPERTY);
    globalThis.fetch = originalFetch;
    expect(GOOGLE_SEARCH_CONSOLE_PROPERTY).toBe("sc-domain:thestayandwander.com");
  });

  it("encrypts refresh tokens before persistence", () => {
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = "test-jwt-secret";
    const encrypted = encryptSearchConsoleRefreshToken("refresh-token-value");
    expect(encrypted).not.toContain("refresh-token-value");
    expect(decryptSearchConsoleRefreshToken(encrypted)).toBe("refresh-token-value");
    process.env.JWT_SECRET = originalSecret;
  });
});
