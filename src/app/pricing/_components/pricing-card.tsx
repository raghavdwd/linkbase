"use client";

import { useState } from "react";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";

interface PricingCardProps {
  planId: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular: boolean;
  linkLimit: number;
  analyticsEnabled: boolean;
  isLoggedIn: boolean;
}

/**
 * formatting price from paisa to rupees
 */
function formatPrice(paisa: number): string {
  if (paisa === 0) return "Free";
  return `₹${(paisa / 100).toLocaleString("en-IN")}`;
}

/**
 * pricing card component for individual plan display
 */
export function PricingCard({
  planId,
  name,
  slug,
  priceMonthly,
  priceYearly,
  description,
  features,
  isPopular,
  linkLimit,
  analyticsEnabled,
  isLoggedIn,
}: PricingCardProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isLoading, setIsLoading] = useState(false);

  const currentPrice = billingCycle === "yearly" ? priceYearly : priceMonthly;
  const monthlyEquivalent =
    billingCycle === "yearly" ? priceYearly / 12 : priceMonthly;
  const savings =
    billingCycle === "yearly" ? priceMonthly * 12 - priceYearly : 0;

  const handleCheckout = async () => {
    if (slug === "free") {
      // redirect to signup for free plan
      window.location.href = isLoggedIn ? "/dashboard" : "/login";
      return;
    }

    setIsLoading(true);

    // TODO: implement Razorpay checkout
    // for now, showing alert
    alert(
      `Checkout for ${name} plan (${billingCycle}) - ₹${(currentPrice / 100).toFixed(0)}`,
    );
    setIsLoading(false);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border-2 bg-white p-8 transition-all hover:shadow-xl dark:bg-neutral-900",
        isPopular
          ? "border-primary z-10 scale-105 shadow-lg"
          : "border-neutral-200 dark:border-neutral-700",
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="from-primary flex items-center gap-1 rounded-full bg-gradient-to-r to-purple-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
            <Sparkles size={14} />
            Most Popular
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </div>

      {/* Billing Toggle (for paid plans) */}
      {priceMonthly > 0 && (
        <div className="mb-6 flex items-center gap-2 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm font-medium transition-all",
              billingCycle === "monthly"
                ? "bg-white shadow-sm dark:bg-neutral-700"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm font-medium transition-all",
              billingCycle === "yearly"
                ? "bg-white shadow-sm dark:bg-neutral-700"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Yearly
            {savings > 0 && (
              <span className="ml-1 text-xs text-green-600">
                Save ₹{(savings / 100).toFixed(0)}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Price Display */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">
            {formatPrice(monthlyEquivalent)}
          </span>
          {priceMonthly > 0 && (
            <span className="text-muted-foreground">/month</span>
          )}
        </div>
        {billingCycle === "yearly" && priceYearly > 0 && (
          <p className="text-muted-foreground mt-1 text-sm">
            Billed annually ({formatPrice(priceYearly)}/year)
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className={cn(
          "h-12 w-full rounded-full text-base font-semibold transition-all",
          isPopular
            ? "from-primary bg-gradient-to-r to-purple-600 hover:opacity-90"
            : slug === "free"
              ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              : "",
        )}
        variant={isPopular || slug === "free" ? "default" : "outline"}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : slug === "free" ? (
          isLoggedIn ? (
            "Current Plan"
          ) : (
            "Get Started Free"
          )
        ) : (
          `Upgrade to ${name}`
        )}
      </Button>

      {/* Money-back Guarantee */}
      {priceMonthly > 0 && (
        <p className="text-muted-foreground mt-4 text-center text-xs">
          7-day money-back guarantee
        </p>
      )}
    </div>
  );
}
