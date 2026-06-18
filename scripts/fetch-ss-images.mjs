/**
 * Download per-color product images from the S&S Activewear API.
 *
 * USAGE:
 *   SS_ACCOUNT=12345 SS_API_KEY=xxxxxxxx node scripts/fetch-ss-images.mjs
 *
 * What it does:
 *   1. For each product in STYLE_MAP, calls the S&S API for that style.
 *   2. Dedupes by color, downloads the front image (large) to
 *      public/blanks/<productId>/<color-slug>.jpg
 *   3. Writes lib/ss-colors.generated.json mapping productId -> colors:
 *      [{ name, hex, image }]  (image is the local /blanks/... path)
 *
 * Credentials are read from env only — never commit them.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_BLANKS = join(ROOT, "public", "blanks");
const OUT_JSON = join(ROOT, "lib", "ss-colors.generated.json");

const ACCOUNT = process.env.SS_ACCOUNT;
const API_KEY = process.env.SS_API_KEY;

if (!ACCOUNT || !API_KEY) {
  console.error("Missing SS_ACCOUNT or SS_API_KEY env vars.");
  process.exit(1);
}

/**
 * Map each catalog product (lib/blank-catalog.ts id) to its S&S style number.
 * ⚠️ Confirm/adjust these style numbers to match the exact blanks you buy.
 */
const STYLE_MAP = {
  "bc-adult-tee": "3001CVC",
  "rs-youth-tee": "3321",
  "rs-toddler-tee": "3321T",
  "rs-baby-onesie": "4400",
  "gildan-sweatshirt": "18000",
  "gildan-hoodie": "18500",
  "gildan-youth-sweatshirt": "18000B",
  "bc-long-sleeve": "3501",
  "bc-youth-long-sleeve": "3501Y",
  "nl-racerback-tank": "1533",
  "bc-jersey-tank": "3480",
  "bc-tank-9360": "9360",
  "cc-tee": "1717",
  "cc-long-sleeve": "6014",
  "cc-sweatshirt": "1566",
  "generic-tee": "5000",
  "generic-long-sleeve": "2400",
  "generic-baby-bodysuit": "4400",
};

const AUTH = "Basic " + Buffer.from(`${ACCOUNT}:${API_KEY}`).toString("base64");
const API = "https://api.ssactivewear.com/v2/products/";
const CDN = "https://cdn.ssactivewear.com/";

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchStyle(style) {
  const res = await fetch(`${API}?style=${encodeURIComponent(style)}`, {
    headers: { Authorization: AUTH, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API ${style} -> HTTP ${res.status}`);
  }
  return res.json();
}

async function downloadImage(relPath, destAbs) {
  // API returns medium (_fm); large is _fl
  const large = relPath.replace("_fm.", "_fl.");
  const url = CDN + large;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`img ${url} -> HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(destAbs), { recursive: true });
  await writeFile(destAbs, buf);
  return buf.length;
}

async function main() {
  const result = {};

  for (const [productId, style] of Object.entries(STYLE_MAP)) {
    process.stdout.write(`\n${productId} (style ${style}) … `);
    let skus;
    try {
      skus = await fetchStyle(style);
    } catch (err) {
      console.error(`FAILED: ${err.message}`);
      continue;
    }

    const seen = new Map();
    for (const sku of skus) {
      const name = sku.colorName;
      if (!name || seen.has(name)) continue;
      const front = sku.colorFrontImage;
      if (!front) continue;
      seen.set(name, {
        hex: sku.color1 || sku.colorSwatchTextColor || "#cccccc",
        front,
      });
    }

    const colors = [];
    for (const [name, info] of seen) {
      const slug = slugify(name);
      const rel = `/blanks/${productId}/${slug}.jpg`;
      const abs = join(PUBLIC_BLANKS, productId, `${slug}.jpg`);
      try {
        await downloadImage(info.front, abs);
        colors.push({ name, hex: info.hex, image: rel });
      } catch (err) {
        console.error(`\n  img fail ${name}: ${err.message}`);
      }
    }

    result[productId] = colors;
    process.stdout.write(`${colors.length} colors`);
  }

  await writeFile(OUT_JSON, JSON.stringify(result, null, 2));
  console.log(`\n\nWrote ${OUT_JSON}`);
  console.log("Done. Review images in public/blanks/ and run the catalog update.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
