import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Woodlands Print",
  description: "How Woodlands Print collects and uses customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage title="Privacy Policy" description="Last updated: June 2026">
      <h2>Information we collect</h2>
      <p>
        When you request a quote or place an order, we may collect your name, email, phone number, business
        name, order details, and uploaded design files.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to quote requests and fulfill orders</li>
        <li>To communicate about production, pickup, or shipping</li>
        <li>To improve our services and customer support</li>
      </ul>

      <h2>Design files</h2>
      <p>
        Uploaded artwork is used to produce your order and may be stored for reorder purposes unless you request
        deletion. Do not upload sensitive personal data unrelated to your print job.
      </p>

      <h2>Third parties</h2>
      <p>
        We use service providers (such as email delivery and payment processors) to operate our business. They
        receive only the information needed to perform their services.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us through our{" "}
        <a href="/#quote">quote form</a> or the contact details on your order confirmation.
      </p>
    </ContentPage>
  );
}
