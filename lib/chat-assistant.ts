import { getDictionary, type Locale } from "@/lib/i18n";
import { serviceAreas, sitePickup } from "@/lib/site-config";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type AssistantResult = {
  reply: string;
  escalate: boolean;
  needsEmail: boolean;
};

function buildTopicPatterns(locale: Locale) {
  const dict = getDictionary(locale);
  const faq = dict.home.faq;
  const pricingFaq = dict.pricingFaq;
  const chat = dict.chat;

  const pricingReply =
    locale === "es"
      ? "Los precios orientativos están en /pricing. Las gang sheets se cotizan por tamaño y cantidad con descuentos por volumen. Para un total exacto, usa el formulario de cotización en la página principal."
      : "Ballpark pricing is on our /pricing page. Gang sheets are priced by size and quantity with volume discounts. For an exact total, use the quote form on the homepage.";

  const servicesReply =
    locale === "es"
      ? `Ofrecemos gang sheets DTF, camisetas personalizadas, ropa empresarial e impresión para eventos en ${serviceAreas.slice(0, 4).join(", ")} y alrededores. Visita /dtf-transfers o /custom-shirts para más detalles.`
      : `We offer DTF gang sheets, custom t-shirts, business apparel, and bulk event printing in ${serviceAreas.slice(0, 4).join(", ")}, and nearby. See /dtf-transfers or /custom-shirts for details.`;

  const pickupReply =
    locale === "es"
      ? `${faq[2].a} Horario: ${sitePickup.hours}. Zona: ${sitePickup.area}.`
      : `${faq[2].a} Hours: ${sitePickup.hours}. Area: ${sitePickup.area}.`;

  return [
    {
      pattern: /\b(turnaround|how fast|how long|when will|delivery time|ready in|ship|tiempo|entrega|cu[aá]nto tarda|cuando est[aá])\b/i,
      reply: faq[0].a,
    },
    {
      pattern: /\b(file|format|upload|artwork|png|dpi|vector|transparent|archivo|formato|subir)\b/i,
      reply: faq[1].a,
    },
    {
      pattern: /\b(pickup|pick up|local|where.*(get|pick)|hours|open|recogida|recoger|horario|abierto)\b/i,
      reply: pickupReply,
    },
    {
      pattern: /\b(bulk|business|uniform|team shirt|event order|mayoreo|empresa|uniforme|equipo)\b/i,
      reply: faq[3].a,
    },
    {
      pattern: /\b(setup fee|color fee|hidden fee|extra fee|cargo|configuraci[oó]n)\b/i,
      reply: pricingFaq[0].a,
    },
    {
      pattern: /\b(minimum|min order|smallest order|m[ií]nimo|pedido m[ií]nimo)\b/i,
      reply: pricingFaq[1].a,
    },
    {
      pattern: /\b(rush|urgent|same day|next day|deadline|urgente|mismo d[ií]a|fecha l[ií]mite)\b/i,
      reply: pricingFaq[2].a,
    },
    {
      pattern: /\b(blank|gildan|shirt include|premium blank|camiseta en blanco|blank)\b/i,
      reply: pricingFaq[3].a,
    },
    {
      pattern: /\b(repeat|reorder|returning customer|discount|reorden|descuento|cliente recurrente)\b/i,
      reply: pricingFaq[4].a,
    },
    {
      pattern: /\b(price|pricing|cost|how much|gang sheet|precio|cu[aá]nto cuesta|cotizaci[oó]n)\b/i,
      reply: pricingReply,
    },
    {
      pattern: /\b(dtf|transfer|gang sheet|custom shirt|what do you|services|servicio|camiseta)\b/i,
      reply: servicesReply,
    },
    {
      pattern: /\b(hello|hi|hey|help|hola|buenas|ayuda)\b/i,
      reply: chat.starter,
    },
  ];
}

const ESCALATE_PATTERNS = [
  /\b(quote|my order|order status|refund|complaint|speak to|talk to|human|agent|call me|cotizaci[oó]n|mi pedido|estado del pedido|reembolso|hablar con)\b/i,
  /\b(specific|custom|complicated|\d+\s*shirt|\d+\s*piece|\d+\s*camiseta|\d+\s*pieza)\b/i,
];

function scoreFaqMatch(question: string, faq: { q: string; a: string }) {
  const words = question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const qLower = faq.q.toLowerCase();
  return words.filter((w) => qLower.includes(w)).length;
}

export function runChatAssistant(messages: ChatTurn[], locale: Locale = "en"): AssistantResult {
  const dict = getDictionary(locale);
  const faqAll = [...dict.home.faq, ...dict.pricingFaq];
  const topicPatterns = buildTopicPatterns(locale);
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (ESCALATE_PATTERNS.some((p) => p.test(lastUser))) {
    return {
      reply: dict.chat.escalateAskEmail,
      escalate: true,
      needsEmail: true,
    };
  }

  for (const topic of topicPatterns) {
    if (topic.pattern.test(lastUser)) {
      return { reply: topic.reply, escalate: false, needsEmail: false };
    }
  }

  const ranked = faqAll.map((faq) => ({ faq, score: scoreFaqMatch(lastUser, faq) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.score >= 2) {
    return { reply: ranked[0].faq.a, escalate: false, needsEmail: false };
  }

  return {
    reply: dict.chat.escalateFallback,
    escalate: true,
    needsEmail: true,
  };
}

export function formatChatTranscript(messages: ChatTurn[]) {
  return messages.map((m) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`).join("\n\n");
}
