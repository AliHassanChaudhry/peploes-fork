"use server";

import "server-only";

import { err, ok, type Result } from "neverthrow";
import { revalidatePath } from "next/cache";

import { createAction } from "@/actions/base";
import { ROUTES } from "@/lib/constants";
import { ErrorCode, LogContext } from "@/lib/enums";
import { createError } from "@/lib/errors";
import { createExampleSchema } from "@/lib/examples-schema";
import { logger } from "@/lib/logger";
import type {
  IError,
  IExampleDto,
  IFormActionResponse,
  TCreateExampleInput,
  TExampleActionErrorCodes,
} from "@/lib/types";
import { createExampleService } from "@/services/examples";

function parseExampleFormData(
  rawInput: unknown,
): Result<
  TCreateExampleInput,
  IError<ErrorCode.InvalidForm | ErrorCode.ValidationError>
> {
  if (!(rawInput instanceof FormData)) {
    logger.warn(LogContext.ErrorHandler, "Example form: invalid form payload");
    return err(createError(ErrorCode.InvalidForm, "Invalid form payload."));
  }

  const parsed = createExampleSchema.safeParse(
    Object.fromEntries(rawInput.entries()),
  );
  if (!parsed.success) {
    logger.warn(LogContext.ErrorHandler, "Example form: validation failed", {
      errors: parsed.error.issues,
    });
    return err(
      createError(
        ErrorCode.ValidationError,
        "Invalid example name.",
        parsed.error,
      ),
    );
  }

  return ok(parsed.data);
}

export const createExampleAction = createAction<
  TCreateExampleInput,
  IExampleDto,
  TExampleActionErrorCodes
>({
  parse: parseExampleFormData,
  handler: async ({ input }) => {
    const createdResult = await createExampleService(input);
    if (createdResult.isErr()) {
      logger.error(LogContext.ErrorHandler, "Example form: creation failed", {
        error: createdResult.error,
      });
      return err(createdResult.error);
    }

    revalidatePath(ROUTES.HOME);

    logger.success(
      LogContext.ErrorHandler,
      "Example form: created successfully",
      {
        id: createdResult.value.id,
      },
    );

    return ok(createdResult.value);
  },
});

export async function createExampleFormAction(
  _prevState: unknown,
  formData: FormData,
): Promise<IFormActionResponse> {
  const result = await createExampleAction(formData);
  if (result.isErr()) {
    return { success: false, error: result.error.message };
  }
  return { success: true };
}
