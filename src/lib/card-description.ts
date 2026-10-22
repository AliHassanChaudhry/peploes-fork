import { z } from "zod";
import { CARD_DESCRIPTION_MAX_WORDS } from "@/lib/constants";

export const cardDescriptionSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => value.split(/\s+/).length <= CARD_DESCRIPTION_MAX_WORDS,
    `Use no more than ${CARD_DESCRIPTION_MAX_WORDS} words.`,
  );

export function limitCardDescription(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, CARD_DESCRIPTION_MAX_WORDS)
    .join(" ");
}
