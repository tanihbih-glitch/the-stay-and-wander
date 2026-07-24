import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

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

/**
 * A visitor's trip-planning request and its fulfillment state. Stripe remains the
 * source of truth for financial data; this table stores only IDs plus the business
 * data needed to generate, authorize, and deliver the itinerary.
 */
export const tripPlans = mysqlTable(
  "tripPlans",
  {
    id: int("id").autoincrement().primaryKey(),
    publicId: varchar("publicId", { length: 36 }).notNull(),
    accessTokenHash: varchar("accessTokenHash", { length: 64 }).notNull(),
    userId: int("userId").references(() => users.id, { onDelete: "set null" }),
    customerEmail: varchar("customerEmail", { length: 320 }),
    destination: varchar("destination", { length: 255 }).notNull(),
    tripLength: int("tripLength").notNull(),
    travelDates: varchar("travelDates", { length: 128 }),
    interests: json("interests").$type<string[]>().notNull(),
    budgetLevel: mysqlEnum("budgetLevel", ["Budget", "Mid-range", "Luxury"]).notNull(),
    travelStyle: varchar("travelStyle", { length: 64 }).notNull(),
    pace: mysqlEnum("pace", ["Relaxed", "Balanced", "Packed"]).notNull(),
    previewItinerary: text("previewItinerary"),
    previewGeneratedAt: timestamp("previewGeneratedAt"),
    selectedTier: mysqlEnum("selectedTier", ["basic", "standard", "premium", "concierge"]),
    stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }),
    stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
    stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
    fulfillmentStatus: mysqlEnum("fulfillmentStatus", [
      "draft",
      "preview_ready",
      "checkout_created",
      "paid",
      "generating",
      "ready",
      "failed",
      "cancelled",
    ])
      .notNull()
      .default("draft"),
    fullItinerary: text("fullItinerary"),
    pdfStorageKey: varchar("pdfStorageKey", { length: 512 }),
    pdfUrl: varchar("pdfUrl", { length: 1024 }),
    purchasedAt: timestamp("purchasedAt"),
    deliveredAt: timestamp("deliveredAt"),
    conciergeRevisionAvailable: boolean("conciergeRevisionAvailable").notNull().default(false),
    conciergeRevisionUsedAt: timestamp("conciergeRevisionUsedAt"),
    failureReason: varchar("failureReason", { length: 512 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("tripPlans_publicId_unique").on(table.publicId),
    uniqueIndex("tripPlans_accessTokenHash_unique").on(table.accessTokenHash),
    uniqueIndex("tripPlans_stripeCheckoutSessionId_unique").on(table.stripeCheckoutSessionId),
    uniqueIndex("tripPlans_stripePaymentIntentId_unique").on(table.stripePaymentIntentId),
  ]
);

export type TripPlan = typeof tripPlans.$inferSelect;
export type InsertTripPlan = typeof tripPlans.$inferInsert;

/** Tracks the single Concierge revision request and its replacement document. */
export const tripPlanRevisions = mysqlTable(
  "tripPlanRevisions",
  {
    id: int("id").autoincrement().primaryKey(),
    tripPlanId: int("tripPlanId")
      .notNull()
      .references(() => tripPlans.id, { onDelete: "cascade" }),
    revisionRequest: text("revisionRequest").notNull(),
    revisedItinerary: text("revisedItinerary"),
    revisedPdfStorageKey: varchar("revisedPdfStorageKey", { length: 512 }),
    revisedPdfUrl: varchar("revisedPdfUrl", { length: 1024 }),
    fulfillmentStatus: mysqlEnum("fulfillmentStatus", ["submitted", "generating", "ready", "failed"])
      .notNull()
      .default("submitted"),
    failureReason: varchar("failureReason", { length: 512 }),
    submittedAt: timestamp("submittedAt").defaultNow().notNull(),
    completedAt: timestamp("completedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("tripPlanRevisions_tripPlanId_unique").on(table.tripPlanId)]
);

export type TripPlanRevision = typeof tripPlanRevisions.$inferSelect;
export type InsertTripPlanRevision = typeof tripPlanRevisions.$inferInsert;
