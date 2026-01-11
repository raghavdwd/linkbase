"use client";

import { MousePointer2, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";

interface StepWelcomeProps {
  onNext: () => void;
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center space-y-8 py-4">
      <div className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl animate-bounce">
        <MousePointer2 size={64} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          welcome to <span className="text-primary">linkbase</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          we&apos;re so excited to help you share your world. let&apos;s get your profile set up in less than 2 minutes.
        </p>
      </div>

      <Button 
        onClick={onNext}
        size="lg"
        className="h-14 rounded-full px-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
      >
        <Sparkles className="mr-2" /> let&apos;s go!
      </Button>
    </div>
  );
}
