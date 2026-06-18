"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import type { GangSheetSize } from "@/lib/pricing-calculator";

// Fabric.js is loaded dynamically to avoid SSR issues
type FabricCanvas = import("fabric").Canvas;
type FabricObject = import("fabric").FabricObject;

export type CanvasHandle = {
  addImageFile: (file: File) => Promise<void>;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  flipHSelected: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  clearAll: () => void;
  hasSelection: () => boolean;
  exportPNG: () => string | null;
};

type Props = {
  sheetSize: GangSheetSize;
  onSelectionChange?: (hasSelection: boolean) => void;
};

const PX_PER_INCH = 18;
const SAFE_MARGIN = PX_PER_INCH * 0.25;

export const GangSheetCanvas = forwardRef<CanvasHandle, Props>(function GangSheetCanvas(
  { sheetSize, onSelectionChange },
  ref,
) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [wIn, hIn] = sheetSize.dimensions
    .replace(/"/g, "")
    .split("×")
    .map((s) => parseFloat(s.trim()));

  const canvasW = Math.round(wIn * PX_PER_INCH);
  const canvasH = Math.round(hIn * PX_PER_INCH);

  // Init / re-init when size changes
  useEffect(() => {
    let disposed = false;

    async function init() {
      const { Canvas, Rect, Shadow } = await import("fabric");
      if (disposed || !canvasEl.current) return;

      const existing = fabricRef.current;
      if (existing) {
        existing.dispose();
        fabricRef.current = null;
      }

      const canvas = new Canvas(canvasEl.current, {
        width: canvasW,
        height: canvasH,
        backgroundColor: "#ffffff",
        selection: true,
        preserveObjectStacking: true,
      });

      // Sheet border
      const border = new Rect({
        left: SAFE_MARGIN,
        top: SAFE_MARGIN,
        width: canvasW - SAFE_MARGIN * 2,
        height: canvasH - SAFE_MARGIN * 2,
        fill: "transparent",
        stroke: "#1e4d3a",
        strokeWidth: 1.5,
        strokeDashArray: [6, 4],
        selectable: false,
        evented: false,
        shadow: new Shadow({ color: "rgba(30,77,58,0.10)", blur: 12, offsetX: 0, offsetY: 0 }),
      });
      canvas.add(border);
      canvas.sendObjectToBack(border);

      canvas.on("selection:created", () => onSelectionChange?.(true));
      canvas.on("selection:updated", () => onSelectionChange?.(true));
      canvas.on("selection:cleared", () => onSelectionChange?.(false));

      fabricRef.current = canvas;
    }

    init();

    return () => {
      disposed = true;
      fabricRef.current?.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasW, canvasH]);

  // Expose imperative handle
  useImperativeHandle(
    ref,
    () => ({
      async addImageFile(file: File) {
        const { FabricImage } = await import("fabric");
        const url = URL.createObjectURL(file);
        const img = await FabricImage.fromURL(url);
        URL.revokeObjectURL(url);

        const canvas = fabricRef.current;
        if (!canvas) return;

        const maxW = (canvasW - SAFE_MARGIN * 2) * 0.45;
        const maxH = (canvasH - SAFE_MARGIN * 2) * 0.45;
        const scale = Math.min(maxW / (img.width ?? 1), maxH / (img.height ?? 1), 1);
        img.scale(scale);
        img.set({
          left: SAFE_MARGIN + Math.random() * ((canvasW - SAFE_MARGIN * 2) * 0.3),
          top: SAFE_MARGIN + Math.random() * ((canvasH - SAFE_MARGIN * 2) * 0.3),
          cornerColor: "#1e4d3a",
          cornerStrokeColor: "#ffffff",
          transparentCorners: false,
          cornerSize: 10,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      },

      deleteSelected() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObjects();
        active.forEach((obj: FabricObject) => canvas.remove(obj));
        canvas.discardActiveObject();
        canvas.renderAll();
      },

      async duplicateSelected() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (!active) return;
        const clone = await active.clone();
        clone.set({ left: (active.left ?? 0) + 16, top: (active.top ?? 0) + 16 });
        canvas.add(clone);
        canvas.setActiveObject(clone);
        canvas.renderAll();
      },

      flipHSelected() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (!active) return;
        active.set("flipX", !active.flipX);
        canvas.renderAll();
      },

      bringForward() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) { canvas.bringObjectForward(active); canvas.renderAll(); }
      },

      sendBackward() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) { canvas.sendObjectBackwards(active); canvas.renderAll(); }
      },

      clearAll() {
        const canvas = fabricRef.current;
        if (!canvas) return;
        canvas.getObjects().slice(1).forEach((o: FabricObject) => canvas.remove(o));
        canvas.discardActiveObject();
        canvas.renderAll();
      },

      hasSelection() {
        return !!fabricRef.current?.getActiveObject();
      },

      exportPNG() {
        return fabricRef.current?.toDataURL({ format: "png", multiplier: 2 }) ?? null;
      },
    }),
    [canvasW, canvasH],
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-auto rounded-xl border border-border bg-zinc-100 p-4"
      style={{ maxHeight: "520px" }}
    >
      {/* Ruler labels */}
      <div className="mb-1 flex items-center justify-center">
        <span className="text-[10px] text-muted">{sheetSize.dimensions} — {sheetSize.sqft} sq ft</span>
      </div>
      <div className="flex justify-center">
        <canvas
          ref={canvasEl}
          style={{ maxWidth: "100%", display: "block", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        />
      </div>
    </div>
  );
});
