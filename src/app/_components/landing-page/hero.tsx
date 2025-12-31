"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PhoneMockup } from "./phone-mockup";

/**
 * hero section for the landing page
 * @returns hero component
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <h1 className="text-foreground text-5xl leading-tight font-extrabold tracking-tight md:text-7xl">
              Everything you are. In{" "}
              <span className="text-primary">one simple link</span>.
            </h1>
            <p className="text-muted-foreground mt-6 text-xl md:text-2xl">
              Join 50M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <span className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2">
                  linkbase.io/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  className="focus-visible:ring-primary h-14 pl-24 text-lg"
                />
              </div>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 rounded-full px-8 text-lg font-bold"
              >
                Claim your Linkbase
              </Button>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">
              It&apos;s free, and always will be. No credit card required.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="bg-primary/10 absolute -inset-4 rounded-full blur-3xl" />
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
