import type { Metadata } from "next";
import { CartView } from "@/app/components/cart/cart-view";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { FadeIn } from "@/app/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Cart | Woodlands Print",
  description: "Review items in your cart and request a quote for DTF gang sheets, blanks, and custom printing.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">Your order</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-foreground">Cart</h1>
            <p className="mt-2 text-muted">Add items from the catalog or gang sheet builder, then request one combined quote.</p>
          </FadeIn>
          <div className="mt-8">
            <CartView />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
