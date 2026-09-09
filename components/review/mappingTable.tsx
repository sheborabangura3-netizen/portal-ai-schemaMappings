"use client";

import type { DiscoveredField } from "@/lib/types/mapping";

interface MappingTableProps {
  discoveredFields: DiscoveredField[];
  mappings: Record<string, string>;
  canonicalVocabulary: string[];
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
}

export default function MappingTable({
  discoveredFields,
  mappings,
  canonicalVocabulary,
  onChange,
  disabled,
}: MappingTableProps) {
  if (discoveredFields.length === 0) {
    return (
      <p className="pt-8 text-center text-[14px] text-text-muted">
        No discovered fields on this institution's record.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#2a2a2a] shadow-[var(--shadow-card)]">
      <datalist id="canonical-vocabulary-options">
        {canonicalVocabulary.map((field) => (
          <option key={field} value={field} />
        ))}
      </datalist>

      <div className="min-w-[620px]">
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 border-b border-border bg-[#2f2f2f] px-4 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Institution Field
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Canonical Field
          </span>
        </div>

        <div className="divide-y divide-border">
          {discoveredFields.map(({ path, fieldKind }) => {
            const value = mappings[path] ?? "";
            const isUnmapped = value.trim().length === 0;

            return (
              <div
                key={path}
                className="grid grid-cols-[1.2fr_1fr] items-center gap-4 px-4 py-3 transition-colors hover:bg-[#313131]"
              >
                <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                  <span className="truncate font-mono text-[11px] text-text sm:text-[12px]">{path}</span>
                  {fieldKind === "array" && (
                    <span
                      title="Repeating group — can be mapped to a count-like canonical field"
                      className="shrink-0 rounded-full border border-[#8ca3ff]/40 bg-[#2d3352] px-1.5 py-0.25 text-[7px] font-semibold uppercase tracking-[0.12em] text-[#dfe8ff]"
                    >
                      array
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    list="canonical-vocabulary-options"
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(path, e.target.value)}
                    placeholder="Unmatched — enter manually"
                    className="h-9 w-full rounded-lg border px-2.5 font-mono text-[11px] text-text outline-none transition-colors focus:border-[#758eff] disabled:opacity-50 sm:text-[12px]"
                    style={{
                      backgroundColor: "var(--input)",
                      borderColor: isUnmapped ? "rgba(184, 217, 255, 0.7)" : "rgba(255,255,255,0.12)",
                    }}
                  />
                  {isUnmapped && (
                    <span
                      title="No canonical match — needs a manual entry"
                      className="h-2 w-2 shrink-0 rounded-full bg-[#b8d9ff]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
