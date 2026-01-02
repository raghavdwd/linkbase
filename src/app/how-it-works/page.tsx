"use client";

import Link from "next/link";
import { Zap, Share2, BarChart3, Smartphone } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Check } from "lucide-react";

const steps = [
  {
    title: "Sign up for free",
    description:
      "Create your account in seconds and get your own Linkbase URL.",
    icon: <Check className="text-primary h-8 w-8" />,
  },
  {
    title: "Add your links",
    description:
      "Share your socials, website, store, videos, music, podcast and more.",
    icon: <Share2 className="text-primary h-8 w-8" />,
  },
  {
    title: "Customize your page",
    description:
      "Choose from beautiful themes and make your Linkbase uniquely yours.",
    icon: <Smartphone className="text-primary h-8 w-8" />,
  },
  {
    title: "Share and track",
    description:
      "Share your Linkbase and watch your audience grow with detailed analytics.",
    icon: <BarChart3 className="text-primary h-8 w-8" />,
  },
];

const features = [
  "No coding required",
  "Mobile-optimized design",
  "Real-time analytics",
  "Customizable themes",
  "Social media integration",
  "Unlimited links (Pro plan)",
];

/**
 * how it works page explaining the Linkbase process
 * @returns how it works page component
 */
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Zap size={16} />
              Simple 4-step process
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              How Linkbase{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                works
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              Everything you are. In one simple link. Here&apos;s how to get
              started.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/signup">Get started free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="bg-primary/10 absolute -bottom-20 -left-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="group border-none bg-white/50 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl dark:bg-neutral-900/50"
              >
                <CardHeader className="space-y-4 text-center">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    {step.icon}
                  </div>
                  <div className="text-primary font-mono text-sm font-semibold">
                    Step {index + 1}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 text-3xl font-bold">
              Everything you need to{" "}
              <span className="text-primary">succeed</span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-neutral-900"
                >
                  <Check className="text-primary h-5 w-5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/signup">Start for free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join millions of creators, businesses, and influencers who are
              using Linkbase to share their world.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <Link href="/signup">Sign up free</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/pricing">View plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
