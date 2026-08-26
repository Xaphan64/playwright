import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  products: Locator;
  orders: Locator;
  cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    // this.productsText = products.nth(i).locator("b");]
    this.orders = page.locator("button[routerlink*='myorders']");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName: string) {
    // const titles = await this.productsText.textContent();

    // get the count after the page loads
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
      // search for the product with the desired name
      const currentName = await this.products.nth(i).locator("b").textContent();
      if (currentName?.trim().toLowerCase() === productName.toLowerCase()) {
        console.log(`Match found for ${productName}, clicking Add To Cart`);
        // add to card
        // await this.products.nth(i).locator("text= Add To Cart").click();
        await this.products.nth(i).getByRole("button", { name: "Add To Cart" }).click();
        await this.page.waitForLoadState("networkidle");
        // stops the loop if it finds the desired product (so that it not loops on the remaining products)
        break;
      }
    }
  }

  async navigateToOrders() {
    await this.orders.click();
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
