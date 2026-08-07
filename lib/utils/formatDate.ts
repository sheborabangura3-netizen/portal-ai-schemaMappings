/** Formats an ISO timestamp as "19/02/2026 3:02 GMT" for queue/review timestamps. */
export function formatDiscoveredAt(iso: string): string {
  const date = new Date(iso);

  const datePart = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(date);

  return `${datePart} ${timePart} GMT`;
}
