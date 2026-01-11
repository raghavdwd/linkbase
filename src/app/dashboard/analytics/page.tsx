import { AnalyticsView } from "../_components/analytics-view";

export default async function AnalyticsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          track your performance and reach.
        </p>
      </div>

      <AnalyticsView />
    </main>
  );
}
