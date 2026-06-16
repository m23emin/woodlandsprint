import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/app/components/admin/admin-login-form";
import { Logo } from "@/app/components/logo";

export const metadata: Metadata = {
  title: "Admin Login | Woodlands Print",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-lg">
        <Logo variant="full" href="/" className="h-10" />
        <h1 className="font-display mt-6 text-2xl font-bold text-foreground">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted">Manage quote requests and production status.</p>
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
