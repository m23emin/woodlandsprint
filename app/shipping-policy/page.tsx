import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Shipping & Pickup Policy | Woodlands Print",
  description: "Shipping, local pickup, and delivery options for Woodlands Print customers.",
};

export default function ShippingPolicyPage() {
  return (
    <ContentPage
      title="Shipping Policy"
      description="Local pickup, delivery, and shipping options for North Houston customers."
    >
      <h2>Local pickup</h2>
      <p>
        Local pickup is available for customers in The Woodlands, Spring, Conroe, and surrounding areas. Pickup
        details and instructions will be provided when your order is ready.
      </p>

      <h2>Shipping</h2>
      <p>
        We ship via USPS and other carriers with tracking when available. Shipping cost and estimated delivery
        will be quoted before you pay. Production time is separate from transit time.
      </p>

      <h2>Turnaround &amp; delivery estimates</h2>
      <p>
        We only commit to ship-by or ready-by dates we can reasonably meet. If a delay occurs, we will notify
        you promptly. See <a href="/turnaround-time">Turnaround Time</a> for production estimates.
      </p>

      <h2>Address accuracy</h2>
      <p>
        You are responsible for providing a correct shipping address. Fees to reship due to incorrect addresses
        may apply.
      </p>

      <h2>Lost or damaged packages</h2>
      <p>
        Contact us within 48 hours if your package arrives damaged or does not arrive within the carrier&apos;s
        expected window. We will help file a claim or arrange a replacement when appropriate.
      </p>
    </ContentPage>
  );
}
