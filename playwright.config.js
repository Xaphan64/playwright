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

file: module.exports = defineConfig({
  testDir: "./tests",
  timeout: 20 * 1000,
  expect: { timeout: 5000 },
  reporter: "html",
  retries: 1, // if the test fail it will retry 1 time
  workers: 1, // test will run only one after another (if you put 3 it will run 3 tests in paralel)

  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        screenshot: "on",
        video: "retain-on-failure",
        // trace: "on",
        trace: "retain-on-failure",
        launchOptions: { headless: false },
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
      },
    },
    // {
    //   name: "Firefox",
    //   use: {
    //     browserName: "firefox",
    //     screenshot: "on",
    //     trace: "retain-on-failure",
    //     launchOptions: { headless: false },
    //   },
    // },
    // {
    //   name: "WebKit",
    //   use: {
    //     browserName: "webkit",
    //     screenshot: "on",
    //     trace: "retain-on-failure",
    //     launchOptions: { headless: false },
    //   },
    // },
    // mobile viewports using devices
    //   {
    //     name: "Mobile Chrome",
    //     use: { ...devices["Pixel 5"], launchOptions: { headless: false } },
    //   },
    //   {
    //     name: "Mobile Safari",
    //     use: { ...devices["iPhone 13"], launchOptions: { headless: false } },
    //   },
  ],
});
