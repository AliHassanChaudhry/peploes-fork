import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "server-only": path.resolve(
        __dirname,
        "./src/__tests__/mocks/server-only.ts",
      ),
    },
  },
  test: {
    exclude: [
      "e2e/**",
      "src/__tests__/integration/**",
      "**/node_modules/**",
      ".next/**",
    ],
    environment: "node",
    env: {
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/app",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
    globals: true,
    sequence: { hooks: "stack" },
    maxConcurrency: 1,
    fileParallelism: false,
    clearMocks: true,
    restoreMocks: true,
  },
});
