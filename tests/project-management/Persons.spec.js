const { test, expect } = require("@playwright/test");
const { create } = require("node:domain");

let dashboardTab;
let personsTab;
let availableTab;
let assignedTab;
let addPersonBtn;
let firstNameInput;
let lastNameInput;
let personPosition;
let createBtn;
let closeModalBtn;

test.beforeEach(async ({ page }) => {
  // go to register page and create new account
  await page.goto("https://project-management-lac.vercel.app/register");
  await page.locator("[name='username']").fill("Daniel");
  await page.locator("[name='email']").fill("test@test.com");
  await page.locator("[name='password']").fill("Tester135.");
  await page.locator("[name='confirmPassword']").fill("Tester135.");
  await page.getByRole("button", { name: "Create Account" }).click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();

  // login in app
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.getByPlaceholder("Password").fill("Tester135.");
  await page.getByRole("button", { name: "Login" }).click();

  // get all elements
  dashboardTab = page.getByRole("button", { name: "Dashboard" });
  personsTab = page.getByRole("button", { name: "Persons" });
  availableTab = page.locator("[name='Available']");
  assignedTab = page.locator("[name='Assigned']");
  addPersonBtn = page.locator("[name='Add Person']");
  firstNameInput = page.getByPlaceholder("Person first name");
  lastNameInput = page.getByPlaceholder("Person last name");
  personPosition = page.locator("[name='position']");
  createBtn = page.getByRole("button", { name: "Create" });
  closeModalBtn = page.getByRole("button", { name: "X" });

  // go to projects page
  await personsTab.click();

  // check if redirected to projects page page after succesfully logged in
  await expect(page.locator(".header-page-title").filter({ hasText: "Persons Page" })).toBeVisible();
});

async function handleCreatePerson(firstName, lastName, position) {
  // click on add new person
  await addPersonBtn.click();

  // input data
  await firstNameInput.fill(firstName);
  await lastNameInput.fill(lastName);
  await personPosition.selectOption(position);

  // create project
  await createBtn.click();
}

async function handleChangeStatus(number, status, page) {
  // get the person and press edit
  await page.locator(".person-card-container").nth(number).click();

  // wait for edit inputs to be populated
  await expect(page.locator("[name='firstName']")).not.toHaveValue("");

  // change the status
  await page.locator("[name='status']").selectOption({ value: status });

  // update the project
  await page.getByRole("button", { name: "Update" }).click();
}

async function handleDeletePerson(number, page) {
  // get the person and press delete
  await page.locator(".person-card-container").nth(number).click();

  await page.getByRole("button", { name: "Delete" }).click();

  // wait
  await page.waitForTimeout(300);

  // confirm deleting the project
  await page.getByRole("button", { name: "Yes" }).click();
}

async function handleValidation(field) {
  return await field.evaluate((el) => el.validationMessage);
}

async function handleEmptyInput(firstName, lastName, position, validation) {
  // go to available person
  await availableTab.click();

  // click on add new person
  await addPersonBtn.click();

  // fill inputs
  await firstNameInput.fill(firstName);
  await lastNameInput.fill(lastName);

  if (position) {
    await personPosition.selectOption(position);
  }

  //   await personPosition.selectOption(position);

  // submit button
  await createBtn.click();

  // define the error message
  const message = await handleValidation(validation);

  // check if browser error message is present
  expect(message).toBeTruthy();

  // close the modal
  await closeModalBtn.click();
}

// valid scenarios
test("dashboard persons test", async ({ page }) => {
  // go to available tab
  await availableTab.click();

  // create persons
  await handleCreatePerson("test", "one", "Fullstack");
  await handleCreatePerson("test", "two", "Frontend");
  await handleCreatePerson("test", "three", "Backend");
  await handleCreatePerson("test", "four", "Frontend");
  await handleCreatePerson("test", "five", "Backend");

  // get the number of available persons
  const availablePersons = await page.locator(".person-card-container").count();
  console.log("number of available persons: " + availablePersons);

  // go to dashboard page
  await dashboardTab.click();

  // get the numbers from the dashboard page
  const availableDash = await page.locator(".dashboard-card-number").nth(3).textContent();

  // verify that the proper number of persons appear in the dasboard page
  expect(parseInt(availableDash)).toBe(availablePersons);
});

test("change status test", async ({ page }) => {
  // go to available tab
  await availableTab.click();

  // create persons
  await handleCreatePerson("assigned", "one", "Backend");
  await handleCreatePerson("assigned", "two", "Frontend");
  await handleCreatePerson("available", "one", "Fullstack");
  await handleCreatePerson("available", "two", "Frontend");
  await handleCreatePerson("available", "three", "Backend");

  // count available and check
  const availablePersons = await page.locator(".person-card-container");
  await expect(availablePersons).toHaveCount(5);

  // change first 2 persons to assigned tab
  await handleChangeStatus(0, "assigned", page);
  await handleChangeStatus(0, "assigned", page);

  // go to assigned tab
  await assignedTab.click();

  // count assigned and check
  const assignedPersons = await page.locator(".person-card-container").count();
  expect(assignedPersons).toBe(2);

  // go to available tab
  await availableTab.click();

  // check the available persons
  await expect(availablePersons).toHaveCount(3);
});

test("delete person test", async ({ page }) => {
  // go to available tab
  await availableTab.click();

  // create persons
  await handleCreatePerson("assigned", "one", "Backend");
  await handleCreatePerson("assigned", "two", "Frontend");
  await handleCreatePerson("available", "one", "Fullstack");
  await handleCreatePerson("available", "two", "Frontend");

  // count available and check
  const availablePersons = await page.locator(".person-card-container");
  await expect(availablePersons).toHaveCount(4);

  // delete the projects
  await handleDeletePerson(0, page);
  await handleDeletePerson(0, page);
  await handleDeletePerson(0, page);
  await handleDeletePerson(0, page);

  // check if there are 0 projects
  await expect(availablePersons).toHaveCount(0);
});

// invalid scenarios (on inputs when creating person)
test("empty project inputs", async ({ page }) => {
  // empty person position
  await handleEmptyInput("first name test", "last name test", "", personPosition);

  // empty person firstName
  await handleEmptyInput("", "last name test", "Backend", firstNameInput);

  // empty person lastName
  await handleEmptyInput("first name test", "", "Backend", lastNameInput);
});
