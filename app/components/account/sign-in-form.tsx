"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { signInAction } from "@/app/actions/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";
import { isSupabaseAuthConfigured } from "@/lib/supabase/env";

export function SignInForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const registered = searchParams.get("registered") === "1";
  const [state, formAction, pending] = useActionState(signInAction, null);

  if (!isSupabaseAuthConfigured()) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
        <p className="text-sm text-muted">Customer accounts are not configured yet. You can still request a quote without signing in.</p>
        <Link href="/#quote" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
          Get a quote →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      {registered && (
        <p className="mb-4 rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand">
          Account created. Check your email to confirm, then sign in.
        </p>
      )}

      {searchParams.get("error") === "confirmation" && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          Email confirmation link expired or invalid. Try signing in, or register again.
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <AccountField label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
        </AccountField>

        <AccountField label="Password" htmlFor="password" required>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
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
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/account/register" className="font-semibold text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
