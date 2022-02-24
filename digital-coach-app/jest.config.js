const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

module.exports = createJestConfig({
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup jest

  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Don't test any next tests or tests in the modules

  transform: {
    "^.+\\.(js|jsx|tsx)$": "<rootDir>/node_modules/babel-jest", // babel .js or .jsx files
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub", // anything style related is ignored and mapped to jest-transform-stub module
  },
  globalSetup: "<rootDir>/specs/jestGlobalSetup.ts",

  moduleNameMapper: {
    "@App/(.*)": "<rootDir>/$1",
  },
});
