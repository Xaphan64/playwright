const { test, expect } = require("@playwright/test");

test("Project Management App", async ({ page }) => {
  // navigate to home page
  await page.goto("https://project-management-lac.vercel.app/");

  // get title
  await expect(page).toHaveTitle("Project Management App");

  // go to register page to start creating a new account
  await page.goto("https://project-management-lac.vercel.app/register");

  // css, fill username, email and password fields
  await page.locator("[type='text']").fill("Daniel");
  await page.locator("[type='email']").fill("test@test.com");
  await page.locator("[name='password']").fill("Tester135.");
  await page.locator("[name='confirmPassword']").fill("Tester135.");

  // press submit button to register
  await page.locator("[type='submit']").click();

  // go back to login page
  await page.goto("https://project-management-lac.vercel.app/login");

  // login
  await page.locator("[type='email']").fill("test@test.com");
  await page.locator("[type='password']").fill("Tester135.");
  await page.locator("[type='submit']").click();

  // succesfully logged in check
  await expect(page.locator(".header-page-title")).toContainText("Dashboard Page");
});
