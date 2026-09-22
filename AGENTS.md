# Repository agent guide

This file contains agent-specific constraints. Technical conventions belong in
the linked owner documents, not here.

## Authorization

- Preserve unrelated working-tree changes.
- Ask for the contributor's initials before creating a branch. Follow the
  branch format in [`CONTRIBUTING.md`](CONTRIBUTING.md).
- Commit, push, open a pull request, or change a review thread only when the
  user's latest message explicitly requests that action.
- Run any Drizzle generate, migrate, push, studio, or drop command only with
  explicit permission.
- Resolve exact targets before deleting or overwriting data, and prefer a
  recoverable operation.

## Working method

1. Read the owning code, its callers, and its tests.
2. Use the smallest relevant document from the routing table below.
3. Make the smallest change that solves the requested problem.
4. Update the owning test or document when behavior changes.
5. Run `bun run format`, then `bun run ci` for production-facing work.
6. Inspect the final diff for unrelated edits, secrets, generated files, and
   disabled checks.

Do not hide a lint, type, test, build, or audit failure. Report a genuine blocker
instead of weakening a check.

## Context routing

| When the task changes | Read |
| --- | --- |
| Module placement, dependency direction, naming, server/client boundaries, environment access | [`docs/architecture.md`](docs/architecture.md) |
| Tests, mocks, coverage, browser tests, or database tests | [`docs/guides/testing-guide.md`](docs/guides/testing-guide.md) |
| Results, error mapping, retries, or action failures | [`docs/guides/error-handling-guide.md`](docs/guides/error-handling-guide.md) |
| Log levels, context, or metadata | [`docs/guides/logging-guide.md`](docs/guides/logging-guide.md) |
| Analytics, consent, attribution, or Web Vitals events | [`docs/guides/ga4-guide.md`](docs/guides/ga4-guide.md) |
| Error capture, source maps, or Sentry privacy | [`docs/guides/sentry-guide.md`](docs/guides/sentry-guide.md) |
| Rendering cost, images, fonts, streaming, or motion | [`docs/guides/performance-guide.md`](docs/guides/performance-guide.md) |
| Metadata, JSON-LD, robots, sitemap, or `llms.txt` | [`docs/guides/seo-guide.md`](docs/guides/seo-guide.md) |
| Branches, commits, or review preparation | [`CONTRIBUTING.md`](CONTRIBUTING.md) |

The architecture review is historical evidence. Do not treat its roadmap or
skill inventory as current repository policy.

## Authorized Git work

Keep each commit to one logical change and its tests. Inspect the staged diff,
run the required gate, and do not add agent attribution or automated co-author
tags.

Reply to or resolve review threads only after the fix is committed and pushed,
and only when the user explicitly requests the review operation.
