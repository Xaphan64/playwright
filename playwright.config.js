// @ts-check
import { defineConfig, devices } from "@playwright/test";

// const config = {
//   testDir: "./tests",
//   // change the timeout here if needed
//   timeout: 20 * 1000,
//   expect: {
//     timeout: 5000,
//   },
//   reporter: "html",

//   use: {
//     browserName: "chromium",
//     screenshot: "on",
//     trace: "retain-on-failure",

//     launchOptions: {
//       headless: false, // set to true to run without opening the browser window
//     },
//   },
// };

// module.exports = config;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 20 * 1000,
  expect: { timeout: 5000 },
  reporter: "html",

  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        screenshot: "on",
        trace: "retain-on-failure",
        launchOptions: { headless: false },
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        screenshot: "on",
        trace: "retain-on-failure",
        launchOptions: { headless: false },
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        screenshot: "on",
        trace: "retain-on-failure",
        launchOptions: { headless: false },
      },
    },
    // mobile viewports using devices
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 13"] },
    // },
  ],
});
