"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  speed?: number; // positive = slower (moves up as you scroll), negative = faster
};

export function ParallaxLayer({ children, className, speed = 0.3 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [`${speed * -80}px`, `${speed * 80}px`]);
  const y = useSpring(raw, { stiffness: 80, damping: 20 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* Full-section parallax bg blob */
export function ParallaxBlob({
  className,
  speed = 0.2,
}: {
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [`${speed * -120}px`, `${speed * 120}px`]);
  const y = useSpring(raw, { stiffness: 60, damping: 18 });

  if (reduced) return <div aria-hidden className={className} />;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ y }}
    />
  );
}
