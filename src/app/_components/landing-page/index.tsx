"use client";

import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Features } from "./features";
import { Footer } from "./footer";

/**
 * overall landing page container
 * @returns landing page component
 */
export function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* additional sections could go here (e.g. Testimonials, FAQ) */}
      </main>
      <Footer />
    </div>
  );
}
