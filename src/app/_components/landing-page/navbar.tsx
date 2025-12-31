"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";

/**
 * navigation bar for the landing page
 * @returns navbar component
 */
export function Navbar() {
  return (
    <nav className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-primary-foreground text-xl font-bold">L</span>
          </div>
          <span className="text-foreground text-2xl font-bold tracking-tight">
            Link<span className="text-primary">Base</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground font-semibold">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold">
              Sign up free
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
