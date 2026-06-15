import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Turnaround Time | Woodlands Print",
  description: "Production and turnaround times for DTF transfers and custom shirt orders.",
};

export default function TurnaroundTimePage() {
  return (
    <ContentPage
      title="Turnaround Time"
      description="Typical production timelines for DTF and custom apparel orders."
    >
      <h2>Standard production</h2>
      <p>
        Most DTF gang sheet and custom shirt orders are produced within <strong>2–5 business days</strong> after
        artwork approval and payment. Complex or large bulk orders may take longer — we will confirm your date
        before production starts.
      </p>

      <h2>Rush orders</h2>
      <p>
        Need it faster? Rush production is available for many orders based on our current queue. Rush fees apply.
        Include your deadline in your <a href="/#quote">quote request</a>.
      </p>

      <h2>Artwork review</h2>
      <p>
        Turnaround begins after we have a print-ready file and any needed approval. File issues may delay start
        time. Review our <a href="/artwork-requirements">Artwork Requirements</a> to avoid delays.
      </p>

      <h2>Pickup vs. shipping</h2>
      <p>
        Local pickup is often available as soon as production completes. Shipped orders add carrier transit time
        on top of production days.
      </p>

      <h2>Same-day &amp; next-day</h2>
      <p>
        Same-day or next-day service may be available for select small orders when our schedule allows. This is
        never guaranteed without written confirmation — ask when requesting your quote.
      </p>
    </ContentPage>
  );
}
