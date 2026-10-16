import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Unity のビルド成果物などの静的ファイル
    "public/**",
  ]),
  {
    rules: {
      // 静的書き出しのため next/image の最適化は使えない（画像は scripts/optimize-images.mjs で事前に WebP 化）
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
