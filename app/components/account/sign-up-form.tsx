"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "@/app/actions/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";
import { isSupabaseAuthConfigured } from "@/lib/supabase/env";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, null);

  if (!isSupabaseAuthConfigured()) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
        <p className="text-sm text-muted">Customer accounts are not configured yet.</p>
        <Link href="/#quote" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
          Get a quote →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <form action={formAction} className="space-y-4">
        <AccountField label="Full name" htmlFor="fullName" required>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required className={inputClass} />
        </AccountField>

        <AccountField label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
        </AccountField>

        <AccountField label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(936) 900-3250" />
        </AccountField>

        <AccountField label="Business name" htmlFor="businessName">
          <input id="businessName" name="businessName" type="text" autoComplete="organization" className={inputClass} />
        </AccountField>

        <AccountField label="Password" htmlFor="password" required>
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

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-hover disabled:opacity-70"
        >
          {pending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/account/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
