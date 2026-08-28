import { After, AfterStep, Before, BeforeStep, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { POManager } from "../../pageobjects/POManager.js";

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    await this.page.screenshot({
      path: "./screenshot1.png",
    });
  }
});

After(function () {
  console.log(`I am the last to execute`);
});
