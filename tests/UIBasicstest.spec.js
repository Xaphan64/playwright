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

  // login
  await signBtn.click();

  // after succesfully logged in
  await cardTitle.nth(0).textContent(); // if you get more elements, nth(0) to get the 1st one
  await cardTitle.first().textContent(); // only first() and last() works

  // get all the text
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // elements
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signBtn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");

  // chooses the value from the dropdown
  await page.locator("select.form-control").selectOption("consult");

  // select the last element from the radio button
  await page.locator(".radiotextsty").last().click();

  // confirm on the modal that appears when changing to User
  await page.locator("#okayBtn").click();

  // returns a boolean (true if its checked)
  console.log(page.locator(".radiotextsty").last().isChecked());

  // checks the checkbox input
  await page.locator("#terms").click();

  // checks if the last element (USER) is checked
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // unchecks the checkbox input
  await page.locator("#terms").uncheck();

  // checks if the checkbox is false
  expect(await page.locator("#terms").isChecked()).toBeFalsy;

  // checks if the documentLink have the attritube class with blinkingText name
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  // pauses the execution
  // await page.pause();
});

test.only("Child windows (other tab)", async ({ browser }) => {
  // opens fresh browser (like incognito without cookies)
  const context = await browser.newContext();

  // creates a new page (tab)
  const page = await context.newPage();

  // go to the desired page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // get the elements
  const documentLink = page.locator("[href*='documents-request']");

  // must use promise all since these 2 should not be async
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // listen if any page is opened in background
    documentLink.click(), // click on the link (new page will open in this case)
  ]);

  // look for the text
  const text = await newPage.locator(".red").textContent();

  // split the text by @
  const arrayText = text.split("@");

  // get the domain name
  const domain = arrayText[1].split(" ")[0];

  // go back to original page and put the domain
  await page.locator("#username").type(domain);

  console.log(await page.locator("#username").inputValue());
});
