// One-off image optimizer: re-encodes large photographic assets to AVIF.
// Caps dimensions for oversized sources, preserves aspect ratio, never enlarges.
// Usage: node scripts/convert-images.mjs
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public", "images");

// maxWidth caps oversized sources; AVIF quality tuned for visual quality vs size.
const TARGETS = [
  { file: "hero-bg.png", maxWidth: 2400, quality: 60 },
  { file: "bg.png", maxWidth: 2400, quality: 58 },
  { file: "BimModelling.png", maxWidth: 2000, quality: 58 },
  { file: "DigitalTwin.png", maxWidth: 2000, quality: 58 },
  { file: "MasonryImage.png", maxWidth: 2000, quality: 58 },
  { file: "scan2bim.png", maxWidth: 2000, quality: 58 },
  { file: "slides/bim-arch-and-structure.png", maxWidth: 2400, quality: 60 },
  { file: "slides/scan-to-bim.png", maxWidth: 2400, quality: 60 },
  { file: "slides/masonry-shop-drawings.png", maxWidth: 2400, quality: 60 },
  { file: "slides/lgs.png", maxWidth: 2400, quality: 60 },
  { file: "LGSF_ProjectImages/1.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/2.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/3.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/4.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/5.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/6.jpeg", maxWidth: 2200, quality: 58 },
  { file: "LGSF_ProjectImages/7.jpeg", maxWidth: 2200, quality: 58 },
];

const kb = (b) => (b / 1024).toFixed(1);
let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const { file, maxWidth, quality } of TARGETS) {
  const src = path.join(ROOT, file);
  const out = src.replace(/\.(png|jpe?g)$/i, ".avif");
  const input = await readFile(src);
  const beforeMeta = await sharp(input).metadata();
  const before = (await stat(src)).size;

  const pipeline = sharp(input).rotate();
  if (beforeMeta.width > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const buf = await pipeline.avif({ quality, effort: 4 }).toBuffer();
  await writeFile(out, buf);
  const afterMeta = await sharp(buf).metadata();

  totalBefore += before;
  totalAfter += buf.length;
  rows.push({
    file,
    beforeKB: kb(before),
    afterKB: kb(buf.length),
    dims: `${beforeMeta.width}x${beforeMeta.height} -> ${afterMeta.width}x${afterMeta.height}`,
    saved: `${(100 - (buf.length / before) * 100).toFixed(1)}%`,
  });
}

console.table(rows);
console.log(`TOTAL before: ${kb(totalBefore)} KB`);
console.log(`TOTAL after:  ${kb(totalAfter)} KB`);
console.log(`TOTAL saved:  ${kb(totalBefore - totalAfter)} KB (${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%)`);
