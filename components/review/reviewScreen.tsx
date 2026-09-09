"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { proposeMapping, saveFieldMappings } from "@/lib/actions/mapping";
import type { DiscoveredField } from "@/lib/types/mapping";
import type { SchemaMappingStatus } from "@/lib/types/queue";
import StatusBadge from "./statusBadge";
import MappingTable from "./mappingTable";
import CanonicalVocabularyRail from "./canonicalVocabularyRail";

interface ReviewScreenProps {
  userId: string;
  institutionName: string;
  discoveredFields: DiscoveredField[];
  initialMappings: Record<string, string>;
  initialStatus: SchemaMappingStatus;
  canonicalVocabulary: string[];
}

export default function ReviewScreen({
  userId,
  institutionName,
  discoveredFields,
  initialMappings,
  initialStatus,
  canonicalVocabulary,
}: ReviewScreenProps) {
  const [mappings, setMappings] = useState(initialMappings);
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);
  const [isMatching, startMatch] = useTransition();
  const [isSaving, startSave] = useTransition();

  function handleFieldChange(field: string, value: string) {
    setMappings((prev) => ({ ...prev, [field]: value }));
  }

  function handleMatch() {
    setError(null);
    startMatch(async () => {
      try {
        const result = await proposeMapping(discoveredFields);
        setMappings(result.mappings);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Match failed. Try again.");
      }
    });
  }

  function handleSave() {
    setError(null);
    startSave(async () => {
      try {
        await saveFieldMappings(userId, mappings);
        setStatus("Complete");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed. Try again.");
      }
    });
  }

  const busy = isMatching || isSaving;

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border bg-[#212121] px-3 py-3 sm:px-4 lg:px-5 lg:py-4">
        <Link
          href="/queue"
          className="mb-3 inline-flex items-center gap-2 rounded-lg border border-border bg-[#2a2a2a] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-text-soft transition-colors hover:border-border-strong hover:text-text sm:text-[10px]"
        >
          <span aria-hidden="true">←</span>
          Back to queue
        </Link>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-[10px]">
              Institution Record
            </p>
            <h1 className="truncate text-[20px] font-medium text-text sm:text-[22px] xl:text-[24px]">
              {institutionName}
            </h1>
            <p className="truncate font-mono text-[11px] text-text-muted sm:text-[12px]">{userId}</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <StatusBadge status={status} />
            <button
              type="button"
              onClick={handleMatch}
              disabled={busy || discoveredFields.length === 0}
              className="h-9 rounded-lg border border-border bg-[#2a2a2a] px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-text-soft transition-colors hover:border-border-strong hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isMatching ? "Matching…" : "Match"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className="h-9 rounded-lg bg-[#5f72ff] px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#536ae6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSaving ? "Saving" : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[11px] text-red-200 sm:text-[12px]">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-hidden px-3 py-3 sm:px-4 lg:flex-row lg:gap-5 lg:px-5 lg:py-5">
        <div className="min-h-0 flex-1 overflow-auto">
          <MappingTable
            discoveredFields={discoveredFields}
            mappings={mappings}
            canonicalVocabulary={canonicalVocabulary}
            onChange={handleFieldChange}
            disabled={busy}
          />
        </div>

        <CanonicalVocabularyRail fields={canonicalVocabulary} />
      </div>
    </div>
  );
}
