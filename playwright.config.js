// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  retries : 1,
  workers : 5,
  timeout: 60 * 1000,

  expect: {
    timeout: 4000, // Adjusted for better practical use
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on', // currently it will generate traces only on failure, we can change it to off also
  },
});

export default config;  // For ES Modules
// module.exports = config; // Use this for CommonJS if needed
