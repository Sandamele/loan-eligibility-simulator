import type { Config } from "jest";
import { defaults } from "jest-config";
const config: Config = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  verbose: true,
  moduleDirectories: [...defaults.moduleDirectories, "bower_components"],
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
