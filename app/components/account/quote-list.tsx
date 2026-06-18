import Link from "next/link";
import { StatusBadge } from "@/app/components/admin/status-badge";
import type { CustomerQuote } from "@/lib/account";

export function QuoteList({ quotes }: { quotes: CustomerQuote[] }) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">No quote requests yet.</p>
        <Link href="/#quote" className="mt-3 inline-flex text-sm font-semibold text-brand hover:underline">
          Request your first quote →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-lg font-semibold text-foreground">Your quotes</h2>
        <p className="text-sm text-muted">Track status and view details for each request.</p>
      </div>
      <ul className="divide-y divide-border">
        {quotes.map((quote) => (
          <li key={quote.id}>
            <Link
              href={`/account/quotes/${quote.id}`}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-brand/5"
            >
              <div>
                <p className="font-medium text-foreground">{quote.service || "Quote request"}</p>
                <p className="text-sm text-muted">
                  {new Date(quote.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {quote.quantity ? ` · ${quote.quantity}` : ""}
                </p>
              </div>
              <StatusBadge status={quote.status} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
