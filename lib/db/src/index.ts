import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("WARNING: NEON_DATABASE_URL is not set — DB calls will fail at runtime");
}

export const pool = new Pool({ connectionString: connectionString ?? "postgresql://localhost/placeholder" });
export const db = drizzle(pool, { schema });

export * from "./schema";
