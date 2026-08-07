import type { SchemaMappingStatus } from "@/lib/types/queue";

export default function StatusBadge({ status }: { status: SchemaMappingStatus }) {
  const isPending = status === "Pending";

  return (
    <span
      className="inline-flex h-[38px] shrink-0 items-center justify-center rounded-[15px] px-4 font-heading text-[15px] font-bold leading-none"
      style={{
        backgroundColor: isPending ? "var(--pai-pending-bg)" : "var(--pai-complete-bg)",
        color: isPending ? "var(--pai-pending-text)" : "var(--pai-complete-text)",
      }}
    >
      {status}
    </span>
  );
}
