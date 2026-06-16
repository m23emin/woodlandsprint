import type { QuoteStatus } from "@/lib/quote-status";
import { getStatusMeta } from "@/lib/quote-status";

export function StatusBadge({ status }: { status: QuoteStatus }) {
  const meta = getStatusMeta(status);
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.color}`}>
      {meta.label}
    </span>
  );
}
