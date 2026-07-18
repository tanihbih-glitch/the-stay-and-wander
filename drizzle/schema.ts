import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Affiliate Analytics Tables
export const affiliateClicks = mysqlTable('affiliateClicks', {
  id: int('id').autoincrement().primaryKey(),
  partner: varchar('partner', { length: 64 }).notNull(), // getyourguide, stay22, aviasales, tripcom
  category: varchar('category', { length: 64 }).notNull(), // hotel, flight, tour, email
  source: varchar('source', { length: 256 }).notNull(), // page/component where click originated
  destination: varchar('destination', { length: 512 }).notNull(), // full affiliate URL
  userId: int('userId'), // optional: if user is logged in
  sessionId: varchar('sessionId', { length: 128 }), // track anonymous sessions
  ipAddress: varchar('ipAddress', { length: 45 }), // IPv4 or IPv6
  userAgent: text('userAgent'), // browser info
  referrer: varchar('referrer', { length: 512 }), // page referrer
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type AffiliateClick = typeof affiliateClicks.$inferSelect;
export type InsertAffiliateClick = typeof affiliateClicks.$inferInsert;

export const affiliateConversions = mysqlTable('affiliateConversions', {
  id: int('id').autoincrement().primaryKey(),
  clickId: int('clickId').references(() => affiliateClicks.id),
  partner: varchar('partner', { length: 64 }).notNull(),
  category: varchar('category', { length: 64 }).notNull(),
  conversionType: varchar('conversionType', { length: 64 }).notNull(), // booking, signup, etc
  conversionValue: varchar('conversionValue', { length: 20 }), // estimated revenue as string
  status: varchar('status', { length: 64 }).notNull().default('pending'), // pending, confirmed, cancelled
  externalId: varchar('externalId', { length: 256 }), // affiliate partner's conversion ID
  notes: text('notes'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export type AffiliateConversion = typeof affiliateConversions.$inferSelect;
export type InsertAffiliateConversion = typeof affiliateConversions.$inferInsert;

// TODO: Add your tables here