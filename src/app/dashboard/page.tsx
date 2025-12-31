"use client";

import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Layout, BarChart, Settings } from "lucide-react";
import { LinkEditor } from "./_components/link-editor";
import { AnalyticsView } from "./_components/analytics-view";
import { DashboardNavbar } from "./_components/navbar";

import { ProfileSettings } from "./_components/profile-settings";

/**
 * rendering fully functional dashboard with link management and analytics
 * @returns dashboard page with tabs
 */
export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending)
    return (
      <div className="bg-muted/30 flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="bg-muted/10 min-h-screen font-sans">
      <DashboardNavbar />

      <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            welcome back, {session.user.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground mt-2">
            manage your digital presence and track your reach.
          </p>
        </div>

        <Tabs defaultValue="links" className="space-y-8">
          <div className="scrollbar-none w-full overflow-x-auto pb-2">
            <TabsList className="bg-background inline-flex h-12 min-w-max rounded-full border p-1 md:min-w-0">
              <TabsTrigger
                value="links"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-full px-6 md:px-8"
              >
                <Layout size={16} /> links
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-full px-6 md:px-8"
              >
                <BarChart size={16} /> analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 rounded-full px-6 md:px-8"
              >
                <Settings size={16} /> settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="links"
            className="mt-0 focus-visible:outline-none"
          >
            <LinkEditor />
          </TabsContent>

          <TabsContent
            value="analytics"
            className="mt-0 focus-visible:outline-none"
          >
            <AnalyticsView />
          </TabsContent>

          <TabsContent
            value="settings"
            className="mt-0 focus-visible:outline-none"
          >
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
