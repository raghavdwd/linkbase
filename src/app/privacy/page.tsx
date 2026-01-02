"use client";

import Link from "next/link";
import { Shield, Eye, Lock, Users } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

/**
 * privacy policy page with comprehensive data protection information
 * @returns privacy policy page component
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Shield size={16} />
              Privacy Policy
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Your Privacy,{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Protected
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We take your privacy seriously. This policy explains how we
              collect, use, and protect your personal information when you use
              Linkbase.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/terms">Read Terms of Service</Link>
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

      {/* Privacy Content */}
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
                  Your privacy is important to us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  At LinkBase Inc., we are committed to protecting your personal
                  information and your right to privacy. This Privacy Policy
                  explains what information we collect, how we use it, and what
                  rights you have regarding your data.
                </p>
                <p className="text-muted-foreground">
                  If you have any questions or concerns about our policy, or our
                  practices with regards to your personal information, please
                  contact us at privacy@linkbase.com.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">
                    Personal Information
                  </h4>
                  <p className="text-muted-foreground">
                    We collect personal information that you voluntarily provide
                    to us when you register for an account, express an interest
                    in obtaining information about us or our products and
                    services, when you participate in activities on our website
                    or otherwise contact us.
                  </p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>Personal details such as name, email address</li>
                    <li>Account credentials and profile information</li>
                    <li>Payment information for subscription services</li>
                    <li>Social media profiles and links</li>
                    <li>Content you create and share on our platform</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">
                    Automatically Collected Information
                  </h4>
                  <p className="text-muted-foreground">
                    When you visit our website, we automatically collect certain
                    information about your device and your usage of our website.
                  </p>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>Device and browser information</li>
                    <li>IP address and geolocation data</li>
                    <li>Usage patterns and analytics data</li>
                    <li>Referrer information</li>
                    <li>Cookie and tracking data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Eye className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Provision</h4>
                      <p className="text-muted-foreground text-sm">
                        To operate and maintain our services, process your
                        transactions, and provide customer support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Lock className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Security</h4>
                      <p className="text-muted-foreground text-sm">
                        To protect our services and detect, prevent, and address
                        fraud and other security issues.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Communication</h4>
                      <p className="text-muted-foreground text-sm">
                        To send you service-related messages, updates, and
                        promotional communications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Shield className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Improvement</h4>
                      <p className="text-muted-foreground text-sm">
                        To understand how our services are used and to improve
                        and optimize our offerings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing and Disclosure */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Data Sharing and Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may share your personal information in the following
                  situations:
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>
                    <strong>With your consent:</strong> We may disclose your
                    information with your consent.
                  </li>
                  <li>
                    <strong>For legal reasons:</strong> We may disclose your
                    information where we believe it is necessary to comply with
                    a legal obligation.
                  </li>
                  <li>
                    <strong>With service providers:</strong> We may share your
                    information with third-party vendors who provide services on
                    our behalf.
                  </li>
                  <li>
                    <strong>With business partners:</strong> We may share your
                    information with business partners to offer you certain
                    products, services, or promotions.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We have implemented appropriate technical and organizational
                  security measures designed to protect the security of any
                  personal information we process. However, please also remember
                  that we cannot guarantee that the internet itself is 100%
                  secure.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Industry-standard encryption for data transmission</li>
                  <li>Secure storage of personal information</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on data protection practices</li>
                  <li>Access controls and authentication measures</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Depending on your location, you may have certain rights
                  regarding your personal information under applicable data
                  protection laws. These rights may include:
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>
                    <strong>Access:</strong> You have the right to know what
                    personal information we hold about you.
                  </li>
                  <li>
                    <strong>Correction:</strong> You have the right to have your
                    personal information corrected if it is inaccurate.
                  </li>
                  <li>
                    <strong>Deletion:</strong> You have the right to request
                    that we delete your personal information.
                  </li>
                  <li>
                    <strong>Restriction:</strong> You have the right to request
                    that we restrict the processing of your personal
                    information.
                  </li>
                  <li>
                    <strong>Portability:</strong> You have the right to receive
                    your personal information in a structured, commonly used and
                    machine-readable format.
                  </li>
                  <li>
                    <strong>Objection:</strong> You have the right to object to
                    the processing of your personal information.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Cookies and Tracking Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to track the
                  activity on our website and store certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Types of Cookies We Use:</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1">
                    <li>
                      <strong>Essential Cookies:</strong> Necessary for our
                      website to function properly.
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand how
                      our website is used.
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to track visitors
                      across websites.
                    </li>
                    <li>
                      <strong>Preference Cookies:</strong> Remember your
                      preferences and settings.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your information, including Personal Data, may be transferred
                  to — and maintained on — computers located outside of your
                  state, province, country or other governmental jurisdiction
                  where the data protection laws may differ from those of your
                  jurisdiction.
                </p>
                <p className="text-muted-foreground">
                  If you are located outside the United States and choose to
                  provide information to us, please note that we transfer the
                  data, including Personal Data, to the United States and
                  process it there.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Children&apos;s Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our services are not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and you are
                  aware that your child has provided us with Personal Data,
                  please contact us.
                </p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions or comments about this policy, you may
                  email us at:
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
                <p className="text-muted-foreground">
                  If you are located in the European Economic Area (EEA), you
                  have the right to lodge a complaint with a supervisory
                  authority if you believe that we have violated any of the
                  rights provided to you under the GDPR.
                </p>
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
              page. Your privacy is our priority.
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
