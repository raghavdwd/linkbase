"use client";

import { ExternalLink } from "lucide-react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

interface LinkItemProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: string | null;
  };
  theme: {
    card: string;
    text: string;
    primary: string;
    accent: string;
  };
  buttonStyle?: string;
}

/**
 * individual link item displayed on public profile
 */
export function LinkItem({
  link,
  theme,
  buttonStyle = "rounded",
}: LinkItemProps) {
  const trackClick = api.analytics.trackClick.useMutation();

  const handleClick = () => {
    trackClick.mutate({ linkId: link.id });
  };

  const buttonStyleClasses = cn(
    "flex w-full items-center justify-between border-2 p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm",
    buttonStyle === "rounded" && "rounded-full",
    buttonStyle === "soft" && "rounded-2xl",
    buttonStyle === "sharp" && "rounded-none",
    buttonStyle === "outline" && "rounded-full bg-transparent border-current",
    theme.card,
  );

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={buttonStyleClasses}
    >
      <div className="flex h-6 w-6 items-center justify-center opacity-0">
        <ExternalLink size={18} />
      </div>
      <span className={cn("text-center font-semibold", theme.text)}>
        {link.title}
      </span>
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full opacity-60",
          theme.accent,
        )}
      >
        <ExternalLink size={18} />
      </div>
    </a>
  );
}
