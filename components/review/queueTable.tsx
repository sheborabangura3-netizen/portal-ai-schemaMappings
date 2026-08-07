import Link from "next/link";
import type { QueueEntry } from "@/lib/types/queue";
import { formatDiscoveredAt } from "@/lib/utils/formatDate";
import StatusBadge from "./statusBadge";

export default function QueueTable({ entries }: { entries: QueueEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="pt-8 text-center font-heading text-[15px] text-white/40">
        No institutions are awaiting review right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <Link
          key={entry.userId}
          href={`/queue/${entry.userId}`}
          className="flex h-[68px] w-full items-center rounded-[10px] bg-[#161b22] px-5 text-left transition-opacity hover:opacity-80 active:opacity-60"
        >
          <span className="flex-1 truncate pr-4 font-heading text-[16px] font-bold text-white">
            {entry.userId}
          </span>
          <span className="w-[200px] truncate pr-4 font-heading text-[16px] font-bold text-white">
            {entry.institutionName}
          </span>
          <span className="w-[210px] pr-4 font-heading text-[15px] font-bold text-white">
            {formatDiscoveredAt(entry.discoveredAt)}
          </span>
          <StatusBadge status={entry.status} />
        </Link>
      ))}
    </div>
  );
}
