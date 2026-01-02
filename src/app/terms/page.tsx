"use client";

import Link from "next/link";
import { FileText, Clock, RefreshCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

/**
 * terms of service page with comprehensive legal information
 * @returns terms of service page component
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <FileText size={16} />
              Legal
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Terms of{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Please read these terms carefully before using Linkbase. By
              accessing or using our services, you agree to be bound by these
              terms.
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

      {/* Terms Content */}
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
                  Linkbase is a service provided by LinkBase Inc.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Welcome to Linkbase! These Terms of Service govern your use of
                  our website and services. Our goal is to provide you with a
                  reliable and enjoyable experience while protecting your rights
                  and ours.
                </p>
                <p className="text-muted-foreground">
                  By using Linkbase, you agree to comply with and be bound by
                  these Terms. If you do not agree with any part of these terms,
                  please do not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Account Terms */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Account Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Account Registration</h4>
                  <p className="text-muted-foreground">
                    You must be at least 13 years old to use Linkbase. You agree
                    to provide accurate, current, and complete information
                    during registration and to keep your account information
                    updated.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Account Security</h4>
                  <p className="text-muted-foreground">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account. You agree to notify us immediately of
                    any unauthorized use of your account.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Account Termination</h4>
                  <p className="text-muted-foreground">
                    We reserve the right to suspend or terminate your account at
                    our sole discretion, with or without notice, for conduct
                    that we believe violates these Terms or is harmful to other
                    users or our business.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Usage */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Service Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Acceptable Use</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>
                      You agree not to use Linkbase for any illegal purpose
                    </li>
                    <li>You will not violate any laws in your jurisdiction</li>
                    <li>
                      You will not infringe on the intellectual property rights
                      of others
                    </li>
                    <li>You will not distribute spam or malicious content</li>
                    <li>
                      You will not attempt to gain unauthorized access to our
                      systems
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Content Ownership</h4>
                  <p className="text-muted-foreground">
                    You retain ownership of the content you create and share on
                    Linkbase. By using our service, you grant us a worldwide,
                    non-exclusive, royalty-free license to use, reproduce,
                    modify, and display your content for the purpose of
                    providing and improving our services.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Prohibited Content</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>Illegal or harmful content</li>
                    <li>Hate speech or discriminatory content</li>
                    <li>Adult or explicit content</li>
                    <li>Violent or graphic content</li>
                    <li>Impersonation of others</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Subscription and Payments */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Subscription and Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Subscription Plans</h4>
                  <p className="text-muted-foreground">
                    Linkbase offers both free and paid subscription plans. You
                    agree to pay all fees for your chosen plan. We reserve the
                    right to change our fees at any time with notice.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Automatic Renewal</h4>
                  <p className="text-muted-foreground">
                    Paid subscriptions automatically renew at the end of each
                    billing period unless you cancel before the renewal date.
                    You can manage your subscription settings in your account
                    dashboard.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Refunds</h4>
                  <p className="text-muted-foreground">
                    We offer a 7-day money-back guarantee for new subscriptions.
                    After 7 days, subscription fees are non-refundable except as
                    required by law.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Your Content</h4>
                  <p className="text-muted-foreground">
                    You retain all rights to your content. By submitting content
                    to Linkbase, you grant us a license to use it as necessary
                    to provide our services.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Our Content</h4>
                  <p className="text-muted-foreground">
                    All content on Linkbase, including text, graphics, logos,
                    and software, is our property or that of our licensors and
                    is protected by intellectual property laws.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Copyright Policy</h4>
                  <p className="text-muted-foreground">
                    We respect intellectual property rights. If you believe your
                    copyrighted work has been copied and is accessible on our
                    service, please contact us with the required information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, LinkBase Inc. and its
                  affiliates shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
                <p className="text-muted-foreground">
                  Our total liability to you for all claims arising out of or
                  relating to these Terms or your use of the services shall not
                  exceed the amount you paid us in the last six months.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-primary mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">Updates to Terms</h4>
                    <p className="text-muted-foreground">
                      We may update these Terms from time to time. We will
                      notify you of any changes by posting the new Terms on this
                      page and updating the &quot;Last updated&quot; date at the
                      top of these Terms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCcw className="text-primary mt-1 h-6 w-6" />
                  <div>
                    <h4 className="font-semibold">Your Continued Use</h4>
                    <p className="text-muted-foreground">
                      Your continued use of the services after any changes to
                      these Terms constitutes acceptance of those changes. We
                      encourage you to review these Terms periodically for any
                      updates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> legal@linkbase.com
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Address:</strong> LinkBase Inc., 123 Linkbase Lane,
                    San Francisco, CA 94107
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
              page. Join millions of users who trust us with their digital
              presence.
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
                <Link href="/pricing">View plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
