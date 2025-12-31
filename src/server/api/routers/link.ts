import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { links, subscriptions } from "~/server/db/schema";
import { eq, asc, and, count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * default link limit for free users
 */
const FREE_PLAN_LINK_LIMIT = 5;

/**
 * tRPC router for link management
 */
export const linkRouter = createTRPCRouter({
  /**
   * fetching all links for the current user, ordered by 'order'
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.links.findMany({
      where: eq(links.userId, ctx.session.user.id),
      orderBy: [asc(links.order)],
    });
  }),

  /**
   * creating a new link for the current user
   */
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        url: z.string().url("must be a valid URL"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // checking current link count
      const [linkCount] = await ctx.db
        .select({ value: count() })
        .from(links)
        .where(eq(links.userId, ctx.session.user.id));

      // getting user's subscription to check limit
      const subscription = await ctx.db.query.subscriptions.findFirst({
        where: and(
          eq(subscriptions.userId, ctx.session.user.id),
          eq(subscriptions.status, "active"),
        ),
        with: {
          plan: true,
        },
      });

      // determining link limit from plan (-1 means unlimited)
      const linkLimit = subscription?.plan?.linkLimit ?? FREE_PLAN_LINK_LIMIT;
      const currentCount = linkCount?.value ?? 0;

      // enforcing link limit
      if (linkLimit !== -1 && currentCount >= linkLimit) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `You've reached your link limit (${linkLimit}). Upgrade to Pro for unlimited links!`,
        });
      }

      // finding the current highest order to append to the end
      const userLinks = await ctx.db.query.links.findMany({
        where: eq(links.userId, ctx.session.user.id),
      });
      const nextOrder =
        userLinks.length > 0
          ? Math.max(...userLinks.map((l) => l.order)) + 1
          : 0;

      return await ctx.db
        .insert(links)
        .values({
          id: crypto.randomUUID(),
          userId: ctx.session.user.id,
          title: input.title,
          url: input.url,
          order: nextOrder,
        })
        .returning();
    }),

  /**
   * updating an existing link
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        url: z.string().url().optional(),
        visible: z.boolean().optional(),
        icon: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db
        .update(links)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(links.id, id), eq(links.userId, ctx.session.user.id)))
        .returning();
    }),

  /**
   * deleting a link
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(links)
        .where(
          and(eq(links.id, input.id), eq(links.userId, ctx.session.user.id)),
        );
    }),

  /**
   * batch updating link orders for drag-and-drop
   */
  reorder: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      // using a transaction for consistency if possible, or just updating each
      // for simplicity in this implementation we'll run separate updates
      const updates = input.map((item) =>
        ctx.db
          .update(links)
          .set({ order: item.order, updatedAt: new Date() })
          .where(
            and(eq(links.id, item.id), eq(links.userId, ctx.session.user.id)),
          ),
      );
      await Promise.all(updates);
      return { success: true };
    }),
});
