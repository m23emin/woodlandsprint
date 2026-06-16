"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Wrong password. Try again.");
        setLoading(false);
        return;
      }

      router.replace(next);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Admin password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Enter admin password"
        />
      </label>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
