import { defineConfig } from "tsup"

export default defineConfig({
  format: ["cjs", "esm"],
  target: "es5",
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
  outDir: "./",
  entry: {
    "app/dist/index": "./app/index.ts",
    "auth/dist/index": "./auth/index.ts",
    "charts/dist/index": "./charts/index.ts",
    "packages/dist/index": "./packages/index.ts",
    "amdb/dist/index": "./amdb/index.ts",
    "weather/dist/index": "./weather/index.ts",
  },
})
