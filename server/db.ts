import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, searchConsoleConnections, searchConsoleCtrReports, searchConsoleOAuthStates, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function upsertSearchConsoleConnection(input: {
  property: string;
  refreshTokenEncrypted: string;
  scope: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for Search Console monitoring.");

  await db.insert(searchConsoleConnections).values(input).onDuplicateKeyUpdate({
    set: {
      refreshTokenEncrypted: input.refreshTokenEncrypted,
      scope: input.scope,
      authorizedAt: new Date(),
    },
  });
}

export async function getSearchConsoleConnection(property: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(searchConsoleConnections)
    .where(eq(searchConsoleConnections.property, property))
    .limit(1);
  return result[0];
}

export async function getSearchConsoleConnectionByTaskUid(taskUid: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(searchConsoleConnections)
    .where(eq(searchConsoleConnections.scheduleCronTaskUid, taskUid))
    .limit(1);
  return result[0];
}

export async function setSearchConsoleScheduleTaskUid(property: string, taskUid: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for Search Console monitoring.");
  await db
    .update(searchConsoleConnections)
    .set({ scheduleCronTaskUid: taskUid })
    .where(eq(searchConsoleConnections.property, property));
}

export async function saveSearchConsoleCtrReport(input: {
  property: string;
  periodStart: string;
  periodEnd: string;
  metrics: Record<string, { clicks: number; impressions: number; ctr: number; position: number }>;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for Search Console monitoring.");

  await db.insert(searchConsoleCtrReports).values(input).onDuplicateKeyUpdate({
    set: { metrics: input.metrics, generatedAt: new Date() },
  });
  await db
    .update(searchConsoleConnections)
    .set({ lastReportAt: new Date() })
    .where(eq(searchConsoleConnections.property, input.property));
}

export async function createSearchConsoleOAuthState(stateHash: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for Search Console authorization.");
  await db.insert(searchConsoleOAuthStates).values({ stateHash, expiresAt });
}

export async function consumeSearchConsoleOAuthState(stateHash: string, now = new Date()): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db
    .select()
    .from(searchConsoleOAuthStates)
    .where(eq(searchConsoleOAuthStates.stateHash, stateHash))
    .limit(1);
  const record = result[0];
  if (!record) return false;
  await db.delete(searchConsoleOAuthStates).where(eq(searchConsoleOAuthStates.id, record.id));
  return record.expiresAt.getTime() >= now.getTime();
}

// TODO: add feature queries here as your schema grows.
