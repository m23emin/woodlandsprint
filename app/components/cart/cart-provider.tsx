"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { removeCartAttachment } from "@/lib/cart-attachments";
import {
  CART_UPDATED_EVENT,
  getCartCount,
  loadCart,
  saveCart,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = useCallback(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(CART_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const persist = useCallback((next: CartItem[]) => {
    saveCart(next);
    setItems(next);
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      persist([...loadCart(), item]);
    },
    [persist],
  );

  const removeItem = useCallback(
    (id: string) => {
      const next = loadCart().filter((item) => item.id !== id);
      removeCartAttachment(id);
      persist(next);
    },
    [persist],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const q = Math.max(1, quantity);
      const next = loadCart().map((item) => {
        if (item.id !== id) return item;
        if (item.totalPrice != null && item.unitPrice != null) {
          return { ...item, quantity: q, totalPrice: Math.round(item.unitPrice * q * 100) / 100 };
        }
        return { ...item, quantity: q };
      });
      persist(next);
    },
    [persist],
  );

  const clearCart = useCallback(() => {
    for (const item of loadCart()) {
      if (item.attachmentId) removeCartAttachment(item.attachmentId);
    }
    persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({
      items,
      count: getCartCount(items),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
