import { Resend } from "resend";
import { formatChatTranscript, type ChatTurn } from "@/lib/chat-assistant";
import { siteContact, siteName } from "@/lib/site-config";

export async function sendChatEscalationEmail({
  email,
  messages,
  reason,
}: {
  email: string;
  messages: ChatTurn[];
  reason?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return { sent: false as const, reason: "email_not_configured" as const };
  }

  const transcript = formatChatTranscript(messages);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Chat follow-up — ${email}`,
    html: `
      <h2>Website chat — team follow-up needed</h2>
      <p><strong>Customer email:</strong> ${escapeHtml(email)}</p>
      ${reason ? `<p><strong>Reason:</strong> ${escapeHtml(reason)}</p>` : ""}
      <p><strong>Phone:</strong> <a href="tel:${siteContact.phone}">${siteContact.phone}</a></p>
      <hr />
      <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;font-size:14px;">${escapeHtml(transcript)}</pre>
    `.trim(),
    text: [`Chat follow-up from ${email}`, reason ? `Reason: ${reason}` : "", "", transcript].filter(Boolean).join("\n"),
  });

  if (error) {
    console.error("Chat escalation email error:", error);
    return { sent: false as const, reason: "send_failed" as const };
  }

  // Brief confirmation to customer
  await resend.emails.send({
    from: fromEmail,
    to: email,
    replyTo: toEmail,
    subject: `We got your message — ${siteName}`,
    html: `
      <p>Thanks for chatting with ${siteName}.</p>
      <p>Our team received your question and will reply by email shortly — usually within one business day.</p>
      <p>Urgent? Call <a href="tel:${siteContact.phone}">${siteContact.phone}</a>.</p>
    `,
    text: `Thanks for chatting with ${siteName}. Our team will reply by email shortly. Call ${siteContact.phone} for urgent help.`,
  });

  return { sent: true as const };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
