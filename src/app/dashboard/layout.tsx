import { DashboardNavbar } from "./_components/navbar";
import { OnboardingModal } from "./_components/onboarding/onboarding-modal";
import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-muted/10 min-h-screen font-sans">
      <DashboardNavbar />
      {children}
      <OnboardingModal />
    </div>
  );
}
