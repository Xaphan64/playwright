const { test, expect } = require("@playwright/test");

test("Tutorial App", async ({ browser }) => {
  // opens fresh browser (like incognito without cookies)
  const context = await browser.newContext();

  // creates a new page (tab)
  const page = await context.newPage();

  // elements
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signBtn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  // navigate to the desired page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  // css (old method with type, use fill)
  await username.type("rahulshettyacademyXXX");
  await password.type("Learning@830$3mK2");
  await signBtn.click();

  // check that you get an error
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  // clear username and input the correct value
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await username.fill("rahulshettyacademy");

  // login
  await signBtn.click();

  // after succesfully logged in
  await cardTitle.nth(0).textContent(); // if you get more elements, nth(0) to get the 1st one
  await cardTitle.first().textContent(); // only first() and last() works

  // get all the text
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});
