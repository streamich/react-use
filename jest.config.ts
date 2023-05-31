import { baseJestConfig } from "./jest.config.base";
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  ...baseJestConfig,
  testEnvironment: "jsdom", // browser-like
  testEnvironmentOptions: {
    worker: {
      repeatLimit: 3,
    },
  },
};

export default config;
