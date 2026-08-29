import { test, expect, request } from "@playwright/test";
const { APIUtils } = require("../../utils/APIUtils");

// // login
const loginPayLoad = { userEmail: "daniel@alex.com", userPassword: "Tester135." };
const orderPayLoad = { orders: [{ country: "Romania", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

let response;

test.beforeAll(async () => {
  // login API
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("@API Login", async ({ page }) => {
  // insert the token to skip authentication
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

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
    if (response.orderId.includes(rowOrderId)) {
      // click on the id of the newly bought item
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  // check that the same info is present there
  const orderIdDetails = await page.locator(".col-text").textContent();

  // check that the created order exists in the orders
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
