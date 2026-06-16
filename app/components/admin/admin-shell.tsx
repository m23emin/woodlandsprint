"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusBadge } from "./status-badge";
import type { QuoteRecord } from "@/lib/quote-status";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-lg font-bold text-brand">
              Woodlands Admin
            </Link>
            <Link href="/" className="text-sm text-muted hover:text-foreground">
              View site
            </Link>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:text-foreground"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export function QuoteTable({ quotes }: { quotes: QuoteRecord[] }) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="font-medium text-foreground">No quote requests yet</p>
        <p className="mt-2 text-sm text-muted">New form submissions will appear here when Supabase is connected.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-background text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Qty</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {quotes.map((quote) => (
              <tr key={quote.id} className="transition hover:bg-background/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-foreground hover:text-brand">
                    {quote.name}
                  </Link>
                  <p className="text-xs text-muted">{quote.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">{quote.service || "—"}</td>
                <td className="px-4 py-3 text-muted">{quote.quantity || "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={quote.status} />
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(quote.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatsGrid({ quotes }: { quotes: QuoteRecord[] }) {
  const newCount = quotes.filter((q) => q.status === "new").length;
  const activeCount = quotes.filter((q) => !["completed", "declined"].includes(q.status)).length;
  const productionCount = quotes.filter((q) => ["production", "ready"].includes(q.status)).length;

  const items = [
    { label: "Total quotes", value: quotes.length },
    { label: "New", value: newCount },
    { label: "Active", value: activeCount },
    { label: "In production / ready", value: productionCount },
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{item.label}</p>
          <p className="font-display mt-1 text-3xl font-bold text-brand">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
