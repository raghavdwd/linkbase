"use client";

import { useState } from "react";
import { Check, Palette, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import { ThemeEditorModal, type CustomThemeColors } from "./theme-editor-modal";

export type ThemeType = string;
export type ButtonStyleType = "rounded" | "sharp" | "outline" | "soft";

interface ThemeSelection {
  id: ThemeType;
  name: string;
  primary: string;
  bg: string;
  isCustom?: boolean;
}

/**
 * preset themes available to all users
 */
const PRESET_THEMES: ThemeSelection[] = [
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
 * supports both preset themes and user-created custom themes
 */
export function ThemeSelector({
  currentTheme,
  currentButtonStyle,
  onThemeChange,
  onButtonStyleChange,
}: ThemeSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<CustomThemeColors | null>(
    null,
  );
  const utils = api.useUtils();

  // fetching user's custom themes
  const { data: customThemes, isLoading: isLoadingThemes } =
    api.themes.getMyThemes.useQuery();

  // create theme mutation
  const createTheme = api.themes.create.useMutation({
    onSuccess: (newTheme) => {
      toast.success("theme created successfully!");
      void utils.themes.getMyThemes.invalidate();
      onThemeChange(newTheme!.id); // selecting newly created theme
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // update theme mutation
  const updateTheme = api.themes.update.useMutation({
    onSuccess: () => {
      toast.success("theme updated successfully!");
      void utils.themes.getMyThemes.invalidate();
      setIsModalOpen(false);
      setEditingTheme(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // delete theme mutation
  const deleteTheme = api.themes.delete.useMutation({
    onSuccess: () => {
      toast.success("theme deleted");
      void utils.themes.getMyThemes.invalidate();
      // if user deleted the active theme, switch to default
      if (
        customThemes?.some(
          (t) => t.id === currentTheme && t.id === editingTheme?.id,
        )
      ) {
        onThemeChange("default");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSaveTheme = (theme: CustomThemeColors) => {
    if (theme.id) {
      // editing existing theme
      updateTheme.mutate({
        id: theme.id,
        name: theme.name,
        main: theme.main,
        card: theme.card,
        cardBorder: theme.cardBorder,
        text: theme.text,
        primary: theme.primary,
        accent: theme.accent,
      });
    } else {
      // creating new theme
      createTheme.mutate({
        name: theme.name,
        main: theme.main,
        card: theme.card,
        cardBorder: theme.cardBorder,
        text: theme.text,
        primary: theme.primary,
        accent: theme.accent,
      });
    }
  };

  const handleEditTheme = (
    e: React.MouseEvent,
    theme: NonNullable<typeof customThemes>[number],
  ) => {
    e.stopPropagation();
    setEditingTheme({
      id: theme.id,
      name: theme.name,
      main: theme.main,
      card: theme.card,
      cardBorder: theme.cardBorder,
      text: theme.text,
      primary: theme.primary,
      accent: theme.accent,
    });
    setIsModalOpen(true);
  };

  const handleDeleteTheme = (e: React.MouseEvent, themeId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this theme?")) {
      deleteTheme.mutate({ id: themeId });
      // if deleting the currently active theme, switch to default
      if (currentTheme === themeId) {
        onThemeChange("default");
      }
    }
  };

  const openCreateModal = () => {
    setEditingTheme(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Preset Themes */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-semibold">
            <Palette size={16} className="text-primary" /> color palette
          </Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PRESET_THEMES.map((theme) => (
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

        {/* Custom Themes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">custom themes</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={openCreateModal}
              className="h-8 gap-1 rounded-full text-xs"
            >
              <Plus size={14} />
              create theme
            </Button>
          </div>

          {isLoadingThemes ? (
            <div className="flex h-20 items-center justify-center">
              <Loader2 className="text-primary animate-spin" size={20} />
            </div>
          ) : customThemes && customThemes.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {customThemes.map((theme) => (
                <div
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
                    <div
                      className="flex-1"
                      style={{ backgroundColor: theme.main }}
                    />
                    <div
                      className="w-1/3"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>
                  <span className="text-left text-xs font-medium">
                    {theme.name}
                  </span>

                  {/* Edit/Delete actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={(e) => handleEditTheme(e, theme)}
                      className="rounded-full bg-white p-1.5 shadow-md hover:bg-neutral-100"
                    >
                      <Pencil size={12} className="text-neutral-600" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteTheme(e, theme.id)}
                      className="rounded-full bg-white p-1.5 shadow-md hover:bg-red-50"
                    >
                      <Trash2 size={12} className="text-red-500" />
                    </button>
                  </div>

                  {currentTheme === theme.id && (
                    <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-700 dark:bg-neutral-900">
              <Palette size={24} className="mx-auto mb-2 text-neutral-400" />
              <p className="text-sm text-neutral-500">no custom themes yet</p>
              <p className="text-xs text-neutral-400">
                click &quot;create theme&quot; to get started
              </p>
            </div>
          )}
        </div>

        {/* Button Styles */}
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

      {/* Theme Editor Modal */}
      <ThemeEditorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        theme={editingTheme}
        onSave={handleSaveTheme}
        isSaving={createTheme.isPending || updateTheme.isPending}
      />
    </>
  );
}
