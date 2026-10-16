// assets/images 以下の元画像を WebP に変換して public/images に出力する。
// 使い方: npm run images
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/images";
const OUT = "public/images";
const MAX_WIDTH = 1600;
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let count = 0;
for await (const file of walk(SRC)) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext)) continue;

  const rel = path.relative(SRC, file);
  const out = path.join(OUT, rel.slice(0, -ext.length) + ".webp");

  // 変換済みで元画像より新しければスキップ
  const [src, dst] = await Promise.all([stat(file), stat(out).catch(() => null)]);
  if (dst && dst.mtimeMs >= src.mtimeMs) continue;

  await mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${rel} -> ${path.relative(OUT, out)} (${Math.round(src.size / 1024)}KB -> ${Math.round(info.size / 1024)}KB)`);
  count++;
}
console.log(`done: ${count} file(s) converted`);
