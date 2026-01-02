"use client";

import { Users, MousePointerClick, Globe, Zap } from "lucide-react";

const stats = [
  {
    value: "50M+",
    label: "Active Users",
    description: "Creators trust Linkbase",
    icon: <Users className="h-8 w-8" />,
  },
  {
    value: "1B+",
    label: "Clicks Monthly",
    description: "Links clicked every month",
    icon: <MousePointerClick className="h-8 w-8" />,
  },
  {
    value: "190+",
    label: "Countries",
    description: "Global reach worldwide",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Reliable performance",
    icon: <Zap className="h-8 w-8" />,
  },
];

/**
 * stats section showing impressive numbers
 * @returns stats component
 */
export function Stats() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="from-primary rounded-3xl bg-gradient-to-br to-purple-600 p-8 md:p-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Trusted by millions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Join the world&apos;s largest community of creators and
              businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center text-white/80">
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-white md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
