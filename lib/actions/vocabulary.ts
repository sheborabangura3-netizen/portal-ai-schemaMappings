import { createClient } from "@/lib/supabase/appDb/server";
import type { Json } from "@/lib/types/appDb.types";

/**
 * The canonical vocabulary lives in appDB's canonical_fields table, in the
 * single row where type_of_canonical = 'all_canonical_fields'. The matching
 * API already knows the full vocabulary internally (it's baked into its own
 * matching logic) — this read is purely for the reviewer-facing reference
 * rail, so they can see/copy a canonical name the API didn't propose.
 */
export async function getCanonicalVocabulary(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("canonical_fields")
    .select("canonical_fields")
    .eq("type_of_canonical", "all_canonical_fields")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load canonical vocabulary: ${error.message}`);
  }

  return normalizeCanonicalFields(data?.canonical_fields ?? null);
}

// canonical_fields is a Json column, so this stays defensive: expected shape
// is a JSON array of strings, but falls back to splitting a delimited
// string if it's ever stored that way instead.
function normalizeCanonicalFields(value: Json | null): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}
