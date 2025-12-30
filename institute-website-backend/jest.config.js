module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'models/**/*.js',
    'services/**/*.js',
    'routes/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!tests/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 60000, // Increased timeout for property tests
  maxWorkers: 1, // Run tests sequentially to avoid MongoDB connection issues
  forceExit: true, // Force Jest to exit after tests complete
  detectOpenHandles: true, // Detect handles that prevent Jest from exiting
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};