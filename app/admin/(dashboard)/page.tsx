import type { Metadata } from "next";
import { AdminShell, QuoteTable, StatsGrid } from "@/app/components/admin/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { listQuotes } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Admin | Woodlands Print",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const quotes = (await listQuotes()) ?? [];
  const supabaseReady = isSupabaseConfigured();

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Quote requests</h1>
        <p className="mt-2 text-sm text-muted">Track leads, update production status, and download artwork.</p>
      </div>

      {!supabaseReady && (
        <div className="mb-6 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
          Supabase is not configured yet. Add <code className="font-mono">SUPABASE_URL</code> and{" "}
          <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to save quotes in the admin panel. Email
          quotes still work without it.
        </div>
      )}

      <StatsGrid quotes={quotes} />
      <QuoteTable quotes={quotes} />
    </AdminShell>
  );
}
