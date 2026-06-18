"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
