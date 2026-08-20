export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    // this.productsText = products.nth(i).locator("b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProduct(productName) {
    // const titles = await this.productsText.textContent();

    // get the count after the page loads
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
      // search for the product with the desired name
      const currentName = await this.products.nth(i).locator("b").textContent();
      if (currentName.trim() === productName) {
        // add to card
        await this.products.nth(i).locator("text= Add To Cart").click();
        // stops the loop if it finds the desired product (so that it not loops on the remaining products)
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
