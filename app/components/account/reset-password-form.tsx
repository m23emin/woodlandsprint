"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { updatePasswordAction } from "@/app/actions/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePasswordAction, null);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function verifySession() {
      // Hash tokens from some Supabase email links (implicit flow)
      if (window.location.hash.includes("access_token")) {
        await supabase.auth.getSession();
        window.history.replaceState(null, "", window.location.pathname);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSessionReady(Boolean(session));
      setChecking(false);
    }

    void verifySession();
  }, []);

  if (checking) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-muted">Verifying your reset link…</p>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-foreground">Reset link expired</p>
        <p className="mt-2 text-sm text-muted">
          Open the link from your email directly, or request a new one below.
        </p>
        <Link
          href="/account/forgot-password"
          className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
        >
          Request new reset link →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <form action={formAction} className="space-y-4">
        <AccountField label="New password" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
            placeholder="At least 8 characters"
          />
        </AccountField>

        <AccountField label="Confirm password" htmlFor="confirmPassword" required>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
          />
        </AccountField>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-70"
        >
          {pending ? "Saving..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
