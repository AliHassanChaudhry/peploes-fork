# Next.js starter

A reusable base for full-stack Next.js projects. It provides shared tooling and
integration points without pretending to know a product's authentication,
privacy, content, or deployment policy.

## Included

- Next.js 16, React 19, strict TypeScript, and typed routes
- Tailwind CSS 4 and shadcn/ui
- PostgreSQL with Drizzle ORM
- Zod validation and `neverthrow` results
- Optional Sentry, GA4, SEO, and AI-discovery helpers
- Biome, Vitest, Husky, GitHub Actions, and Bun

The example feature demonstrates the repository's data flow. Rename or remove
it when the first real domain is introduced.

## Start locally

Install Bun 1.4 or newer and provide a disposable PostgreSQL database.

```bash
cp .env.example .env.local
bun install
bun run db:migrate
bun run dev
```

Open `http://localhost:3000`. Run the complete local gate with:

```bash
bun run ci
```

The remaining scripts are declared in [`package.json`](package.json). Database
scripts can change schema or data; verify the target before running one.

Pull-request CI also starts an empty PostgreSQL service, applies every migration,
and runs the database integration test.

## Before the first deployment

Replace the fail-closed action context with a verified server-side session.
Then review the project-specific security, consent, analytics, monitoring, and
public-content decisions identified in the architecture review and the relevant
guides below.

## Documentation

| Document | Owns |
| --- | --- |
| [`docs/architecture.md`](docs/architecture.md) | Module placement, dependency direction, and source conventions |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Branch, commit, review, and contribution workflow |
| [`AGENTS.md`](AGENTS.md) | Agent authorization and repository-specific operating rules |
| [`docs/guides/testing-guide.md`](docs/guides/testing-guide.md) | Test selection and test-suite policy |
| [`docs/guides/`](docs/guides) | Error handling, logging, analytics, Sentry, performance, and SEO |
| [`docs/reports/nextjs-starter-architecture-review.html`](docs/reports/nextjs-starter-architecture-review.html) | Dated audit findings and recommendations |

The HTML report is a point-in-time review, not an instruction manual. Current
working rules live in the Markdown documents above.
