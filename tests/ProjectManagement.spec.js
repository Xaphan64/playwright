const { test, expect } = require("@playwright/test");

// declare global
let usernameField;
let emailField;
let passField;
let confirmPassField;
let registerBtn;
let redirectBtn;

async function handleValidation(field) {
  return await field.evaluate((el) => el.validationMessage);
}

test.beforeEach(async ({ page }) => {
  // navigate to home page
  await page.goto("https://project-management-lac.vercel.app/");

  // get title
  await expect(page).toHaveTitle("Project Management App");

  // go to register page to start creating a new account
  await page.goto("https://project-management-lac.vercel.app/register");

  // get all elements
  usernameField = page.locator("[name='username']");
  emailField = page.locator("[name='email']");
  passField = page.locator("[name='password']");
  confirmPassField = page.locator("[name='confirmPassword']");
  registerBtn = page.getByRole("button", { name: "Create Account" });
  redirectBtn = page.getByRole("button", { name: "Already have an account?" });
});

// Register valid scenarios
test("valid scenario", async ({ page }) => {
  // all inputs properly completed
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("Tester135.");
  await confirmPassField.fill("Tester135.");

  // click on submit
  await registerBtn.click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});

// Register invalid scenarios
test("username empty", async ({ page }) => {
  // fill email and password fields
  await usernameField.fill("");
  await emailField.fill("test@test.com");
  await passField.fill("Tester135.");
  await confirmPassField.fill("Tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if browser error message is present
  const message = await handleValidation(usernameField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("email empty", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("");
  await passField.fill("Tester135.");
  await confirmPassField.fill("Tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if browser error message is present
  const message = await handleValidation(emailField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("wrong email format", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test.com");
  await passField.fill("Tester135.");
  await confirmPassField.fill("Tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if browser error message is present
  const message = await handleValidation(emailField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("empty password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("");
  await confirmPassField.fill("Tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if browser error message is present
  const message = await handleValidation(passField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("short password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("Test12.");
  await confirmPassField.fill("Test12.");

  // press submit button to register
  await registerBtn.click();

  // check if the proper error appears
  await expect(
    page.locator(".error-message").filter({
      hasText:
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit",
    }),
  ).toBeVisible();
});

test("no uppercase password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("tester135.");
  await confirmPassField.fill("tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if the proper error appears
  await expect(
    page.locator(".error-message").filter({
      hasText:
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit",
    }),
  ).toBeVisible();
});

test("no loweracse password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("TESTER135.");
  await confirmPassField.fill("TESTER135.");

  // press submit button to register
  await registerBtn.click();

  // check if the proper error appears
  await expect(
    page.locator(".error-message").filter({
      hasText:
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit",
    }),
  ).toBeVisible();
});

test("no digit password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("TesterTest");
  await confirmPassField.fill("TesterTest");

  // press submit button to register
  await registerBtn.click();

  // check if the proper error appears
  await expect(
    page.locator(".error-message").filter({
      hasText:
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit",
    }),
  ).toBeVisible();
});

test("empty confirm password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("Tester135.");
  await confirmPassField.fill("");

  // press submit button to register
  await registerBtn.click();

  // check if browser error message is present
  const message = await handleValidation(confirmPassField);

  // check if browser error message is truthy
  expect(message).toBeTruthy();
});

test("confirm password not the same with password", async ({ page }) => {
  // fill username and password fields
  await usernameField.fill("Daniel");
  await emailField.fill("test@test.com");
  await passField.fill("Tester135.");
  await confirmPassField.fill("tester135.");

  // press submit button to register
  await registerBtn.click();

  // check if the proper error appears
  await expect(
    page.locator(".error-message").filter({ hasText: "Password and confirm password does not match" }),
  ).toBeVisible();
});
