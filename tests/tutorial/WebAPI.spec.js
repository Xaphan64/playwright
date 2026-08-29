import { test, expect, request } from "@playwright/test";

// login
const loginPayLoad = { userEmail: "daniel@alex.com", userPassword: "Tester135." };
const orderPayLoad = { orders: [{ country: "Romania", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let token;
let orderId;

test.beforeAll(async () => {
  // login API
  const apiContext = await request.newContext();

  // await the post first
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayLoad,
  });

  // assert the resolved response
  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJsaon = await loginResponse.json();

  // give value to the token
  token = loginResponseJsaon.token;

  // precondition - create order trough API
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data: orderPayLoad,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const orderResponseJson = await orderResponse.json();

  orderId = orderResponseJson.orders[0];
});

test("@API Login", async ({ page }) => {
  // insert the token to skip authentication
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // go to orders history page
  await page.locator("button[routerlink*='myorders']").click();

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

  // check that the created order exists in the orders
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
