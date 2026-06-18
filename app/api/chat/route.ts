import { NextResponse } from "next/server";
import { runChatAssistant, type ChatTurn } from "@/lib/chat-assistant";
import { sendChatEscalationEmail } from "@/lib/chat-email";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

type ChatRequest = {
  messages?: ChatTurn[];
  email?: string;
  locale?: string;
};

function isValidMessages(messages: unknown): messages is ChatTurn[] {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return false;
  return messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= 2000,
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`chat:${ip}`, 40, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isValidMessages(body.messages)) {
    return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale: Locale = isLocale(body.locale) ? body.locale : "en";
  const dict = getDictionary(locale);
  const result = runChatAssistant(body.messages, locale);

  if (result.escalate && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const mail = await sendChatEscalationEmail({
      email,
      messages: body.messages,
      reason: result.reply,
    });

    if (mail.sent) {
      return NextResponse.json({
        reply: dict.chat.thanksEscalated,
        escalate: true,
        needsEmail: false,
        escalated: true,
      });
    }

    return NextResponse.json({
      reply: dict.chat.emailSendFail,
      escalate: true,
      needsEmail: false,
      escalated: false,
    });
  }

  if (result.escalate && result.needsEmail && !email) {
    return NextResponse.json({
      reply: result.reply,
      escalate: true,
      needsEmail: true,
      escalated: false,
    });
  }

  return NextResponse.json({
    reply: result.reply,
    escalate: result.escalate,
    needsEmail: result.needsEmail && !email,
    escalated: false,
  });
}
