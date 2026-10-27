import { defineConfig } from "@playwright/test";

import base from "./playwright.config";

// Provider values are compiled into the browser bundle, so this spec needs its
// own production build with synthetic provider variables: run
// `bun run test:e2e:analytics`. Port 3108 keeps it clear of the main suite.
const port = 3108;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  ...base,
  testMatch: "**/analytics.spec.ts",
  projects: base.projects
    ?.filter((project) => project.name === "desktop")
    .map(({ testIgnore: _ignored, ...project }) => project),
  webServer: {
    ...base.webServer,
    command: `bun build e2e/mock-sanity.ts --target=node --outfile=.next/e2e/mock-sanity.mjs && node --import ./.next/e2e/mock-sanity.mjs node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
  },
  use: {
    ...base.use,
    baseURL,
  },
});
