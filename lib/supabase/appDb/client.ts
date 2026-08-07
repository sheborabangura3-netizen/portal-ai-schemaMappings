import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client for THIS app's own Supabase project — the one holding
 * reviewer accounts and in-progress review drafts. Session-related use
 * only (e.g. reading the current user in a Client Component where
 * unavoidable). Never used to query review data directly — that goes
 * through Server Actions in lib/actions/*.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
