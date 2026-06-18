"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isBrowserAuthConfigured } from "@/lib/supabase/client";

type MeResponse =
  | { authenticated: false }
  | {
      authenticated: true;
      profile: {
        fullName: string;
        phone: string | null;
        businessName: string | null;
        email: string;
      };
    };

export function AccountLink({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [me, setMe] = useState<MeResponse | null>(null);
  const isDark = variant === "dark";

  useEffect(() => {
    if (!isBrowserAuthConfigured()) return;

    fetch("/api/account/me")
      .then((res) => res.json())
      .then((data: MeResponse) => setMe(data))
      .catch(() => setMe({ authenticated: false }));
  }, []);

  if (!isBrowserAuthConfigured()) return null;
  if (me === null) return null;

  const className = `hidden text-sm font-medium transition sm:inline-flex ${
    isDark ? "text-white/75 hover:text-white" : "text-muted hover:text-foreground"
  }`;

  if (me.authenticated) {
    return (
      <Link href="/account" className={className}>
        Account
      </Link>
    );
  }

  return (
    <Link href="/account/login" className={className}>
      Sign in
    </Link>
  );
}

export function useAccountProfile() {
  const [profile, setProfile] = useState<Extract<MeResponse, { authenticated: true }>["profile"] | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isBrowserAuthConfigured()) {
      setLoaded(true);
      return;
    }

    fetch("/api/account/me")
      .then((res) => res.json())
      .then((data: MeResponse) => {
        if (data.authenticated) setProfile(data.profile);
      })
      .finally(() => setLoaded(true));
  }, []);

  return { profile, loaded };
}
