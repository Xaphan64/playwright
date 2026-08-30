import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given(
  "I registered with a valid account info: {string}, email: {string} and password: {string}",
  async function (username, email, password) {
    await this.register.usernameField.fill(username);
    await this.register.emailField.fill(email);
    await this.register.passField.fill(password);
    await this.register.confirmPassField.fill(password);

    await this.register.registerBtn.click();
  },
);

When("I login with valid account: {string}, {string}", async function (email, password) {
  await this.login.emailField.fill(email);
  await this.login.passField.fill(password);

  await this.login.loginBtn.click();
});

Then("I should be redirected to the dashboard page", async function () {
  await expect(this.page.locator(".header-logo").filter({ hasText: "PM APP" })).toBeVisible();
});

When("I login with invalid field: {string} and {string}", async function (email, password) {
  await this.login.emailField.fill(email);
  await this.login.passField.fill(password);

  // click on submit
  await this.login.loginBtn.click();
});

Then("I should get browser error on email field", async function () {
  const message = await this.login.handleValidation(this.login.emailField);
  expect(message).toBeTruthy();
});

Then("I should get wrong email or password error", async function () {
  await expect(this.login.errorMessage).toBeVisible();
});

Then("I should get browser error on password field", async function () {
  const message = await this.login.handleValidation(this.login.passField);
  expect(message).toBeTruthy();
});
