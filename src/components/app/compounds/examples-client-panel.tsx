"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { fetcher } from "@/helpers/api";
import { HttpVerb } from "@/lib/enums";
import type { IExampleDto, IExamplesResponse } from "@/lib/types";

export function ExamplesClientPanel() {
  const [examples, setExamples] = useState<IExampleDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat("en", { dateStyle: "medium" }),
    [],
  );

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetcher<null, IExamplesResponse>({
        url: "/api/examples",
        method: HttpVerb.Get,
      });

      if (!response.ok || !response.data) {
        setError(response.error ?? "Failed to load examples.");
        setExamples([]);
        return;
      }

      setExamples(response.data.data);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to load examples.";
      setError(message);
      setExamples([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white/70 p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Client Fetch Example
        </h2>
        <p className="text-sm text-slate-600">
          Client components should read via API routes for cacheable GETs.
        </p>
      </div>

      <Button onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Load Examples"}
      </Button>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900"
        >
          {error}
        </p>
      ) : null}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-700">API Results</h3>
        {examples.length === 0 ? (
          <p className="text-sm text-slate-500">No data loaded yet.</p>
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
