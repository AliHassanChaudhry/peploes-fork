# Contribution policy

Follow [AGENTS.md](AGENTS.md) for authorization. An approved implementation is
not permission to commit, push, merge, deploy or close an issue. Authorization
already given for a named operation remains valid within its stated scope.

## Isolation and shipping

Give each active ticket its own branch and checkout. Preserve unrelated work.
Ask for unknown contributor initials before creating a branch. Ticket branches
use `<type>/<initials>/<issue-number>-<description>`; small maintenance work may
omit the issue number. Direct work on `dev` or `main` needs an explicit exception.

Start independent work from integrated `dev`. Declare a stacked branch's parent
and merge order. Retargeting after a parent squash must not repeat parent work.
Do not rewrite another contributor's published branch. Rewriting your own
published branch requires explicit authorization and a lease.

Prefer squash merge for a ticket. Use a merge commit for `dev` to `main`
promotion so shared ancestry survives. A direct protected-branch push needs an
explicitly named exception; a hook bypass does not grant permission.

Use `Refs #number` by default. Closing keywords require an explicit closure
request and satisfied acceptance criteria. Integration, deployment and real-world
activation are separate outcomes.

Delete a branch or worktree only when requested and after checking for remaining
work. Close a ticket only after integration and verified acceptance, with an
explicit closure request. Report an earlier closure as a workflow exception.
Inspect the staged diff before committing. Do not add automation attribution or
co-author tags.

## Review

Use the [quality guide](docs/guides/quality-guide.md#required-checks) to select
checks. A draft PR must state known gaps. Explain the problem, resulting behavior,
material tradeoffs and actual verification. Keep review evidence in the PR,
not a permanent report. Include synthetic visual evidence only when useful.

## Documentation

Retain only reasons, constraints or context that cannot be reconstructed from
code or explanatory commit history. A document's own historical copy is not
proof of reconstruction. Remove implementation walkthroughs, configuration
inventories and dated test logs. Keep each retained fact in one owner document;
link to it elsewhere. Review uncertain external facts before deleting them.

Use plain language. Aim for 400 words per decision and 600 per focused context
document; a longer record needs a concrete reason. Do not split files just to
meet a word limit. A source edit alone never requires a documentation edit.

Invoke the [ADR skill](.agents/skills/adr/SKILL.md) with `$adr` for a meaningful
architecture or data-flow decision. Ask for the human's description first,
preserve their words and correct only grammar or essential gaps. Routine code
or style changes need no ADR.
