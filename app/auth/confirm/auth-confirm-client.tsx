"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next")?.startsWith("/") ? searchParams.get("next")! : "/account";
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function finish() {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setFailed(true);
          return;
        }
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        router.replace(next);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace(next);
        return;
      }

      setFailed(true);
    }

    void finish();
  }, [next, router]);

  if (failed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <p className="text-lg font-semibold text-foreground">Link expired or invalid</p>
        <p className="mt-2 max-w-md text-sm text-muted">
          Request a new password reset link and open it within an hour.
        </p>
        <Link href="/account/forgot-password" className="mt-6 text-sm font-semibold text-brand hover:underline">
          Request new link →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted">Signing you in…</p>
    </div>
  );
}
