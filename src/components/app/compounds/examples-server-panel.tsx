import type { IExampleDto } from "@/lib/types";
import { listExamplesService } from "@/services/examples";
import { ExampleForm } from "./example-form";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export async function ExamplesServerPanel() {
  let examples: IExampleDto[] = [];
  let fetchError: string | null = null;

  const result = await listExamplesService();
  if (result.isOk()) {
    examples = result.value;
  } else {
    fetchError = result.error.message;
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white/70 p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Server Action Example
        </h2>
        <p className="text-sm text-slate-600">
          Mutations only. Reads come from services in a Server Component.
        </p>
      </div>

      <ExampleForm />

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">
          Existing Examples
        </h3>
        {fetchError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            Failed to load examples: {fetchError}
          </p>
        ) : examples.length === 0 ? (
          <p className="text-sm text-slate-500">No rows yet.</p>
        ) : (
          <ul className="space-y-1 text-sm text-slate-700">
            {examples.map((example) => (
              <li key={example.id} className="flex items-center gap-2">
                <span className="font-medium">{example.name}</span>
                <span className="text-xs text-slate-400">
                  {dateFormatter.format(new Date(example.createdAt))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
