"use client";

import Link from "next/link";

/**
 * footer component for the landing page
 * @returns footer component
 */
export function Footer() {
  return (
    <footer className="bg-background border-t py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-sm font-bold">
                L
              </span>
            </div>
            <span className="text-foreground text-xl font-bold tracking-tight">
              Link<span className="text-primary">Base</span>
            </span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-sm text-sm">
            Empowering creators and businesses to share their world with one
            simple link.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row md:gap-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LinkBase Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
