# Architecture

The starter uses a layered Next.js application. Keep the layers until a real
project proves that a different boundary is simpler.

## Dependency direction

```text
src/db/schema.ts
        ↓
src/dal/*.ts
        ↓
src/services/*.ts
        ↓
src/actions/*.ts       src/app/api/*/route.ts
        ↓                         ↓
Server and Client Components
```

Dependencies point down the diagram. A DAL module never imports a service. A
service never imports an action or route handler.

## Module boundaries and names

The directory states the technical role; the filename states the domain. Use
`src/dal/examples.ts`, not `src/dal/example-dal.ts`, and apply the same rule to
services and actions. Component and hook filenames use kebab-case.

Use `index.ts` only as a deliberate public entry point with consumers outside
its directory. Do not create empty barrels or barrels that only duplicate
direct imports.

Import source modules through `@/` and use type-only imports where appropriate.
Shared interfaces and type aliases live in `src/lib/types.ts`, enums in
`src/lib/enums.ts`, and values that must agree across boundaries in
`src/lib/constants.ts`. Keep a private value beside its only consumer.

## App Router

`src/app/` owns URLs and framework entry points.

- Server Components read data by calling a service directly.
- Client Components use GET route handlers when they need an HTTP read.
- Server Actions handle application mutations.
- Route handlers also accept webhooks and proxy external APIs when the project
  needs a public HTTP boundary.

Keep route files small. They translate framework input and output. Business
rules stay in services.

## Database and DAL

`src/db/schema.ts` is the Drizzle schema used by Drizzle Kit. `src/db/index.ts`
creates the shared Postgres client from validated environment values.
`src/db/migrations/` contains the reviewed migration history applied by CI and
deployments.

DAL modules live in `src/dal/` and are server-only. Name them for the domain,
such as `examples.ts`. Every query should:

- select the columns its caller needs;
- convert thrown database failures to an `IError`;
- return a `Result` or `ResultAsync`;
- avoid leaking a raw database record beyond the service layer.

Do not run migration commands against an unknown database. Review generated SQL
before applying it.

## Services

Services own application rules. They validate inputs, combine DAL calls, and
map records to serializable DTOs. They have no React, cache, request, or response
concerns.

The example service validates with `createExampleSchema`, calls the examples
DAL, and converts `Date` to an ISO string. That is enough work to justify the
layer. A service that only forwards one call should be questioned.

## Server Actions

`src/actions/base.ts` wraps protected mutations. Its current context resolver
returns no user, so protected actions reject requests with `Unauthorized`.
Replace that resolver with a verified server-side session before using the
starter in an application.

The wrapper authenticates first, parses input, calls the handler, and converts
unexpected failures to a safe internal error. Feature actions translate that
result to the shape needed by `useActionState` and revalidate affected routes.

## Shared definitions and errors

The repository centralizes shared definitions:

- `src/lib/types.ts` contains interfaces and type aliases.
- `src/lib/enums.ts` contains error codes, methods, statuses, and fixed sets.
- `src/lib/constants.ts` contains values shared across boundaries.
- `src/lib/errors.ts` creates and maps typed errors.

Add a value to a registry only when separate parts of the app must agree on it.

Expected failures use `neverthrow`. Catch a throwing dependency where it enters
the application, add useful context for logs, and return a message safe for the
caller. `unwrapResultOrThrow` is an escape hatch for framework boundaries. It
does not belong in DAL, service, or action code.

## Components

`src/components/ui/` contains shadcn/ui components. `src/components/app/`
groups project components by size:

- atoms are small reusable controls or wrappers;
- molecules combine a few atoms;
- compounds own a feature-level UI concern.

The size labels are a navigation aid. Move a component when its responsibility
changes. Do not create an empty folder or barrel to complete the taxonomy.

Server Components are the default. A component needs `"use client"` when it
uses state, effects, browser APIs, context, or event handlers. Data passed from
server to client must be serializable.

## Environment and configuration

`src/lib/env.ts` validates environment values. `.env.example` documents the
same contract. `next.config.ts`, Drizzle config, Sentry config, and
instrumentation files may read `process.env` because they run before app aliases
and validation are available.

The default CSP supports static rendering, so scripts and styles still allow
inline content. It allows `unsafe-eval` only in development and adds monitoring
or analytics origins only when their public configuration exists. Projects that
need nonce-based CSP must accept dynamic rendering as described in the
[Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy).

Production sends one year of HSTS without `includeSubDomains` or `preload`.
Enable those directives only after every subdomain is HTTPS-only and the domain
owner accepts the preload removal delay. Optimized images and the default CSP
allow local assets only. Add each required remote image origin to both
`next.config.ts` and the CSP after the project chooses its media providers.

## Cross-cutting modules

Logging, Sentry, analytics, SEO, testing, and performance each have one owner in
`docs/guides/`. Those guides describe their current implementation and
project-specific replacement points. Do not restate their policies here.
