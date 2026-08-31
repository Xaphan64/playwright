import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// Dashboard projects number
Given(
  "I registered and logged in with valid account info: username {string}, email: {string} and password {string}",
  async function (username, email, password) {
    await this.register.usernameField.fill(username);
    await this.register.emailField.fill(email);
    await this.register.passField.fill(password);
    await this.register.confirmPassField.fill(password);

    await this.register.registerBtn.click();

    await this.login.emailField.fill(email);
    await this.login.passField.fill(password);

    await this.login.loginBtn.click();
  },
);

When("I create three in progress projects", async function () {
  await this.projects.projectsTab.click();
  await this.projects.inProgressBtn.click();

  await this.projects.handleCreateProject("progressOne", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("progressTwo", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("progressThree", "description test", "2026-01-01", "2027-01-01");
});

When("I create 5 pending projects", async function () {
  await this.projects.projectsTab.click();
  await this.projects.pendingBtn.click();

  await this.projects.handleCreateProject("pendingOne", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("pendingTwo", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("pendingThree", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("pendingFour", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("pendingFive", "description test", "2026-01-01", "2027-01-01");
});

When("I create one project done", async function () {
  await this.projects.projectsTab.click();
  await this.projects.doneBtn.click();

  // create projects
  await this.projects.handleCreateProject("doneOne", "description test", "2026-01-01", "2027-01-01");
});

Then("Same number of progress projects should appear in dashboard {int}", async function (nthNumber) {
  this.progressNumber = await this.page.locator(".project-card-container").count();
  await this.projects.dashboardTab.click();
  console.log("number of progress projects: " + this.progressNumber);
  const progressDash = await this.page.locator(".dashboard-card-number").nth(nthNumber).textContent();
  expect(parseInt(progressDash)).toBe(this.progressNumber);
});

// Projects status change
When("I created multiple projects with different statuses", async function () {
  await this.projects.projectsTab.click();
  await this.projects.inProgressBtn.click();

  await this.projects.handleCreateProject("testOne", "description pending", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testTwo", "description done", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testThree", "description pending", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testFour", "description pending", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testFive", "description pending", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testSix", "description done", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testSeven", "description progress", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testEight", "description progress", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testNine", "description progress", "2026-01-01", "2027-01-01");
});

When("I changed the statuses of some projects", async function () {
  await this.projects.handleChangeStatus(0, "pending", this.page);
  await this.projects.handleChangeStatus(0, "done", this.page);
  await this.projects.handleChangeStatus(0, "pending", this.page);
  await this.projects.handleChangeStatus(0, "pending", this.page);
  await this.projects.handleChangeStatus(0, "pending", this.page);
  await this.projects.handleChangeStatus(0, "done", this.page);
});

Then("Proper number of each status should be in each page", async function () {
  const progressNumber = await this.page.locator(".project-card-container").count();
  expect(progressNumber).toBe(3);

  await this.projects.pendingBtn.click();

  const pendingNumber = await this.page.locator(".project-card-container").count();
  expect(pendingNumber).toBe(4);

  await this.projects.doneBtn.click();

  const doneNumber = await this.page.locator(".project-card-container").count();
  expect(doneNumber).toBe(2);
});

// Delete projects
When("I create three projects", async function () {
  await this.projects.projectsTab.click();
  await this.projects.inProgressBtn.click();

  // create projects
  await this.projects.handleCreateProject("testOne", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testTwo", "description test", "2026-01-01", "2027-01-01");
  await this.projects.handleCreateProject("testThree", "description test", "2026-01-01", "2027-01-01");
});

Then("I check if projects were created", async function () {
  this.projectsNumber = this.page.locator(".project-card-container");
  expect(await this.projectsNumber.count()).toBe(3);
});

When("I delete the projects", async function () {
  await this.projects.handleDeleteProject(0, this.page);
  await this.projects.handleDeleteProject(0, this.page);
  await this.projects.handleDeleteProject(0, this.page);
});

Then("I should have no more projects", async function () {
  await expect(this.projectsNumber).toHaveCount(0);
});

// Invalid inputs on create project
When(
  "I create a project with invalid field, name: {string}, description: {string}, start date: {string} and end date: {string}",
  async function (name, description, start, end) {
    await this.projects.projectsTab.click();
    await this.projects.inProgressBtn.click();

    await this.projects.addProjectBtn.click();
    await this.projects.nameInput.fill(name);
    await this.projects.descriptionInput.fill(description);
    await this.projects.startDate.fill(start);
    await this.projects.endDate.fill(end);
    await this.projects.createBtn.click();

    // determine which field was left empty, so the Then step knows what to validate
    if (name === "") this.invalidField = this.projects.nameInput;
    else if (description === "") this.invalidField = this.projects.descriptionInput;
    else if (start === "") this.invalidField = this.projects.startDate;
    else if (end === "") this.invalidField = this.projects.endDate;
  },
);

Then("I check the proper error to appear", async function () {
  const message = await this.projects.handleValidation(this.invalidField);
  expect(message).toBeTruthy();
  await this.projects.closeModalBtn.click();
});
