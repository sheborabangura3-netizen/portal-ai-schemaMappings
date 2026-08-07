import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { MasterDatabase } from "@/lib/types/masterDb.types";

/**
 * Server-only client for the MASTER database — the same one PORTAL-AI's
 * live pipeline reads from. Reads discovered_schema; writes field_mappings
 * only when a reviewer explicitly publishes (see lib/actions/mappings.ts).
 *
 * Deliberately NOT built from request cookies: reviewers aren't rows in
 * this database, institutions are. Auth for this client is the service
 * role key, used only from Server Actions — this import will throw if
 * anything tries to pull it into a Client Component bundle (the
 * "server-only" package enforces that at build time).
 *
 * Import ONLY from lib/actions/*.ts, never from a page.tsx or component,
 * per the page/action separation used across both Portal AI repos.
 */
export function createMasterDbClient() {
  return createSupabaseClient<MasterDatabase>(
    process.env.MASTER_SUPABASE_URL!,
    process.env.MASTER_SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
