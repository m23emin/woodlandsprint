"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/app/actions/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, null);

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-8">
        <p className="text-lg font-semibold text-foreground">Check your email</p>
        <p className="mt-2 text-sm text-muted">
          If an account exists for that address, we sent a password reset link. Check your spam folder too.
        </p>
        <p className="mt-3 text-xs text-muted">
          Didn&apos;t get it? Wait an hour before requesting again — too many attempts triggers a temporary email limit.
        </p>
        <Link href="/account/login" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <form action={formAction} className="space-y-4">
        <AccountField label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
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
          {pending ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/account/login" className="font-semibold text-brand hover:underline">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}
