import { createInsertSchema } from "drizzle-zod";

import { examples } from "@/db/schema";
import { EXAMPLE_LIMITS } from "@/lib/constants";

export const createExampleSchema = createInsertSchema(examples, {
  name: (schema) =>
    schema
      .trim()
      .min(EXAMPLE_LIMITS.NAME_MIN_LENGTH)
      .max(EXAMPLE_LIMITS.NAME_MAX_LENGTH),
}).pick({ name: true });
