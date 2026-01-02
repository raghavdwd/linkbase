"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: "SC",
    content:
      "Linkbase has completely transformed how I share my content. My click-through rate increased by 300% in just two weeks!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Musician",
    avatar: "MJ",
    content:
      "Finally, a link-in-bio tool that actually looks professional. My fans love how easy it is to find all my music and merch.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "ER",
    content:
      "The analytics feature is a game-changer. I can see exactly which products my audience is most interested in.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Photographer",
    avatar: "DK",
    content:
      "Beautiful themes that showcase my portfolio perfectly. Switching from my old service was the best decision I made.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Fitness Influencer",
    avatar: "PS",
    content:
      "Super easy to set up and my followers always compliment how clean and professional my link page looks!",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Podcaster",
    avatar: "AT",
    content:
      "I love that I can update my links instantly. When a new episode drops, my audience can find it immediately.",
    rating: 5,
  },
];

/**
 * testimonials section with user reviews
 * @returns testimonials component
 */
export function Testimonials() {
  return (
    <section className="bg-muted/50 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold">
            Testimonials
          </span>
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
            Loved by <span className="text-primary">creators</span> worldwide
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Join thousands of creators, businesses, and influencers who trust
            Linkbase to connect with their audience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-6">
                {/* rating stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground mb-6 text-lg leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  {/* avatar placeholder */}
                  <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
