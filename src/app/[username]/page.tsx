import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import {
  MousePointer2,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LinkItem } from "./_components/link-item";
import { TRPCError } from "@trpc/server";
import { cn } from "~/lib/utils";
import { type SocialLink } from "../dashboard/_components/social-links-editor";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

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

/**
 * default theme configuration used as fallback
 */
const DEFAULT_THEME: PresetThemeConfig = {
  type: "preset",
  main: "bg-neutral-50 dark:bg-neutral-950",
  card: "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
  text: "text-neutral-900 dark:text-neutral-50",
  primary: "bg-neutral-900 dark:bg-neutral-50 text-white dark:text-black",
  accent: "text-primary",
};

/**
 * preset theme configurations mapped to Tailwind classes
 */
const PRESET_THEME_CONFIGS: Record<string, PresetThemeConfig> = {
  default: DEFAULT_THEME,
  sage: {
    type: "preset",
    main: "bg-[#F3F5F1]",
    card: "bg-white border-[#E5E9E1]",
    text: "text-[#2D3A2F]",
    primary: "bg-[#4A5D4E] text-white",
    accent: "text-[#4A5D4E]",
  },
  earth: {
    type: "preset",
    main: "bg-[#F9F4F0]",
    card: "bg-white border-[#E9E1DB]",
    text: "text-[#4A2F25]",
    primary: "bg-[#7C4A3A] text-white",
    accent: "text-[#7C4A3A]",
  },
  business: {
    type: "preset",
    main: "bg-[#F8FAFC]",
    card: "bg-white border-neutral-200",
    text: "text-[#1E293B]",
    primary: "bg-[#1B2B44] text-white",
    accent: "text-[#1B2B44]",
  },
  sunset: {
    type: "preset",
    main: "bg-[#FFFBEB]",
    card: "bg-white border-[#FEF3C7]",
    text: "text-[#78350F]",
    primary: "bg-[#D97706] text-white",
    accent: "text-[#D97706]",
  },
};

/**
 * helper function to check if a theme ID is a preset theme
 */
function isPresetTheme(themeId: string): boolean {
  return themeId in PRESET_THEME_CONFIGS;
}

/**
 * public profile page for a user
 * supports both preset themes (Tailwind classes) and custom themes (inline styles)
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  try {
    const profile = await api.user.getPublicProfile({ username });
    const buttonStyle = profile.buttonStyle ?? "rounded";

    const socialLinks = (profile.socialLinks as SocialLink[]) ?? [];

    // determine if using preset or custom theme
    const themeId = profile.theme;
    let theme: ThemeConfig;
    let customTheme: CustomThemeConfig | null = null;

    if (isPresetTheme(themeId)) {
      // using preset theme
      theme = PRESET_THEME_CONFIGS[themeId]!;
    } else {
      // fetching custom theme from database
      const fetchedTheme = await api.themes.getById({ id: themeId });
      if (fetchedTheme) {
        customTheme = {
          type: "custom",
          main: fetchedTheme.main,
          card: fetchedTheme.card,
          cardBorder: fetchedTheme.cardBorder,
          text: fetchedTheme.text,
          primary: fetchedTheme.primary,
          accent: fetchedTheme.accent,
        };
        theme = customTheme;
      } else {
        // fallback to default if custom theme not found
        theme = DEFAULT_THEME;
      }
    }

    const isCustom = theme.type === "custom";

    return (
      <main
        className={cn(
          "min-h-screen px-4 py-12 transition-colors duration-500",
          !isCustom && (theme as PresetThemeConfig).main,
        )}
        style={
          isCustom
            ? { backgroundColor: (theme as CustomThemeConfig).main }
            : undefined
        }
      >
        <div className="mx-auto flex max-w-xl flex-col items-center">
          {/* Profile Header */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div
              className={cn(
                "mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 shadow-xl transition-transform hover:scale-105",
                !isCustom && (theme as PresetThemeConfig).card,
              )}
              style={
                isCustom
                  ? {
                      backgroundColor: (theme as CustomThemeConfig).card,
                      borderColor: (theme as CustomThemeConfig).cardBorder,
                    }
                  : undefined
              }
            >
              {profile.image && profile.image.trim() !== "" ? (
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "text-4xl font-bold",
                    !isCustom && (theme as PresetThemeConfig).accent,
                  )}
                  style={
                    isCustom
                      ? { color: (theme as CustomThemeConfig).accent }
                      : undefined
                  }
                >
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h1
              className={cn(
                "mb-1 text-2xl font-bold",
                !isCustom && (theme as PresetThemeConfig).text,
              )}
              style={
                isCustom
                  ? { color: (theme as CustomThemeConfig).text }
                  : undefined
              }
            >
              @{profile.username}
            </h1>
            {profile.bio && (
              <p
                className="max-w-sm text-sm leading-relaxed opacity-70"
                style={
                  isCustom
                    ? { color: (theme as CustomThemeConfig).text }
                    : undefined
                }
              >
                {profile.bio}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {socialLinks.map((link, i) => {
                  const platform = link.platform;
                  const Icon =
                    {
                      instagram: Instagram,
                      twitter: Twitter,
                      linkedin: Linkedin,
                      github: Github,
                      youtube: Youtube,
                      website: Globe,
                    }[platform] ?? Globe;

                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "opacity-70 transition-all hover:scale-110 hover:opacity-100",
                        !isCustom && (theme as PresetThemeConfig).text,
                      )}
                      style={
                        isCustom
                          ? { color: (theme as CustomThemeConfig).text }
                          : undefined
                      }
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Links List */}
          <div className="w-full space-y-4">
            {profile.links.map((link) => (
              <LinkItem
                key={link.id}
                link={link}
                theme={theme}
                buttonStyle={buttonStyle}
              />
            ))}

            {profile.links.length === 0 && (
              <div className="py-12 text-center opacity-60">
                <p
                  style={
                    isCustom
                      ? { color: (theme as CustomThemeConfig).text }
                      : undefined
                  }
                >
                  no links found.
                </p>
              </div>
            )}
          </div>

          {/* Branding Footer */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-2 text-xs font-medium opacity-60 transition-all hover:opacity-80",
                !isCustom && (theme as PresetThemeConfig).text,
              )}
              style={
                isCustom
                  ? { color: (theme as CustomThemeConfig).text }
                  : undefined
              }
            >
              <div
                className={cn(
                  "rounded-md p-1",
                  !isCustom && (theme as PresetThemeConfig).primary,
                )}
                style={
                  isCustom
                    ? {
                        backgroundColor: (theme as CustomThemeConfig).primary,
                        color: (theme as CustomThemeConfig).card,
                      }
                    : undefined
                }
              >
                <MousePointer2 size={12} />
              </div>
              built with linkbase
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      notFound();
    }
    throw error;
  }
}
