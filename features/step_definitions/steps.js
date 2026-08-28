import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    //js file- Login js, DashboardPage

    this.dashboardPage = this.poManager.getDashboardPage();
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password);
  },
);

When("Add {string} to cart", async function (productName) {
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("Enter valid details and place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("rom", "Romania");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order in present in the OrderHistory", async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId ?? "");
  expect(this.orderId?.includes((await ordersHistoryPage.getOrderId()) ?? "")).toBeTruthy();
});

Given("a login to Ecommerce2 application with {string} and {string}", async function (username, password) {
  const userName = this.page.locator("#username");
  const passWord = this.page.locator("[type='password']");
  const signBtn = this.page.locator("#signInBtn");

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  // css (old method with type, use fill)
  await userName.fill(username);
  await passWord.fill(password);
  await signBtn.click();
});

Then("Verify Error message is displayed", async function () {
  // check that you get an error
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
