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
    <aside className="flex w-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-[#2a2a2a] shadow-[var(--shadow-card)] lg:w-[260px]">
      <div className="border-b border-border bg-[#2f2f2f] p-3">
        <h2 className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-[10px]">
          Canonical Fields
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vocabulary…"
          className="h-9 w-full rounded-lg border border-border bg-[#1d1d1d] px-2.5 text-[11px] text-text outline-none transition-colors focus:border-[#758eff] sm:text-[12px]"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-center text-[11px] text-text-muted sm:text-[12px]">
            {fields.length === 0 ? "No canonical fields yet." : "No matches."}
          </p>
        ) : (
          filtered.map((field) => (
            <button
              key={field}
              type="button"
              onClick={() => handleCopy(field)}
              className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[#313131]"
            >
              <span className="truncate font-mono text-[10px] text-text sm:text-[11px]">{field}</span>
              <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-[9px]">
                {copiedField === field ? "Copied" : "Copy"}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
