const withTM = require("next-transpile-modules")([
  "navigraph",
  "@navigraph/app",
  "@navigraph/auth",
  "@navigraph/charts",
  "@navigraph/weather",
]);

module.exports = withTM({
  reactStrictMode: true,
});
