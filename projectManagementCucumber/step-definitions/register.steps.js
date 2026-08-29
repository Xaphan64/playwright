import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the registration page", async function () {
  // Navigation is handled by the Before hook
});

When("I register with valid account information", async function () {
  await this.register.usernameField.fill("Daniel");
  await this.register.emailField.fill("test@test.com");
  await this.register.passField.fill("Tester135.");
  await this.register.confirmPassField.fill("Tester135.");

  await this.register.registerBtn.click();
});

Then("I should be redirected to the login page", async function () {
  await expect(
    this.page.locator(".login-header").filter({
      hasText: "Login Page",
    }),
  ).toBeVisible();
});
