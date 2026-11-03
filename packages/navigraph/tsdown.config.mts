import { defineConfig } from "tsdown"

const subpackages = ["app", "auth", "charts", "packages", "amdb", "weather"]

export default defineConfig({
  entry: Object.fromEntries(subpackages.map(name => [`${name}/dist/index`, `./${name}/index.ts`])),
  format: { cjs: { dts: false }, esm: {} },
  target: "es2015",
  outExtensions: ({ format }) => ({ js: format === "cjs" ? ".cjs.js" : ".esm.js", dts: ".d.ts" }),
  outDir: ".",
  // The output directory is the package itself, so cleaning it would delete the sources.
  clean: false,
  sourcemap: false,
  dts: { sourcemap: false },
  hash: false,
})
