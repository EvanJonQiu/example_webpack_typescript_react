import type { Config } from "jest";

const config: Config = {
  rootDir: "./src",
  roots: ["<rootDir>/__test__/"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "__test__/(.+)\\.test\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    ".+\\.(css|less|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.tsx",
    "^@app/(.*)$": "<rootDir>/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"]
};

export default config;
