import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { plans, subscriptions, payments, links } from "~/server/db/schema";
import { eq, and, count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createHmac } from "crypto";
import { env } from "~/env";

/**
 * default plan limits for users without a subscription
 */
const FREE_PLAN_LIMITS = {
  linkLimit: 5,
  analyticsEnabled: false,
};

/**
 * tRPC router for subscription and payment management
 */
export const subscriptionRouter = createTRPCRouter({
  /**
   * get all available plans
   */
  getPlans: publicProcedure.query(async ({ ctx }) => {
    const allPlans = await ctx.db.query.plans.findMany({
      orderBy: (plans, { asc }) => [asc(plans.priceMonthly)],
    });
    return allPlans;
  }),

  /**
   * get current user's subscription and plan limits
   */
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    // finding active subscription for user
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: and(
        eq(subscriptions.userId, ctx.session.user.id),
        eq(subscriptions.status, "active"),
      ),
      with: {
        plan: true,
      },
    });

    if (!subscription) {
      // returning free plan limits for users without subscription
      return {
        subscription: null,
        plan: {
          name: "Free",
          slug: "free",
          linkLimit: FREE_PLAN_LIMITS.linkLimit,
          analyticsEnabled: FREE_PLAN_LIMITS.analyticsEnabled,
        },
        isFreePlan: true,
      };
    }

    return {
      subscription,
      plan: subscription.plan,
      isFreePlan: subscription.plan.slug === "free",
    };
  }),

  /**
   * get user's current link count and limit
   */
  getLinkLimits: protectedProcedure.query(async ({ ctx }) => {
    // getting current link count
    const [linkCount] = await ctx.db
      .select({ value: count() })
      .from(links)
      .where(eq(links.userId, ctx.session.user.id));

    // getting user's plan
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: and(
        eq(subscriptions.userId, ctx.session.user.id),
        eq(subscriptions.status, "active"),
      ),
      with: {
        plan: true,
      },
    });

    const linkLimit =
      subscription?.plan.linkLimit ?? FREE_PLAN_LIMITS.linkLimit;
    const currentCount = linkCount?.value ?? 0;

    return {
      currentCount,
      limit: linkLimit,
      canCreateMore: linkLimit === -1 || currentCount < linkLimit,
      isUnlimited: linkLimit === -1,
    };
  }),

  /**
   * check if user has analytics access
   */
  hasAnalyticsAccess: protectedProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: and(
        eq(subscriptions.userId, ctx.session.user.id),
        eq(subscriptions.status, "active"),
      ),
      with: {
        plan: true,
      },
    });

    return (
      subscription?.plan.analyticsEnabled ?? FREE_PLAN_LIMITS.analyticsEnabled
    );
  }),

  /**
   * create a checkout session for upgrading plan
   */
  createCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        billingCycle: z.enum(["monthly", "yearly"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // verify plan exists
      const plan = await ctx.db.query.plans.findFirst({
        where: eq(plans.id, input.planId),
      });

      if (!plan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Plan not found",
        });
      }

      if (plan.slug === "free") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot checkout free plan",
        });
      }

      const amount =
        input.billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;

      // TODO: integrate with Razorpay to create order
      // for now, returning mock data structure
      // in production, this would call Razorpay API

      return {
        orderId: `order_${crypto.randomUUID().slice(0, 8)}`,
        amount,
        currency: "INR",
        planId: plan.id,
        planName: plan.name,
        billingCycle: input.billingCycle,
        keyId: env.RAZORPAY_KEY_ID ?? "rzp_test_placeholder",
      };
    }),

  /**
   * verify payment and activate subscription
   */
  verifyPayment: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
        paymentId: z.string(),
        signature: z.string(),
        planId: z.string(),
        billingCycle: z.enum(["monthly", "yearly"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // verify Razorpay signature to prevent payment forgery
      if (!env.RAZORPAY_KEY_SECRET) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Razorpay configuration is incomplete",
        });
      }

      // generate expected signature using HMAC SHA256
      const generatedSignature = createHmac("sha256", env.RAZORPAY_KEY_SECRET)
        .update(`${input.orderId}|${input.paymentId}`)
        .digest("hex");

      // compare signatures using timing-safe comparison
      if (generatedSignature !== input.signature) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid payment signature",
        });
      }

      // getting the plan
      const plan = await ctx.db.query.plans.findFirst({
        where: eq(plans.id, input.planId),
      });

      if (!plan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Plan not found",
        });
      }

      // calculating period dates
      const now = new Date();
      const periodEnd = new Date(now);
      if (input.billingCycle === "yearly") {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1);
      } else {
        periodEnd.setMonth(periodEnd.getMonth() + 1);
      }

      // cancel any existing subscriptions
      await ctx.db
        .update(subscriptions)
        .set({ status: "cancelled", cancelledAt: now })
        .where(
          and(
            eq(subscriptions.userId, ctx.session.user.id),
            eq(subscriptions.status, "active"),
          ),
        );

      // creating new subscription
      const subscriptionId = crypto.randomUUID();
      await ctx.db.insert(subscriptions).values({
        id: subscriptionId,
        userId: ctx.session.user.id,
        planId: input.planId,
        status: "active",
        billingCycle: input.billingCycle,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      });

      // recording payment
      const amount =
        input.billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;
      await ctx.db.insert(payments).values({
        id: crypto.randomUUID(),
        subscriptionId,
        razorpayPaymentId: input.paymentId,
        razorpayOrderId: input.orderId,
        amount,
        status: "completed",
        paidAt: now,
      });

      return { success: true, subscriptionId };
    }),

  /**
   * cancel subscription
   */
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: and(
        eq(subscriptions.userId, ctx.session.user.id),
        eq(subscriptions.status, "active"),
      ),
    });

    if (!subscription) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No active subscription found",
      });
    }

    await ctx.db
      .update(subscriptions)
      .set({ status: "cancelled", cancelledAt: new Date() })
      .where(eq(subscriptions.id, subscription.id));

    return { success: true };
  }),
});
