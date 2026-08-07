import type { SchemaMappingStatus } from "./queue";

export interface InstitutionMappingRecord {
  userId: string;
  institutionName: string;
  /** Flat dot-path strings, e.g. "students.student_id" — from discovered_schema. */
  discoveredFields: string[];
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
