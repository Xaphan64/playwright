import { Page } from "@playwright/test";
import { CartPage } from "./CartPage.ts";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  ordersHistoryPage: OrdersHistoryPage;
  ordersReviewPage: OrdersReviewPage;
  cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}
