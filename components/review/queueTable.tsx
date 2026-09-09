import Link from "next/link";
import type { QueueEntry } from "@/lib/types/queue";
import { formatDiscoveredAt } from "@/lib/utils/formatDate";
import StatusBadge from "./statusBadge";

export default function QueueTable({ entries }: { entries: QueueEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="pt-8 text-center text-[14px] text-text-muted">
        No institutions are awaiting review right now.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#101d2d] shadow-[var(--shadow-card)]">
      <div className="hidden grid-cols-[1.1fr_1.3fr_1fr_auto] gap-4 border-b border-border bg-[#121f2d] px-4 py-2.5 md:grid">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          User ID
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Institution
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Discovered
        </span>
        <span className="justify-self-end text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Status
        </span>
      </div>

      <div className="divide-y divide-border">
        {entries.map((entry) => (
          <Link
            key={entry.userId}
            href={`/queue/${entry.userId}`}
            className="group flex flex-col gap-2 px-4 py-3 text-left transition-colors hover:bg-[#132132] md:grid md:grid-cols-[1.1fr_1.3fr_1fr_auto] md:items-center md:gap-4 md:px-4 md:py-3"
          >
            <span className="truncate font-mono text-[13px] text-text md:text-[13px]">
              {entry.userId}
            </span>
            <span className="truncate text-[15px] font-medium text-text">
              {entry.institutionName}
            </span>
            <span className="text-[12px] text-text-muted">
              {formatDiscoveredAt(entry.discoveredAt)}
            </span>
            <div className="md:justify-self-end">
              <StatusBadge status={entry.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
