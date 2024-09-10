const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  testMatch: ['**/*.test.ts'],
};

module.exports = config;
