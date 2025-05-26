// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  retries : 1,

  timeout: 30 * 1000,

  expect: {
    timeout: 4000, // Adjusted for better practical use
  },

  reporter: 'html',
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on', // currently it will generate traces only on failure, we can change it to off also
        ...devices['iPhone 11']
      }
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        permissions : ['geolocation'],
        video: 'retain-on-failure',
        trace: 'on', // currently it will generate traces only on failure, we can change it to off also
        // viewport : {width:720, height: 720}
        // ...devices['iPhone 11']
      }
    }
  ]


});

export default config;  // For ES Modules
// module.exports = config; // Use this for CommonJS if needed
