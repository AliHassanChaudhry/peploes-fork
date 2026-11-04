# Repository agent policy

## Authorization

Preserve unrelated working-tree changes. Ask for contributor initials before
creating a branch; use the isolation and shipping policy in
[CONTRIBUTING.md](CONTRIBUTING.md).

Leave implementation changes uncommitted for review. Commit, push, open or merge
a PR, close an issue, and change review threads only when the user explicitly
requests that operation. Code approval, skills, tickets and automation grant no
additional publishing permission. Existing authorization remains valid within
its stated scope. Reply to or resolve threads only after the fix is pushed.

Drizzle generate, migrate, push, studio and drop commands require explicit
permission. Resolve exact targets before overwriting or deleting data and prefer
a recoverable operation.

## Working method

Inspect the branch, working tree and linked worktrees before editing. Read the
owning code, callers, tests and named ticket. Direct implementation on `dev` or
`main` requires the user to name that exception.

Make the smallest change that solves the requested problem. Add tests only for
a named important failure; existing coverage can suffice. Keep documentation
only for reasons or context absent from code and explanatory commit messages.

Choose affected checks using the [quality guide](docs/guides/quality-guide.md).
Ordinary CSS or prose needs no test run. Never weaken checks to hide a failure.
Inspect the final diff for unrelated edits, secrets, generated output, security,
duplicate safety and dependency direction. Report actual checks and limits.

## Context

Read only the relevant retained decisions:

- [Restaurant direction](docs/project/brief.md), [menu questions](docs/project/menus.md),
  [private dining](docs/project/private-dining.md) and [booking account decisions](docs/project/booking-page.md).
- [Design policy](docs/architecture.md) when changing boundaries or dependencies.
- [Analytics policy](docs/guides/ga4-guide.md), [PostHog account](docs/guides/posthog-guide.md),
  [Sentry account](docs/guides/sentry-guide.md), [email approvals](docs/guides/email-guide.md)
  and [search decisions](docs/guides/seo-guide.md) when those external choices matter.

Source and configuration own current implementation, scripts and enforcement.
Read framework documentation for the installed version before changing an API.

## Skills

Apply [test-quality](.agents/skills/test-quality/SKILL.md) to tests and accompanying
docs, including during `elhaam-review`. Preserve useful behavioral checks while
removing implementation coupling. Use `ponytail` for coding and `unslop` for
prose. Apply `writing-for-agents` to guidance when available.

Finish implementation with standards and spec review using `code-review` and
the codebase-fit checks in `elhaam-review` when available. Missing skills do not
relax repository requirements or authorization.

Create ADRs only through the [ADR skill](.agents/skills/adr/SKILL.md) when the
human invokes `$adr`. For a meaningful architecture or data-flow decision,
ask them to supply its description. Routine source edits need no ADR.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
