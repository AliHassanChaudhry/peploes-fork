import { NextResponse } from "next/server";

import { ErrorCode } from "@/lib/enums";
import type { IError } from "@/lib/types";
import { listExamplesService } from "@/services/examples";

// ISR: cache GET responses for 60 s.
export const revalidate = 60;

function toErrorResponse(error: IError, fallbackStatus: number) {
  const status =
    error.code === ErrorCode.ValidationError ? 400 : fallbackStatus;

  return NextResponse.json({ error: error.message }, { status });
}

export async function GET() {
  const result = await listExamplesService();
  if (result.isErr()) {
    return toErrorResponse(result.error, 500);
  }

  return NextResponse.json({ data: result.value });
}
