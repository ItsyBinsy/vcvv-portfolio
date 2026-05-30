import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const inputDir = 'public/images';
const QUALITY = 82;

function getFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(e =>
    e.isDirectory()
      ? getFiles(join(dir, e.name))
      : [join(dir, e.name)]
  );
}

const exts = new Set(['.png', '.jpg', '.jpeg']);
const files = getFiles(inputDir).filter(f => exts.has(extname(f).toLowerCase()));

let saved = 0;
let count = 0;

for (const file of files) {
  const outPath = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const originalSize = statSync(file).size;

  await sharp(file)
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const newSize = statSync(outPath).size;
  const reduction = Math.round((1 - newSize / originalSize) * 100);
  saved += originalSize - newSize;
  count++;
  console.log(`✓ ${basename(file)} → ${basename(outPath)}  ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB  (-${reduction}%)`);
}

console.log(`\nDone. ${count} images converted. Total saved: ${Math.round(saved/1024)}KB`);
