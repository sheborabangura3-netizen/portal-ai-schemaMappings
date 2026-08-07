export type SchemaMappingStatus = "Pending" | "Complete";

export interface QueueEntry {
  userId: string;
  institutionName: string;
  /** discovered_at, falling back to created_at if ever null */
  discoveredAt: string;
  status: SchemaMappingStatus;
}
