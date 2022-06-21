const BABEL_ENV = process.env.BABEL_ENV;
const cjs = BABEL_ENV !== undefined && BABEL_ENV === "cjs";

module.exports = {
  plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        modules: cjs ? "commonjs" : false,
        loose: true,
      },
    ],
  ],
};
