const { test, expect, request } = require("@playwright/test");

const loginInfo = { userEmail: "daniel@alex.com", userPassword: "Tester135." };

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

  const loginResponseJson = loginResponse.json();

  // get the token
  const token = loginResponseJson.token;
});
