import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { AppDatabase } from "@/lib/types/appDb.types";

/**
 * Server client for THIS app's own Supabase project, built from request
 * cookies. Used inside Server Actions, Server Components, and
 * middleware.ts. This is the client that reads/writes reviewer identity,
 * review-status bookkeeping, and draft mapping work — the workspace data,
 * not the system of record. See lib/supabase/masterDb/server.ts for the
 * client that talks to the authoritative database.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<AppDatabase>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — session refresh is handled
            // by middleware.ts instead. Safe to ignore here.
          }
        },
      },
    }
  );
}
