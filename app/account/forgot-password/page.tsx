import type { Metadata } from "next";
import { AccountShell } from "@/app/components/account/account-shell";
import { ForgotPasswordForm } from "@/app/components/account/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | Woodlands Print",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AccountShell title="Reset your password" subtitle="Enter your email and we'll send a reset link.">
      <ForgotPasswordForm />
    </AccountShell>
  );
}
