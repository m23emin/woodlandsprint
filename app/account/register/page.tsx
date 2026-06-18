import type { Metadata } from "next";
import { AccountShell } from "@/app/components/account/account-shell";
import { SignUpForm } from "@/app/components/account/sign-up-form";

export const metadata: Metadata = {
  title: "Create Account | Woodlands Print",
  robots: { index: false, follow: false },
};

export default function AccountRegisterPage() {
  return (
    <AccountShell title="Create account" subtitle="Save your details and track quote requests in one place.">
      <SignUpForm />
    </AccountShell>
  );
}
