import test, { expect } from "@playwright/test";

// use @Web then npx playwright test --grep @Web to run only test with @Web tag
test("@Web security test request intercept", async ({ page }) => {
  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // login
  await page.getByPlaceholder("email@example.com").fill("daniel@alex.com");
  await page.getByPlaceholder("enter your passsword").fill("Tester135.");
  await page.getByRole("button", { name: "Login" }).click();

  // wait for page and cards to load
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  // go to orders page
  await page.locator("button[routerlink*='myorders']").click();

  // change url
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", (route) =>
    route.continue({
      url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b5",
    }),
  );

  // click on view
  await page.locator("button:has-text('View')").first().click();

  // check the error message
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
