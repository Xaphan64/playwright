const { test, expect } = require("@playwright/test");
import { Login, Persons, Register } from "./Elements";

let login;
let register;
let persons;

test.beforeEach(async ({ page }) => {
  register = new Register(page);
  login = new Login(page);
  persons = new Persons(page);

  // go to register page and create new account
  await page.goto("https://project-management-lac.vercel.app/register");
  await register.usernameField.fill("Daniel");
  await register.emailField.fill("test@test.com");
  await register.passField.fill("Tester135.");
  await register.confirmPassField.fill("Tester135.");
  await register.registerBtn.click();

  // check if redirected to login page after succesfully registered
  expect(page.locator(".login-header").filter({ hasText: "Login Page" })).toBeVisible();

  // login in app
  await login.emailField.fill("test@test.com");
  await login.passField.fill("Tester135.");
  await login.loginBtn.click();

  // go to projects page
  await persons.personsTab.click();

  // check if redirected to projects page page after succesfully logged in
  await expect(page.locator(".header-page-title").filter({ hasText: "Persons Page" })).toBeVisible();
});

// valid scenarios
test("dashboard persons test", async ({ page }) => {
  // go to available tab
  await persons.availableTab.click();

  // create persons
  await persons.handleCreatePerson("test", "one", "Fullstack");
  await persons.handleCreatePerson("test", "two", "Frontend");
  await persons.handleCreatePerson("test", "three", "Backend");
  await persons.handleCreatePerson("test", "four", "Frontend");
  await persons.handleCreatePerson("test", "five", "Backend");

  // get the number of available persons
  const availablePersons = await page.locator(".person-card-container").count();
  //   console.log("number of available persons: " + availablePersons);

  // go to dashboard page
  await persons.dashboardTab.click();

  // get the numbers from the dashboard page
  const availableDash = await page.locator(".dashboard-card-number").nth(3).textContent();

  // verify that the proper number of persons appear in the dasboard page
  expect(parseInt(availableDash)).toBe(availablePersons);
});

test("change status test", async ({ page }) => {
  // go to available tab
  await persons.availableTab.click();

  // create persons
  await persons.handleCreatePerson("assigned", "one", "Backend");
  await persons.handleCreatePerson("assigned", "two", "Frontend");
  await persons.handleCreatePerson("available", "one", "Fullstack");
  await persons.handleCreatePerson("available", "two", "Frontend");
  await persons.handleCreatePerson("available", "three", "Backend");

  // count available and check
  const availablePersons = await page.locator(".person-card-container");
  await expect(availablePersons).toHaveCount(5);

  // change first 2 persons to assigned tab
  await persons.handleChangeStatus(0, "assigned", page);
  await persons.handleChangeStatus(0, "assigned", page);

  // go to assigned tab
  await persons.assignedTab.click();

  // count assigned and check
  const assignedPersons = await page.locator(".person-card-container").count();
  expect(assignedPersons).toBe(2);

  // go to available tab
  await persons.availableTab.click();

  // check the available persons
  await expect(availablePersons).toHaveCount(3);
});

test("delete person test", async ({ page }) => {
  // go to available tab
  await persons.availableTab.click();

  // create persons
  await persons.handleCreatePerson("assigned", "one", "Backend");
  await persons.handleCreatePerson("assigned", "two", "Frontend");
  await persons.handleCreatePerson("available", "one", "Fullstack");
  await persons.handleCreatePerson("available", "two", "Frontend");

  // count available and check
  const availablePersons = await page.locator(".person-card-container");
  await expect(availablePersons).toHaveCount(4);

  // delete the projects
  await persons.handleDeletePerson(0, page);
  await persons.handleDeletePerson(0, page);
  await persons.handleDeletePerson(0, page);
  await persons.handleDeletePerson(0, page);

  // check if there are 0 projects
  await expect(availablePersons).toHaveCount(0);
});

// invalid scenarios (on inputs when creating person)
test("empty project inputs", async ({ page }) => {
  // empty person position
  await persons.handleEmptyInput("first name test", "last name test", "", persons.personPosition);

  // empty person firstName
  await persons.handleEmptyInput("", "last name test", "Backend", persons.firstNameInput);

  // empty person lastName
  await persons.handleEmptyInput("first name test", "", "Backend", persons.lastNameInput);
});
