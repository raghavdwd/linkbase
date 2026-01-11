"use client";

import { ExternalLink } from "lucide-react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

/**
 * theme configuration interface for preset themes (uses Tailwind classes)
 */
interface PresetThemeConfig {
  type: "preset";
  main: string;
  card: string;
  text: string;
  primary: string;
  accent: string;
}

/**
 * theme configuration interface for custom themes (uses hex colors)
 */
interface CustomThemeConfig {
  type: "custom";
  main: string;
  card: string;
  cardBorder: string;
  text: string;
  primary: string;
  accent: string;
}

type ThemeConfig = PresetThemeConfig | CustomThemeConfig;

interface LinkItemProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: string | null;
  };
  theme: ThemeConfig;
  buttonStyle?: string;
}

/**
 * detecting device type from user agent
 */
function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

/**
 * detecting browser from user agent
 */
function getBrowser(): string {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("edg")) return "Edge";
  if (ua.includes("chrome")) return "Chrome";
  if (ua.includes("safari")) return "Safari";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("opera") || ua.includes("opr")) return "Opera";

  return "Other";
}

/**
 * individual link item displayed on public profile
 * supports both preset themes (Tailwind classes) and custom themes (inline styles)
 */
export function LinkItem({
  link,
  theme,
  buttonStyle = "rounded",
}: LinkItemProps) {
  const trackClick = api.analytics.trackClick.useMutation();

  const handleClick = () => {
    const device = getDeviceType();
    const browser = getBrowser();
    const referrer = typeof document !== "undefined" ? document.referrer : "";

    trackClick.mutate({
      linkId: link.id,
      device,
      browser,
      referrer: referrer || "direct",
    });
  };

  // extracting theme properties based on type for cleaner code
  if (theme.type === "custom") {
    // custom theme: using inline styles with hex colors
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between border-2 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
          buttonStyle === "rounded" && "rounded-full",
          buttonStyle === "soft" && "rounded-2xl",
          buttonStyle === "sharp" && "rounded-none",
          buttonStyle === "outline" &&
            "rounded-full border-current bg-transparent",
        )}
        style={{
          backgroundColor:
            buttonStyle === "outline" ? "transparent" : theme.card,
          borderColor: theme.cardBorder,
        }}
      >
        <div className="flex h-6 w-6 items-center justify-center opacity-0">
          <ExternalLink size={18} />
        </div>
        <span
          className="text-center font-semibold"
          style={{ color: theme.text }}
        >
          {link.title}
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full opacity-60"
          style={{ color: theme.accent }}
        >
          <ExternalLink size={18} />
        </div>
      </a>
    );
  }

  // preset theme: using Tailwind classes
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between border-2 p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        buttonStyle === "rounded" && "rounded-full",
        buttonStyle === "soft" && "rounded-2xl",
        buttonStyle === "sharp" && "rounded-none",
        buttonStyle === "outline" &&
          "rounded-full border-current bg-transparent",
        theme.card,
      )}
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
