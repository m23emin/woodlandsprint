import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "DTF Pressing Instructions | Woodlands Print",
  description: "How to heat press DTF transfers — temperature, time, pressure, and care instructions.",
};

export default function DtfPressingInstructionsPage() {
  return (
    <ContentPage
      title="DTF Pressing Instructions"
      description="Follow these steps for best results when applying your DTF transfer."
    >
      <h2>Recommended settings</h2>
      <ul>
        <li>
          <strong>Temperature:</strong> 300–320°F (150–160°C) — follow your film manufacturer if different
        </li>
        <li>
          <strong>Time:</strong> 10–15 seconds first press
        </li>
        <li>
          <strong>Pressure:</strong> Medium to firm
        </li>
        <li>
          <strong>Peel:</strong> Hot or cold peel depending on your film — check your order notes
        </li>
      </ul>

      <h2>Application steps</h2>
      <ul>
        <li>Pre-press the garment 3–5 seconds to remove moisture</li>
        <li>Place transfer in desired position</li>
        <li>Press with even pressure for the recommended time</li>
        <li>Peel according to hot or cold peel instructions</li>
        <li>Optional second press: 5 seconds with parchment or Teflon sheet for a smoother finish</li>
      </ul>

      <h2>Care instructions</h2>
      <ul>
        <li>Wait 24 hours before first wash</li>
        <li>Wash inside out in cold water</li>
        <li>Do not bleach or dry on high heat</li>
        <li>Tumble dry low or hang dry for longest life</li>
      </ul>

      <h2>Need help?</h2>
      <p>
        Questions about your specific transfer film? Include your order number when you{" "}
        <a href="/#quote">contact us</a>.
      </p>
    </ContentPage>
  );
}
