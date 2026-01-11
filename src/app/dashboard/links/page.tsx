import { LinkEditor } from "../_components/link-editor";

export default async function LinksPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          manage links
        </h1>
        <p className="text-muted-foreground mt-2">
          add, edit or reorder your links
        </p>
      </div>

      <LinkEditor />
    </main>
  );
}
