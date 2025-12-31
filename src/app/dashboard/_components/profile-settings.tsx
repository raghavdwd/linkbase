"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import { Loader2, User, FileText, Camera } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import Image from "next/image";
import { UploadButton } from "~/lib/uploadthing";

import {
  ThemeSelector,
  type ThemeType,
  type ButtonStyleType,
} from "./theme-selector";

import { SocialLinksEditor, type SocialLink } from "./social-links-editor";

/**
 * component for managing user profile settings (bio, username)
 */
export function ProfileSettings() {
  const { data: user, isLoading } = api.user.getMe.useQuery();
  const utils = api.useUtils();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [theme, setTheme] = useState<ThemeType>("default");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyleType>("rounded");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setBio(user.bio ?? "");
      setImage(user.image ?? "");
      setTheme((user.theme as ThemeType) ?? "default");
      setButtonStyle((user.buttonStyle as ButtonStyleType) ?? "rounded");
      if (user.socialLinks) {
        try {
          const parsed = JSON.parse(user.socialLinks) as SocialLink[];
          setSocialLinks(parsed);
        } catch {
          setSocialLinks([]);
        }
      }
    }
  }, [user]);

  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void utils.user.getMe.invalidate();
      toast.success("profile updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    void updateProfile.mutate({
      username: username || undefined,
      bio: bio || undefined,
      image: image || undefined,
      theme,
      buttonStyle,
      socialLinks: JSON.stringify(socialLinks),
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-4">
      <Card className="shadow-premium rounded-3xl border-none bg-white dark:bg-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <User className="text-primary" size={24} /> profile customization
          </CardTitle>
          <CardDescription>
            manage how you appear to others on your public linkbase profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-8 py-4 md:flex-row">
            <div className="group relative">
              <div className="bg-primary/10 border-primary/20 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2">
                {image ? (
                  <Image
                    src={image}
                    alt={user?.name ?? "profile"}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-primary/40" />
                )}
              </div>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>

              <UploadButton
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                  console.log("Upload response:", res);
                  // extracting URL from response - server returns 'url' in the response object
                  const url = res[0]?.url;
                  console.log("Extracted URL:", url);

                  if (url) {
                    setImage(url);
                    // automatically save profile image update
                    void updateProfile.mutate({
                      image: url,
                    });
                    toast.success("image uploaded & saved!");
                  } else {
                    console.error("No URL found in upload response");
                    toast.error("Upload succeeded but URL not found");
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error:", error);
                  toast.error(`upload failed: ${error.message}`);
                }}
                appearance={{
                  button:
                    "bg-primary rounded-full px-6 text-sm h-9 hover:bg-primary/90 transition-all shadow-md",
                  allowedContent: "hidden",
                }}
                content={{
                  button({ ready }) {
                    if (ready)
                      return (
                        <div className="flex items-center gap-2 text-xs">
                          <Camera size={14} /> change photo
                        </div>
                      );
                    return "loading...";
                  },
                }}
              />
            </div>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label
                htmlFor="settings-username"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                username
              </Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                  linkbase.io/
                </span>
                <Input
                  id="settings-username"
                  className="focus-visible:ring-primary/20 h-12 rounded-xl border-none bg-neutral-50 pl-[100px] focus-visible:ring-1 dark:bg-neutral-900"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                    )
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="settings-bio"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <FileText size={16} className="text-primary" /> bio
              </Label>
              <Textarea
                id="settings-bio"
                placeholder="tell the world about yourself..."
                className="focus-visible:ring-primary/20 min-h-[120px] resize-none rounded-xl border-none bg-neutral-50 p-4 focus-visible:ring-1 dark:bg-neutral-900"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <p className="text-muted-foreground text-right text-[10px]">
                {bio.length}/160 characters
              </p>
            </div>

            <div className="border-t pt-6">
              <ThemeSelector
                currentTheme={theme}
                currentButtonStyle={buttonStyle}
                onThemeChange={setTheme}
                onButtonStyleChange={setButtonStyle}
              />
            </div>

            <div className="border-t pt-6">
              <SocialLinksEditor
                links={socialLinks}
                onChange={setSocialLinks}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 rounded-b-3xl bg-neutral-50/50 p-6 dark:bg-neutral-900/50">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="hover:shadow-primary/20 h-11 rounded-full px-8 font-semibold shadow-lg transition-all"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSaving ? "saving changes..." : "save profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
