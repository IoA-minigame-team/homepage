// GitHub Pages は Brotli (.br) ファイルに Content-Encoding ヘッダーを付けないため、
// Unity の Brotli 圧縮ビルドはそのままでは読み込めない。
// public/game/*/Build/*.br を展開して非圧縮ファイルを隣に書き出す（dev / build 前に自動実行）。
// ※ 各ゲームの index.html は .br を外したファイル名を参照すること。
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { brotliDecompressSync } from "node:zlib";
import path from "node:path";

const GAME_DIR = "public/game";

for (const game of await readdir(GAME_DIR, { withFileTypes: true })) {
  if (!game.isDirectory()) continue;
  const buildDir = path.join(GAME_DIR, game.name, "Build");
  const files = await readdir(buildDir).catch(() => []);

  for (const file of files.filter((f) => f.endsWith(".br"))) {
    const src = path.join(buildDir, file);
    const dst = src.slice(0, -".br".length);
    const [s, d] = await Promise.all([stat(src), stat(dst).catch(() => null)]);
    if (d && d.mtimeMs >= s.mtimeMs) continue;

    await writeFile(dst, brotliDecompressSync(await readFile(src)));
    console.log(`decompressed ${dst}`);
  }
}
