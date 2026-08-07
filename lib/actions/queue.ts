import { createMasterDbClient } from "@/lib/supabase/masterDb/server";
import type { QueueEntry, SchemaMappingStatus } from "@/lib/types/queue";

/**
 * Reads the schema-mapping review queue straight from the master DB —
 * there's no appDb involvement here, this is read-only institution data.
 *
 * A row only shows up once discovered_schema is populated (the dashboard's
 * Schema page has written a confirmed raw field list). An institution that
 * hasn't reached that point yet — status "Not Configured" — never appears
 * here; filtering on discovered_schema being non-null is what enforces
 * that, not the status value itself.
 */
export async function getQueueEntries(): Promise<QueueEntry[]> {
  const supabase = createMasterDbClient();

  const { data, error } = await supabase
    .from("institution_schema_mappings")
    .select(
      `
        user_id,
        discovered_at,
        created_at,
        status,
        institutions ( institution_name )
      `
    )
    .not("discovered_schema", "is", null)
    .order("discovered_at", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(`Failed to load schema mapping queue: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    userId: row.user_id,
    institutionName: row.institutions?.institution_name ?? "Unknown institution",
    discoveredAt: row.discovered_at ?? row.created_at,
    status: normalizeStatus(row.status),
  }));
}

// "Complete" is the only value that should ever render the green badge —
// everything else (including any unexpected value) reads as Pending
// rather than silently mis-rendering as done.
function normalizeStatus(status: string): SchemaMappingStatus {
  return status === "Complete" ? "Complete" : "Pending";
}
