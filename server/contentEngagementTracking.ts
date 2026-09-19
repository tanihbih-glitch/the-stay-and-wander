import { getDb } from "./db";
import { contentEngagementEvents } from "../drizzle/schema";

export interface TrackRelatedGuideClickParams {
  sourcePath: string;
  destinationPath: string;
}

export interface ContentEngagementStats {
  totalClicks: number;
  bySource: Array<{ sourcePath: string; count: number }>;
  byDestination: Array<{ destinationPath: string; count: number }>;
}

type ContentEngagementEvent = {
  sourcePath: string;
  destinationPath: string;
  createdAt: Date;
};

/**
 * Stores a deliberately minimal in-site content interaction. No visitor ID,
 * session ID, IP address, user agent, referrer, or external destination is
 * accepted or persisted for related-guide cards.
 */
export async function trackRelatedGuideClick({ sourcePath, destinationPath }: TrackRelatedGuideClickParams) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(contentEngagementEvents).values({
    eventType: "related_guide_click",
    component: "related_price_index_articles",
    sourcePath,
    destinationPath,
    createdAt: new Date(),
  });
}

export function aggregateRelatedGuideClicks(
  events: readonly ContentEngagementEvent[],
  startDate?: Date,
  endDate?: Date
): ContentEngagementStats {
  const bySource = new Map<string, number>();
  const byDestination = new Map<string, number>();
  let totalClicks = 0;

  for (const event of events) {
    if (startDate && event.createdAt < startDate) continue;
    if (endDate && event.createdAt > endDate) continue;
    totalClicks += 1;
    bySource.set(event.sourcePath, (bySource.get(event.sourcePath) ?? 0) + 1);
    byDestination.set(event.destinationPath, (byDestination.get(event.destinationPath) ?? 0) + 1);
  }

  const sortCounts = <T extends { count: number }>(items: T[]) => items.sort((a, b) => b.count - a.count);

  return {
    totalClicks,
    bySource: sortCounts(Array.from(bySource, ([sourcePath, count]) => ({ sourcePath, count }))),
    byDestination: sortCounts(Array.from(byDestination, ([destinationPath, count]) => ({ destinationPath, count }))),
  };
}

export async function getRelatedGuideEngagementStats(startDate?: Date, endDate?: Date): Promise<ContentEngagementStats> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const events = await db.select().from(contentEngagementEvents);
  return aggregateRelatedGuideClicks(events, startDate, endDate);
}
