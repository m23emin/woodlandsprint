"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-14, 14]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [10, -10]), {
    stiffness: 120,
    damping: 20,
  });

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    if (reduceMotion) return;

    function onMove(event: MouseEvent) {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      pointerX.set(nx);
      pointerY.set(ny);
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div ref={ref} className="scene-3d relative mx-auto h-[320px] w-full max-w-md sm:h-[380px] lg:mx-0 lg:max-w-none">
      <motion.div
        className="scene-stage absolute inset-0 flex items-center justify-center"
        style={reduceMotion ? undefined : { rotateX, rotateY, y: scrollY }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="absolute h-56 w-56 rounded-full bg-accent/25 blur-3xl animate-blob-drift"
        />
        <div
          aria-hidden
          className="absolute -right-4 top-8 h-40 w-40 rounded-full bg-brand-light/30 blur-3xl animate-blob-drift-reverse"
        />

        {/* Back plate — gang sheet */}
        <motion.div
          className="hero-float-back absolute h-44 w-56 rounded-2xl border border-white/20 bg-gradient-to-br from-brand-light via-brand to-brand-dark p-4 shadow-2xl shadow-black/40 sm:h-48 sm:w-64"
          style={{ transform: "translateZ(-40px) rotateZ(-8deg)" }}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid h-full grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-md bg-white/15 backdrop-blur-sm"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, rgba(201,162,39,0.5), rgba(42,107,80,0.4))"
                      : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/70">
            DTF Gang Sheet
          </span>
        </motion.div>

        {/* Middle — t-shirt */}
        <motion.div
          className="hero-float-mid absolute flex h-52 w-44 flex-col items-center justify-center rounded-3xl border border-white/25 bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-2xl shadow-black/35 sm:h-56 sm:w-48"
          style={{ transform: "translateZ(30px) rotateY(12deg)" }}
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <div className="absolute inset-x-6 top-8 h-10 rounded-full bg-zinc-400/40" />
          <div
            className="mt-6 flex h-24 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-center shadow-inner"
            style={{ transform: "translateZ(20px)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-white/90">Your Logo</span>
          </div>
          <span className="absolute bottom-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            Custom Tee
          </span>
        </motion.div>

        {/* Front badge */}
        <motion.div
          className="absolute -right-2 top-6 rounded-2xl border border-accent/40 bg-accent/90 px-4 py-3 shadow-xl sm:right-0"
          style={{ transform: "translateZ(80px) rotateZ(6deg)" }}
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotateZ: [6, 3, 6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-dark">Premium</p>
          <p className="text-sm font-bold text-brand-dark">DTF Print</p>
        </motion.div>

        {/* Front chip */}
        <motion.div
          className="absolute -left-2 bottom-10 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md sm:left-0"
          style={{ transform: "translateZ(60px) rotateZ(-4deg)" }}
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-xs font-semibold text-white">Fast Local Pickup</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
