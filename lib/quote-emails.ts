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

type StatusEmailDetails = {
  name: string;
  service?: string | null;
  status: import("@/lib/quote-status").QuoteStatus;
  quotedAmount?: number | null;
  quotedMessage?: string | null;
  siteUrl: string;
};

const statusCustomerLabels: Record<string, string> = {
  reviewing: "We're reviewing your request",
  quoted: "Your quote is ready",
  production: "Your order is in production",
  ready: "Your order is ready for pickup",
  completed: "Your order is complete",
  declined: "Update on your quote request",
};

export function buildStatusChangeEmail({
  name,
  service,
  status,
  quotedAmount,
  quotedMessage,
  siteUrl,
}: StatusEmailDetails) {
  const firstName = name.split(" ")[0] || name;
  const serviceLine = service || "your custom printing project";
  const headline = statusCustomerLabels[status] ?? "Quote status update";

  let bodyExtra = "";
  if (status === "quoted" && quotedAmount != null) {
    bodyExtra = `<p style="font-size:18px;font-weight:700;color:#1e4d3a;">Quoted total: $${quotedAmount.toFixed(2)}</p>`;
  }
  if (quotedMessage) {
    bodyExtra += `<p style="margin-top:12px;padding:12px;background:#f5f5f5;border-radius:8px;">${escapeHtml(quotedMessage)}</p>`;
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a;line-height:1.6;">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p><strong>${escapeHtml(headline)}</strong> for <strong>${escapeHtml(serviceLine)}</strong>.</p>
      ${bodyExtra}
      <p><a href="${escapeHtml(siteUrl)}/account" style="color:#1e4d3a;font-weight:600;">View in your account →</a></p>
      <p style="margin-top:24px;font-size:14px;color:#555;">
        Questions? Call <a href="tel:+19369003250" style="color:#1e4d3a;">(936) 900-3250</a> or reply to this email.
      </p>
      <p style="font-size:14px;color:#555;">— Woodlands Print</p>
    </div>
  `.trim();

  const textLines = [
    `Hi ${firstName},`,
    "",
    `${headline} for ${serviceLine}.`,
  ];
  if (status === "quoted" && quotedAmount != null) {
    textLines.push("", `Quoted total: $${quotedAmount.toFixed(2)}`);
  }
  if (quotedMessage) textLines.push("", quotedMessage);
  textLines.push("", `View in your account: ${siteUrl}/account`, "", "— Woodlands Print");

  return {
    subject: `${headline} — Woodlands Print`,
    html,
    text: textLines.join("\n"),
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
