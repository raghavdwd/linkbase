"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Rocket,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface JobApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  experience?: string;
  portfolio?: string;
  message?: string;
}

const jobPositions = [
  {
    id: "frontend",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Build beautiful, performant user interfaces that millions of users interact with daily.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert in React, TypeScript, and modern web technologies",
      "Experience with design systems and component libraries",
      "Strong understanding of performance optimization",
      "Experience with testing frameworks (Jest, React Testing Library)",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Professional development budget",
      "Latest tech equipment",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Design and implement scalable backend systems that power our growing platform.",
    requirements: [
      "4+ years of backend development experience",
      "Expert in Node.js, PostgreSQL, and cloud infrastructure",
      "Experience with API design and microservices",
      "Strong understanding of database design and optimization",
      "Experience with DevOps and CI/CD pipelines",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Professional development budget",
      "Latest tech equipment",
    ],
  },
  {
    id: "designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote / Austin",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "Create intuitive and beautiful user experiences that delight our users.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Strong understanding of UX principles and user research",
      "Experience with design systems and component libraries",
      "Ability to work closely with engineering teams",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Professional development budget",
      "Latest design tools and equipment",
    ],
  },
  {
    id: "marketing",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote / Chicago",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    description:
      "Drive user acquisition and growth through data-driven marketing strategies.",
    requirements: [
      "4+ years of growth marketing experience",
      "Expertise in digital marketing channels and analytics",
      "Strong understanding of SEO, content marketing, and social media",
      "Experience with marketing automation tools",
      "Data-driven mindset with strong analytical skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote work flexibility",
      "Professional development budget",
      "Marketing conference attendance",
    ],
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We constantly push boundaries and embrace new technologies.",
    icon: <Rocket className="text-primary h-8 w-8" />,
  },
  {
    title: "User Obsessed",
    description: "Everything we build starts with understanding our users.",
    icon: <Users className="text-primary h-8 w-8" />,
  },
  {
    title: "Remote Friendly",
    description: "Work from anywhere with flexible hours and great benefits.",
    icon: <MapPin className="text-primary h-8 w-8" />,
  },
  {
    title: "Growth Mindset",
    description: "We invest in our team's growth and learning.",
    icon: <Briefcase className="text-primary h-8 w-8" />,
  },
];

/**
 * careers page with job listings and application form
 * @returns careers page component
 */
export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<JobApplication>({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.portfolio.trim()) {
      newErrors.portfolio = "Portfolio link is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Cover message is required";
    } else if (formData.message.length < 50) {
      newErrors.message = "Cover message must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsApplying(true);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real application, you would send the form data to your backend
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolio: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleApply = (position: string) => {
    setSelectedPosition(position);
    setFormData((prev) => ({
      ...prev,
      position,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-md">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Briefcase size={32} />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Application received!
                </CardTitle>
                <CardDescription>
                  Thank you for applying to Linkbase. We&apos;ll review your
                  application and get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedPosition(null);
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                >
                  Apply for another position
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Briefcase size={16} />
              We&apos;re hiring
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Join our{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                mission
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Help us empower millions of creators and businesses to share their
              digital world. We&apos;re looking for passionate individuals who
              want to make a difference.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                onClick={() =>
                  document.getElementById("open-positions")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                View Open Positions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold"
                asChild
              >
                <a href="#culture">Learn About Our Culture</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Open Positions
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {jobPositions.map((job) => (
              <Card
                key={job.id}
                className="group border-none transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {job.department}
                      </CardDescription>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <DollarSign size={16} />
                      {job.salary}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      <Clock size={14} />
                      {job.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.description}</p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleApply(job.title)}
                      className="rounded-full"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => {
                        handleApply(job.title);
                        document
                          .getElementById("application-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section
        id="culture"
        className="bg-white/50 py-20 dark:bg-neutral-900/50"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Culture</h2>

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

      {/* Application Form */}
      {selectedPosition && (
        <section id="application-form" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Application for {selectedPosition}
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to apply for this position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          id="portfolio"
                          name="portfolio"
                          placeholder="Portfolio or LinkedIn profile"
                          value={formData.portfolio}
                          onChange={handleChange}
                          className={errors.portfolio ? "border-red-500" : ""}
                        />
                        {errors.portfolio && (
                          <p className="text-sm text-red-500">
                            {errors.portfolio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Input
                        id="position"
                        name="position"
                        placeholder="Position applying for"
                        value={formData.position}
                        onChange={handleChange}
                        className={errors.position ? "border-red-500" : ""}
                      />
                      {errors.position && (
                        <p className="text-sm text-red-500">
                          {errors.position}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        id="experience"
                        name="experience"
                        placeholder="Tell us about your relevant experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={errors.experience ? "border-red-500" : ""}
                        rows={4}
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Why do you want to join Linkbase? (Minimum 50 characters)"
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? "border-red-500" : ""}
                        rows={6}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isApplying}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
                    >
                      {isApplying ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to join us?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Don&apos;t see the perfect role? We&apos;re always looking for
              talented individuals. Send us your resume and let&apos;s talk.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <a href="mailto:careers@linkbase.com">Send Resume</a>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
