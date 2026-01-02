"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

const faqs = [
  {
    question: "Is Linkbase really free?",
    answer:
      "Yes! Linkbase offers a generous free plan that includes up to 5 links, basic customization, and standard themes. You can upgrade to Pro for unlimited links and advanced features anytime.",
  },
  {
    question: "Can I use my own custom domain?",
    answer:
      "Absolutely! Pro and Business users can connect their own custom domain to their Linkbase page. This helps maintain your brand identity and looks more professional.",
  },
  {
    question: "How does the analytics feature work?",
    answer:
      "Our analytics dashboard provides detailed insights into your link performance, including total views, unique visitors, click-through rates, geographic data, and device information. Pro users get access to advanced analytics with historical data.",
  },
  {
    question: "Can I integrate with other platforms?",
    answer:
      "Yes! Linkbase integrates with popular platforms like Shopify, YouTube, Spotify, SoundCloud, and many more. You can add social media icons and connect your content from various sources.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use industry-standard SSL encryption, are GDPR compliant, and never sell your personal data. Your links and analytics are protected with enterprise-grade security.",
  },
  {
    question: "Can I change my username later?",
    answer:
      "Yes, you can change your Linkbase username at any time from your account settings. Keep in mind that your old URL will become available for others to claim.",
  },
];

/**
 * faq component with expandable questions
 * @param props - question, answer, and expanded state
 */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <h3 className="text-foreground pr-8 text-lg font-semibold">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            "text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 pb-6" : "max-h-0",
        )}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

/**
 * faq section with expandable questions
 * @returns faq component
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-muted/50 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-2 text-sm font-semibold">
            FAQ
          </span>
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
            Frequently asked <span className="text-primary">questions</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Everything you need to know about Linkbase. Can&apos;t find your
            answer? Contact our support team.
          </p>
        </div>

        <div className="bg-background mx-auto max-w-3xl rounded-2xl border p-6 shadow-lg md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
