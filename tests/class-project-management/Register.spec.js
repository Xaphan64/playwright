import { test, expect } from "@playwright/test";
import { PageManager } from "./PageManager";

let register;

test.beforeEach(async ({ page }) => {
  register = new PageManager(page).getRegisterPage();

  // navigate to home page
  await page.goto("https://project-management-lac.vercel.app/");

  // get title
  await expect(page).toHaveTitle("Project Management App");

  // go to register page to start creating a new account
  await page.goto("https://project-management-lac.vercel.app/register");
});

// Register valid scenarios
test("valid scenario", async ({ page }) => {
  // all inputs properly completed
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");

  // click on submit
  await register.registerBtn.click();

  // check if redirected to login page after succesfully registered
  await expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});

// Register invalid scenarios
test("username empty", async ({ page }) => {
  // fill email and password fields
  await register.usernameField.fill("");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // define the error message
  const message = await register.handleValidation(register.usernameField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("email empty", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // define the error message
  const message = await register.handleValidation(register.emailField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("wrong email format", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // define the error message
  const message = await register.handleValidation(register.emailField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("empty password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("");
  await register.confirmPassField.fill("Tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // define the error message
  const message = await register.handleValidation(register.passField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("short password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Test12.");
  await register.confirmPassField.fill("Test12.");

  // press submit button to register
  await register.registerBtn.click();

  // check if the proper error appears
  await expect(register.wrongPassError).toBeVisible();
});

test("no uppercase password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("tester135.");
  await register.confirmPassField.fill("tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // check if the proper error appears
  await expect(register.wrongPassError).toBeVisible();
});

test("no loweracse password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("TESTER135.");
  await register.confirmPassField.fill("TESTER135.");

  // press submit button to register
  await register.registerBtn.click();

  // check if the proper error appears
  await expect(register.wrongPassError).toBeVisible();
});

test("no digit password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("TesterTest");
  await register.confirmPassField.fill("TesterTest");

  // press submit button to register
  await register.registerBtn.click();

  // check if the proper error appears
  await expect(register.wrongPassError).toBeVisible();
});

test("empty confirm password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("");

  // press submit button to register
  await register.registerBtn.click();

  // define the error message
  const message = await register.handleValidation(register.confirmPassField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("confirm password not the same with password", async ({ page }) => {
  // fill username and password fields
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("tester135.");

  // press submit button to register
  await register.registerBtn.click();

  // check if the proper error appears
  await expect(register.matchPassError).toBeVisible();
});

test("redirect button test", async ({ page }) => {
  // redirect to login page
  await register.redirectBtn.click();

  // check if the user was redirected
  await expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});
