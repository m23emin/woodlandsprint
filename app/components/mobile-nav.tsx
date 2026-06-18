"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-config";
import { isBrowserAuthConfigured } from "@/lib/supabase/client";
import { useCart } from "@/app/components/cart/cart-provider";

export function MobileNav({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const { count: cartCount } = useCart();
  const isDark = variant === "dark";

  useEffect(() => {
    if (!isBrowserAuthConfigured()) return;
    fetch("/api/account/me")
      .then((res) => res.json())
      .then((data) => setSignedIn(Boolean(data.authenticated)))
      .catch(() => setSignedIn(false));
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
          isDark
            ? "border-white/15 text-white hover:bg-white/10"
            : "border-border text-foreground hover:bg-border/50"
        }`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col border-l border-border bg-surface shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-display text-lg font-semibold text-foreground">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-border/50 hover:text-foreground"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition hover:bg-brand/10 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
                {isBrowserAuthConfigured() && (
                  <Link
                    href={signedIn ? "/account" : "/account/login"}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition hover:bg-brand/10 hover:text-brand"
                  >
                    {signedIn ? "My Account" : "Sign in"}
                  </Link>
                )}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition hover:bg-brand/10 hover:text-brand"
                >
                  Cart{cartCount > 0 ? ` (${cartCount})` : ""}
                </Link>
              </div>
              <div className="border-t border-border p-4">
                <Link
                  href="/#quote"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
