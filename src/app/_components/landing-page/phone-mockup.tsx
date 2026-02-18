"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils";

interface LinkItemProps {
  label: string;
  color?: string;
}

function LinkItem({ label, color }: LinkItemProps) {
  return (
    <div
      className={cn(
        "flex w-full cursor-pointer items-center justify-center rounded-sm py-4 text-sm font-bold transition-all hover:scale-[1.02]",
        color ?? "text-foreground bg-white shadow-sm",
      )}
    >
      {label}
    </div>
  );
}

/**
 * simple phone mockup to display on the landing page
 * @returns phone mockup component
 */
export function PhoneMockup() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.host);
  }, []);

  return (
    <div className="border-foreground bg-background relative mx-auto h-[600px] w-[300px] rounded-[3rem] border-[8px] p-4 shadow-2xl">
      {/* speaker/notch */}
      <div className="bg-foreground absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-2xl" />

      <div className="mt-8 flex flex-col items-center gap-6">
        {/* profile picture placeholder */}
        <div className="bg-primary/20 relative h-24 w-24 overflow-hidden rounded-full p-1">
          <Image
            src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Profile picture"
            fill
            className="rounded-full object-cover p-1"
          />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold">@yourname</h3>
          <p className="text-muted-foreground text-xs">{origin || "linkbase.com"}/yourname</p>
        </div>

        <div className="flex w-full flex-col gap-3 px-2">
          <LinkItem
            label="My Store"
            color="bg-primary text-primary-foreground"
          />
          <LinkItem label="Latest YouTube Video" />
          <LinkItem label="Join my Discord" />
          <LinkItem label="Newsletter" />
          <LinkItem label="About Me" />
        </div>
      </div>

      {/* home indicator */}
      <div className="bg-foreground/20 absolute bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full" />
    </div>
  );
}
