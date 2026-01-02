"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * call to action section at the bottom of the landing page
 * @returns cta component
 */
export function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="bg-background relative overflow-hidden rounded-3xl border p-8 shadow-2xl md:p-16">
          {/* decorative gradient blobs */}
          <div className="bg-primary/20 absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              Start for free
            </div>

            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Ready to simplify your
              <br />
              <span className="text-primary">digital presence?</span>
            </h2>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg md:text-xl">
              Create your free Linkbase today and start connecting with your
              audience like never before. No credit card required.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 group h-14 rounded-full px-8 text-lg font-bold"
                >
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-lg font-bold"
                >
                  See how it works
                </Button>
              </Link>
            </div>

            <p className="text-muted-foreground mt-6 text-sm">
              Join 50M+ creators already using Linkbase
            </p>

            {/* trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.9 3.85L12 12l-6.9-3.97L12 4.18zM5 9.04l6 3.36v6.8l-6-3.36V9.04zm8 10.16v-6.8l6-3.36v6.8l-6 3.36z" />
                </svg>
                SSL Secured
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93V4.07z" />
                </svg>
                GDPR Compliant
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                Enterprise Security
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
