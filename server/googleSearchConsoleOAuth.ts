import crypto from "crypto";

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_AUTHORIZE_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_SEARCH_CONSOLE_PROPERTY = "sc-domain:thestayandwander.com";
export const GOOGLE_SEARCH_CONSOLE_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GOOGLE_SEARCH_CONSOLE_STATE_TTL_MS = 10 * 60 * 1000;

export const GOOGLE_SEARCH_CONSOLE_REDIRECT_URI =
  "https://thestayandwander.com/api/oauth/google-search-console/callback";

function getRequiredEnv(name: "GOOGLE_SEARCH_CONSOLE_CLIENT_ID" | "GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for Google Search Console OAuth.`);
  }
  return value;
}

/**
 * Confirms that Google's token endpoint accepts the configured OAuth client.
 * A deliberately invalid authorization code must return invalid_grant; an
 * invalid_client response indicates that the configured client is not accepted.
 */
export async function validateGoogleSearchConsoleOAuthClient(): Promise<boolean> {
  const form = new URLSearchParams({
    client_id: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
    client_secret: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
    code: "pre_authorization_validation",
    redirect_uri: GOOGLE_SEARCH_CONSOLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const payload = (await response.json()) as { error?: string };

  return payload.error !== "invalid_client" && payload.error !== "unauthorized_client";
}

export function createGoogleSearchConsoleState(): string {
  const payload = Buffer.from(JSON.stringify({
    issuedAt: Date.now(),
    nonce: crypto.randomBytes(24).toString("base64url"),
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", getOAuthStateKey()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function isValidGoogleSearchConsoleState(state: string, now = Date.now()): boolean {
  const [payload, signature] = state.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = crypto.createHmac("sha256", getOAuthStateKey()).update(payload).digest("base64url");
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { issuedAt?: unknown; nonce?: unknown };
    return typeof parsed.issuedAt === "number"
      && typeof parsed.nonce === "string"
      && now - parsed.issuedAt >= 0
      && now - parsed.issuedAt <= GOOGLE_SEARCH_CONSOLE_STATE_TTL_MS;
  } catch {
    return false;
  }
}

export function buildGoogleSearchConsoleAuthorizationUrl(state: string): string {
  const query = new URLSearchParams({
    client_id: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
    redirect_uri: GOOGLE_SEARCH_CONSOLE_REDIRECT_URI,
    response_type: "code",
    scope: GOOGLE_SEARCH_CONSOLE_SCOPE,
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
    state,
  });
  return `${GOOGLE_AUTHORIZE_ENDPOINT}?${query.toString()}`;
}

export async function exchangeGoogleSearchConsoleCode(code: string) {
  const form = new URLSearchParams({
    client_id: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
    client_secret: getRequiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
    code,
    redirect_uri: GOOGLE_SEARCH_CONSOLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    error?: string;
  };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error || "Google authorization code exchange failed.");
  }
  return payload;
}

export async function verifySearchConsolePropertyAccess(accessToken: string): Promise<boolean> {
  const response = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return false;
  const payload = (await response.json()) as { siteEntry?: Array<{ siteUrl?: string }> };
  return payload.siteEntry?.some(site => site.siteUrl === GOOGLE_SEARCH_CONSOLE_PROPERTY) ?? false;
}

function getEncryptionKey(): Buffer {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required to encrypt the Search Console refresh token.");
  return crypto.createHash("sha256").update(secret).digest();
}

function getOAuthStateKey(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required to sign the Search Console OAuth state.");
  return secret;
}

export function encryptSearchConsoleRefreshToken(refreshToken: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(refreshToken, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted].map(part => part.toString("base64url")).join(".");
}

export function decryptSearchConsoleRefreshToken(encryptedToken: string): string {
  const [ivPart, tagPart, encryptedPart] = encryptedToken.split(".");
  if (!ivPart || !tagPart || !encryptedPart) throw new Error("Invalid encrypted Search Console token.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivPart, "base64url"));
  decipher.setAuthTag(Buffer.from(tagPart, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedPart, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
