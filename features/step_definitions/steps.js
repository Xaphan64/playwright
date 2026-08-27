// const { When, Then } = require("@cucumber/cucumber");
// import { POManager } from "../../tests/typescript/pageobjects_ts/POManager";
// const { expect } = require("@playwright/test");
// const playwright = require("@playwright/test");

import { When, Then, Given } from "@cucumber/cucumber";
import { POManager } from "../../pageobjects/POManager.js";
import { expect, chromium } from "@playwright/test";

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  },
);

When("Add {string} to cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("Enter valid details and place the order", async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("rom", "Romania");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order in present in the OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId ?? "");
  expect(this.orderId?.includes((await ordersHistoryPage.getOrderId()) ?? "")).toBeTruthy();
});
