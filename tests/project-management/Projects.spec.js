const { test, expect } = require("@playwright/test");
const { Agent } = require("node:http");

let dashboardTab;
let projectsTab;
let inProgressBtn;
let pendingBtn;
let doneBtn;
let addProjectBtn;
let nameInput;
let descriptionInput;
let startDate;
let endDate;
let createBtn;

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
  projectsTab = page.getByRole("button", { name: "Projects" });
  inProgressBtn = page.locator("[name='In Progress']");
  pendingBtn = page.locator("[name='Pending']");
  doneBtn = page.locator("[name='Done']");
  addProjectBtn = page.locator("[name='Add Project']");
  nameInput = page.getByPlaceholder("Project name");
  descriptionInput = page.getByPlaceholder("Project description");
  startDate = page.locator("[name='start']");
  endDate = page.locator("[name='end']");
  createBtn = page.getByRole("button", { name: "Create" });

  // go to projects page
  await projectsTab.click();

  await page.pause();

  // check if redirected to projects page page after succesfully logged in
  await expect(page.locator(".header-page-title").filter({ hasText: "Projects Page" })).toBeVisible();
});

async function handleCreateProject(name, description, start, end) {
  // click on add new project
  await addProjectBtn.click();

  // input data
  await nameInput.fill(name);
  await descriptionInput.fill(description);
  await startDate.fill(start);
  await endDate.fill(end);

  // create project
  await createBtn.click();
}

async function handleChangeStatus(number, status, page) {
  // get the project and press edit
  await page
    .locator(".project-card-container")
    .nth(number)
    .locator(".project-card-footer")
    .getByRole("button", { name: "Edit" })
    .click();

  // wait for edit inputs to be populated
  await expect(page.locator("[name='title']")).not.toHaveValue("");

  // change the status
  await page.locator("[name='status']").selectOption({ value: status });

  // update the project
  await page.getByRole("button", { name: "Update" }).click();
}

async function handleDeleteProject(number, page) {
  // get the project and press delete
  await page
    .locator(".project-card-container")
    .nth(number)
    .locator(".project-card-footer")
    .getByRole("button", { name: "Delete" })
    .click();

  // wait
  await page.waitForTimeout(300);

  // confirm deleting the project
  await page.getByRole("button", { name: "Yes" }).click();
}

// valid scenarios
test("dashboard projects test", async ({ page }) => {
  // go to In Progress tab
  await inProgressBtn.click();

  // create projects
  await handleCreateProject("progressOne", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("progressTwo", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("progressThree", "description test", "2026-01-01", "2027-01-01");

  // get the number of projects in progress
  const progressNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + progressNumber);

  // go to pending tab
  await pendingBtn.click();

  // create projects
  await handleCreateProject("pendingOne", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("pendingTwo", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("pendingThree", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("pendingFour", "description test", "2026-01-01", "2027-01-01");
  await handleCreateProject("pendingFive", "description test", "2026-01-01", "2027-01-01");

  // get the number of pending projects
  const pendingNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + pendingNumber);

  // go to done tab
  await doneBtn.click();

  // create projects
  await handleCreateProject("doneOne", "description test", "2026-01-01", "2027-01-01");

  // get the number of done projects
  const doneNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + doneNumber);

  // go to dashboard page
  await dashboardTab.click();

  // get the numbers from the dashboard page
  const progressDash = await page.locator(".dashboard-card-number").nth(0).textContent();
  const pendingDash = await page.locator(".dashboard-card-number").nth(1).textContent();
  const doneDash = await page.locator(".dashboard-card-number").nth(2).textContent();

  // verify that the proper number of projects appear in the dasboard page
  expect(parseInt(progressDash)).toBe(progressNumber);
  expect(parseInt(pendingDash)).toBe(pendingNumber);
  expect(parseInt(doneDash)).toBe(doneNumber);
});

test("change status test", async ({ page }) => {
  // go to In Progress tab
  await inProgressBtn.click();

  // create projects
  await handleCreateProject("testOne", "description pending", "2026-01-01", "2027-01-01");
  await handleCreateProject("testTwo", "description done", "2026-01-01", "2027-01-01");
  await handleCreateProject("testThree", "description pending", "2026-01-01", "2027-01-01");
  await handleCreateProject("testFour", "description pending", "2026-01-01", "2027-01-01");
  await handleCreateProject("testFive", "description pending", "2026-01-01", "2027-01-01");
  await handleCreateProject("testSix", "description done", "2026-01-01", "2027-01-01");
  await handleCreateProject("testSeven", "description progress", "2026-01-01", "2027-01-01");
  await handleCreateProject("testEight", "description progress", "2026-01-01", "2027-01-01");
  await handleCreateProject("testNine", "description progress", "2026-01-01", "2027-01-01");

  // edit statuses
  await handleChangeStatus(0, "pending", page);
  await handleChangeStatus(0, "done", page);
  await handleChangeStatus(0, "pending", page);
  await handleChangeStatus(0, "pending", page);
  await handleChangeStatus(0, "pending", page);
  await handleChangeStatus(0, "done", page);

  // count progress and check
  const progressNumber = await page.locator(".project-card-container").count();
  expect(progressNumber).toBe(3);

  // go to pending tab
  await pendingBtn.click();

  // count pending and check
  const pendingNumber = await page.locator(".project-card-container").count();
  expect(pendingNumber).toBe(4);

  // go to done page
  await doneBtn.click();

  // count done and check
  const doneNumber = await page.locator(".project-card-container").count();
  expect(doneNumber).toBe(2);
});

test("delete project test", async ({ page }) => {
  // go to In Progress tab
  await inProgressBtn.click();

  // create projects
  await handleCreateProject("testOne", "description test", "2026-01-01", "2027-01-01");

  // check the number of projects
  const projectsNumber = await page.locator(".project-card-container").count();
  expect(projectsNumber).toBe(1);

  console.log(await page.evaluate(() => JSON.stringify(localStorage)));

  // // delete the projects
  await handleDeleteProject(0, page);

  // check if there are 0 projects
  expect(projectsNumber).toBe(0);
});

// invalid scenarios (on inputs when creating project)
test("empty project input", async ({ page }) => {
  console.log(`test`);
});
