"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  garments,
  getGarment,
  mockupColors,
  isLightHex,
  VIEW_W,
  VIEW_H,
  type PrintArea,
} from "@/lib/garments";
import { saveQuotePrefill } from "@/lib/quote-prefill";

type Placement = "fullFront" | "leftChest";

const MAX_BYTES = 20 * 1024 * 1024;

export function MockupPreview() {
  const [garmentId, setGarmentId] = useState("tshirt");
  const [color, setColor] = useState(mockupColors[5]); // Black
  const [placement, setPlacement] = useState<Placement>("fullFront");
  const [design, setDesign] = useState<string | null>(null);
  const [designName, setDesignName] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8); // fraction of print area width
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // center fraction within print area
  const [error, setError] = useState<string | null>(null);

  const garment = getGarment(garmentId);
  const area = garment.printAreas[placement];
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);

  const printPct = pctRect(area);
  const isDarkShirt = !isLightHex(color.hex);

  const onFile = useCallback((file: File | null) => {
    setError(null);
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("File too large — max 20 MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image (PNG works best).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesign(reader.result as string);
      setDesignName(file.name);
      setPos({ x: 0.5, y: 0.5 });
      setScale(0.8);
    };
    reader.readAsDataURL(file);
  }, []);

  // Drag handlers (pointer-based, clamped to print area)
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!dragging.current || !stageRef.current) return;
      const stage = stageRef.current.getBoundingClientRect();
      const areaLeft = stage.left + (area.x / VIEW_W) * stage.width;
      const areaTop = stage.top + (area.y / VIEW_H) * stage.height;
      const areaW = (area.w / VIEW_W) * stage.width;
      const areaH = (area.h / VIEW_H) * stage.height;
      const nx = clamp((e.clientX - areaLeft) / areaW, 0, 1);
      const ny = clamp((e.clientY - areaTop) / areaH, 0, 1);
      setPos({ x: nx, y: ny });
    }
    function up() {
      dragging.current = false;
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [area]);

  function handleQuote() {
    saveQuotePrefill({
      service: "Custom T-Shirts",
      blank: `${garment.label} — ${color.name}`,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Stage */}
      <div className="flex flex-col items-center">
        <div
          ref={stageRef}
          className="relative w-full max-w-[440px]"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        >
          {/* Garment */}
          <svg viewBox={garment.viewBox} className="absolute inset-0 h-full w-full" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}>
            <path d={garment.body} fill={color.hex} stroke={isLightHex(color.hex) ? "#d8d8d8" : "rgba(0,0,0,0.18)"} strokeWidth={1.5} />
            {/* soft shading for depth */}
            <path d={garment.body} fill="url(#shade)" opacity={0.5} />
            {garment.details?.map((d, i) => (
              <path key={i} d={d.d} fill={`rgba(0,0,0,${d.shade})`} />
            ))}
            <defs>
              <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Print area + design */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: printPct.left,
              top: printPct.top,
              width: printPct.width,
              height: printPct.height,
            }}
          >
            {!design && (
              <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-white/40">
                <span className={`text-center text-[10px] leading-tight ${isDarkShirt ? "text-white/50" : "text-black/30"}`}>
                  print area
                </span>
              </div>
            )}
            {design && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={design}
                alt="Your design"
                draggable={false}
                onPointerDown={(e) => {
                  e.preventDefault();
                  dragging.current = true;
                }}
                className="absolute cursor-move select-none"
                style={{
                  left: `${pos.x * 100}%`,
                  top: `${pos.y * 100}%`,
                  width: `${scale * 100}%`,
                  transform: "translate(-50%, -50%)",
                  touchAction: "none",
                }}
              />
            )}
          </div>
        </div>

        <p className="mt-3 text-xs text-muted">
          {design ? "Drag to position · use the slider to resize" : "Upload a design to preview it on the garment"}
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Garment type */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Garment</p>
          <div className="grid grid-cols-2 gap-2">
            {garments.map((g) => (
              <button
                key={g.id}
                onClick={() => setGarmentId(g.id)}
                className={`rounded-xl border px-3 py-2 text-sm transition ${
                  garmentId === g.id
                    ? "border-brand bg-brand/5 font-semibold text-brand ring-2 ring-brand/20"
                    : "border-border bg-surface text-muted hover:border-brand/30 hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Color: <span className="text-muted font-normal">{color.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {mockupColors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setColor(c)}
                className={`h-7 w-7 rounded-full transition ${
                  color.name === c.name ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : isLightHex(c.hex) ? "ring-1 ring-border" : ""
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Upload */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Your design</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent-hover"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {design ? "Change design" : "Upload design"}
          </button>
          {designName && <p className="mt-1.5 truncate text-xs text-muted">{designName}</p>}
          {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
          <p className="mt-1.5 text-[11px] text-muted">PNG with transparent background looks best.</p>
        </div>

        {/* Placement + size (only with a design) */}
        {design && (
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Placement</p>
              <div className="grid grid-cols-2 gap-2">
                {(["fullFront", "leftChest"] as Placement[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPlacement(p); setPos({ x: 0.5, y: 0.5 }); }}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      placement === p
                        ? "border-brand bg-brand/5 text-brand ring-2 ring-brand/20"
                        : "border-border bg-surface text-muted hover:border-brand/30"
                    }`}
                  >
                    {p === "fullFront" ? "Full front" : "Left chest"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Size</label>
              <input
                type="range"
                min={0.2}
                max={1}
                step={0.01}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
          </>
        )}

        <Link
          href="/#quote"
          onClick={handleQuote}
          className="flex w-full items-center justify-center rounded-xl border border-brand bg-brand/5 px-6 py-3.5 text-sm font-semibold text-brand transition hover:bg-brand/10"
        >
          Get a Quote for This →
        </Link>
        <p className="text-center text-[11px] text-muted">
          Preview is for visualization — final placement is confirmed before printing.
        </p>
      </div>
    </div>
  );
}

function pctRect(a: PrintArea) {
  return {
    left: `${(a.x / VIEW_W) * 100}%`,
    top: `${(a.y / VIEW_H) * 100}%`,
    width: `${(a.w / VIEW_W) * 100}%`,
    height: `${(a.h / VIEW_H) * 100}%`,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
