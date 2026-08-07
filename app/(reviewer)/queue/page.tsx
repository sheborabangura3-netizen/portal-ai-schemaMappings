import { getQueueEntries } from "@/lib/actions/queue";
import QueueTable from "@/components/review/queueTable";

export default async function QueuePage() {
  const entries = await getQueueEntries();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 px-8 pb-4 pt-6">
        <h1 className="font-heading text-[24px] font-medium tracking-widest text-white/90">
          SCHEMA MAPPINGS QUEUE
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <QueueTable entries={entries} />
      </div>
    </div>
  );
}
