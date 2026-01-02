"use client";

import { UserPlus, Palette, Share, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description:
      "Sign up in seconds with your email or social account. It's completely free to get started.",
    icon: <UserPlus className="h-8 w-8" />,
  },
  {
    step: "02",
    title: "Customize your page",
    description:
      "Add your links, choose a beautiful theme, and make your profile uniquely yours.",
    icon: <Palette className="h-8 w-8" />,
  },
  {
    step: "03",
    title: "Share everywhere",
    description:
      "Add your Linkbase URL to your social bios, emails, and anywhere else you want to be found.",
    icon: <Share className="h-8 w-8" />,
  },
  {
    step: "04",
    title: "Watch it grow",
    description:
      "Track your performance with powerful analytics and optimize your content strategy.",
    icon: <TrendingUp className="h-8 w-8" />,
  },
];

/**
 * how it works section explaining the process
 * @returns how it works component
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold">
            Simple Setup
          </span>
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
            Get started in <span className="text-primary">minutes</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Creating your perfect link-in-bio page is easier than you think.
            Just follow these simple steps.
          </p>
        </div>

        <div className="relative">
          {/* connecting line for desktop */}
          <div className="bg-primary/20 absolute top-24 right-0 left-0 hidden h-0.5 lg:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                {/* step number circle */}
                <div className="bg-primary text-primary-foreground relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold shadow-lg transition-transform group-hover:scale-110">
                  {step.icon}
                </div>

                {/* step number badge */}
                <span className="bg-muted text-muted-foreground mb-4 rounded-full px-3 py-1 text-xs font-semibold">
                  Step {step.step}
                </span>

                <h3 className="text-foreground mb-2 text-xl font-bold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
