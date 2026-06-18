type QuoteEmailDetails = {
  name: string;
  email: string;
  service?: string;
  quantity?: string;
  siteUrl: string;
  hasAccount: boolean;
};

export function buildCustomerQuoteEmail({ name, email, service, quantity, siteUrl, hasAccount }: QuoteEmailDetails) {
  const firstName = name.split(" ")[0] || name;
  const serviceLine = service || "your custom printing project";
  const qtyLine = quantity ? ` (${quantity})` : "";

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for reaching out to <strong>Woodlands Print</strong>. We received your quote request for <strong>${escapeHtml(serviceLine)}</strong>${escapeHtml(qtyLine)}.</p>
      <p>Our team will review your details and artwork, then reply with pricing and timeline options — usually within one business day.</p>
      ${
        hasAccount
          ? `<p><a href="${escapeHtml(siteUrl)}/account" style="color:#1e4d3a;font-weight:600;">Track your request in your account →</a></p>`
          : `<p><a href="${escapeHtml(siteUrl)}/account/register" style="color:#1e4d3a;font-weight:600;">Create a free account</a> to track future quotes.</p>`
      }
      <p style="margin-top:24px;font-size:14px;color:#555;">
        Questions? Call <a href="tel:+19369003250" style="color:#1e4d3a;">(936) 900-3250</a> or reply to this email.
      </p>
      <p style="font-size:14px;color:#555;">— Woodlands Print<br>DTF Transfers &amp; Custom Shirts · North Houston</p>
    </div>
  `.trim();

  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out to Woodlands Print. We received your quote request for ${serviceLine}${qtyLine}.`,
    "",
    "Our team will review your details and reply with pricing and timeline options — usually within one business day.",
    "",
    hasAccount ? `Track your request: ${siteUrl}/account` : `Create an account: ${siteUrl}/account/register`,
    "",
    "Questions? Call (936) 900-3250.",
    "",
    "— Woodlands Print",
  ].join("\n");

  return {
    subject: "We received your quote request — Woodlands Print",
    html,
    text,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
