import { z } from "zod";

export const pageLinkSchema = z
  .string()
  .trim()
  .min(1)
  .refine((value) => {
    if (
      /[\s\\]/.test(value) ||
      Array.from(value).some(
        (character) =>
          character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
      )
    )
      return false;
    if (value.startsWith("/")) return !value.startsWith("//");
    if (value.startsWith("#")) return value.length > 1;
    if (!/^https?:\/\//i.test(value)) return false;
    try {
      return Boolean(new URL(value).hostname);
    } catch {
      return false;
    }
  }, "Enter a page path such as /seasonal/lobster-season or a full https:// URL.");
