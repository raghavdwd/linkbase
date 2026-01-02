"use client";

import { useEffect } from "react";

/**
 * linkedin redirect page that redirects to actual LinkedIn profile
 * @returns redirect page component
 */
export default function LinkedInPage() {
  useEffect(() => {
    // Redirecting to actual LinkedIn profile
    window.location.href = "https://linkedin.com/company/linkbase";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Redirecting to LinkedIn...</h1>
        <p className="text-muted-foreground">
          You will be redirected to our LinkedIn profile shortly.
        </p>
        <div className="mt-4">
          <div className="border-primary mx-auto h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      </div>
    </div>
  );
}
