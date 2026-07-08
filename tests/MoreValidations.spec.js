const { test, expect } = require("@playwright/test");

test("Back forward navigation", async ({ page }) => {
  // go to webpage
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");

  // go back the previous page
  await page.goBack();

  // or go forward
  await page.goForward();

  // go back
  await page.goBack();
});

test("Popup validation", async ({ page }) => {
  // go to webpage
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // check if the item exists
  await expect(page.locator("#displayed-text")).toBeVisible();

  // click on button to hide the element
  await page.locator("#hide-textbox").click();

  // check if the item was hidden
  await expect(page.locator("#displayed-text")).toBeHidden();

  // click on alert button
  await page.locator("#confirmbtn").click();

  // how to close out of scope elements (like alerts)
  page.on("dialog", (dialog) => dialog.accept()); // for OK
  //   page.on("dialog", (dialog) => dialog.dismiss()); // for Cancel

  // for hover
  await page.locator("#mousehover").hover();

  // iframe selection
});

test.only("iFrame validation", async ({ page }) => {
  // go to webpage
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // define a new const based on frameLocator
  const framesPage = page.frameLocator("#courses-iframe");

  // select the element that is visible
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();

  // get the elements text content
  const textCheck = await framesPage.locator(".text h2").textContent();

  // split to get the number of subscribers
  console.log(textCheck.split(" ")[1]);
});
