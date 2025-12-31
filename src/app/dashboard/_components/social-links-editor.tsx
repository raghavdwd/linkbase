"use client";

import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Globe,
  Plus,
  Trash2,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export interface SocialLink {
  platform: string;
  url: string;
}

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "hover:text-sky-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "hover:text-blue-700",
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    color: "hover:text-neutral-900 dark:hover:text-white",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "hover:text-red-600",
  },
  { id: "website", name: "Website", icon: Globe, color: "hover:text-primary" },
];

interface SocialLinksEditorProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

/**
 * component to manage user's social media links
 */
export function SocialLinksEditor({ links, onChange }: SocialLinksEditorProps) {
  const [newPlatform, setNewPlatform] = useState("instagram");
  const [newUrl, setNewUrl] = useState("");

  const addLink = () => {
    if (!newUrl) return;
    const updatedLinks = [...links, { platform: newPlatform, url: newUrl }];
    onChange(updatedLinks);
    setNewUrl("");
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-sm font-semibold">
          <Share2 size={16} className="text-primary" /> social media links
        </Label>

        <div className="space-y-3">
          {links.map((link, index) => {
            const platformInfo = PLATFORMS.find((p) => p.id === link.platform);
            const Icon = platformInfo?.icon ?? Globe;

            return (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 transition-all hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800/80"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-800",
                    platformInfo?.color,
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold capitalize">
                    {link.platform}
                  </p>
                  <p className="text-muted-foreground truncate text-[10px]">
                    {link.url}
                  </p>
                </div>
                <button
                  onClick={() => removeLink(index)}
                  className="text-muted-foreground p-2 opacity-0 transition-all group-hover:opacity-100 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <p className="mb-4 text-xs font-semibold">add new platform</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-2">
            <Label
              htmlFor="platform-select"
              className="text-muted-foreground text-[10px] tracking-wider uppercase"
            >
              platform
            </Label>
            <select
              id="platform-select"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="focus:ring-primary/20 h-10 rounded-xl border-none bg-white px-3 text-sm focus:ring-1 dark:bg-neutral-800"
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid flex-[2] gap-2">
            <Label
              htmlFor="url-input"
              className="text-muted-foreground text-[10px] tracking-wider uppercase"
            >
              URL
            </Label>
            <Input
              id="url-input"
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="focus-visible:ring-primary/20 h-10 border-none bg-white dark:bg-neutral-800"
            />
          </div>
          <Button
            onClick={addLink}
            disabled={!newUrl}
            size="sm"
            className="h-10 rounded-xl px-4 font-semibold"
          >
            <Plus size={16} className="mr-1" /> add
          </Button>
        </div>
      </div>
    </div>
  );
}
