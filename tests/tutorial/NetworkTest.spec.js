const { test, request } = require("@playwright/test");
const { APIUtils } = require("../../utils/APIUtils");

// // login
const loginPayLoad = { userEmail: "daniel@alex.com", userPassword: "Tester135." };
const orderPayLoad = { orders: [{ country: "Romania", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePaloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  // login API
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Fake response", async ({ page }) => {
  // insert the token to skip authentication
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // intercepting response - API response -> {playwright fakeresponse } browser -> render data on front-end
  await page.route("**/api/ecom/order/get-orders-for-customer/**", async (route) => {
    let body = JSON.stringify(fakePaloadOrders);
    const response = await page.request.fetch(route.request());
    route.fulfill({
      response,
      body,
    });
  });

  // go to orders history page
  await page.locator("button[routerlink*='myorders']").click();

  await page.waitForResponse("**/api/ecom/order/get-orders-for-customer/**");
});
