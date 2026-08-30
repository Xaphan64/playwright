import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the registration page", async function () {
  // Navigation is handled by the Before hook
});

When(
  "I register with valid account information username: {string}, email: {string} and password: {string}",
  async function (username, email, password) {
    await this.register.usernameField.fill(username);
    await this.register.emailField.fill(email);
    await this.register.passField.fill(password);
    await this.register.confirmPassField.fill(password);

    await this.register.registerBtn.click();
  },
);

Then("I should be redirected to the login page", async function () {
  await expect(
    this.page.locator(".login-header").filter({
      hasText: "Login Page",
    }),
  ).toBeVisible();
});

When(
  "I register with invalid field: {string}, email: {string}, password: {string} and confirm password {string}",
  async function (username, email, password, confimPassword) {
    await this.register.usernameField.fill(username);
    await this.register.emailField.fill(email);
    await this.register.passField.fill(password);
    await this.register.confirmPassField.fill(confimPassword);

    await this.register.registerBtn.click();
  },
);

Then("Empty username error should appear", async function () {
  const message = await this.register.handleValidation(this.register.usernameField);
  expect(message).toBeTruthy();
});

Then("Email error should appear", async function () {
  const message = await this.register.handleValidation(this.register.emailField);
  expect(message).toBeTruthy();
});

Then("Empty password error should appear", async function () {
  const message = await this.register.handleValidation(this.register.passField);
  expect(message).toBeTruthy();
});

Then("Wrong password error should appear", async function () {
  await this.register.registerBtn.click();
  await expect(this.register.wrongPassError).toBeVisible();
});

Then("Empty confirm password error should appear", async function () {
  const message = await this.register.handleValidation(this.register.confirmPassField);
  expect(message).toBeTruthy();
});

Then("Passwords does not match error should appear", async function () {
  await this.register.registerBtn.click();
  await expect(this.register.matchPassError).toBeVisible();
});

When("Redirect button is pressed", async function () {
  await this.register.redirectBtn.click();
});

Then("I should be redirected to login page", async function () {
  await expect(this.page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();
});
