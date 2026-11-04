import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = mkdtempSync(join(tmpdir(), "peploes-adr-"));
const command = fileURLToPath(new URL("./create.mjs", import.meta.url));
const description = join(directory, "decision.md");
const run = (slug) =>
  spawnSync(
    process.execPath,
    [command, "--slug", slug, "--description-file", description],
    { cwd: directory, encoding: "utf8" },
  );
try {
  writeFileSync(
    description,
    "We keep holds per tab because guests may book in two tabs.\n",
  );
  assert.equal(run("booking-holds").status, 0);
  const first = join(directory, "docs/adr/ADR-001-booking-holds.md");
  const original = readFileSync(first, "utf8");
  assert.equal(
    original,
    "# ADR-001-booking-holds\n\nWe keep holds per tab because guests may book in two tabs.\n",
  );
  assert.equal(run("booking-holds").status, 0);
  assert.equal(readFileSync(first, "utf8"), original);
  assert.equal(run("../escape").status, 1);
  writeFileSync(description, " ");
  assert.equal(run("empty").status, 1);
  assert.equal(readdirSync(join(directory, "docs/adr")).length, 2);
  process.stdout.write("ADR command checks passed.\n");
} finally {
  rmSync(directory, { recursive: true, force: true });
}
