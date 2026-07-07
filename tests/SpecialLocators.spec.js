import { test, expect } from "@playwright/test";

test("Playwright Special locators", async ({ page }) => {
  // go to page
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  // get the item by label
  await page.getByLabel("Check me out if you Love IceCreams!").click();

  // get item by label and check if its radio
  await page.getByLabel("Employed").check();

  // get by label and select option for dropdown
  await page.getByLabel("Gender").selectOption("Female");

  // get item by placeholder
  await page.getByPlaceholder("Password").fill("whatever");

  // get by role and give the name of the button
  await page.getByRole("button", { name: "Submit" }).click();

  // get by text
  await page.getByText("Success! The Form has been submitted successfully!.").click();

  // get by role using a link
  await page.getByRole("link", { name: "Shop" }).click();

  // apply a filter when searching for items in a list
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
});
