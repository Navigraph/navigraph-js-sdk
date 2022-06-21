import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacyPlugin from "vite-plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "navigraph-ingamepanels-demo/html_ui/IngamePanels/NavigraphDemoPanel",
  },
  plugins: [
    react(),
    legacyPlugin({
      targets: ["safari 10", "ie 11"],
      // When true, core-js@3 modules are inlined based on usage.
      // When false, global namespace APIs (eg: Object.entries) are loaded
      // from the Polyfill.io server.
      corejs: false,
    }),
  ],
});
