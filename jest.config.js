const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['types', 'index.ts'],
  testMatch: ['**/*.test.ts'],
  setupFiles: ['<rootDir>/tests/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/prisma.ts'],
};

module.exports = config;
