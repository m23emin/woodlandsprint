import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Custom Order Policy | Woodlands Print",
  description: "Policies for custom DTF transfers and printed apparel orders at Woodlands Print.",
};

export default function CustomOrderPolicyPage() {
  return (
    <ContentPage
      title="Custom Order Policy"
      description="Custom printing is made to your specifications. Please review before ordering."
    >
      <h2>Custom-made products</h2>
      <p>
        All DTF transfers and custom printed apparel are produced to your approved artwork and order details.
        Because these items are made specifically for you, they are not eligible for return or refund once
        production has started with your approved file.
      </p>

      <h2>Customer-approved artwork</h2>
      <p>
        By submitting an order or approving a proof, you confirm that your artwork, size, placement, and
        quantity are correct. Issues resulting from customer-supplied files — including low resolution, wrong
        dimensions, incorrect colors, mirrored designs, or unwanted backgrounds — are the customer&apos;s
        responsibility.
      </p>

      <h2>Our review process</h2>
      <p>
        If we identify a clear problem with your file before printing, we will reach out. We do not guarantee
        redesign or correction of every file unless an artwork fix service has been agreed upon in writing.
      </p>

      <h2>Order changes</h2>
      <p>
        Changes to artwork, quantity, or shipping may not be possible after production begins. Contact us as
        soon as possible if you need to update an order.
      </p>

      <h2>Reprints</h2>
      <p>
        If we make a production error, we will evaluate a reprint at no charge. See our{" "}
        <a href="/refund-policy">Refund Policy</a> for details.
      </p>
    </ContentPage>
  );
}
