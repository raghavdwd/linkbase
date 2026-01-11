"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { StepWelcome } from "./step-welcome";
import { StepAddLink } from "./step-add-link";
import { StepProfile } from "./step-profile";
import { StepTheme } from "./step-theme";
import { StepFinish } from "./step-finish";

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { data: linkLimits, isLoading } = api.subscription.getLinkLimits.useQuery();

  useEffect(() => {
    if (isLoading) return;
    
    const hasCompletedOnboarding = localStorage.getItem("completedOnboarding");
    if (!hasCompletedOnboarding && linkLimits?.currentCount === 0) {
      setIsOpen(true);
    }
  }, [linkLimits, isLoading]);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleFinish = () => {
    localStorage.setItem("completedOnboarding", "true");
    setIsOpen(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepWelcome onNext={handleNext} />;
      case 2:
        return <StepAddLink onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepProfile onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <StepTheme onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <StepFinish onFinish={handleFinish} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-[2.5rem] border-none shadow-2xl">
        <div className="flex h-[600px] flex-col bg-background">
          <div className="bg-muted h-2 w-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-700 ease-in-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="h-full flex flex-col justify-center">
              {renderStep()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
