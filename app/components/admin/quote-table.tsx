"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "./status-badge";
import type { QuoteRecord } from "@/lib/quote-status";
import { quoteStatusOptions } from "@/lib/quote-status";

export function QuoteTable({ quotes }: { quotes: QuoteRecord[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return quotes.filter((quote) => {
      if (statusFilter !== "all" && quote.status !== statusFilter) return false;
      if (!q) return true;
      return (
        quote.name.toLowerCase().includes(q) ||
        quote.email.toLowerCase().includes(q) ||
        (quote.service ?? "").toLowerCase().includes(q) ||
        (quote.phone ?? "").includes(q)
      );
    });
  }, [quotes, query, statusFilter]);

  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="font-medium text-foreground">No quote requests yet</p>
        <p className="mt-2 text-sm text-muted">New form submissions will appear here when Supabase is connected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, service..."
          className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="all">All statuses</option>
          {quoteStatusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-background text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Qty</th>
                <th className="px-4 py-3 font-semibold">Quote</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No quotes match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((quote) => (
                  <tr key={quote.id} className="transition hover:bg-background/60">
                    <td className="px-4 py-3">
                      <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-foreground hover:text-brand">
                        {quote.name}
                      </Link>
                      <p className="text-xs text-muted">{quote.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{quote.service || "—"}</td>
                    <td className="px-4 py-3 text-muted">{quote.quantity || "—"}</td>
                    <td className="px-4 py-3 text-muted">
                      {quote.quoted_amount != null ? `$${Number(quote.quoted_amount).toFixed(2)}` : "—"}
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
