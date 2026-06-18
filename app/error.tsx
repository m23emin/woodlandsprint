"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">Something went wrong</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground">We hit a snag</h1>
      <p className="mt-3 max-w-md text-muted">Please try again. If the problem continues, call us or request a quote.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-brand/30"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
