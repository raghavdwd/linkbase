"use client";

import { useState } from "react";
import { Palette, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeSelector, type ThemeType, type ButtonStyleType } from "../theme-selector";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

interface StepThemeProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepTheme({ onNext, onBack }: StepThemeProps) {
  const { data: user } = api.user.getMe.useQuery();
  const [theme, setTheme] = useState<ThemeType>(user?.theme ?? "default");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleType>(user?.buttonStyle as ButtonStyleType ?? "rounded");
  const [isSaving, setIsSaving] = useState(false);

  const utils = api.useUtils();
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void utils.user.getMe.invalidate();
      onNext();
    },
    onError: (err) => {
      toast.error(err.message);
      setIsSaving(false);
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    void updateProfile.mutate({
      theme,
      buttonStyle,
    });
  };

  return (
    <div className="flex h-full flex-col space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <Palette size={24} />
          </div>
          choose your style
        </h2>
        <p className="text-muted-foreground text-lg">
          pick a theme that matches your brand. you can always change this later.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        <ThemeSelector 
          currentTheme={theme}
          currentButtonStyle={buttonStyle}
          onThemeChange={setTheme}
          onButtonStyleChange={setButtonStyle}
        />
      </div>

      <div className="pt-4 flex flex-col gap-4">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="h-14 rounded-full text-lg font-bold shadow-lg"
        >
          {isSaving ? <Loader2 className="mr-2 animate-spin" /> : null}
          looking good! next
        </Button>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> back
          </Button>
          <Button variant="link" onClick={onNext} className="text-muted-foreground">
            use default
          </Button>
        </div>
      </div>
    </div>
  );
}
