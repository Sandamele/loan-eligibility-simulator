import type { Config } from "jest";
import { defaults } from "jest-config";
const config: Config = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  verbose: true,
  moduleDirectories: [...defaults.moduleDirectories, "bower_components"],
};

export default config;
