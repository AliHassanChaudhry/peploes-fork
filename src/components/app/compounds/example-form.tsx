"use client";

import { useActionState, useEffect, useRef } from "react";

import { createExampleFormAction } from "@/actions/examples";

const initialState = { success: false, error: undefined };

export function ExampleForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createExampleFormAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);
  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="flex gap-2">
        <input
          name="name"
          placeholder="Example name"
          required
          disabled={isPending}
          className="flex-1 rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-slate-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {isPending ? "Adding…" : "Add"}
        </button>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      {state.success && (
        <p className="text-sm text-green-600">Example added successfully.</p>
      )}
    </form>
  );
}
