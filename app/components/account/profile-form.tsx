"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/actions/account";
import type { CustomerProfile } from "@/lib/account";
import { AccountField, inputClass } from "@/app/components/account/account-shell";

export function ProfileForm({ profile }: { profile: CustomerProfile }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Profile</h2>
      <p className="mt-1 text-sm text-muted">Saved details pre-fill your quote requests.</p>

      <form action={formAction} className="mt-5 space-y-4">
        <AccountField label="Full name" htmlFor="fullName" required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={profile.full_name}
            required
            className={inputClass}
          />
        </AccountField>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
          <p className="rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-muted">{profile.email}</p>
        </div>

        <AccountField label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" defaultValue={profile.phone ?? ""} className={inputClass} />
        </AccountField>

        <AccountField label="Business name" htmlFor="businessName">
          <input
            id="businessName"
            name="businessName"
            type="text"
            defaultValue={profile.business_name ?? ""}
            className={inputClass}
          />
        </AccountField>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}

        {state?.ok && (
          <p className="rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand">Profile saved.</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-70"
        >
          {pending ? "Saving..." : "Save profile"}
        </button>
      </form>
    </div>
  );
}
