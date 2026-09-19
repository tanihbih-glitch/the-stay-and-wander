import { decryptSearchConsoleRefreshToken, GOOGLE_SEARCH_CONSOLE_PROPERTIES } from "./googleSearchConsoleOAuth";
import {
  getSearchConsoleConnectionForProperties,
  saveSearchConsoleCtrReport,
  saveSearchConsoleUaeExtendedStayReport,
} from "./db";

/** Established CTR monitor with the two newly selected price-index canonicals. Do not add the UAE hub. */
export const MONITORED_SEARCH_CONSOLE_PATHS = [
  "/blog/bali-hotel-price-index-2026",
  "/blog/bangkok-hotel-price-index-2026",
  "/blog/where-to-stay-in-tokyo-2026",
  "/blog/where-to-stay-in-seoul-2026",
  "/blog/bangkok-hotel-budget-breakdown-2026",
  "/blog/uae-extended-stay-sustainability-2026",
] as const;

/** Historical list retained for comparison documentation; it is not the active CTR target list. */
export const MONITORED_WHERE_TO_STAY_PATHS = [
  "/blog/where-to-stay-in-bali-2026",
  "/blog/where-to-stay-in-bangkok-2026",
  "/blog/where-to-stay-in-tokyo-2026",
  "/blog/where-to-stay-in-seoul-2026",
] as const;

export const UAE_EXTENDED_STAY_HUB_PATH = "/blog/uae-extended-stay-hotels-2026";
export const MONITORED_UAE_EXTENDED_STAY_HUB_PATHS = [UAE_EXTENDED_STAY_HUB_PATH] as const;
/**
 * The new canonical page needs a complete post-publication month before its
 * first scheduled position review. The first eligible first business day is
 * November 2, 2026; later first business days remain eligible.
 */
export const UAE_EXTENDED_STAY_MONITORING_START_DATE = "2026-11-02";

export const PRIORITY_CTR_FOLLOW_UP_BASELINE = {
  periodStart: "2026-07-13",
  periodEnd: "2026-09-06",
  pages: {
    "/blog/bali-hotel-price-index-2026": { sourcePath: "/blog/bali-hotel-prices-2026", impressions: 1591, clicks: 0, ctr: 0, position: 8.06 },
    "/blog/bangkok-hotel-price-index-2026": { sourcePath: "/blog/bangkok-hotel-prices-2026", impressions: 1263, clicks: 1, ctr: 1 / 1263, position: 9.44 },
    "/blog/bangkok-hotel-budget-breakdown-2026": { sourcePath: "/blog/bangkok-hotel-budget-breakdown-2026", impressions: 853, clicks: 0, ctr: 0, position: 8.99 },
    "/blog/uae-extended-stay-sustainability-2026": { sourcePath: "/blog/uae-extended-stay-sustainability-2026", impressions: 691, clicks: 0, ctr: 0, position: 25.88 },
  },
} as const;

/**
 * The legacy page’s July–September outcome is directional reference only.
 * The new hub has broader intent and is evaluated on position trend plus a
 * documented manual citation review rather than CTR.
 */
export const UAE_EXTENDED_STAY_HUB_REFERENCE = {
  sourcePath: "/blog/uae-extended-stay-sustainability-2026",
  periodStart: "2026-07-13",
  periodEnd: "2026-09-06",
  impressions: 691,
  clicks: 0,
  position: 25.88,
  successMetric: "position trend and manually reviewed citation presence",
} as const;

export type PageMetric = { clicks: number; impressions: number; ctr: number; position: number };

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

export function compareUaeExtendedStayHubFollowUp(metrics: Record<string, PageMetric>) {
  const current = metrics[UAE_EXTENDED_STAY_HUB_PATH] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return {
    path: UAE_EXTENDED_STAY_HUB_PATH,
    legacyReference: UAE_EXTENDED_STAY_HUB_REFERENCE,
    current,
    positionChangeVsLegacy: current.position > 0
      ? Number((current.position - UAE_EXTENDED_STAY_HUB_REFERENCE.position).toFixed(2))
      : null,
    citationReview: {
      mode: "manual",
      status: "not-collected-by-search-console-api",
      cadence: "monthly",
      prompt: "Record whether the canonical hub appears as a cited source or result for relevant UAE extended-stay comparison queries; do not use CTR as the primary success metric.",
    },
  };
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

export function isUaeExtendedStayReviewEligible(now = new Date()): boolean {
  return isFirstBusinessDayOfMonth(now) && now.toISOString().slice(0, 10) >= UAE_EXTENDED_STAY_MONITORING_START_DATE;
}

async function collectSearchConsolePageMetrics(paths: readonly string[], now = new Date()) {
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
  for (const path of paths) {
    const row = rowsByUrl.get(`https://thestayandwander.com${path}`);
    metrics[path] = {
      clicks: row?.clicks ?? 0,
      impressions: row?.impressions ?? 0,
      ctr: row?.ctr ?? 0,
      position: row?.position ?? 0,
    };
  }

  return { property: connection.property, periodStart: startDate, periodEnd: endDate, metrics };
}

/** Collects only the established CTR snapshot paths. */
export async function collectSearchConsoleCtrReport(now = new Date()) {
  const report = await collectSearchConsolePageMetrics(MONITORED_SEARCH_CONSOLE_PATHS, now);
  await saveSearchConsoleCtrReport(report);
  return report;
}

/** Collects only the canonical UAE hub position snapshot, apart from CTR reporting. */
export async function collectUaeExtendedStayHubReport(now = new Date()) {
  const report = await collectSearchConsolePageMetrics(MONITORED_UAE_EXTENDED_STAY_HUB_PATHS, now);
  await saveSearchConsoleUaeExtendedStayReport(report);
  return report;
}
