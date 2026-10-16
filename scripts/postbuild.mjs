// prepare-unity.mjs で展開済みの .br は配信に不要なので out/ から取り除く（Pages の容量節約）
import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const OUT_GAME = "out/game";
for (const game of await readdir(OUT_GAME, { withFileTypes: true }).catch(() => [])) {
  if (!game.isDirectory()) continue;
  const buildDir = path.join(OUT_GAME, game.name, "Build");
  for (const file of await readdir(buildDir).catch(() => [])) {
    if (file.endsWith(".br")) await rm(path.join(buildDir, file));
  }
}
