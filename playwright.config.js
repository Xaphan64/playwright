// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  // change the timeout here if needed
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: "html",

  use: {
    browserName: "chromium",
    launchOptions: {
      headless: false, // set to true to run without opening the browser window
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
};

module.exports = config;
