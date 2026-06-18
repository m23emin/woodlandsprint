import Link from "next/link";
import type { Metadata } from "next";
import { getCustomerProfile, getCustomerQuotes } from "@/app/actions/account";
import { AccountDashboardShell } from "@/app/components/account/account-shell";
import { ProfileForm } from "@/app/components/account/profile-form";
import { QuoteList } from "@/app/components/account/quote-list";
import { SignOutButton } from "@/app/components/account/sign-out-button";

export const metadata: Metadata = {
  title: "My Account | Woodlands Print",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const [profile, quotes] = await Promise.all([getCustomerProfile(), getCustomerQuotes()]);

  if (!profile) {
    return null;
  }

  return (
    <AccountDashboardShell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">My Account</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-foreground">
            Welcome back, {profile.full_name.split(" ")[0] || "there"}
          </h1>
          <p className="mt-2 text-sm text-muted">Manage your profile and follow quote requests.</p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <ProfileForm profile={profile} />
        <div className="space-y-4">
          <QuoteList quotes={quotes} />
          <Link
            href="/#quote"
            className="inline-flex text-sm font-semibold text-brand hover:underline"
          >
            Request a new quote →
          </Link>
        </div>
      </div>
    </AccountDashboardShell>
  );
}
