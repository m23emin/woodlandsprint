import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Artwork Requirements | Woodlands Print",
  description:
    "File format, resolution, and design guidelines for DTF transfers and custom shirt orders at Woodlands Print.",
};

export default function ArtworkRequirementsPage() {
  return (
    <ContentPage
      title="Artwork Requirements"
      description="Follow these guidelines so your DTF transfers and custom prints look their best."
    >
      <h2>Recommended file formats</h2>
      <ul>
        <li>
          <strong>PNG</strong> with transparent background — preferred for most DTF orders
        </li>
        <li>PDF, AI, EPS, and SVG — acceptable; convert fonts to outlines where possible</li>
        <li>High-resolution JPG only if transparency is not needed</li>
      </ul>

      <h2>Resolution &amp; size</h2>
      <ul>
        <li>300 DPI at print size is recommended</li>
        <li>Do not upload small images expecting them to scale up — quality will drop</li>
        <li>Design at the final print dimensions when possible</li>
      </ul>

      <h2>Design checklist</h2>
      <ul>
        <li>Transparent background (no unwanted white box)</li>
        <li>Design is not mirrored / flipped incorrectly</li>
        <li>Correct print size for placement</li>
        <li>Very thin lines and tiny text may not print clearly — simplify if needed</li>
        <li>Colors on screen may differ slightly from printed output</li>
      </ul>

      <h2>What we review</h2>
      <p>
        If we notice an obvious issue with your file (wrong size, low resolution, visible background), we will
        contact you before printing. We do not provide full design correction on every order unless an artwork fix
        service is requested and quoted separately.
      </p>

      <h2>Need help?</h2>
      <p>
        Not sure if your file is ready? Upload it with your{" "}
        <a href="/#quote">quote request</a> and we will let you know.
      </p>
    </ContentPage>
  );
}
