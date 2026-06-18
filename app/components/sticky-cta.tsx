"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/components/language-provider";

export function StickyCta() {
  const { dict } = useLanguage();

  return <StickyCtaInner label={dict.sticky.cta} />;
}

function StickyCtaInner({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#quote"
        className="flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-foreground shadow-sm transition hover:bg-accent-hover"
      >
        {label}
      </a>
    </div>
  );
}
