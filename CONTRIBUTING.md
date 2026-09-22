# Contributing

Keep a change narrow enough that a reviewer can state its purpose in one
sentence.

## Workflow

1. Follow the local setup in [`README.md`](README.md).
2. Read [`docs/architecture.md`](docs/architecture.md) before adding a module or
   moving a dependency boundary.
3. Read the matching guide before changing a cross-cutting integration.
4. Add only tests that protect the changed behavior, following the
   [testing guide](docs/guides/testing-guide.md).
5. Run `bun run ci` and inspect the final diff before requesting review.

Use a disposable local database. Never commit credentials. Review generated SQL
before applying it.

## Branches

Use `<type>/<initials>/<kebab-case-description>`:

```text
feat/msf/contact-form
fix/ak/session-expiry
refactor/rm/data-boundary
```

Use the contributor's own lowercase initials. Common types are `feat`, `fix`,
`refactor`, `perf`, and `chore`.

## Commits

Write `<type>: <imperative description>`, such as:

```text
fix: reject unauthenticated mutations
```

One commit contains one logical change and the tests that prove it. Split work
when one specific message cannot describe the whole diff. Do not add automation
attribution or co-author tags.

## Documentation

Update the document that owns the changed subject. Link to that document from
other places only when a reader needs a route to it; do not copy its rules or
inventories.

Code and configuration remain the source of truth for dependencies, scripts,
environment keys, and file inventories.

## Review checklist

- The change has one clear purpose.
- Public behavior and failure paths are tested at the lowest useful layer.
- The diff contains no secret, accidental generated output, or unrelated edit.
- Any migration or deployment effect is called out for the reviewer.
