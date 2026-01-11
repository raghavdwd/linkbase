import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  redirect("/dashboard/links");
}
