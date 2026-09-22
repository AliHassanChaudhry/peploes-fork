import { ok } from "neverthrow";
import { describe, expect, it, vi } from "vitest";

import {
  createAction,
  getActionContext,
  requireAuthContext,
} from "@/actions/base";
import { ErrorCode } from "@/lib/enums";

describe("action authentication", function actionAuthenticationTests() {
  it("starts unauthenticated until a verified session resolver is installed", async function startsUnauthenticated() {
    await expect(getActionContext()).resolves.toEqual({
      userId: null,
      role: null,
    });
  });

  it("accepts a verified authenticated context", function acceptsAuthenticatedContext() {
    const result = requireAuthContext({
      userId: "user-1",
      role: "member",
    });

    expect(result).toEqual(ok({ userId: "user-1", role: "member" }));
  });

  it("stops protected actions before parsing or handling input", async function stopsProtectedActions() {
    const parse = vi.fn(function parseInput() {
      return ok("parsed");
    });
    const handler = vi.fn(function handleInput() {
      return Promise.resolve(ok("handled"));
    });
    const action = createAction<string, string, ErrorCode.ValidationError>({
      parse,
      handler,
    });

    const result = await action("input");

    expect({
      errorCode: result.isErr() ? result.error.code : null,
      parseCalls: parse.mock.calls.length,
      handlerCalls: handler.mock.calls.length,
    }).toEqual({
      errorCode: ErrorCode.Unauthorized,
      parseCalls: 0,
      handlerCalls: 0,
    });
  });
});
