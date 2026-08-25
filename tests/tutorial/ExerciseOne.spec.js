const { test, expect } = require("@playwright/test");

test("Tutorial Exercise 1", async ({ page }) => {
  // go to page
  await page.goto("https://rahulshettyacademy.com/client/");

  // check if page is correct
  await expect(page).toHaveTitle("Let's Shop");

  // elements
  const registerBtn = page.locator(".btn1");
  const loginBtn = page.locator("#login");
  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");
  const cardTitle = page.locator("h5 b");

  // // register
  // await registerBtn.click();

  // // complete all the inputs
  // await page.locator("#firstName").fill("Daniel");
  // await page.locator("#lastName").fill("Alex");
  // await userEmail.fill("daniel@alexey.com");
  // await page.locator("#userMobile").fill("1234567890");
  // await userPassword.fill("Tester135.");
  // await page.locator("#confirmPassword").fill("Tester135.");
  // await page.locator("[type='checkbox']").check();

  // // submit to register
  // await loginBtn.click();

  // press login after register
  // await page.locator(".btn.btn-primary").click();
  await page.getByRole("button", { name: "Login" }).click();

  // login
  await userEmail.fill("daniel@alex.com");
  await userPassword.fill("Tester135.");
  await loginBtn.click();

  // wait for all api to fetch
  await page.waitForLoadState("networkidle");

  // wait for elements (same as above but works on older software)
  await page.locator(".card-body b").first().waitFor();

  // get the titles
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});
