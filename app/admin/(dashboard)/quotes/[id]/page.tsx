import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdminShell } from "@/app/components/admin/admin-shell";
import { QuoteEditor } from "@/app/components/admin/quote-editor";
import { getDesignSignedUrl, getQuoteById } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Quote Detail | Woodlands Print Admin",
  robots: { index: false, follow: false },
};

export default async function AdminQuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) notFound();

  const designUrl = quote.design_path ? await getDesignSignedUrl(quote.design_path) : null;

  return (
    <AdminShell>
      <Link href="/admin" className="mb-6 inline-flex text-sm font-medium text-brand hover:underline">
        ← Back to quotes
      </Link>
      <QuoteEditor quote={quote} designUrl={designUrl} />
    </AdminShell>
  );
}
