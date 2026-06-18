/**
 * Garment silhouettes for the mockup preview.
 * Each shape is a fillable SVG path on a 400×460 viewBox so we can recolor
 * instantly and overlay the customer's design on the print area.
 */

export type PrintArea = { x: number; y: number; w: number; h: number };

export type Garment = {
  id: string;
  label: string;
  viewBox: string;
  /** main fillable silhouette path */
  body: string;
  /** optional detail paths drawn with a subtle shade (pocket, hood) */
  details?: { d: string; shade: number }[];
  printAreas: {
    fullFront: PrintArea;
    leftChest: PrintArea;
  };
};

export const VIEW_W = 400;
export const VIEW_H = 460;

export const garments: Garment[] = [
  {
    id: "tshirt",
    label: "T-Shirt",
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    body: "M40,80 L150,60 Q200,104 250,60 L360,80 L360,165 L295,180 L305,440 L95,440 L105,180 L40,165 Z",
    printAreas: {
      fullFront: { x: 138, y: 160, w: 124, h: 158 },
      leftChest: { x: 222, y: 150, w: 56, h: 56 },
    },
  },
  {
    id: "longsleeve",
    label: "Long Sleeve",
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    body: "M40,80 L150,60 Q200,104 250,60 L360,80 L394,358 L322,378 L300,188 L305,440 L95,440 L100,188 L78,378 L6,358 Z",
    printAreas: {
      fullFront: { x: 140, y: 162, w: 120, h: 158 },
      leftChest: { x: 222, y: 152, w: 54, h: 54 },
    },
  },
  {
    id: "tank",
    label: "Tank Top",
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    body: "M140,68 Q200,114 260,68 L276,122 Q296,260 296,440 L104,440 Q104,260 124,122 Z",
    printAreas: {
      fullFront: { x: 150, y: 150, w: 100, h: 150 },
      leftChest: { x: 208, y: 142, w: 50, h: 50 },
    },
  },
  {
    id: "hoodie",
    label: "Hoodie",
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    body: "M55,100 L120,76 Q134,42 200,42 Q266,42 280,76 L345,100 L362,182 L300,196 L305,440 L95,440 L100,196 L38,182 Z",
    details: [
      { d: "M120,76 Q200,120 280,76 Q268,54 200,54 Q132,54 120,76 Z", shade: 0.12 },
      { d: "M148,312 L252,312 L264,380 L136,380 Z", shade: 0.1 },
    ],
    printAreas: {
      fullFront: { x: 146, y: 202, w: 108, h: 96 },
      leftChest: { x: 222, y: 166, w: 54, h: 54 },
    },
  },
];

export function getGarment(id: string): Garment {
  return garments.find((g) => g.id === id) ?? garments[0];
}

/** Curated common shirt colors for the picker (name → hex). */
export const mockupColors: { name: string; hex: string }[] = [
  { name: "White", hex: "#ffffff" },
  { name: "Natural", hex: "#f0e6d2" },
  { name: "Ash Grey", hex: "#b9bdb6" },
  { name: "Sport Grey", hex: "#b3b3b3" },
  { name: "Heather Dark Grey", hex: "#4b4f54" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Navy", hex: "#1f2a44" },
  { name: "True Royal", hex: "#1d3aa8" },
  { name: "Light Blue", hex: "#aed3e6" },
  { name: "Red", hex: "#c0202c" },
  { name: "Maroon", hex: "#6e2a35" },
  { name: "Burnt Orange", hex: "#bf5a16" },
  { name: "Gold", hex: "#d4af37" },
  { name: "Forest Green", hex: "#2e4d34" },
  { name: "Kelly", hex: "#009e60" },
  { name: "Military Green", hex: "#4b5320" },
  { name: "Pink", hex: "#f7c5cf" },
  { name: "Lilac", hex: "#c8a2c8" },
];

/** Returns true if a swatch is light and needs a border on white UI. */
export function isLightHex(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
}
