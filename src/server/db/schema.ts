import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

export const posts = pgTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: text("name"),
    createdById: text("created_by_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ],
);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  username: text("username").unique(),
  bio: text("bio"),
  image: text("image"),
  theme: text("theme").default("default").notNull(),
  buttonStyle: text("button_style").default("rounded").notNull(),
  socialLinks: text("social_links"), // stored as JSON string
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const links = pgTable("link", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  visible: boolean("visible").default(true).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const analytics = pgTable("analytics", {
  id: text("id").primaryKey(),
  linkId: text("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  clickedAt: timestamp("clicked_at")
    .$defaultFn(() => new Date())
    .notNull(),
  device: text("device"),
  browser: text("browser"),
  referrer: text("referrer"),
});

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
  links: many(links),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const linkRelations = relations(links, ({ one, many }) => ({
  user: one(user, { fields: [links.userId], references: [user.id] }),
  analytics: many(analytics),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  link: one(links, { fields: [analytics.linkId], references: [links.id] }),
  user: one(user, { fields: [analytics.userId], references: [user.id] }),
}));

// ============================================
// SUBSCRIPTION & PAYMENT TABLES (4NF)
// ============================================

/**
 * plans table - defines available subscription tiers
 * 4NF: single-valued attributes only, no multi-valued dependencies
 */
export const plans = pgTable("plan", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // "Free", "Pro", "Business"
  slug: text("slug").notNull().unique(), // "free", "pro", "business"
  priceMonthly: integer("price_monthly").default(0).notNull(), // price in paisa (₹1 = 100 paisa)
  priceYearly: integer("price_yearly").default(0).notNull(),
  linkLimit: integer("link_limit").default(5).notNull(), // -1 for unlimited
  analyticsEnabled: boolean("analytics_enabled").default(false).notNull(),
  description: text("description"),
  isPopular: boolean("is_popular").default(false).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * planFeatures table - stores individual features for each plan
 * 4NF: separate table for multi-valued feature attribute
 */
export const planFeatures = pgTable("plan_feature", {
  id: text("id").primaryKey(),
  planId: text("plan_id")
    .notNull()
    .references(() => plans.id, { onDelete: "cascade" }),
  feature: text("feature").notNull(),
  order: integer("order").default(0).notNull(), // for display ordering
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * subscriptions table - tracks user plan memberships
 * 4NF: no multi-valued dependencies, separate from payments
 */
export const subscriptions = pgTable("subscription", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  planId: text("plan_id")
    .notNull()
    .references(() => plans.id),
  status: text("status").default("active").notNull(), // active, cancelled, expired, past_due
  billingCycle: text("billing_cycle").default("monthly").notNull(), // monthly, yearly
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  razorpaySubscriptionId: text("razorpay_subscription_id"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * payments table - payment transaction history
 * 4NF: isolated from subscriptions, handles payment events
 */
export const payments = pgTable("payment", {
  id: text("id").primaryKey(),
  subscriptionId: text("subscription_id")
    .notNull()
    .references(() => subscriptions.id, { onDelete: "cascade" }),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
  amount: integer("amount").notNull(), // amount in paisa
  currency: text("currency").default("INR").notNull(),
  status: text("status").default("pending").notNull(), // pending, completed, failed, refunded
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Subscription relations
export const planRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
  features: many(planFeatures),
}));

export const planFeatureRelations = relations(planFeatures, ({ one }) => ({
  plan: one(plans, {
    fields: [planFeatures.planId],
    references: [plans.id],
  }),
}));

export const subscriptionRelations = relations(
  subscriptions,
  ({ one, many }) => ({
    user: one(user, { fields: [subscriptions.userId], references: [user.id] }),
    plan: one(plans, {
      fields: [subscriptions.planId],
      references: [plans.id],
    }),
    payments: many(payments),
  }),
);

export const paymentRelations = relations(payments, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [payments.subscriptionId],
    references: [subscriptions.id],
  }),
}));

// Update user relations to include subscriptions
export const userSubscriptionRelations = relations(user, ({ many }) => ({
  subscriptions: many(subscriptions),
}));
