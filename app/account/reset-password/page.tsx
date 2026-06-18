import type { Metadata } from "next";
import { AccountShell } from "@/app/components/account/account-shell";
import { ResetPasswordForm } from "@/app/components/account/reset-password-form";

export const metadata: Metadata = {
  title: "Set New Password | Woodlands Print",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AccountShell title="Choose a new password" subtitle="Enter your new password below.">
      <ResetPasswordForm />
    </AccountShell>
  );
}
