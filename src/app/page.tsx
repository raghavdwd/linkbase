import { LandingPage } from "~/app/_components/landing-page";
import { HydrateClient } from "~/trpc/server";
import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";

/**
 * root page of the application
 * @returns landing page component wrapped in hydration
 */
export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <LandingPage />
    </HydrateClient>
  );
}
