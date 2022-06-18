import appPkg from "./app/package.json";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import { resolve } from "path";
import resolveModule from "@rollup/plugin-node-resolve";
import rollupTypescriptPlugin from "rollup-plugin-typescript2";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "typescript";

const external = Object.keys(pkg.dependencies || {});
const plugins = [sourcemaps(), resolveModule(), json(), commonjs()];

const typescriptPlugin = rollupTypescriptPlugin({
  typescript,
});

/**
 * Individual Component Builds
 */
const appBuilds = [
  /**
   * App Browser Builds
   */
  {
    input: "app/index.ts",
    output: [
      { file: resolve("app", appPkg.main), format: "cjs", sourcemap: true },
      {
        file: resolve("app", appPkg.main.replace(".cjs.js", ".mjs")),
        format: "es",
        sourcemap: true,
      },
      { file: resolve("app", appPkg.browser), format: "es", sourcemap: true },
    ],
    plugins: [...plugins, typescriptPlugin],
    external: (id) =>
      external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
  },
];

const componentBuilds = pkg.components
  // The "app" component is treated differently because it doesn't depend on itself.
  .filter((component) => component !== "app")
  .map((component) => {
    const pkg = require(`./${component}/package.json`);
    return [
      {
        input: `${component}/index.ts`,
        output: [
          {
            file: resolve(component, pkg.main),
            format: "cjs",
            sourcemap: true,
          },
          {
            file: resolve(component, pkg.main.replace(".cjs.js", ".mjs")),
            format: "es",
            sourcemap: true,
          },
          {
            file: resolve(component, pkg.browser),
            format: "es",
            sourcemap: true,
          },
        ],
        plugins: [...plugins, typescriptPlugin],
        external: (id) =>
          external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      },
    ];
  })
  .reduce((a, b) => a.concat(b), []);

export default [...appBuilds, ...componentBuilds];
