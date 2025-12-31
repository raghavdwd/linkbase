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
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
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
            <p className="text-muted-foreground mt-4 text-sm">
              Empowering creators and businesses to share their world with one
              simple link.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-bold">Product</h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold">Support</h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold">Company</h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-foreground font-bold">Legal</h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row md:gap-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LinkBase Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
