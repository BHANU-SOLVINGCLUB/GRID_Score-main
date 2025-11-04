import { defineConfig } from "drizzle-kit";

// Hardcoded database URL - update the password with your actual database password
const DATABASE_URL = 'postgresql://postgres:your-password@db.leltckltotobsibixhqo.supabase.co:5432/postgres';

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in drizzle.config.ts");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
