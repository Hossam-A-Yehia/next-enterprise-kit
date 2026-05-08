import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webAppRoot = path.join(__dirname, "../../apps/web");

/**
 * Shared flat ESLint config for Next.js apps and TypeScript packages.
 * `next.rootDir` points at the real Next app so workspace packages do not
 * trigger the pages-directory warning from `eslint-config-next`.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: webAppRoot,
      },
    },
  },
  {
    files: ["**/packages/*/src/**/*.{ts,tsx,mts}", "**/packages/*/**/*.{mjs,cjs}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts"]),
]);
