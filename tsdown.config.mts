import { defineConfig } from "tsdown"

export default defineConfig({
  entry: "src/index.ts",
  // The ESM build writes the one index.d.ts that both formats use.
  format: { cjs: { dts: false }, esm: {} },
  target: "es6",
  outExtensions: ({ format }) => ({ js: format === "cjs" ? ".cjs.js" : ".esm.js", dts: ".d.ts" }),
  sourcemap: false,
  dts: { sourcemap: false },
  // JSDoc stays in the declaration files for editors, not in the runtime code.
  outputOptions: { comments: { jsdoc: false, legal: true, annotation: true } },
  deps: {
    // devDependencies get bundled on purpose, such as axios into @navigraph/auth. This silences the hint about it.
    onlyBundle: false,
    // The declaration files have always imported axios types rather than inlining them.
    dts: { neverBundle: ["axios"] },
  },
})
