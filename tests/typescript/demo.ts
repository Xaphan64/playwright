import { Locator, Page } from "@playwright/test";

let message1: string = "Hello";
message1 = "text";

let age1: number = 20;
let isActive: boolean = false;

let numberArray: number[] = [1, 2, 3];

let data: any = "this could be anything";
data = 42;

function add(a: number, b: number): number {
  return a + b;
}

let user: { name: string; age: number } = { name: "bob", age: 34 };

export class CartPage {
  page: Page;
  cartProducts: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;
  checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }
}
