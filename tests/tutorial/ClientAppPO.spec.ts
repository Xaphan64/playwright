import { expect, test } from "@playwright/test";
import { customtest } from "../../tests/typescript/utils_ts/test-base";
import { POManager } from "../typescript/pageobjects_ts/POManager";
import testData from "../../utils/placeorderTestData.json";

for (const data of testData) {
  // use @Web then npx playwright test --grep @Web to run only test with @Web tag

  test(`@Web Client App login ${data.productName} in typscript`, async ({ page }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("rom", "Romania");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId ?? "");
    expect(orderId?.includes((await ordersHistoryPage.getOrderId()) ?? "")).toBeTruthy();
  });
}

customtest("Client App login in typescript", async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});
