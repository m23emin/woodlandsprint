"use client";

import { motion } from "framer-motion";

export function SectionDivider({ variant = "light" }: { variant?: "light" | "dark" | "brand" }) {
  const colors = {
    light: "from-transparent via-brand/15 to-transparent",
    dark: "from-transparent via-white/10 to-transparent",
    brand: "from-transparent via-accent/25 to-transparent",
  };

  return (
    <div aria-hidden className="relative h-px w-full overflow-hidden">
      <motion.div
        className={`h-full w-full bg-gradient-to-r ${colors[variant]}`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
