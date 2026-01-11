"use client";

import { useState } from "react";
import { User, Camera, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { UploadButton } from "~/lib/uploadthing";

interface StepProfileProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepProfile({ onNext, onBack }: StepProfileProps) {
  const { data: user } = api.user.getMe.useQuery();
  const [bio, setBio] = useState(user?.bio ?? "");
  const [image, setImage] = useState(user?.image ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const utils = api.useUtils();
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: () => {
      void utils.user.getMe.invalidate();
      onNext();
    },
    onError: (err) => {
      toast.error(err.message);
      setIsSaving(false);
    },
  });

  const handleSave = () => {
    setIsSaving(true);
    void updateProfile.mutate({
      bio: bio || undefined,
      image: image || undefined,
    });
  };

  return (
    <div className="flex h-full flex-col space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <User size={24} />
          </div>
          tell us about yourself
        </h2>
        <p className="text-muted-foreground text-lg">
          add a photo and a short bio so people know it&apos;s you.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-primary/20 flex items-center justify-center">
            {image ? (
              <Image src={image} alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
            ) : (
              <User size={40} className="text-muted-foreground" />
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <UploadButton
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                const url = res[0]?.url;
                if (url) {
                  setImage(url);
                  toast.success("photo uploaded!");
                }
              }}
              appearance={{
                button: "bg-black/50 w-full h-full rounded-full border-none text-[0px]",
                allowedContent: "hidden",
              }}
              content={{
                button: <Camera className="text-white" size={24} />,
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <UploadButton
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              const url = res[0]?.url;
              if (url) {
                setImage(url);
                toast.success("photo uploaded!");
              }
            }}
            appearance={{
              button: "bg-primary text-white h-10 px-4 rounded-full text-sm",
              allowedContent: "hidden",
            }}
            content={{
              button: "upload photo",
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="onboarding-bio" className="text-base font-semibold">bio</Label>
        <Textarea 
          id="onboarding-bio"
          placeholder="I'm a creator focused on..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-h-[100px] rounded-xl text-lg resize-none"
          maxLength={160}
        />
        <p className="text-right text-xs text-muted-foreground">{bio.length}/160</p>
      </div>

      <div className="pt-4 flex flex-col gap-4">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="h-14 rounded-full text-lg font-bold shadow-lg"
        >
          {isSaving ? <Loader2 className="mr-2 animate-spin" /> : null}
          continue
        </Button>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> back
          </Button>
          <Button variant="link" onClick={onNext} className="text-muted-foreground">
            skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
