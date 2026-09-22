import * as Sentry from "@sentry/nextjs";

import type { IFetchOptions, IFetchResponse } from "@/lib/types";

export async function fetcher<TRequest = unknown, TResponse = unknown>({
  url,
  method,
  body,
  token,
  headers = {},
}: IFetchOptions<TRequest>): Promise<IFetchResponse<TResponse>> {
  try {
    const configHeaders: HeadersInit = {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const response = await fetch(url, {
      method,
      headers: configHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    let data: TResponse | null = null;

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: data,
        error:
          (data !== null &&
          typeof data === "object" &&
          "error" in data &&
          typeof (data as Record<string, unknown>).error === "string"
            ? ((data as Record<string, unknown>).error as string)
            : null) ?? response.statusText,
      };
    }

    return {
      ok: true,
      status: response.status,
      data,
      error: null,
    };
  } catch (error) {
    Sentry.captureException(error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      status: 0,
      data: null,
      error: errorMessage || "An unexpected error occurred",
    };
  }
}
