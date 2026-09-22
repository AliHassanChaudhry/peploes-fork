import { Suspense } from "react";

import { ExamplesClientPanel } from "@/components/app/compounds/examples-client-panel";
import { ExamplesServerPanel } from "@/components/app/compounds/examples-server-panel";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Next.js Starter Kit
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            DAL + Server Action Patterns
          </h1>
          <p className="text-base text-slate-600">
            Examples below demonstrate the data-access layers, mutation actions,
            and client-side reads via API routes.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Suspense
            fallback={
              <div className="animate-pulse rounded-lg border border-slate-200 bg-white/70 p-6 text-sm text-slate-400">
                Loading server examples…
              </div>
            }
          >
            <ExamplesServerPanel />
          </Suspense>
          <ExamplesClientPanel />
        </div>
      </main>
    </div>
  );
}
