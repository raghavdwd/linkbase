import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { customThemes } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

/**
 * zod schema for custom theme color validation
 * validates hex color format (#RRGGBB)
 */
const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "must be a valid hex color (e.g., #FF5733)");

/**
 * theme input schema for create/update operations
 */
const themeInputSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(50, "name must be at most 50 characters"),
  main: hexColorSchema,
  card: hexColorSchema,
  cardBorder: hexColorSchema,
  text: hexColorSchema,
  primary: hexColorSchema,
  accent: hexColorSchema,
});

/**
 * tRPC router for custom theme management
 * handles CRUD operations for user-created themes
 */
export const themesRouter = createTRPCRouter({
  /**
   * get all custom themes for the authenticated user
   */
  getMyThemes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.customThemes.findMany({
      where: eq(customThemes.userId, ctx.session.user.id),
      orderBy: (themes, { desc }) => [desc(themes.createdAt)],
    });
  }),

  /**
   * create a new custom theme
   */
  create: protectedProcedure
    .input(themeInputSchema)
    .mutation(async ({ ctx, input }) => {
      const id = randomUUID();

      const [newTheme] = await ctx.db
        .insert(customThemes)
        .values({
          id,
          userId: ctx.session.user.id,
          ...input,
        })
        .returning();

      return newTheme;
    }),

  /**
   * update an existing custom theme
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        ...themeInputSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...themeData } = input;

      // verifying ownership before update
      const existingTheme = await ctx.db.query.customThemes.findFirst({
        where: and(
          eq(customThemes.id, id),
          eq(customThemes.userId, ctx.session.user.id),
        ),
      });

      if (!existingTheme) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "theme not found or you don't have permission to edit it",
        });
      }

      const [updated] = await ctx.db
        .update(customThemes)
        .set({
          ...themeData,
          updatedAt: new Date(),
        })
        .where(eq(customThemes.id, id))
        .returning();

      return updated;
    }),

  /**
   * delete a custom theme
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // verifying ownership before delete
      const existingTheme = await ctx.db.query.customThemes.findFirst({
        where: and(
          eq(customThemes.id, input.id),
          eq(customThemes.userId, ctx.session.user.id),
        ),
      });

      if (!existingTheme) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "theme not found or you don't have permission to delete it",
        });
      }

      await ctx.db.delete(customThemes).where(eq(customThemes.id, input.id));

      return { success: true };
    }),

  /**
   * get a custom theme by ID (public - for rendering public profiles)
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const theme = await ctx.db.query.customThemes.findFirst({
        where: eq(customThemes.id, input.id),
      });

      if (!theme) {
        return null;
      }

      return theme;
    }),
});
