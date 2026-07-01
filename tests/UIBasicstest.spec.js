const { test, expect } = require("@playwright/test");

test("browser context test", async ({ browser }) => {
  // opens fresh browser (like incognito without cookies)
  const context = await browser.newContext();

  // creates a new page (tab)
  const page = await context.newPage();

  // navigate to the desired page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("page playwright test", async ({ page }) => {
  // navigate to the desired page
  await page.goto("https://google.com");

  // get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
