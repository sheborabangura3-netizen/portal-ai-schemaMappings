import { getQueueEntries } from "@/lib/actions/queue";
import QueueTable from "@/components/review/queueTable";

export default async function QueuePage() {
  const entries = await getQueueEntries();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 px-3 pb-3 pt-4 sm:px-4 lg:px-5 lg:pb-4 lg:pt-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:text-[10px]">
          Review queue
        </p>
        <h1 className="mt-2 text-[22px] font-medium text-text sm:text-[24px] lg:text-[28px]">
          Schema Mappings
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 sm:px-4 lg:px-5 lg:pb-5">
        <QueueTable entries={entries} />
      </div>
    </div>
  );
}
