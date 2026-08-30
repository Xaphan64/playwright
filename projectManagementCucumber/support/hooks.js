import { Before, After } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import { PageManager } from "../../tests/class-project-management/PageManager.js";

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();

  this.pageManager = new PageManager(this.page);
  this.register = this.pageManager.getRegisterPage();
  this.login = this.pageManager.getLoginPage();

  // navigate to home page
  await this.page.goto("https://project-management-lac.vercel.app/");

  // check if properly page appears
  await expect(this.page).toHaveTitle("Project Management App");

  // go to register page
  await this.page.goto("https://project-management-lac.vercel.app/register");
});

After(async function () {
  await this.browser.close();
});
