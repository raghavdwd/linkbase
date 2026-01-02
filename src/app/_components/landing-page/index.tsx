"use client";

import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { Stats } from "./stats";
import { Testimonials } from "./testimonials";
import { FAQ } from "./faq";
import { CTA } from "./cta";
import { Footer } from "./footer";

/**
 * overall landing page container with all sections
 * @returns landing page component
 */
export function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
