const baseConfig = require('@kube-js/tscommons/configs/jest.config.js');

module.exports = {
  ...baseConfig,
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx|jsx|js)'],
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],
};
