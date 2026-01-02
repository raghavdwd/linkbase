import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { analytics, links, subscriptions, plans } from "~/server/db/schema";
import { eq, count, and, sql } from "drizzle-orm";
import { db } from "~/server/db";

/**
 * helper to check if user has analytics access
 */
async function checkAnalyticsAccess(userId: string) {
  const subscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.userId, userId),
      eq(subscriptions.status, "active"),
    ),
  });

  if (!subscription) return false;

  const plan = await db.query.plans.findFirst({
    where: eq(plans.id, subscription.planId),
  });

  return plan?.analyticsEnabled ?? false;
}

/**
 * tRPC router for analytics data
 */
export const analyticsRouter = createTRPCRouter({
  /**
   * fetching aggregated click analytics for the current user's links
   */
  getSummary: protectedProcedure.query(async ({ ctx }) => {
    // checking if user has analytics access
    const hasAccess = await checkAnalyticsAccess(ctx.session.user.id);

    if (!hasAccess) {
      // returning limited data for free users
      const [totalClicks] = await ctx.db
        .select({ value: count() })
        .from(analytics)
        .where(eq(analytics.userId, ctx.session.user.id));

      return {
        totalClicks: totalClicks?.value ?? 0,
        clicksPerLink: [],
        clicksOverTime: [],
        requiresUpgrade: true,
      };
    }

    // total clicks across all links
    const [totalClicks] = await ctx.db
      .select({ value: count() })
      .from(analytics)
      .where(eq(analytics.userId, ctx.session.user.id));

    // clicks per link
    const clicksPerLink = await ctx.db
      .select({
        linkId: analytics.linkId,
        title: links.title,
        clicks: count(),
      })
      .from(analytics)
      .innerJoin(links, eq(analytics.linkId, links.id))
      .where(eq(analytics.userId, ctx.session.user.id))
      .groupBy(analytics.linkId, links.title);

    // clicks over time (last 7 days)
    const clicksOverTime = await ctx.db
      .select({
        date: sql<string>`DATE(${analytics.clickedAt})`,
        clicks: count(),
      })
      .from(analytics)
      .where(
        and(
          eq(analytics.userId, ctx.session.user.id),
          sql`${analytics.clickedAt} >= CURRENT_DATE - INTERVAL '7 days'`,
        ),
      )
      .groupBy(sql`DATE(${analytics.clickedAt})`)
      .orderBy(sql`DATE(${analytics.clickedAt})`);

    return {
      totalClicks: totalClicks?.value ?? 0,
      clicksPerLink,
      clicksOverTime,
      requiresUpgrade: false,
    };
  }),

  /**
   * recording a click event (usually called from the public profile page)
   * note: this is a protected procedure for now, but in reality, public clicks
   * would use a public procedure or an API route.
   * for the core link management, we'll keep it simple.
   */
  trackClick: publicProcedure
    .input(
      z.object({
        linkId: z.string(),
        device: z.string().optional(),
        browser: z.string().optional(),
        referrer: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // verifying the link exists
      const link = await ctx.db.query.links.findFirst({
        where: eq(links.id, input.linkId),
      });

      if (!link) {
        throw new Error("link not found");
      }

      await ctx.db.insert(analytics).values({
        id: crypto.randomUUID(),
        linkId: input.linkId,
        userId: link.userId,
        device: input.device,
        browser: input.browser,
        referrer: input.referrer,
      });

      return { success: true };
    }),

  /**
   * fetching device breakdown statistics
   */
  getDeviceStats: protectedProcedure.query(async ({ ctx }) => {
    const deviceStats = await ctx.db
      .select({
        device: analytics.device,
        clicks: count(),
      })
      .from(analytics)
      .where(eq(analytics.userId, ctx.session.user.id))
      .groupBy(analytics.device);

    return deviceStats;
  }),

  /**
   * fetching browser breakdown statistics
   */
  getBrowserStats: protectedProcedure.query(async ({ ctx }) => {
    const browserStats = await ctx.db
      .select({
        browser: analytics.browser,
        clicks: count(),
      })
      .from(analytics)
      .where(eq(analytics.userId, ctx.session.user.id))
      .groupBy(analytics.browser);

    return browserStats;
  }),

  /**
   * fetching top referrers
   */
  getReferrerStats: protectedProcedure.query(async ({ ctx }) => {
    const referrerStats = await ctx.db
      .select({
        referrer: analytics.referrer,
        clicks: count(),
      })
      .from(analytics)
      .where(eq(analytics.userId, ctx.session.user.id))
      .groupBy(analytics.referrer)
      .orderBy(sql`${count()} DESC`)
      .limit(10);

    return referrerStats;
  }),

  /**
   * fetching today's click count
   */
  getTodayClicks: protectedProcedure.query(async ({ ctx }) => {
    const [todayClicks] = await ctx.db
      .select({ value: count() })
      .from(analytics)
      .where(
        and(
          eq(analytics.userId, ctx.session.user.id),
          sql`DATE(${analytics.clickedAt}) = CURRENT_DATE`,
        ),
      );

    return todayClicks?.value ?? 0;
  }),
});
