import { LandingPage } from "~/app/_components/landing-page";
import { HydrateClient } from "~/trpc/server";

/**
 * root page of the application
 * @returns landing page component wrapped in hydration
 */
export default async function Home() {
  return (
    <HydrateClient>
      <LandingPage />
    </HydrateClient>
  );
}
