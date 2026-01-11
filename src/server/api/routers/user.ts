import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { user, links } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * tRPC router for user profile management
 */
export const userRouter = createTRPCRouter({
  /**
   * get the current user's profile data
   */
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });
  }),

  /**
   * update the current user's username and bio
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, "username must be at least 3 characters")
          .max(20, "username must be at most 20 characters")
          .regex(
            /^[a-zA-Z0-9_]+$/,
            "username can only contain letters, numbers, and underscores",
          )
          .optional(),
        bio: z
          .string()
          .max(160, "bio must be at most 160 characters")
          .optional(),
        image: z
          .string()
          .url("must be a valid image URL")
          .optional()
          .or(z.literal("")),
        theme: z.string().optional(),
        buttonStyle: z.string().optional(),
        socialLinks: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // checking if username is already taken if provided
      if (input.username) {
        const existingUser = await ctx.db.query.user.findFirst({
          where: eq(user.username, input.username),
        });

        if (existingUser && existingUser.id !== ctx.session.user.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "username is already taken",
          });
        }
      }

      return await ctx.db
        .update(user)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(user.id, ctx.session.user.id))
        .returning();
    }),

  /**
   * public procedure to fetch a user's profile and links by username
   */
  getPublicProfile: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db.query.user.findFirst({
        where: eq(user.username, input.username),
      });

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      const userLinks = await ctx.db.query.links.findMany({
        where: and(eq(links.userId, profile.id), eq(links.visible, true)),
        orderBy: (links, { asc }) => [asc(links.order)],
      });

      return {
        ...profile,
        links: userLinks,
      };
    }),

  /**
   * public procedure to check if a username is available
   */
  checkUsername: publicProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, "username must be at least 3 characters")
          .max(30, "username must be at most 30 characters")
          .regex(
            /^[a-z0-9_-]+$/,
            "username can only contain lowercase letters, numbers, underscores, and hyphens",
          ),
      }),
    )
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.user.findFirst({
        where: eq(user.username, input.username),
      });

      return {
        available: !existingUser,
      };
    }),
});
