"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { proposeMapping, saveFieldMappings } from "@/lib/actions/mapping";
import type { SchemaMappingStatus } from "@/lib/types/queue";
import StatusBadge from "./statusBadge";
import MappingTable from "./mappingTable";
import CanonicalVocabularyRail from "./canonicalVocabularyRail";

interface ReviewScreenProps {
  userId: string;
  institutionName: string;
  discoveredFields: string[];
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
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-[#353030] px-8 py-5">
        <Link
          href="/queue"
          className="mb-3 inline-flex items-center gap-1 font-heading text-[13px] text-white/50 transition-colors hover:text-white/80"
        >
          ← Back to queue
        </Link>

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate font-heading text-[22px] font-medium text-white/90">
              {institutionName}
            </h1>
            <p className="truncate font-mono text-[13px] text-white/40">{userId}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <StatusBadge status={status} />
            <button
              type="button"
              onClick={handleMatch}
              disabled={busy || discoveredFields.length === 0}
              className="h-10 rounded-[8px] border border-[#353030] px-4 font-heading text-[14px] font-medium text-white/85 transition-colors hover:bg-[#161b22] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isMatching ? "Matching…" : "Match"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className="h-10 rounded-[8px] px-5 font-heading text-[14px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: "var(--pai-blue)" }}
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-[8px] border border-red-500/30 bg-red-500/10 px-3 py-2 font-heading text-[13px] text-red-300">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden px-8 py-6">
        <div className="flex-1 overflow-y-auto">
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
