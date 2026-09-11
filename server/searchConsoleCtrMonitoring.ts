import { decryptSearchConsoleRefreshToken, GOOGLE_SEARCH_CONSOLE_PROPERTIES } from "./googleSearchConsoleOAuth";
import { getSearchConsoleConnectionForProperties, saveSearchConsoleCtrReport } from "./db";

export const MONITORED_SEARCH_CONSOLE_PATHS = [
  "/blog/where-to-stay-in-bali-2026",
  "/blog/where-to-stay-in-bangkok-2026",
  "/blog/where-to-stay-in-tokyo-2026",
  "/blog/where-to-stay-in-seoul-2026",
  "/blog/bangkok-hotel-budget-breakdown-2026",
  "/blog/uae-extended-stay-sustainability-2026",
] as const;

/** Compatibility export retained for the original four-guide monthly report. */
export const MONITORED_WHERE_TO_STAY_PATHS = MONITORED_SEARCH_CONSOLE_PATHS.slice(0, 4);

export const PRIORITY_CTR_FOLLOW_UP_BASELINE = {
  periodStart: "2026-07-13",
  periodEnd: "2026-09-06",
  pages: {
    "/blog/where-to-stay-in-bali-2026": { sourcePath: "/blog/bali-hotel-prices-2026", impressions: 1591, clicks: 0, ctr: 0, position: 8.06 },
    "/blog/where-to-stay-in-bangkok-2026": { sourcePath: "/blog/bangkok-hotel-prices-2026", impressions: 1263, clicks: 1, ctr: 1 / 1263, position: 9.44 },
    "/blog/bangkok-hotel-budget-breakdown-2026": { sourcePath: "/blog/bangkok-hotel-budget-breakdown-2026", impressions: 853, clicks: 0, ctr: 0, position: 8.99 },
    "/blog/uae-extended-stay-sustainability-2026": { sourcePath: "/blog/uae-extended-stay-sustainability-2026", impressions: 691, clicks: 0, ctr: 0, position: 25.88 },
  },
} as const;

type PageMetric = { clicks: number; impressions: number; ctr: number; position: number };

export function comparePriorityCtrFollowUp(metrics: Record<string, PageMetric>) {
  return Object.entries(PRIORITY_CTR_FOLLOW_UP_BASELINE.pages).map(([path, baseline]) => {
    const current = metrics[path] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    return {
      path,
      baseline,
      current,
      ctrChange: Number((current.ctr - baseline.ctr).toFixed(6)),
      positionChange: Number((current.position - baseline.position).toFixed(2)),
    };
  });
}

function requireGoogleCredential(name: "GOOGLE_SEARCH_CONSOLE_CLIENT_ID" | "GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for Search Console monitoring.`);
  return value;
}

export function previousCompleteCalendarMonth(now = new Date()) {
  const firstThisMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const lastPreviousMonth = new Date(firstThisMonth.getTime() - 24 * 60 * 60 * 1000);
  const firstPreviousMonth = new Date(Date.UTC(lastPreviousMonth.getUTCFullYear(), lastPreviousMonth.getUTCMonth(), 1));
  const dateOnly = (date: Date) => date.toISOString().slice(0, 10);
  return { startDate: dateOnly(firstPreviousMonth), endDate: dateOnly(lastPreviousMonth) };
}

async function getAccessToken(refreshToken: string) {
  const body = new URLSearchParams({
    client_id: requireGoogleCredential("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
    client_secret: requireGoogleCredential("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const payload = (await response.json()) as { access_token?: string; error?: string };
  if (!response.ok || !payload.access_token) throw new Error(payload.error || "Unable to refresh Search Console access token.");
  return payload.access_token;
}

export function isFirstBusinessDayOfMonth(now = new Date()): boolean {
  const firstDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  while (firstDay.getUTCDay() === 0 || firstDay.getUTCDay() === 6) {
    firstDay.setUTCDate(firstDay.getUTCDate() + 1);
  }
  return now.getUTCFullYear() === firstDay.getUTCFullYear()
    && now.getUTCMonth() === firstDay.getUTCMonth()
    && now.getUTCDate() === firstDay.getUTCDate();
}

export async function collectSearchConsoleCtrReport(now = new Date()) {
  const connection = await getSearchConsoleConnectionForProperties(GOOGLE_SEARCH_CONSOLE_PROPERTIES);
  if (!connection) throw new Error("Search Console monitoring has not been authorized.");

  const accessToken = await getAccessToken(decryptSearchConsoleRefreshToken(connection.refreshTokenEncrypted));
  const { startDate, endDate } = previousCompleteCalendarMonth(now);
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(connection.property)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate, dimensions: ["page"], rowLimit: 25000 }),
    }
  );
  const payload = (await response.json()) as {
    rows?: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }>;
    error?: { message?: string };
  };
  if (!response.ok) throw new Error(payload.error?.message || "Search Console report query failed.");

  const rowsByUrl = new Map((payload.rows ?? []).map(row => [row.keys?.[0], row]));
  const metrics: Record<string, PageMetric> = {};
  for (const path of MONITORED_SEARCH_CONSOLE_PATHS) {
    const row = rowsByUrl.get(`https://thestayandwander.com${path}`);
    metrics[path] = {
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ?? 0,
      position: row?.position ?? 0,
    };
  }

  await saveSearchConsoleCtrReport({
    property: connection.property,
    periodStart: startDate,
    periodEnd: endDate,
    metrics,
  });
  return { property: connection.property, periodStart: startDate, periodEnd: endDate, metrics };
}
