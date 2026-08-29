import { test, expect } from "@playwright/test";

// declare global
let emailField;
let passField;
let loginBtn;
let redirectBtn;
let errorMessage;

async function handleValidation(field) {
  return await field.evaluate((el) => el.validationMessage);
}

test.beforeEach(async ({ page }) => {
  // navigate to home page
  await page.goto("https://project-management-lac.vercel.app/");

  // get title
  await expect(page).toHaveTitle("Project Management App");

  // go to login page to start creating a new account
  await page.goto("https://project-management-lac.vercel.app/login");

  // get all elements
  emailField = page.getByPlaceholder("Email");
  passField = page.getByPlaceholder("Password");
  loginBtn = page.getByRole("button", { name: "Login" });
  redirectBtn = page.getByRole("button", { name: "No account? Register" });
  errorMessage = page.locator(".error-message");

  // go to register page and create new account
  await page.goto("https://project-management-lac.vercel.app/register");
  await page.locator("[name='username']").fill("Daniel");
  await page.locator("[name='email']").fill("test@test.com");
  await page.locator("[name='password']").fill("Tester135.");
  await page.locator("[name='confirmPassword']").fill("Tester135.");
  await page.getByRole("button", { name: "Create Account" }).click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});

// Login valid scenarious
test("valid scenario", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test@test.com");
  await passField.fill("Tester135.");

  // click on submit
  await loginBtn.click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".header-logo").filter({ hasText: "PM APP" })).toBeVisible();
});

// invalid scenarios
test("email empty", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("");
  await passField.fill("Tester135.");

  // click on submit
  await loginBtn.click();

  // check if browser error message is present
  const message = await handleValidation(emailField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("wrong email format", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test.com");
  await passField.fill("Tester135.");

  // click on submit
  await loginBtn.click();

  // define the error message
  const message = await handleValidation(emailField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("wrong email", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test@t.com");
  await passField.fill("Tester135.");

  // click on submit
  await loginBtn.click();

  // check if browser error message is present
  expect(errorMessage).toBeVisible();
});

test("password empty", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test@test.com");
  await passField.fill("");

  // click on submit
  await loginBtn.click();

  // define the error message
  const message = await handleValidation(passField);

  // check if browser error message is present
  expect(message).toBeTruthy();
});

test("wrong password", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test@test.com");
  await passField.fill("Tester");

  // click on submit
  await loginBtn.click();

  // check if browser error message is present
  expect(errorMessage).toBeVisible();
});

test("wrong password & email", async ({ page }) => {
  // all inputs properly completed
  await emailField.fill("test@t.com");
  await passField.fill("Tester");

  // click on submit
  await loginBtn.click();

  // check if browser error message is present
  expect(errorMessage).toBeVisible();
});
