/** @type {import('jest').Config} */
const config = {
  // Use ts-jest to transpile TypeScript
  preset: 'ts-jest',

  // Run tests in a Node.js environment (API server, no browser DOM needed)
  testEnvironment: 'node',

  // Resolve @/* path aliases the same way tsconfig.json does
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Match test files in the __tests__ directory or co-located *.test.ts files
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],

  // Coverage configuration
  collectCoverageFrom: [
    'lib/**/*.ts',
    'app/api/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  coverageReporters: ['text', 'lcov'],

  // ts-jest options — inherit compiler options from tsconfig
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react',
          esModuleInterop: true,
        },
      },
    ],
  },
};

module.exports = config;
