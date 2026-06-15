import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Refund & Reprint Policy | Woodlands Print",
  description: "Refund and reprint policy for custom DTF and apparel orders at Woodlands Print.",
};

export default function RefundPolicyPage() {
  return (
    <ContentPage title="Refund Policy" description="How we handle refunds, reprints, and order issues.">
      <h2>Custom orders</h2>
      <p>
        Custom DTF transfers and printed apparel are made to order. Once your approved artwork has been
        printed, orders are generally not eligible for refund except in cases of our production error.
      </p>

      <h2>Production errors</h2>
      <p>
        If we print the wrong design, wrong quantity, or a clearly defective product due to our process, contact
        us within 7 days of delivery or pickup with photos. We will review and, when appropriate, offer a
        reprint or refund for the affected items.
      </p>

      <h2>Customer file issues</h2>
      <p>
        Prints made from customer-supplied files that were approved as submitted — including low resolution,
        color variation, sizing, or background issues — are not eligible for refund. See{" "}
        <a href="/artwork-requirements">Artwork Requirements</a>.
      </p>

      <h2>Shipping damage</h2>
      <p>
        Report shipping damage within 48 hours with photos of the package and product. We will work with you on
        a replacement or resolution per our <a href="/shipping-policy">Shipping Policy</a>.
      </p>

      <h2>How to request help</h2>
      <p>
        Email or call with your order number, description of the issue, and clear photos. We aim to respond
        within one business day.
      </p>
    </ContentPage>
  );
}
