import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  format: ["cjs", "esm"],
  target: "es5",
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` };
  },
});
