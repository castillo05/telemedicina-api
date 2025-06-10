// jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      // functions: 80,
      lines: 80,
      // statements: 80,
    },
  },
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'html', 'lcov'],
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/src/main.ts',
    '!**/*.module.ts',
    '!**/src/**/dto/**',
    '!**/src/**/orm-entity.ts',
    '!**/src/**/migrations/**',
    '!**/src/**/interfaces/**',
    '!**/*.spec.ts',
  ],
  testEnvironment: 'node',
};
