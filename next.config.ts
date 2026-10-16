import type { NextConfig } from "next";

// GitHub Pages のプロジェクトページ (https://<org>.github.io/homepage/) 用。
// 独自ドメインやローカル確認でルート直下に置く場合は NEXT_PUBLIC_BASE_PATH="" を指定する。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/homepage";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    // 親ディレクトリにある別の lockfile を誤検出しないようにする
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
