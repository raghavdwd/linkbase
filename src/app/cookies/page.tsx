"use client";

import Link from "next/link";
import { Cookie, Shield, Eye, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

/**
 * cookies policy page with comprehensive cookie information
 * @returns cookies policy page component
 */
export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Cookie size={16} />
              Cookie Policy
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Understanding Our{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Cookies
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              This policy explains how we use cookies and similar technologies
              to provide, protect, and improve our services.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/privacy">Read Privacy Policy</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Introduction */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Introduction
                </CardTitle>
                <CardDescription>
                  What are cookies and how we use them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your device
                  when you visit a website. They help websites remember your
                  preferences, understand how you interact with the site, and
                  improve your overall experience.
                </p>
                <p className="text-muted-foreground">
                  This Cookie Policy explains how LinkBase Inc. (&quot;we&quot;,
                  &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
                  technologies (like web beacons and pixels) on our website and
                  services.
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies We Use */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Types of Cookies We Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Essential Cookies</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-1">
                          <Shield className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Strictly Necessary</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        These cookies are essential for the website to function
                        properly. They enable core functionality such as secure
                        log-in, remember your preferences, and accessibility
                        features.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-1">
                          <Settings className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Functional</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        These cookies enable the website to provide enhanced
                        functionality and personalization. They may be set by us
                        or by third-party providers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Performance Cookies</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-1">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Analytics</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        These cookies help us understand how visitors interact
                        with our website by collecting and reporting information
                        anonymously. This helps us improve our services.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-1">
                          <Cookie className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Performance</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        These cookies collect information about how you use our
                        website, such as which pages you visit most often and if
                        you get error messages from web pages.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Marketing Cookies</h4>
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-1">
                        <Cookie className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Advertising</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      These cookies are used to deliver advertisements that are
                      relevant to you and your interests. They may also be used
                      to limit the number of times you see an advertisement and
                      measure the effectiveness of advertising campaigns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specific Cookies We Use */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Specific Cookies We Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-gray-200 p-2 text-left">
                          Cookie Name
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Purpose
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Type
                        </th>
                        <th className="border border-gray-200 p-2 text-left">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-2">
                          __Secure-next-auth.session-token
                        </td>
                        <td className="border border-gray-200 p-2">
                          Maintains user session
                        </td>
                        <td className="border border-gray-200 p-2">
                          Essential
                        </td>
                        <td className="border border-gray-200 p-2">7 days</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">
                          __Secure-next-auth.csrf-token
                        </td>
                        <td className="border border-gray-200 p-2">
                          CSRF protection
                        </td>
                        <td className="border border-gray-200 p-2">
                          Essential
                        </td>
                        <td className="border border-gray-200 p-2">7 days</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">
                          _ga (Google Analytics)
                        </td>
                        <td className="border border-gray-200 p-2">
                          Website analytics
                        </td>
                        <td className="border border-gray-200 p-2">
                          Performance
                        </td>
                        <td className="border border-gray-200 p-2">2 years</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2">
                          _gid (Google Analytics)
                        </td>
                        <td className="border border-gray-200 p-2">
                          Website analytics
                        </td>
                        <td className="border border-gray-200 p-2">
                          Performance
                        </td>
                        <td className="border border-gray-200 p-2">24 hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Managing Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Most web browsers automatically accept cookies, but you can
                  usually modify your browser setting to decline cookies if you
                  prefer. This may prevent you from taking full advantage of the
                  website.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Browser Settings</h4>
                    <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                      <li>
                        <strong>Chrome:</strong> Settings → Privacy and security
                        → Cookies and other site data
                      </li>
                      <li>
                        <strong>Firefox:</strong> Options → Privacy & Security →
                        Cookies and Site Data
                      </li>
                      <li>
                        <strong>Safari:</strong> Preferences → Privacy → Cookies
                        and website data
                      </li>
                      <li>
                        <strong>Edge:</strong> Settings → Cookies and site
                        permissions → Cookies and data stored
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Cookie Management</h4>
                    <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                      <li>Block all cookies</li>
                      <li>Allow all cookies</li>
                      <li>Block third-party cookies</li>
                      <li>Clear cookies when you close your browser</li>
                      <li>Block cookies from specific sites</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Cookies */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Third-Party Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may also use third-party cookies on our website. These are
                  cookies that are sent to your browser from domains that are
                  not our website.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Analytics Providers</h4>
                  <p className="text-muted-foreground text-sm">
                    We use Google Analytics to help us understand how our
                    customers use the website. You can read more about how
                    Google uses your Personal Information here:
                    https://policies.google.com/privacy
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Advertising Networks</h4>
                  <p className="text-muted-foreground text-sm">
                    We may use third-party advertising networks to serve ads
                    when you visit our website. These companies may use
                    information about your visits to this and other websites to
                    provide targeted advertisements.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Consent */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Cookie Consent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When you first visit our website, you will see a cookie
                  consent banner that allows you to accept or decline
                  non-essential cookies. You can change your cookie preferences
                  at any time by clicking on the cookie settings icon in the
                  footer of our website.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Your Choices</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>Accept all cookies for the best user experience</li>
                    <li>
                      Decline non-essential cookies and only allow essential
                      cookies
                    </li>
                    <li>Customize your cookie preferences by category</li>
                    <li>
                      Withdraw your consent at any time through our cookie
                      settings
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about our use of cookies or other
                  technologies, please contact us at:
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> privacy@linkbase.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Mail:</strong> LinkBase Inc., Attn: Privacy Officer,
                    123 Linkbase Lane, San Francisco, CA 94107
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Linkbase is ready to help you create your perfect link-in-bio
              page. We respect your privacy and cookie preferences.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <Link href="/signup">Sign up free</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/privacy">Read Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
