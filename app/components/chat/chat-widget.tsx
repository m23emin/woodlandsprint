"use client";

import { useEffect, useRef, useState } from "react";
import { siteContact } from "@/lib/site-config";

type Message = { role: "user" | "assistant"; content: string };

const STARTER: Message = {
  role: "assistant",
  content: `Hi! I answer quick questions about turnaround, file formats, pickup, and pricing basics. For custom quotes, I'll connect you with our team by email.`,
};

const QUICK_PROMPTS = [
  "What's your turnaround time?",
  "Gang sheet pricing?",
  "What file format do I need?",
  "I need a custom quote",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([STARTER]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [needsEmail, setNeedsEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const waHref = siteContact.whatsapp
    ? `https://wa.me/${siteContact.whatsapp}?text=${encodeURIComponent(siteContact.whatsappMessage)}`
    : null;

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          ...(email ? { email } : {}),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        needsEmail?: boolean;
        escalated?: boolean;
      };

      if (!response.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Something went wrong. Try WhatsApp or call us directly.",
          },
        ]);
        return;
      }

      setNeedsEmail(Boolean(data.needsEmail));
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — please call or WhatsApp us." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, email: email.trim() }),
      });
      const data = (await response.json()) as { reply?: string };
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
        setNeedsEmail(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 sm:bottom-6 sm:left-6">
      {open && (
        <div
          className="mb-3 flex h-[min(70vh,520px)] w-[min(calc(100vw-2rem),360px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex items-center justify-between border-b border-border bg-brand px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Quick Help</p>
              <p className="text-xs text-white/75">Free FAQ answers · email for custom quotes</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand text-white"
                      : "rounded-bl-md border border-border bg-surface text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-xs text-muted" aria-live="polite">
                Typing…
              </p>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-background px-3 py-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground hover:border-brand/30"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {needsEmail && (
            <form onSubmit={submitEmail} className="border-t border-border bg-background p-3">
              <label className="mb-1.5 block text-xs font-medium text-foreground">Your email for follow-up</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-70"
                >
                  Send
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-border bg-background p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent-hover disabled:opacity-50"
              >
                Send
              </button>
            </form>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#25D366] hover:underline"
              >
                Prefer WhatsApp? Message us directly →
              </a>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/25 transition hover:scale-105 hover:bg-brand-light"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
