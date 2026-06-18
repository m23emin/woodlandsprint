"use client";

import Link from "next/link";
import { useCart } from "@/app/components/cart/cart-provider";

export function CartButton({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { count } = useCart();
  const isDark = variant === "dark";

  return (
    <Link
      href="/cart"
      aria-label={`Cart${count ? `, ${count} items` : ""}`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
        isDark
          ? "border-white/15 text-white hover:bg-white/10"
          : "border-border text-foreground hover:bg-border/50"
      }`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
