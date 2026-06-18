import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountShell } from "@/app/components/account/account-shell";
import { SignInForm } from "@/app/components/account/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In | Woodlands Print",
  robots: { index: false, follow: false },
};

export default function AccountLoginPage() {
  return (
    <AccountShell title="Sign in" subtitle="Access your quotes and saved profile details.">
      <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-surface" />}>
        <SignInForm />
      </Suspense>
    </AccountShell>
  );
}
