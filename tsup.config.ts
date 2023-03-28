import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  format: ["cjs", "esm"],
  target: "es6",
  noExternal: ["axios", "@navigraph/pkce"],
  outExtension: (ctx) => ({ js: `.${ctx.format}.js` }),
});
