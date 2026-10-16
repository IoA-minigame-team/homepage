// out/ を GitHub Pages と同じ basePath (/homepage/) 付きで配信するローカル確認用サーバー
// 使い方: npm run build && npm run preview → http://localhost:4173/homepage/
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/homepage";
const ROOT = path.resolve("out");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".wasm": "application/wasm",
  ".mp4": "video/mp4", ".woff2": "font/woff2", ".data": "application/octet-stream",
};

async function resolve(urlPath) {
  const file = path.join(ROOT, decodeURIComponent(urlPath));
  if (!file.startsWith(ROOT)) return null;
  const s = await stat(file).catch(() => null);
  if (s?.isFile()) return file;
  if (s?.isDirectory()) return resolve(path.posix.join(urlPath, "index.html"));
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/" || pathname === BASE) {
    res.writeHead(302, { Location: `${BASE}/` }).end();
    return;
  }
  const file = pathname.startsWith(`${BASE}/`) ? await resolve(pathname.slice(BASE.length)) : null;
  if (!file) {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    createReadStream(path.join(ROOT, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`preview: http://localhost:${PORT}${BASE}/`));
