import type { Config } from '@jest/types';

export const baseJestConfig: Config.InitialOptions = {
  'preset': 'ts-jest',
  'clearMocks': true,
  'coverageDirectory': 'coverage',
  'testMatch': [
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ],
  'setupFiles': [
    '<rootDir>/tests/setupTests.ts'
  ]
}
