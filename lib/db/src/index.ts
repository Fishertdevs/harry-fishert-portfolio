import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getConnection() {
  if (!_db) {
    const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "NEON_DATABASE_URL (or DATABASE_URL) must be set. Did you forget to provision a database?",
      );
    }
    _pool = new Pool({ connectionString });
    _db = drizzle(_pool, { schema });
  }
  return _db;
}

export const pool = new Proxy({} as pg.Pool, {
  get(_t, prop) {
    getConnection();
    return (_pool as any)[prop];
  },
});

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_t, prop) {
    return (getConnection() as any)[prop];
  },
});

export * from "./schema";
