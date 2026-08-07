"use client";

interface MappingTableProps {
  discoveredFields: string[];
  mappings: Record<string, string>;
  canonicalVocabulary: string[];
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

/**
 * Plain text inputs, but backed by a <datalist> against the canonical
 * vocabulary — native autocomplete, no extra dependency, and it still lets
 * a reviewer type a value the API didn't propose and the vocabulary
 * doesn't have yet (the doc's "canonical vocabulary is allowed to grow"
 * case), rather than locking them into a closed dropdown.
 */
export default function MappingTable({
  discoveredFields,
  mappings,
  canonicalVocabulary,
  onChange,
  disabled,
}: MappingTableProps) {
  if (discoveredFields.length === 0) {
    return (
      <p className="pt-8 text-center font-heading text-[15px] text-white/40">
        No discovered fields on this institution's record.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#353030]">
      <datalist id="canonical-vocabulary-options">
        {canonicalVocabulary.map((field) => (
          <option key={field} value={field} />
        ))}
      </datalist>

      <div className="flex bg-[#161b22] px-5 py-3">
        <span className="flex-1 font-heading text-[13px] font-medium uppercase tracking-wider text-white/50">
          Institution Field
        </span>
        <span className="flex-1 font-heading text-[13px] font-medium uppercase tracking-wider text-white/50">
          Canonical Field
        </span>
      </div>

      <div className="divide-y divide-[#353030]">
        {discoveredFields.map((field) => {
          const value = mappings[field] ?? "";
          const isUnmapped = value.trim().length === 0;

          return (
            <div
              key={field}
              className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-[#161b22]/50"
            >
              <span className="flex-1 truncate font-mono text-[14px] text-white/85">
                {field}
              </span>
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  list="canonical-vocabulary-options"
                  value={value}
                  disabled={disabled}
                  onChange={(e) => onChange(field, e.target.value)}
                  placeholder="Unmatched — enter manually"
                  className="h-10 w-full rounded-[8px] border px-3 font-mono text-[14px] text-white outline-none transition-colors focus:border-[var(--pai-blue)] disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--pai-input-bg)",
                    borderColor: isUnmapped ? "var(--pai-pending-bg)" : "var(--pai-border)",
                  }}
                />
                {isUnmapped && (
                  <span
                    title="No canonical match — needs a manual entry"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--pai-pending-bg)" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
