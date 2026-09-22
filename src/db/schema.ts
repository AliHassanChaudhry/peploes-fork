import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { EXAMPLE_LIMITS } from "@/lib/constants";

export const examples = pgTable("examples", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: EXAMPLE_LIMITS.NAME_MAX_LENGTH }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
