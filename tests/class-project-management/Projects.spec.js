import { test, expect } from "@playwright/test";
import { PageManager } from "./PageManager";

let login;
let register;
let projects;

test.beforeEach(async ({ page }) => {
  register = new PageManager(page).getRegisterPage();
  login = new PageManager(page).getLoginPage();
  projects = new PageManager(page).getProjectsPage();

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
  await projects.projectsTab.click();

  // check if redirected to projects page page after succesfully logged in
  await expect(page.locator(".header-page-title").filter({ hasText: "Projects Page" })).toBeVisible();
});

// valid scenarios
test("dashboard projects test", async ({ page }) => {
  // go to In Progress tab
  await projects.inProgressBtn.click();

  // create projects
  await projects.handleCreateProject("progressOne", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("progressTwo", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("progressThree", "description test", "2026-01-01", "2027-01-01");

  // get the number of projects in progress
  const progressNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + progressNumber);

  // go to pending tab
  await projects.pendingBtn.click();

  // create projects
  await projects.handleCreateProject("pendingOne", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("pendingTwo", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("pendingThree", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("pendingFour", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("pendingFive", "description test", "2026-01-01", "2027-01-01");

  // get the number of pending projects
  const pendingNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + pendingNumber);

  // go to done tab
  await projects.doneBtn.click();

  // create projects
  await projects.handleCreateProject("doneOne", "description test", "2026-01-01", "2027-01-01");

  // get the number of done projects
  const doneNumber = await page.locator(".project-card-container").count();
  console.log("number of progress projects: " + doneNumber);

  // go to dashboard page
  await projects.dashboardTab.click();

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
  await projects.inProgressBtn.click();

  // create projects
  await projects.handleCreateProject("testOne", "description pending", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testTwo", "description done", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testThree", "description pending", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testFour", "description pending", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testFive", "description pending", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testSix", "description done", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testSeven", "description progress", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testEight", "description progress", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testNine", "description progress", "2026-01-01", "2027-01-01");

  // edit statuses
  await projects.handleChangeStatus(0, "pending", page);
  await projects.handleChangeStatus(0, "done", page);
  await projects.handleChangeStatus(0, "pending", page);
  await projects.handleChangeStatus(0, "pending", page);
  await projects.handleChangeStatus(0, "pending", page);
  await projects.handleChangeStatus(0, "done", page);

  // count progress and check
  const progressNumber = await page.locator(".project-card-container").count();
  expect(progressNumber).toBe(3);

  // go to pending tab
  await projects.pendingBtn.click();

  // count pending and check
  const pendingNumber = await page.locator(".project-card-container").count();
  expect(pendingNumber).toBe(4);

  // go to done page
  await projects.doneBtn.click();

  // count done and check
  const doneNumber = await page.locator(".project-card-container").count();
  expect(doneNumber).toBe(2);
});

test("delete project test", async ({ page }) => {
  // go to In Progress tab
  await projects.inProgressBtn.click();

  // create projects
  await projects.handleCreateProject("testOne", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testTwo", "description test", "2026-01-01", "2027-01-01");
  await projects.handleCreateProject("testThree", "description test", "2026-01-01", "2027-01-01");

  // check the number of projects
  const projectsNumber = page.locator(".project-card-container");
  expect(await projectsNumber.count()).toBe(3);

  // delete the projects
  await projects.handleDeleteProject(0, page);
  await projects.handleDeleteProject(0, page);
  await projects.handleDeleteProject(0, page);

  // check if there are 0 projects
  await expect(projectsNumber).toHaveCount(0);
});

// invalid scenarios (on inputs when creating project)
test("empty project inputs", async ({ page }) => {
  // empty project name
  await projects.handleEmptyInput("", "description test", "2026-01-01", "2027-01-01", projects.nameInput);

  // empty project description
  await projects.handleEmptyInput("name test", "", "2026-01-01", "2027-01-01", projects.descriptionInput);

  // empty project start
  await projects.handleEmptyInput("name test", "description test", "", "2027-01-01", projects.startDate);

  // empty project end
  await projects.handleEmptyInput("name test", "description test", "2026-01-01", "", projects.endDate);
});
