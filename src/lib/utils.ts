import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClientSide(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function isServerSide(): boolean {
  return !isClientSide();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function trimTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function extractFieldErrors(
  issues: Array<{ path: (string | number)[]; message: string }>,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const issue of issues) {
    const fieldName = String(issue.path[0] ?? "");
    if (!result[fieldName]) {
      result[fieldName] = [];
    }
    result[fieldName].push(issue.message);
  }
  return result;
}
