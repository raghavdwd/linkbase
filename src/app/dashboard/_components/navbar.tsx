"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  MousePointer2,
  LogOut,
  Layout,
  Share2,
  Loader2,
  Link as LinkIcon,
  Sparkles,
  BarChart3,
  Settings,
} from "lucide-react";
import { authClient } from "~/server/better-auth/client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: userProfile, isLoading: isProfileLoading } =
    api.user.getMe.useQuery(undefined, {
      enabled: !!session,
    });

  const utils = api.useUtils();
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void utils.user.getMe.invalidate();
      toast.success("username set successfully");
      setIsUsernameDialogOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  useEffect(() => {
    if (!isProfileLoading && userProfile && !userProfile.username) {
      setIsUsernameDialogOpen(true);
    }
  }, [userProfile, isProfileLoading]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("logged out");
          router.push("/");
        },
      },
    });
  };

  const handleSetUsername = () => {
    if (!newUsername) return;
    setIsSaving(true);
    void updateProfile.mutate({ username: newUsername });
  };

  const handleShare = () => {
    if (userProfile?.username) {
      const url = `${window.location.origin}/${userProfile.username}`;
      void navigator.clipboard.writeText(url);
      toast.success("profile link copied to clipboard");
    } else {
      setIsUsernameDialogOpen(true);
    }
  };

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-1">
              <MousePointer2 size={24} />
            </div>
            <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
              linkbase
            </span>
          </Link>

          <div className="flex gap-4 md:gap-6">
            <Link
              href="/dashboard/links"
              className={cn(
                "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/dashboard/links"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <Layout size={16} />{" "}
              <span className="xs:inline hidden">links</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className={cn(
                "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/dashboard/analytics"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <BarChart3 size={16} />{" "}
              <span className="xs:inline hidden">analytics</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={cn(
                "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/dashboard/settings"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <Settings size={16} />{" "}
              <span className="xs:inline hidden">settings</span>
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/pricing" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Sparkles size={16} />{" "}
              <span className="xs:inline hidden">pricing</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {userProfile?.username && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="hidden gap-2 rounded-full sm:flex"
            >
              <Share2 size={14} /> share my linkbase
            </Button>
          )}

          {userProfile?.username && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="flex h-8 w-8 rounded-full sm:hidden"
            >
              <Share2 size={14} />
            </Button>
          )}

          <div className="mr-1 flex flex-col items-end md:mr-2">
            <span className="max-w-[80px] truncate text-xs font-semibold md:max-w-[120px] md:text-sm">
              {session?.user.name}
            </span>
            <span className="text-muted-foreground hidden text-[10px] sm:block md:text-xs">
              {session?.user.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Log out"
            className="h-8 w-8 rounded-full md:h-10 md:w-10"
          >
            <LogOut
              size={18}
              className="text-muted-foreground hover:text-destructive transition-colors md:h-5 md:w-5"
            />
          </Button>
        </div>
      </div>

      <Dialog
        open={isUsernameDialogOpen}
        onOpenChange={(open) => {
          if (userProfile?.username) setIsUsernameDialogOpen(open);
        }}
      >
        <DialogContent className="max-w-[90vw] rounded-2xl md:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LinkIcon className="text-primary" size={20} />
              claim your unique link
            </DialogTitle>
            <DialogDescription>
              choose a username for your public linkbase profile. this cannot be
              easily changed later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">username</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                  linkbase.io/
                </span>
                <Input
                  id="username"
                  placeholder="yourname"
                  className="rounded-xl pl-[100px]"
                  value={newUsername}
                  onChange={(e) =>
                    setNewUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                    )
                  }
                />
              </div>
              <p className="text-muted-foreground text-[10px]">
                only lowercase letters, numbers and underscores allowed.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSetUsername}
              disabled={isSaving || newUsername.length < 3}
              className="h-11 w-full rounded-xl"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSaving ? "claiming..." : "claim my linkbase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
