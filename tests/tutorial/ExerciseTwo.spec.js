import { test, expect } from "@playwright/test";

test("Exercise Two", async ({ page }) => {
  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // check if page is correct
  await expect(page).toHaveTitle("Let's Shop");

  // elements
  const products = await page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "daniel@alex.com";

  // login
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Tester135.");
  await page.locator("#login").click();

  // wait for page and cards to load
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  // get the count after the page loads
  const count = await products.count();

  // add any item to cart (or more items)
  for (let i = 0; i < count; ++i) {
    // search for the product with the desired name
    const currentName = await products.nth(i).locator("b").textContent();
    if (currentName.trim() === productName) {
      // add to card
      await products.nth(i).locator("text= Add To Cart").click();
      // stops the loop if it finds the desired product (so that it not loops on the remaining products)
      break;
    }
  }

  // go to the cart
  await page.locator("[routerlink*='cart']").click();

  // wait for the items to load
  await page.locator("div li").first().waitFor();

  // make sure the proper item appears in the cart
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  // checkout
  await page.locator("text='Checkout'").click();

  // enter checkout details (country)
  await page.locator("[placeholder*='Country']").pressSequentially("rom"); // type r o m, 1 by 1 to make dropdown appear
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === "Romania") {
      await dropdown.locator("button").nth(i).click();
    }
  }

  // check the correct email in checkout details
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  // apply coupon (rahulshettyacademy)
  await page.locator("[name='coupon']").fill("rahulshettyacademy");
  await page.locator("[type='submit']").click();
  await page.locator(".mt-1.ng-star-inserted").waitFor();

  // place order
  await page.locator(".action__submit").click();

  // get the proper text and get the transaction uuid
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  console.log(orderId);

  // go to orders history page
  await page.locator("button[routerlink*='myorders']").click();

  // await page.waitForLoadState("networkidle");
  await page.locator("tbody").first().waitFor();

  // look for you order and press on view
  const rows = await page.locator("tbody tr");
  const countRow = await rows.count();

  let test = [];

  // loop through all ids
  for (let i = 0; i < countRow; ++i) {
    // get the ids
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      // click on the id of the newly bought item
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  // check that the same info is present there
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
