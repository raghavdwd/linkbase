"use client";

import { useEffect } from "react";

/**
 * instagram redirect page that redirects to actual Instagram profile
 * @returns redirect page component
 */
export default function InstagramPage() {
  useEffect(() => {
    // Redirecting to actual Instagram profile
    window.location.href = "https://instagram.com/linkbase";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Redirecting to Instagram...</h1>
        <p className="text-muted-foreground">
          You will be redirected to our Instagram profile shortly.
        </p>
        <div className="mt-4">
          <div className="border-primary mx-auto h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      </div>
    </div>
  );
}
