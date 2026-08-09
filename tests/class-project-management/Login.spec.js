const { test, expect } = require("@playwright/test");
import { Login, Register } from "./Elements";

let login;
let register;

test.beforeEach(async ({ page }) => {
  register = new Register(page);
  login = new Login(page);

  // navigate to home page
  await page.goto("https://project-management-lac.vercel.app/");

  // get title
  await expect(page).toHaveTitle("Project Management App");

  // go to register page and create new account
  await page.goto("https://project-management-lac.vercel.app/register");
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");
  await register.registerBtn.click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});

// Login valid scenarious
test("valid scenario", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test@test.com");
  await login.passField.fill("Tester135.");

  // click on submit
  await login.loginBtn.click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".header-logo").filter({ hasText: "PM APP" })).toBeVisible();
});

// invalid scenarios
test("email empty", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("");
  await login.passField.fill("Tester135.");

  // click on submit
  await login.loginBtn.click();

  // check if browser error message is present
  const message = await login.handleValidation(login.emailField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("wrong email format", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test.com");
  await login.passField.fill("Tester135.");

  // click on submit
  await login.loginBtn.click();

  // define the error message
  const message = await login.handleValidation(login.emailField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("wrong email", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test@t.com");
  await login.passField.fill("Tester135.");

  // click on submit
  await login.loginBtn.click();

  // check if browser error message is present
  expect(login.errorMessage).toBeVisible();
});

test("password empty", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test@test.com");
  await login.passField.fill("");

  // click on submit
  await login.loginBtn.click();

  // define the error message
  const message = await login.handleValidation(login.passField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("wrong password", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test@test.com");
  await login.passField.fill("Tester");

  // click on submit
  await login.loginBtn.click();

  // check if browser error message is present
  expect(login.errorMessage).toBeVisible();
});

test("wrong password & email", async ({ page }) => {
  // all inputs properly completed
  await login.emailField.fill("test@t.com");
  await login.passField.fill("Tester");

  // click on submit
  await login.loginBtn.click();

  // check if browser error message is present
  expect(login.errorMessage).toBeVisible();
});
