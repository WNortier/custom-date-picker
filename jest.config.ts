import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest", // specify a preset for Jest to understand we are working with TS code
    testEnvironment: "node",
    verbose: true, // shows additional output
    collectCoverage: true, // collect coverage information
};

export default config;