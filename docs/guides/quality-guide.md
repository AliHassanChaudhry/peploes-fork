# Verification and review policy

## Required checks

Choose local checks for the changed behavior and failure risk. Ordinary CSS
changes need visual inspection, not automated tests by default. Prose needs link,
consistency and diff checks. Logic needs affected tests; persistence needs the
relevant integration check; critical journeys need a browser check only where
cheaper coverage cannot prove the result.

Do not default to full suites or repeat an unchanged build. Expand checks for
a demonstrated failure, an unresolved risk spanning modules or an explicit
request. Existing CI remains the shared integration gate. Report actual results
and omitted checks without implying that local verification proves remote CI
or deployment.

Use the [test-quality skill](../../.agents/skills/test-quality/SKILL.md) to assess
whether a test earns its maintenance and runtime cost.

## Review evidence

Review standards and requested behavior separately against the actual candidate.
Use `code-review` and the codebase-fit checks in `elhaam-review` when available.
Keep findings and verification evidence in the PR or tracker. Fix correctness,
security, data-loss and missing-test findings within scope, then repeat affected
checks. A passing review does not authorize publishing.

Never weaken a check to hide failure. A suppression needs a demonstrated tool
limitation, narrow scope, reason and removal condition. Distinguish an inherited
failure from an unverified assumption. Do not claim remote branch protection,
approvals or external receipt without checking them.
