"use client";

import { Check, Palette } from "lucide-react";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";

export type ThemeType = "default" | "sage" | "earth" | "business" | "sunset";
export type ButtonStyleType = "rounded" | "sharp" | "outline" | "soft";

interface ThemeSelection {
  id: ThemeType;
  name: string;
  primary: string;
  bg: string;
}

const THEMES: ThemeSelection[] = [
  {
    id: "default",
    name: "classic charcoal",
    primary: "bg-neutral-900",
    bg: "bg-neutral-50",
  },
  {
    id: "sage",
    name: "sage garden",
    primary: "bg-[#4A5D4E]",
    bg: "bg-[#F3F5F1]",
  },
  {
    id: "earth",
    name: "earthy terra",
    primary: "bg-[#7C4A3A]",
    bg: "bg-[#F9F4F0]",
  },
  { id: "business", name: "pro navy", primary: "bg-[#1B2B44]", bg: "bg-white" },
  {
    id: "sunset",
    name: "warm sunset",
    primary: "bg-[#D97706]",
    bg: "bg-[#FFFBEB]",
  },
];

const BUTTON_STYLES: { id: ButtonStyleType; name: string }[] = [
  { id: "rounded", name: "fully rounded" },
  { id: "soft", name: "soft corners" },
  { id: "sharp", name: "sharp edges" },
  { id: "outline", name: "clean outline" },
];

interface ThemeSelectorProps {
  currentTheme: string;
  currentButtonStyle: string;
  onThemeChange: (theme: ThemeType) => void;
  onButtonStyleChange: (style: ButtonStyleType) => void;
}

/**
 * component to select profile themes and button styles
 */
export function ThemeSelector({
  currentTheme,
  currentButtonStyle,
  onThemeChange,
  onButtonStyleChange,
}: ThemeSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <Palette size={16} className="text-primary" /> color palette
        </Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={cn(
                "group relative flex flex-col gap-2 rounded-2xl border-2 p-3 transition-all",
                currentTheme === theme.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <div className="flex h-12 w-full gap-1 overflow-hidden rounded-lg">
                <div className={cn("flex-1", theme.bg)} />
                <div className={cn("w-1/3", theme.primary)} />
              </div>
              <span className="text-left text-xs font-medium">
                {theme.name}
              </span>
              {currentTheme === theme.id && (
                <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-semibold">button style</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onButtonStyleChange(style.id)}
              className={cn(
                "relative flex h-10 items-center justify-center border-2 text-xs font-medium transition-all",
                style.id === "rounded" && "rounded-full",
                style.id === "soft" && "rounded-xl",
                style.id === "sharp" && "rounded-none",
                style.id === "outline" &&
                  "border-primary text-primary rounded-full bg-transparent",
                currentButtonStyle === style.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900",
              )}
            >
              {style.name}
              {currentButtonStyle === style.id && (
                <div className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-white">
                  <Check size={10} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
