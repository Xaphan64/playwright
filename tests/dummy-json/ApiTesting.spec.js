const { test, expect, request } = require("@playwright/test");

const loginInfo = { userEmail: "daniel@alex.com", userPassword: "Tester135." };

let token;

// login
test.beforeAll(async () => {
  // create context
  const apiContext = await request.newContext();

  // post the data to login
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginInfo,
  });

  // check if the response is 200
  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();

  // get the token
  token = loginResponseJson.token;
});

test("Login", async ({ page }) => {
  // insert the token to skip authentication
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  console.log(`test`);
});
