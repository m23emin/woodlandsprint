import { faqItems, pricingFaqItems, siteContact, siteName, sitePickup, serviceAreas } from "@/lib/site-config";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type AssistantResult = {
  reply: string;
  escalate: boolean;
  needsEmail: boolean;
};

const FAQ_ALL = [...faqItems, ...pricingFaqItems];

/** Topics we can answer from the built-in FAQ — everything else goes to email. */
const FREE_TOPIC_PATTERNS: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /\b(turnaround|how fast|how long|when will|delivery time|ready in|ship)\b/i,
    reply: faqItems[0].a,
  },
  {
    pattern: /\b(file|format|upload|artwork|png|dpi|vector|transparent)\b/i,
    reply: faqItems[1].a,
  },
  {
    pattern: /\b(pickup|pick up|local|where.*(get|pick)|hours|open)\b/i,
    reply: `${faqItems[2].a} Hours: ${sitePickup.hours}. Area: ${sitePickup.area}.`,
  },
  {
    pattern: /\b(bulk|business|uniform|team shirt|event order)\b/i,
    reply: faqItems[3].a,
  },
  {
    pattern: /\b(setup fee|color fee|hidden fee|extra fee)\b/i,
    reply: pricingFaqItems[0].a,
  },
  {
    pattern: /\b(minimum|min order|smallest order)\b/i,
    reply: pricingFaqItems[1].a,
  },
  {
    pattern: /\b(rush|urgent|same day|next day|deadline)\b/i,
    reply: pricingFaqItems[2].a,
  },
  {
    pattern: /\b(blank|gildan|shirt include|premium blank)\b/i,
    reply: pricingFaqItems[3].a,
  },
  {
    pattern: /\b(repeat|reorder|returning customer|discount)\b/i,
    reply: pricingFaqItems[4].a,
  },
  {
    pattern: /\b(price|pricing|cost|how much|gang sheet)\b/i,
    reply:
      "Ballpark pricing is on our /pricing page. Gang sheets are priced by size and quantity with volume discounts. For an exact total, use the quote form on the homepage.",
  },
  {
    pattern: /\b(dtf|transfer|gang sheet|custom shirt|what do you|services)\b/i,
    reply: `We offer DTF gang sheets, custom t-shirts, business apparel, and bulk event printing in ${serviceAreas.slice(0, 4).join(", ")}, and nearby. See /dtf-transfers or /custom-shirts for details.`,
  },
  {
    pattern: /\b(hello|hi|hey|help)\b/i,
    reply: `Hi! I can answer quick questions about turnaround, file formats, pickup, and pricing basics. For a custom quote or anything specific to your order, I'll connect you with our team by email.`,
  },
];

const ESCALATE_PATTERNS = [
  /\b(quote|my order|order status|refund|complaint|speak to|talk to|human|agent|call me)\b/i,
  /\b(specific|custom|complicated|\d+\s*shirt|\d+\s*piece)\b/i,
];

function scoreFaqMatch(question: string, faq: { q: string; a: string }) {
  const words = question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const qLower = faq.q.toLowerCase();
  return words.filter((w) => qLower.includes(w)).length;
}

export function runChatAssistant(messages: ChatTurn[]): AssistantResult {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (ESCALATE_PATTERNS.some((p) => p.test(lastUser))) {
    return {
      reply:
        "For a custom quote or order-specific help, our team will follow up by email. What's the best address to reach you?",
      escalate: true,
      needsEmail: true,
    };
  }

  for (const topic of FREE_TOPIC_PATTERNS) {
    if (topic.pattern.test(lastUser)) {
      return { reply: topic.reply, escalate: false, needsEmail: false };
    }
  }

  const ranked = FAQ_ALL.map((faq) => ({ faq, score: scoreFaqMatch(lastUser, faq) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.score >= 2) {
    return { reply: ranked[0].faq.a, escalate: false, needsEmail: false };
  }

  return {
    reply:
      "I can help with turnaround, file formats, pickup, and general pricing — but that question needs our team. Share your email and we'll reply shortly.",
    escalate: true,
    needsEmail: true,
  };
}

export function formatChatTranscript(messages: ChatTurn[]) {
  return messages.map((m) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`).join("\n\n");
}
