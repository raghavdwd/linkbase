import { api } from "~/trpc/server";
import { getSession } from "~/server/better-auth/server";
import { PricingCard } from "./_components/pricing-card";
import { Check, Zap } from "lucide-react";

/**
 * default plans if database is empty
 */
const DEFAULT_PLANS = [
  {
    id: "free",
    name: "Free",
    slug: "free",
    priceMonthly: 0,
    priceYearly: 0,
    linkLimit: 5,
    analyticsEnabled: false,
    description: "Perfect for getting started",
    features: [
      "Up to 5 links",
      "Basic profile customization",
      "Standard themes",
      "Community support",
    ],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro",
    slug: "pro",
    priceMonthly: 49900, // ₹499 in paisa
    priceYearly: 399900, // ₹3999 in paisa (2 months free)
    linkLimit: -1, // unlimited
    analyticsEnabled: true,
    description: "For creators who want more",
    features: [
      "Unlimited links",
      "Full analytics dashboard",
      "All premium themes",
      "Social links",
      "Priority support",
      "Custom button styles",
    ],
    isPopular: true,
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    priceMonthly: 149900, // ₹1499 in paisa
    priceYearly: 1199900, // ₹11999 in paisa
    linkLimit: -1,
    analyticsEnabled: true,
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom branding",
      "API access",
      "Dedicated support",
      "White-label option",
    ],
    isPopular: false,
  },
];

/**
 * pricing page showing available subscription plans
 */
export default async function PricingPage() {
  const session = await getSession();

  // trying to fetch plans from database, fall back to defaults
  let plans = DEFAULT_PLANS;
  try {
    const dbPlans = await api.subscription.getPlans();
    if (dbPlans.length > 0) {
      // mapping to ensure nullable fields have default values for type compatibility
      plans = dbPlans.map((plan) => ({
        ...plan,
        description: plan.description ?? "",
        features: (plan.features as string[]) ?? [],
      }));
    }
  } catch (_error) {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
          <Zap size={16} />
          Simple, transparent pricing
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Choose your{" "}
          <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
            perfect plan
          </span>
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          Start free and upgrade as you grow. All plans include access to our
          beautiful link-in-bio platform.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const features = plan.features;

            return (
              <PricingCard
                key={plan.id}
                planId={plan.id}
                name={plan.name}
                slug={plan.slug}
                priceMonthly={plan.priceMonthly}
                priceYearly={plan.priceYearly}
                description={plan.description ?? ""}
                features={features}
                isPopular={plan.isPopular}
                linkLimit={plan.linkLimit}
                analyticsEnabled={plan.analyticsEnabled}
                isLoggedIn={!!session}
              />
            );
          })}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="border-t bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Compare Features
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-neutral-50 dark:bg-neutral-800">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Free</th>
                  <th className="text-primary p-4 text-center font-semibold">
                    Pro
                  </th>
                  <th className="p-4 text-center font-semibold">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  {
                    feature: "Number of links",
                    free: "5",
                    pro: "Unlimited",
                    business: "Unlimited",
                  },
                  {
                    feature: "Analytics dashboard",
                    free: false,
                    pro: true,
                    business: true,
                  },
                  {
                    feature: "Premium themes",
                    free: false,
                    pro: true,
                    business: true,
                  },
                  {
                    feature: "Social links",
                    free: true,
                    pro: true,
                    business: true,
                  },
                  {
                    feature: "Custom button styles",
                    free: false,
                    pro: true,
                    business: true,
                  },
                  {
                    feature: "Priority support",
                    free: false,
                    pro: true,
                    business: true,
                  },
                  {
                    feature: "Team members",
                    free: "1",
                    pro: "1",
                    business: "5",
                  },
                  {
                    feature: "API access",
                    free: false,
                    pro: false,
                    business: true,
                  },
                  {
                    feature: "White-label",
                    free: false,
                    pro: false,
                    business: true,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="mx-auto text-green-500" size={20} />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="bg-primary/5 p-4 text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="mx-auto text-green-500" size={20} />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )
                      ) : (
                        <span className="font-semibold">{row.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.business === "boolean" ? (
                        row.business ? (
                          <Check className="mx-auto text-green-500" size={20} />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )
                      ) : (
                        <span className="font-semibold">{row.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I upgrade or downgrade anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay.",
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with your purchase.",
              },
              {
                q: "What happens to my links if I downgrade?",
                a: "Your existing links will remain active, but you won't be able to create new ones until you're within your plan's limit.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-6 dark:bg-neutral-900"
              >
                <h3 className="mb-2 font-semibold">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
