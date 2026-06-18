import { Suspense } from "react";
import { AuthConfirmClient } from "./auth-confirm-client";

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-sm text-muted">Signing you in…</p>
        </div>
      }
    >
      <AuthConfirmClient />
    </Suspense>
  );
}
