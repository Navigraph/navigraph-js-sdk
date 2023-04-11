/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  displayName: "Auth",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["jest-localstorage-mock"],
};
