import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCustomerQuote } from "@/app/actions/account";
import { AccountDashboardShell } from "@/app/components/account/account-shell";
import { StatusBadge } from "@/app/components/admin/status-badge";
import { getDesignSignedUrl } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Quote Detail | Woodlands Print",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CustomerQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await getCustomerQuote(id);

  if (!quote) notFound();

  const designUrl =
    quote.design_path && typeof quote.design_path === "string"
      ? await getDesignSignedUrl(quote.design_path)
      : null;

  const rows = [
    ["Service", quote.service],
    ["Quantity", quote.quantity],
    ["Need by", quote.need_by],
    ["Business", quote.business_name],
    ["Notes", quote.notes],
  ].filter(([, value]) => value);

  return (
    <AccountDashboardShell>
      <Link href="/account" className="mb-6 inline-flex text-sm font-medium text-brand hover:underline">
        ← Back to account
      </Link>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Quote request</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              {quote.service || "Custom printing"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Submitted{" "}
              {new Date(quote.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
          <StatusBadge status={quote.status} />
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-background/50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
              <dd className="mt-1 text-sm text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        {designUrl && quote.design_filename && (
          <div className="mt-6 rounded-xl border border-border bg-background/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Uploaded design</p>
            <a
              href={designUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-sm font-semibold text-brand hover:underline"
            >
              {quote.design_filename} ↗
            </a>
          </div>
        )}

        <p className="mt-8 text-sm text-muted">
          Questions about this quote?{" "}
          <a href="tel:+19369003250" className="font-medium text-brand hover:underline">
            Call us
          </a>{" "}
          or use WhatsApp from any page.
        </p>
      </div>
    </AccountDashboardShell>
  );
}
