"use client";

import { CartProvider } from "@/app/components/cart/cart-provider";

export function CartRoot({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
