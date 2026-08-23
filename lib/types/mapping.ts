import type { SchemaMappingStatus } from "./queue";

export type DiscoveredField = {
  path: string;
  fieldKind: "scalar" | "array";
};

export interface InstitutionMappingRecord {
  userId: string;
  institutionName: string;
  /** Discovered field entries from discovered_schema — includes fieldKind for array badge display. */
  discoveredFields: DiscoveredField[];
  /** Existing field_mappings, if this institution was already Completed before. */
  existingMappings: Record<string, string>;
  status: SchemaMappingStatus;
}

export interface ProposeMappingResult {
  /** institutionField -> canonical, ready to drop straight into component state. */
  mappings: Record<string, string>;
  unmappedInstitutionPaths: string[];
  unmappedCanonicalFields: string[];
}
