import { test, expect } from "@playwright/test";

test("get all products", async ({ request }) => {
  // get the response
  const response = await request.get("https://dummyjson.com/products");

  // check if the response is ok
  expect(response.status()).toBe(200);

  // get the body
  const body = await response.json();
  console.log(body);

  // check if the list is not empty
  expect(body.products.length).toBeGreaterThan(0);

  // check body limit
  expect(body.limit).toBe(30);

  // check product to have title and price properties
  expect(body.products[0]).toHaveProperty("title");
  expect(body.products[0]).toHaveProperty("price");
});

test("Get product by id", async ({ request }) => {
  // get the response
  const response = await request.get("https://dummyjson.com/products/1");

  // check if response is ok
  expect(response.ok()).toBeTruthy();

  // get the product
  const product = await response.json();

  // check the id and title
  expect(product.id).toBe(1);
  expect(product.title).toBeDefined();
});

test("create product", async ({ request }) => {
  // post a new product
  const response = await request.post("https://dummyjson.com/products/add", {
    data: {
      title: "Gaming Keyboard",
      price: 120,
    },
  });

  // check if response is ok
  expect(response.status()).toBe(201);

  // get the product
  const product = await response.json();

  // verify if the product was created with the proper data
  expect(product.title).toBe("Gaming Keyboard");
  expect(product.price).toBe(120);
});

test("Update product", async ({ request }) => {
  // get the response and update the product's price
  const response = await request.put("https://dummyjson.com/products/1", {
    data: {
      price: 150,
    },
  });

  // check if response is ok
  expect(response.ok()).toBeTruthy();

  // get the product
  const product = await response.json();

  // check if product was updated
  expect(product.price).toBe(150);
});

test("Delete product", async ({ request }) => {
  // delete the product
  const response = await request.delete("https://dummyjson.com/products/1");

  // check if response is ok
  expect(response.ok()).toBeTruthy();

  // get the product
  const product = await response.json();

  // check if product is deleted
  expect(product.isDeleted).toBe(true);
});

test("Search products", async ({ request }) => {
  // get the category
  const response = await request.get("https://dummyjson.com/products/search?q=phone");

  // check if response is ok
  expect(response.ok()).toBeTruthy();

  // get the product
  const body = await response.json();

  // check if the phone list is populated
  expect(body.products.length).toBeGreaterThan(0);
});

test("Login", async ({ request }) => {
  // post the login data
  const response = await request.post("https://dummyjson.com/auth/login", {
    data: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  // check if response is ok
  expect(response.ok()).toBeTruthy();

  // get the user
  const user = await response.json();

  // check if data is correct
  expect(user.username).toBe("emilys");
  expect(user.accessToken).toBeTruthy();
});
