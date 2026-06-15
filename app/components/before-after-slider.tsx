"use client";

import { useCallback, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfterSlider({
  beforeLabel = "Transfer Film",
  afterLabel = "Pressed on Shirt",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragging.current) return;
    updatePosition(event.clientX);
  }

  function onPointerUp(event: React.PointerEvent) {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-border shadow-xl"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison"
    >
      {/* After — pressed shirt */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative h-[72%] w-[55%] rounded-3xl bg-gradient-to-b from-zinc-50 to-zinc-200 shadow-inner">
            <div className="absolute inset-x-[22%] top-[12%] h-[14%] rounded-full bg-zinc-300/80" />
            <div className="absolute left-1/2 top-[38%] flex h-[38%] w-[68%] -translate-x-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg">
              <span className="text-sm font-bold uppercase tracking-wider text-white/95">Your Logo</span>
            </div>
          </div>
        </div>
        <span className="absolute bottom-4 right-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-md">
          {afterLabel}
        </span>
      </div>

      {/* Before — transfer film */}
      <div
        className="absolute inset-0 overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-light"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative h-[58%] w-[78%] rounded-xl border-2 border-dashed border-white/30 bg-black/20 p-4 backdrop-blur-sm">
            <div className="grid h-full grid-cols-3 gap-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-md"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(135deg, rgba(201,162,39,0.65), rgba(255,255,255,0.2))"
                        : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-accent shadow-lg">
          <svg className="h-4 w-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M8 15l4 4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
