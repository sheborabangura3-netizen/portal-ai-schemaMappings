"use client";

import { useMemo, useState } from "react";

export default function CanonicalVocabularyRail({ fields }: { fields: string[] }) {
  const [query, setQuery] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fields;
    return fields.filter((field) => field.toLowerCase().includes(q));
  }, [fields, query]);

  async function handleCopy(field: string) {
    try {
      await navigator.clipboard.writeText(field);
      setCopiedField(field);
      setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1200);
    } catch {
      // Clipboard access can be denied by the browser — silently ignore,
      // the field is still visible to copy by hand.
    }
  }

  return (
    <aside className="flex w-[300px] shrink-0 flex-col rounded-[12px] border border-[#353030] bg-[#161b22]">
      <div className="border-b border-[#353030] p-4">
        <h2 className="mb-3 font-heading text-[15px] font-medium text-white/85">
          Canonical Fields
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vocabulary…"
          className="h-9 w-full rounded-[8px] border px-3 font-heading text-[13px] text-white outline-none transition-colors focus:border-[var(--pai-blue)]"
          style={{ backgroundColor: "var(--pai-input-bg)", borderColor: "var(--pai-border)" }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-4 text-center font-heading text-[13px] text-white/40">
            {fields.length === 0 ? "No canonical fields yet." : "No matches."}
          </p>
        ) : (
          filtered.map((field) => (
            <button
              key={field}
              type="button"
              onClick={() => handleCopy(field)}
              className="flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-[#0b0e14]"
            >
              <span className="truncate font-mono text-[13px] text-white/80">{field}</span>
              <span className="shrink-0 font-heading text-[11px] font-medium text-white/40">
                {copiedField === field ? "Copied" : "Copy"}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
