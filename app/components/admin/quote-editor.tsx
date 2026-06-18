"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { StatusBadge } from "./status-badge";
import type { QuoteRecord, QuoteStatus } from "@/lib/quote-status";
import { quoteStatusOptions } from "@/lib/quote-status";

export function QuoteEditor({
  quote,
  designUrl,
  extraDesignUrls = [],
}: {
  quote: QuoteRecord;
  designUrl: string | null;
  extraDesignUrls?: { filename: string; url: string }[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<QuoteStatus>(quote.status);
  const [internalNotes, setInternalNotes] = useState(quote.internal_notes ?? "");
  const [quotedAmount, setQuotedAmount] = useState(
    quote.quoted_amount != null ? String(quote.quoted_amount) : "",
  );
  const [quotedMessage, setQuotedMessage] = useState(quote.quoted_message ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const amount = quotedAmount.trim() ? Number(quotedAmount) : null;

    const response = await fetch(`/api/admin/quotes/${quote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        internal_notes: internalNotes,
        quoted_amount: amount,
        quoted_message: quotedMessage || null,
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setMessage("Save failed.");
      return;
    }

    const data = (await response.json()) as { emailSent?: boolean };
    setMessage(data.emailSent ? "Saved. Customer notified by email." : "Saved.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{quote.name}</h1>
          <p className="mt-1 text-sm text-muted">
            Submitted {new Date(quote.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <StatusBadge status={quote.status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Info label="Email" value={quote.email} href={`mailto:${quote.email}`} />
        <Info label="Phone" value={quote.phone} href={`tel:${quote.phone}`} />
        <Info label="Business" value={quote.business_name || "—"} />
        <Info label="Service" value={quote.service || "—"} />
        <Info label="Quantity" value={quote.quantity || "—"} />
        <Info label="Need by" value={quote.need_by || "—"} />
      </div>

      {quote.notes && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Customer notes</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{quote.notes}</p>
        </div>
      )}

      {designUrl && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Design file</p>
          <a
            href={designUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm font-semibold text-brand hover:underline"
          >
            {quote.design_filename || "Download design"} →
          </a>
        </div>
      )}

      {extraDesignUrls.length > 0 && (
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Additional designs</p>
          <ul className="mt-2 space-y-1">
            {extraDesignUrls.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  {item.filename} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Production status</p>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as QuoteStatus)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            {quoteStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Quoted amount ($)</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={quotedAmount}
            onChange={(e) => setQuotedAmount(e.target.value)}
            placeholder="e.g. 149.00"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <p className="mt-1 text-xs text-muted">Visible to customer when status is Quoted.</p>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Message to customer</span>
          <textarea
            value={quotedMessage}
            onChange={(e) => setQuotedMessage(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Pickup details, artwork notes, payment instructions..."
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">Internal notes</span>
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Pricing sent, artwork fix needed, pickup date..."
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          {message && <span className="text-sm text-muted">{message}</span>}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block text-sm font-medium text-brand hover:underline">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}
