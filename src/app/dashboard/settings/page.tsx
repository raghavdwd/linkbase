import { ProfileSettings } from "../_components/profile-settings";

export default async function SettingsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          settings
        </h1>
        <p className="text-muted-foreground mt-2">
          manage your profile and preferences.
        </p>
      </div>

      <ProfileSettings />
    </main>
  );
}
