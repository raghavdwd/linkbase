"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  Video,
  Book,
  MessageCircle,
  Shield,
  Settings,
  Users,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of Linkbase",
    icon: <HelpCircle className="text-primary h-8 w-8" />,
    articles: [
      "How to create your first Linkbase",
      "Understanding your dashboard",
      "Customizing your profile",
    ],
  },
  {
    title: "Link Management",
    description: "Managing and organizing your links",
    icon: <Settings className="text-primary h-8 w-8" />,
    articles: [
      "Adding and editing links",
      "Reordering your links",
      "Link analytics and insights",
    ],
  },
  {
    title: "Analytics & Insights",
    description: "Understanding your audience",
    icon: <Video className="text-primary h-8 w-8" />,
    articles: [
      "Reading your analytics dashboard",
      "Understanding click data",
      "Audience insights",
    ],
  },
  {
    title: "Account & Security",
    description: "Keeping your account safe",
    icon: <Shield className="text-primary h-8 w-8" />,
    articles: [
      "Changing your password",
      "Two-factor authentication",
      "Privacy settings",
    ],
  },
  {
    title: "Billing & Subscriptions",
    description: "Managing your plan",
    icon: <Book className="text-primary h-8 w-8" />,
    articles: [
      "Upgrading your plan",
      "Managing billing information",
      "Understanding billing cycles",
    ],
  },
  {
    title: "Team & Collaboration",
    description: "Working with your team",
    icon: <Users className="text-primary h-8 w-8" />,
    articles: ["Adding team members", "Managing permissions", "Team billing"],
  },
];

const popularArticles = [
  {
    title: "How to verify your email address",
    description:
      "Learn how to verify your email to unlock all Linkbase features.",
    category: "Account & Security",
  },
  {
    title: "Understanding link analytics",
    description:
      "Get insights into how your audience interacts with your links.",
    category: "Analytics & Insights",
  },
  {
    title: "Customizing your Linkbase theme",
    description:
      "Make your Linkbase uniquely yours with custom themes and colors.",
    category: "Getting Started",
  },
  {
    title: "Setting up social media links",
    description:
      "Connect your social profiles and make it easy for followers to find you.",
    category: "Link Management",
  },
];

/**
 * help center page with search and categorized articles
 * @returns help center page component
 */
export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <HelpCircle size={16} />
              Need help? We&apos;ve got you covered
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              How can we help you{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                today
              </span>
              ?
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Find answers to your questions, learn how to use Linkbase, or get
              in touch with our support team.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 flex max-w-2xl gap-4">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  className="pl-10 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Browse by category
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group border-none transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-2 transition-colors">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href="#"
                        className="text-muted-foreground hover:text-primary block transition-colors"
                      >
                        • {article}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="#"
                    className="text-primary hover:text-primary/80 mt-4 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    View all articles →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Popular articles
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <Card key={index} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="text-primary mb-2 text-sm font-semibold">
                      {article.category}
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="#"
                      className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Read article →
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No articles found. Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Still need help?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center transition-all hover:shadow-xl">
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Book size={32} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Browse our comprehensive help articles and guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="#">Visit Knowledge Base</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center transition-all hover:shadow-xl">
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Video size={32} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Video Tutorials
                </CardTitle>
                <CardDescription>
                  Watch step-by-step video guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="#">Watch Videos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center transition-all hover:shadow-xl">
              <CardHeader>
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <MessageCircle size={32} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Get help from our dedicated support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/contact">Get Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join millions of creators, businesses, and influencers who are
              using Linkbase to share their world.
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
                <Link href="/help-center">Browse Help Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
