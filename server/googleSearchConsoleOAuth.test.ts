import { describe, expect, it } from "vitest";
import {
  buildGoogleSearchConsoleAuthorizationUrl,
  createGoogleSearchConsoleState,
  decryptSearchConsoleRefreshToken,
  encryptSearchConsoleRefreshToken,
  GOOGLE_SEARCH_CONSOLE_REDIRECT_URI,
  GOOGLE_SEARCH_CONSOLE_SCOPE,
  isValidGoogleSearchConsoleState,
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

  it("uses a signed, time-limited state for cross-site OAuth callback verification", () => {
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = "test-jwt-secret";
    const state = createGoogleSearchConsoleState();
    expect(isValidGoogleSearchConsoleState(state)).toBe(true);
    expect(isValidGoogleSearchConsoleState(`${state}tampered`)).toBe(false);
    process.env.JWT_SECRET = originalSecret;
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
