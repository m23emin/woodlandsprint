"use client";

import { signOutAction } from "@/app/actions/account";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition hover:border-brand/30 hover:text-foreground"
      >
        Sign out
      </button>
    </form>
  );
}
