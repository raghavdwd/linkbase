"use client";

import { CheckCircle2, ExternalLink, ArrowLeft, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface StepFinishProps {
  onFinish: () => void;
  onBack: () => void;
}

export function StepFinish({ onFinish, onBack }: StepFinishProps) {
  const { data: user } = api.user.getMe.useQuery();
  const username = user?.username;
  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/${username}` : "";

  const handleCopy = () => {
    void navigator.clipboard.writeText(profileUrl);
    toast.success("link copied!");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center text-center space-y-8 py-4">
      <div className="bg-green-100 text-green-600 rounded-3xl p-6 shadow-xl animate-in zoom-in duration-500">
        <CheckCircle2 size={64} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          you&apos;re all set!
        </h1>
        <p className="text-muted-foreground text-xl max-w-md mx-auto">
          your profile is live and ready to share with the world.
        </p>
      </div>

      <div className="w-full max-w-md bg-muted/50 rounded-2xl p-6 space-y-4 border border-primary/10">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">your unique link</p>
        <div className="flex items-center gap-2 bg-background border rounded-xl p-3 shadow-inner">
          <span className="flex-1 truncate text-left font-medium">{profileUrl}</span>
          <Button size="icon" variant="ghost" onClick={handleCopy} className="h-8 w-8">
            <Copy size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-md gap-4">
        <Button 
          asChild
          size="lg"
          className="h-14 rounded-full text-lg font-bold shadow-lg"
        >
          <Link href={`/${username}`} target="_blank">
            <ExternalLink className="mr-2" /> view my profile
          </Link>
        </Button>
        
        <Button 
          onClick={onFinish}
          variant="outline"
          size="lg"
          className="h-14 rounded-full text-lg font-bold"
        >
          go to dashboard
        </Button>
      </div>

      <Button variant="ghost" onClick={onBack} className="rounded-full">
        <ArrowLeft className="mr-2 h-4 w-4" /> wait, one more thing
      </Button>
    </div>
  );
}
