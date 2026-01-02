"use client";

import Link from "next/link";
import { Users, Target, Rocket, Heart } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Visionary leader with 10+ years of experience in digital marketing and tech startups.",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Tech expert who builds scalable systems that power millions of links daily.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Design",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Creative mind behind our beautiful and intuitive user interfaces.",
  },
  {
    name: "Emily Davis",
    role: "Customer Success Lead",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Passionate about helping our users achieve their goals and dreams.",
  },
];

const values = [
  {
    title: "User First",
    description:
      "Everything we build starts with understanding our users' needs and solving real problems.",
    icon: <Heart className="text-primary h-8 w-8" />,
  },
  {
    title: "Innovation",
    description:
      "We constantly push boundaries to create the best link-in-bio experience possible.",
    icon: <Rocket className="text-primary h-8 w-8" />,
  },
  {
    title: "Simplicity",
    description:
      "We believe the best solutions are elegant and easy to use for everyone.",
    icon: <Target className="text-primary h-8 w-8" />,
  },
  {
    title: "Growth",
    description:
      "We're committed to helping our users grow their audiences and achieve success.",
    icon: <Users className="text-primary h-8 w-8" />,
  },
];

/**
 * about page with company information and team details
 * @returns about page component
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Users size={16} />
              About Linkbase
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Building the{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                future
              </span>{" "}
              of digital presence
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We&apos;re on a mission to empower creators, businesses, and
              individuals to share their digital world in the most beautiful and
              effective way possible.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/signup">Join our journey</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/careers">Join our team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Our Mission
                </CardTitle>
                <CardDescription>What drives us every day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  To democratize digital presence by making it simple for anyone
                  to create beautiful, functional link-in-bio pages that truly
                  represent who they are and what they do.
                </p>
                <p className="text-muted-foreground">
                  We believe everyone deserves to have a stunning digital
                  presence, regardless of their technical skills or budget. Our
                  platform empowers millions of users to share their passions,
                  products, and personalities with the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
                <CardDescription>Where we&apos;re headed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  To become the world&apos;s most trusted platform for digital
                  presence, serving millions of users across every industry and
                  passion.
                </p>
                <p className="text-muted-foreground">
                  We&apos;re building more than just a link-in-bio
                  tool—we&apos;re creating an ecosystem where creators can
                  thrive, businesses can grow, and connections can flourish.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Core Values
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border-none transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader className="space-y-4 text-center">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Meet Our Team
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group border-none transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader className="space-y-4 text-center">
                  <div className="from-primary mx-auto h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br to-purple-600">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {member.name}
                    </CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-bold">Our Impact</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
                <div className="text-primary mb-2 text-3xl font-bold">5M+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
                <div className="text-primary mb-2 text-3xl font-bold">50M+</div>
                <div className="text-muted-foreground">Links Created</div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
                <div className="text-primary mb-2 text-3xl font-bold">100+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to join our mission?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Whether you&apos;re a user looking to create your perfect
              link-in-bio page or a talented individual wanting to join our
              team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
