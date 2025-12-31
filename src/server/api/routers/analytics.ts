import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { analytics, links } from "~/server/db/schema";
import { eq, count, and, sql } from "drizzle-orm";

/**
 * tRPC router for analytics data
 */
export const analyticsRouter = createTRPCRouter({
  /**
   * fetching aggregated click analytics for the current user's links
   */
  getSummary: protectedProcedure.query(async ({ ctx }) => {
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
});
