"use client";

import { BarChart3, Smartphone, Share2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const features = [
  {
    title: "All your links in one place",
    description:
      "Share your socials, website, store, videos, music, podcast and more. It all lives on your Linkbase.",
    icon: <Share2 className="text-primary h-10 w-10" />,
  },
  {
    title: "Analyze your audience",
    description:
      "Track every click, views, and conversion. Understand what your audience wants and how they interact.",
    icon: <BarChart3 className="text-primary h-10 w-10" />,
  },
  {
    title: "Beautifully designed",
    description:
      "Choose from premium themes or design your own. Your Linkbase should be as unique as you are.",
    icon: <Smartphone className="text-primary h-10 w-10" />,
  },
  {
    title: "Instant updates",
    description:
      "Changed your link? No problem. Update your Linkbase in seconds and it reflects everywhere instantly.",
    icon: <Zap className="text-primary h-10 w-10" />,
  },
];

/**
 * features section for the landing page
 * @returns features component
 */
export function Features() {
  return (
    <section id="features" className="bg-muted/50 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
            Analyze, optimize and <span className="text-primary">grow</span>.
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Linkbase gives you the tools to understand your audience and share
            your passion with the world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background border-none shadow-lg transition-transform hover:-translate-y-2"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
