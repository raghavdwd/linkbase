"use client";

import { useState } from "react";
import { Link as LinkIcon, Plus, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

interface StepAddLinkProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepAddLink({ onNext, onBack }: StepAddLinkProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const utils = api.useUtils();
  const createMutation = api.link.create.useMutation({
    onSuccess: () => {
      void utils.link.getAll.invalidate();
      void utils.subscription.getLinkLimits.invalidate();
      toast.success("first link added!");
      onNext();
    },
    onError: (err) => {
      toast.error(err.message);
      setIsAdding(false);
    },
  });

  const handleAddLink = () => {
    if (!title || !url) return;
    setIsAdding(true);
    void createMutation.mutate({ title, url });
  };

  return (
    <div className="flex h-full flex-col space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <LinkIcon size={24} />
          </div>
          add your first link
        </h2>
        <p className="text-muted-foreground text-lg">
          what&apos;s the most important thing you want people to see?
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="onboarding-title" className="text-base font-semibold">title</Label>
          <Input 
            id="onboarding-title"
            placeholder="e.g. My Website, Latest Video, Newsletter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 rounded-xl text-lg px-4"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="onboarding-url" className="text-base font-semibold">url</Label>
          <Input 
            id="onboarding-url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 rounded-xl text-lg px-4"
          />
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-4">
        <Button 
          onClick={handleAddLink}
          disabled={isAdding || !title || !url}
          size="lg"
          className="h-14 rounded-full text-lg font-bold shadow-lg"
        >
          {isAdding ? <Loader2 className="mr-2 animate-spin" /> : <Plus className="mr-2" />}
          add and continue
        </Button>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> back
          </Button>
          <Button variant="link" onClick={onNext} className="text-muted-foreground">
            i&apos;ll do this later
          </Button>
        </div>
      </div>
    </div>
  );
}
