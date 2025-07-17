module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
    moduleNameMapper: {},
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
}