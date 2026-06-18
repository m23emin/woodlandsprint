"use client";

import { useActionState } from "react";
import { updatePasswordAction } from "@/app/actions/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePasswordAction, null);

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
