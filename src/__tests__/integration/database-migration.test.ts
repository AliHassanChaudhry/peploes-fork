import { randomUUID } from "node:crypto";
import postgres from "postgres";
import { afterAll, describe, expect, it } from "vitest";

import { env } from "@/lib/config";

const sql = postgres(env.DATABASE_URL, { max: 1 });

afterAll(async function closeDatabaseConnection() {
  await sql.end();
});

describe("database migrations", function databaseMigrationTests() {
  it("supports an example row round trip", async function exampleRoundTripTest() {
    const name = `migration-smoke-${randomUUID()}`;
    const createdRows = await sql`
      INSERT INTO examples (name)
      VALUES (${name})
      RETURNING id, name, created_at
    `;
    const created = createdRows[0];

    expect(created).toBeDefined();
    if (!created) return;

    const selectedRows = await sql`
      SELECT id, name, created_at
      FROM examples
      WHERE id = ${created.id}
    `;

    await sql`DELETE FROM examples WHERE id = ${created.id}`;

    expect(selectedRows).toHaveLength(1);
    expect(selectedRows[0]).toMatchObject({ id: created.id, name });
    expect(selectedRows[0]?.created_at).toBeInstanceOf(Date);
  });
});
