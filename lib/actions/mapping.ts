"use server";

import { revalidatePath } from "next/cache";
import { createMasterDbClient } from "@/lib/supabase/masterDb/server";
import type { Json } from "@/lib/types/masterDb.types";
import type { SchemaMappingStatus } from "@/lib/types/queue";
import type { DiscoveredField, InstitutionMappingRecord, ProposeMappingResult } from "@/lib/types/mapping";

/**
 * Reads one institution's row for the review screen: raw discovered fields,
 * any already-saved field_mappings (so re-opening a Completed row shows what
 * was last published, not a blank slate), and current status. Read-only,
 * masterDB, no appDB involvement.
 */
export async function getInstitutionMappingRecord(
  userId: string
): Promise<InstitutionMappingRecord | null> {
  const supabase = createMasterDbClient();

  const { data, error } = await supabase
    .from("institution_schema_mappings")
    .select(
      `
        user_id,
        discovered_schema,
        field_mappings,
        status,
        institutions ( institution_name )
      `
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load institution mapping record: ${error.message}`);
  }
  if (!data) return null;

  return {
    userId: data.user_id,
    institutionName: data.institutions?.institution_name ?? "Unknown institution",
    discoveredFields: normalizeDiscoveredSchema(data.discovered_schema),
    existingMappings: normalizeFieldMappings(data.field_mappings),
    status: normalizeStatus(data.status),
  };
}

/**
 * Calls Portal AI's internal propose-mapping endpoint — the real matcher,
 * not a placeholder. It only needs the raw discovered paths; it already
 * knows the canonical vocabulary internally.
 */
export async function proposeMapping(
  discoveredFields: DiscoveredField[]
): Promise<ProposeMappingResult> {
  const confirmedPaths = discoveredFields.map((f) => f.path);
  const response = await fetch(process.env.PORTAL_AI_PROPOSE_CANONICAL_MAPPING_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Service-Secret": process.env.DASHBOARD_INTERNAL_SECRET!,
    },
    body: JSON.stringify({ confirmedPaths }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Match request failed (${response.status}).`);
  }

  const body = (await response.json()) as {
    mappings: { canonical: string; institutionField: string }[];
    unmappedCanonicalFields: string[];
    unmappedInstitutionPaths: string[];
  };

  return {
    mappings: Object.fromEntries(
      body.mappings.map((m) => [m.institutionField, m.canonical])
    ),
    unmappedInstitutionPaths: body.unmappedInstitutionPaths ?? [],
    unmappedCanonicalFields: body.unmappedCanonicalFields ?? [],
  };
}

/**
 * Writes the finished mapping straight to the master DB and flips status
 * to Complete — no appDB draft step in this version, per the simplified
 * Save flow.
 *
 * Persisted shape (field_mappings column) is an array of pair-objects,
 * NOT the flat { institutionField: canonical } object used elsewhere in
 * this file's in-memory contract:
 *
 *   [{ "portal_ai_field": "applicant.name", "institution_field": "personalDetails.applicantName" }, ...]
 *
 * The incoming `fieldMappings` param keeps its existing
 * Record<institutionField, canonical> shape (matches what the review
 * screen and ProposeMappingResult.mappings already produce) — only the
 * on-disk format changes, converted here right before the write.
 */
export async function saveFieldMappings(
  userId: string,
  fieldMappings: Record<string, string>
): Promise<void> {
  const supabase = createMasterDbClient();

  const fieldMappingsArray = Object.entries(fieldMappings)
    .map(([institutionField, portalAiField]) => ({
      portal_ai_field: portalAiField,
      institution_field: institutionField,
    }))
    // Sorted by institution_field, matching the ordering of the
    // institution column on the mapping review table.
    .sort((a, b) => a.institution_field.localeCompare(b.institution_field));

  const { error } = await supabase
    .from("institution_schema_mappings")
    .update({ field_mappings: fieldMappingsArray, status: "Complete" })
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to save field mappings: ${error.message}`);
  }

  revalidatePath("/queue");
  revalidatePath(`/queue/${userId}`);
}

function normalizeStatus(status: string): SchemaMappingStatus {
  return status === "Complete" ? "Complete" : "Pending";
}

// discovered_schema is Json, shaped as { columns: [{ columnName, discoveredPaths: [{ path, source, fieldKind }], ... }], ... }
// — the dot-path strings live two levels down, not at the top. Flattens
// every column's discoveredPaths into one flat list of
// DiscoveredField entries including fieldKind, e.g. { path: "personal_details.applicantName", fieldKind: "scalar" }.
// The same entries (path only) are also sent to the Match API as confirmedPaths.
function normalizeDiscoveredSchema(value: Json | null): DiscoveredField[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];

  const columns = (value as { columns?: unknown }).columns;
  if (!Array.isArray(columns)) return [];

  const fields: DiscoveredField[] = [];
  for (const column of columns) {
    if (!column || typeof column !== "object") continue;

    const discoveredPaths = (column as { discoveredPaths?: unknown }).discoveredPaths;
    if (!Array.isArray(discoveredPaths)) continue;

    for (const entry of discoveredPaths) {
      if (!entry || typeof entry !== "object") continue;
      const path = (entry as { path?: unknown }).path;
      const rawFieldKind = (entry as { fieldKind?: unknown }).fieldKind;
      const fieldKind: DiscoveredField["fieldKind"] =
        rawFieldKind === "array" || rawFieldKind === "record_identifier"
          ? rawFieldKind
          : "scalar";
      if (typeof path === "string") fields.push({ path, fieldKind });
    }
  }
  return fields;
}

// field_mappings is Json, persisted as an array of pair-objects:
//   [{ "portal_ai_field": "...", "institution_field": "..." }, ...]
// Reconstructed here into Record<institutionField, canonical> — the shape
// InstitutionMappingRecord.existingMappings and the review screen expect.
// Malformed entries (missing/non-string fields) are skipped rather than
// thrown on, so one bad row doesn't break the whole review screen.
function normalizeFieldMappings(value: Json): Record<string, string> {
  if (!Array.isArray(value)) return {};

  const result: Record<string, string> = {};
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;

    const portalAiField = (entry as { portal_ai_field?: unknown }).portal_ai_field;
    const institutionField = (entry as { institution_field?: unknown }).institution_field;

    if (typeof portalAiField === "string" && typeof institutionField === "string") {
      result[institutionField] = portalAiField;
    }
  }
  return result;
}