"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, User, Tag } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "How to Create a Professional Link-in-Bio Page",
    excerpt:
      "Learn the best practices for creating a link-in-bio page that converts visitors and showcases your brand effectively.",
    author: "Alex Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Tips & Tricks",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Link Analytics",
    excerpt:
      "Understanding your audience through analytics is crucial. Here's how to make the most of your link performance data.",
    author: "Sarah Chen",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Analytics",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Design Trends for Link Pages in 2024",
    excerpt:
      "Stay ahead of the curve with the latest design trends that will make your link page stand out.",
    author: "Marcus Rodriguez",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "How Top Creators Use Link-in-Bio Pages",
    excerpt:
      "Discover how successful creators leverage link-in-bio pages to grow their audience and monetize their content.",
    author: "Emily Davis",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Success Stories",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Optimizing Your Link Page for Mobile Users",
    excerpt:
      "With most users accessing links on mobile devices, here's how to ensure your page provides the best mobile experience.",
    author: "Alex Johnson",
    date: "2023-12-20",
    readTime: "4 min read",
    category: "Mobile",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Integrating Social Media with Your Link Page",
    excerpt:
      "Learn how to seamlessly connect your social media profiles with your link page for maximum engagement.",
    author: "Sarah Chen",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Social Media",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const categories = [
  "All Posts",
  "Tips & Tricks",
  "Analytics",
  "Design",
  "Success Stories",
  "Mobile",
  "Social Media",
];

/**
 * blog page with articles and search functionality
 * @returns blog page component
 */
export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Calendar size={16} />
              Latest Insights
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Linkbase{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Discover tips, tricks, and insights to help you make the most of
              your link-in-bio page and grow your digital presence.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 flex max-w-2xl gap-4">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Posts");
                }}
                variant="outline"
                className="rounded-full px-6 font-bold"
              >
                Clear
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-4 font-medium"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-none transition-all duration-300 hover:shadow-xl"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                      <Tag size={14} />
                      <span>{post.category}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary text-xl font-bold transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="text-muted-foreground flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="mb-2 text-2xl font-bold">No articles found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Posts");
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
              >
                Show all articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest tips and insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="text-lg"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold">
                Subscribe
              </Button>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to create your perfect link page?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Apply what you&apos;ve learned and start building your digital
              presence today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
