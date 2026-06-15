import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Terms of Service | Woodlands Print",
  description: "Terms of service for using Woodlands Print website and ordering services.",
};

export default function TermsOfServicePage() {
  return (
    <ContentPage title="Terms of Service" description="Last updated: June 2026">
      <h2>Services</h2>
      <p>
        Woodlands Print provides DTF transfer printing, custom apparel, and related services. Quotes are
        estimates until confirmed in writing with pricing, timeline, and order details.
      </p>

      <h2>Customer content</h2>
      <p>
        You represent that you have the right to use and print any artwork you submit. You agree not to submit
        material that infringes trademarks, copyrights, or other rights of third parties.
      </p>

      <h2>Orders &amp; payment</h2>
      <p>
        Production begins after payment and artwork approval unless otherwise agreed. Custom order terms are
        described in our <a href="/custom-order-policy">Custom Order Policy</a>.
      </p>

      <h2>Limitation</h2>
      <p>
        Our liability is limited to the amount paid for the specific order in dispute, except where prohibited
        by law. We are not liable for indirect or consequential damages.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of our services constitutes acceptance of the updated terms.</p>
    </ContentPage>
  );
}
