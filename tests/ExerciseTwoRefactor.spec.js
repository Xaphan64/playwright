const { test, expect } = require("@playwright/test");

test("Exercise Two refactored", async ({ page }) => {
  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // check if page is correct
  await expect(page).toHaveTitle("Let's Shop");

  // elements
  const productName = "ADIDAS ORIGINAL";
  const email = "daniel@alex.com";

  // login
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Tester135.");
  await page.getByRole("button", { name: "Login" }).click();

  // wait for page and cards to load
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  // get the item and add to cart
  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add to Cart" })
    .click();

  // go to the cart
  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

  // wait for the items to load
  await page.locator("div li").first().waitFor();

  // make sure the proper item appears in the cart
  const bool = await page.getByText(productName).isVisible();
  expect(bool).toBeTruthy();

  // checkout
  await page.getByRole("button", { name: "Checkout" }).click();

  // enter checkout details (country)
  await page.getByPlaceholder("Select Country").pressSequentially("rom");
  await page.getByRole("button", { name: "Romania" }).click();

  // check the correct email in checkout details
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  // apply coupon (rahulshettyacademy)
  await page.locator("[name='coupon']").fill("rahulshettyacademy");
  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await page.getByText("* Coupon Applied").waitFor();

  // place order
  await page.getByText("Place Order ").click();

  // await page.pause();

  // get the proper text and get the transaction uuid
  expect(page.getByText(" Thankyou for the order.")).toBeVisible();
  const rawLabel = await page.locator("label.ng-star-inserted").textContent();
  const orderId = rawLabel.replace(/\|/g, "").trim();
  console.log(orderId);

  // go to orders history page
  await page.getByText("Orders History Page").click();

  await page.waitForLoadState("networkidle");
  await page.locator("tbody").first().waitFor();

  // // look for you order and press on view
  await page.locator("tr").filter({ hasText: orderId }).getByRole("button", { name: "View" }).click();

  // check that the same info is present there
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
