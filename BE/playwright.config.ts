import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for PlanA Backend E2E Tests
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for API tests
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Extra HTTP headers
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },

  // Configure projects for different test scenarios
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration - start the NestJS server before tests
  // Comment out if server is already running
  webServer: process.env.CI
    ? {
        command: 'npm run start:dev',
        url: 'http://localhost:3000',
        timeout: 120 * 1000,
        reuseExistingServer: false,
        stdout: 'ignore',
        stderr: 'pipe',
      }
    : undefined,

  // Output directory for test artifacts
  outputDir: 'playwright-artifacts',
});
