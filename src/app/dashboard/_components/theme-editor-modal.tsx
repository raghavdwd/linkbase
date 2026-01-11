"use client";

import { useState, useEffect } from "react";
import { X, Palette, Save } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

/**
 * interface for custom theme colors
 */
export interface CustomThemeColors {
  id?: string;
  name: string;
  main: string;
  card: string;
  cardBorder: string;
  text: string;
  primary: string;
  accent: string;
}

/**
 * default theme values for new themes
 */
const DEFAULT_THEME: CustomThemeColors = {
  name: "",
  main: "#F3F5F1",
  card: "#FFFFFF",
  cardBorder: "#E5E9E1",
  text: "#2D3A2F",
  primary: "#4A5D4E",
  accent: "#4A5D4E",
};

/**
 * color input field with label and hex preview
 */
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium capitalize">{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="h-10 w-10 flex-shrink-0 rounded-lg border-2 border-neutral-200 shadow-inner"
          style={{ backgroundColor: value }}
        />
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border-none bg-transparent p-0"
        />
        <Input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const hex = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
              onChange(hex);
            }
          }}
          className="h-10 w-24 rounded-lg border bg-neutral-50 text-center font-mono text-xs uppercase dark:bg-neutral-900"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
}

interface ThemeEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme?: CustomThemeColors | null;
  onSave: (theme: CustomThemeColors) => void;
  isSaving?: boolean;
}

/**
 * modal for creating/editing custom themes with color pickers and live preview
 */
export function ThemeEditorModal({
  open,
  onOpenChange,
  theme,
  onSave,
  isSaving = false,
}: ThemeEditorModalProps) {
  const [formData, setFormData] = useState<CustomThemeColors>(DEFAULT_THEME);
  const isEditing = !!theme?.id;

  // resetting form when modal opens with theme data or default
  useEffect(() => {
    if (open) {
      setFormData(theme ?? DEFAULT_THEME);
    }
  }, [open, theme]);

  const handleColorChange =
    (key: keyof CustomThemeColors) => (value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="text-primary" size={20} />
            {isEditing ? "edit theme" : "create custom theme"}
          </DialogTitle>
          <DialogDescription>
            customize your profile colors to match your personal brand.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Theme Name */}
          <div className="space-y-2">
            <Label htmlFor="theme-name" className="text-sm font-semibold">
              theme name
            </Label>
            <Input
              id="theme-name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Ocean Breeze"
              className="h-12 rounded-xl border-none bg-neutral-50 dark:bg-neutral-900"
            />
          </div>

          {/* Color Pickers Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <ColorInput
              label="background"
              value={formData.main}
              onChange={handleColorChange("main")}
            />
            <ColorInput
              label="card"
              value={formData.card}
              onChange={handleColorChange("card")}
            />
            <ColorInput
              label="card border"
              value={formData.cardBorder}
              onChange={handleColorChange("cardBorder")}
            />
            <ColorInput
              label="text"
              value={formData.text}
              onChange={handleColorChange("text")}
            />
            <ColorInput
              label="primary"
              value={formData.primary}
              onChange={handleColorChange("primary")}
            />
            <ColorInput
              label="accent"
              value={formData.accent}
              onChange={handleColorChange("accent")}
            />
          </div>

          {/* Live Preview */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">live preview</Label>
            <div
              className="overflow-hidden rounded-2xl border p-6 transition-all"
              style={{
                backgroundColor: formData.main,
                borderColor: formData.cardBorder,
              }}
            >
              <div
                className="mx-auto max-w-xs space-y-4 rounded-xl p-4 shadow-lg"
                style={{
                  backgroundColor: formData.card,
                  borderColor: formData.cardBorder,
                  borderWidth: "1px",
                }}
              >
                {/* Preview Profile */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                    style={{
                      backgroundColor: formData.primary,
                      color: formData.card,
                    }}
                  >
                    J
                  </div>
                  <h3
                    className="text-sm font-bold"
                    style={{ color: formData.text }}
                  >
                    @johndoe
                  </h3>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: formData.text }}
                  >
                    creative designer & developer
                  </p>
                </div>

                {/* Preview Links */}
                <div className="space-y-2">
                  {["Portfolio", "Twitter"].map((link) => (
                    <div
                      key={link}
                      className="flex h-10 items-center justify-center rounded-full text-xs font-medium transition-transform hover:scale-[1.02]"
                      style={{
                        backgroundColor: formData.primary,
                        color: formData.card,
                      }}
                    >
                      {link}
                    </div>
                  ))}
                </div>

                {/* Preview Footer */}
                <p
                  className="text-center text-[10px] font-medium"
                  style={{ color: formData.accent }}
                >
                  built with linkbase
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full"
          >
            <X size={16} />
            cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving || !formData.name.trim()}
            className="rounded-full"
          >
            {isSaving ? (
              <span className="animate-pulse">saving...</span>
            ) : (
              <>
                <Save size={16} />
                {isEditing ? "update theme" : "create theme"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
