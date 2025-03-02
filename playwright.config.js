// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  
  timeout: 30 * 1000,

  expect: {
    timeout: 4000, // Adjusted for better practical use
  },

  reporter: 'html',

  use: {
    browserName: 'firefox',
    headless : false
  },
});

export default config;  // For ES Modules
// module.exports = config; // Use this for CommonJS if needed
