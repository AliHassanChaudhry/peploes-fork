import "server-only";

import { desc } from "drizzle-orm";
import { err, ok, type Result, ResultAsync } from "neverthrow";

import { getDb } from "@/db";
import { examples } from "@/db/schema";
import { EXAMPLE_LIMITS } from "@/lib/constants";
import { ErrorCode } from "@/lib/enums";
import { createError } from "@/lib/errors";
import type { IError, IListExamplesOptions, TExampleRecord } from "@/lib/types";

export function listExamples(
  options: IListExamplesOptions = {},
): ResultAsync<TExampleRecord[], IError<ErrorCode.DbListFailed>> {
  const limit = Math.max(
    EXAMPLE_LIMITS.LIST_MIN_SIZE,
    Math.min(
      options.limit ?? EXAMPLE_LIMITS.LIST_DEFAULT_SIZE,
      EXAMPLE_LIMITS.LIST_MAX_SIZE,
    ),
  );

  return ResultAsync.fromThrowable(
    async () =>
      getDb()
        .select({
          id: examples.id,
          name: examples.name,
          createdAt: examples.createdAt,
        })
        .from(examples)
        .orderBy(desc(examples.createdAt))
        .limit(limit),
    (error: unknown) =>
      createError(ErrorCode.DbListFailed, "Failed to list examples.", error),
  )();
}

export async function createExample(
  name: string,
): Promise<Result<TExampleRecord, IError<ErrorCode.DbCreateFailed>>> {
  const createResult = await ResultAsync.fromThrowable(
    async () => getDb().insert(examples).values({ name }).returning(),
    (error: unknown) =>
      createError(ErrorCode.DbCreateFailed, "Failed to create example.", error),
  )();

  if (createResult.isErr()) {
    return err(createResult.error);
  }

  const [created] = createResult.value;
  if (!created) {
    return err(
      createError(ErrorCode.DbCreateFailed, "Failed to create example."),
    );
  }

  return ok(created);
}
