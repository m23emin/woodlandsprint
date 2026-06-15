"use client";

import Image from "next/image";
import { useState } from "react";
import { TiltCard } from "./motion/tilt-card";
import type { GalleryItem } from "@/lib/site-config";

const bentoLayout: Record<GalleryItem["layout"], string> = {
  hero: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  default: "col-span-1 row-span-1",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const [imageError, setImageError] = useState(false);
  const showImage = item.image && !imageError;

  return (
    <TiltCard depth={18} className={`h-full min-h-[160px] rounded-2xl ${bentoLayout[item.layout]}`}>
      <div className="gallery-card group relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden rounded-2xl shadow-lg">
        {showImage ? (
          <>
            <Image
              src={item.image!}
              alt={item.label}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`}>
            <div
              aria-hidden
              className="shimmer pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15 transition-transform duration-700 group-hover:translate-x-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl"
            />
            {item.icon && (
              <span className="absolute right-4 top-4 text-4xl opacity-40 drop-shadow-lg">{item.icon}</span>
            )}
          </div>
        )}

        <div className="relative flex flex-1 flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            {!showImage && item.icon ? (
              <span className="text-3xl leading-none drop-shadow-lg">{item.icon}</span>
            ) : (
              <span />
            )}
            <span className="rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              {item.detail}
            </span>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white drop-shadow-md">{item.label}</p>
            <p className="mt-0.5 text-xs text-white/70">Woodlands Print</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function BentoGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <GalleryCard key={item.label} item={item} />
      ))}
    </div>
  );
}
