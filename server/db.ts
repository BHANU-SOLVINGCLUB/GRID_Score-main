import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_DATABASE_URL,
  DATABASE_URL,
  SUPABASE_DB_PASSWORD,
} from "./config";

neonConfig.webSocketConstructor = ws;

// Check if using Supabase REST API (preferred if credentials are available)
const useRestAPI = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Construct database URL from various sources (fallback for direct PostgreSQL)
function getDatabaseUrl(): string | null {
  // Option 1: Direct database URL (full connection string)
  if (SUPABASE_DATABASE_URL) {
    return SUPABASE_DATABASE_URL;
  }
  
  if (DATABASE_URL) {
    return DATABASE_URL;
  }
  
  // Option 2: Supabase URL + Password (construct connection string)
  if (SUPABASE_URL && SUPABASE_DB_PASSWORD) {
    // Extract project reference from Supabase URL
    // e.g., https://leltckltotobsibixhqo.supabase.co -> leltckltotobsibixhqo
    const urlMatch = SUPABASE_URL.match(/https?:\/\/([^.]+)\.supabase\.co/);
    if (urlMatch) {
      const projectRef = urlMatch[1];
      return `postgresql://postgres:${encodeURIComponent(SUPABASE_DB_PASSWORD)}@db.${projectRef}.supabase.co:5432/postgres`;
    }
  }
  
  return null;
}

// Only initialize direct PostgreSQL connection if not using REST API
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (!useRestAPI) {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    console.warn(
      "⚠️  No direct database connection configured.\n" +
      "💡 Using Supabase REST API is recommended. Set:\n" +
      "   - SUPABASE_URL\n" +
      "   - SUPABASE_ANON_KEY or SUPABASE_KEY\n\n" +
      "Alternatively, provide database connection:\n" +
      "   - SUPABASE_DATABASE_URL (full connection string)\n" +
      "   - SUPABASE_URL + SUPABASE_DB_PASSWORD\n" +
      "   - DATABASE_URL"
    );
  } else {
    pool = new Pool({ connectionString: databaseUrl });
    db = drizzle({ client: pool, schema });
  }
} else {
  console.log("✅ Using Supabase REST API (SUPABASE_URL + SUPABASE_ANON_KEY)");
}

export { pool, db };
