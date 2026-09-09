import type { SchemaMappingStatus } from "@/lib/types/queue";

export default function StatusBadge({ status }: { status: SchemaMappingStatus }) {
  const isPending = status === "Pending";

  return (
    <span
      className="inline-flex h-7 shrink-0 items-center justify-center rounded-full border px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
      style={{
        backgroundColor: isPending ? "rgba(167, 217, 255, 0.14)" : "rgba(42, 168, 108, 0.14)",
        borderColor: isPending ? "rgba(167, 217, 255, 0.28)" : "rgba(42, 168, 108, 0.28)",
        color: isPending ? "#dbeafe" : "#d7f7e8",
      }}
    >
      {status}
    </span>
  );
}
