import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib/config";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb(): ReturnType<typeof drizzle> {
  if (dbInstance) {
    return dbInstance;
  }

  // Set DATABASE_POOL_SIZE=1 for serverless/edge deployments to avoid
  // connection exhaustion. Defaults to 10 for traditional server environments.
  const queryClient = postgres(env.DATABASE_URL, {
    max: env.DATABASE_POOL_SIZE,
  });
  dbInstance = drizzle(queryClient);

  return dbInstance;
}
