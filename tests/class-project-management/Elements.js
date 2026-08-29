import { expect } from "@playwright/test";

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async handleValidation(field) {
    return await field.evaluate((el) => el.validationMessage);
  }
}

export class Register extends BasePage {
  constructor(page) {
    super(page);

    this.usernameField = page.locator("[name='username']");
    this.emailField = page.locator("[name='email']");
    this.passField = page.locator("[name='password']");
    this.confirmPassField = page.locator("[name='confirmPassword']");
    this.registerBtn = page.getByRole("button", { name: "Create Account" });
    this.redirectBtn = page.getByRole("button", { name: "Already have an account?" });
    this.wrongPassError = page.locator(".error-message").filter({
      hasText:
        "Password must be min 8 characters, and contain at least one uppercase letter, one lower case letter and a digit",
    });
    this.matchPassError = page
      .locator(".error-message")
      .filter({ hasText: "Password and confirm password does not match" });
  }
}

export class Login extends BasePage {
  constructor(page) {
    super(page);

    this.emailField = page.getByPlaceholder("Email");
    this.passField = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.redirectBtn = page.getByRole("button", { name: "No account? Register" });
    this.errorMessage = page.locator(".error-message");
  }
}

export class Persons extends BasePage {
  constructor(page) {
    super(page);

    this.dashboardTab = page.getByRole("button", { name: "Dashboard" });
    this.personsTab = page.getByRole("button", { name: "Persons" });
    this.availableTab = page.locator("[name='Available']");
    this.assignedTab = page.locator("[name='Assigned']");
    this.addPersonBtn = page.locator("[name='Add Person']");
    this.firstNameInput = page.getByPlaceholder("Person first name");
    this.lastNameInput = page.getByPlaceholder("Person last name");
    this.personPosition = page.locator("[name='position']");
    this.createBtn = page.getByRole("button", { name: "Create" });
    this.closeModalBtn = page.getByRole("button", { name: "X" });
  }

  async handleCreatePerson(firstName, lastName, position) {
    // click on add new person
    await this.addPersonBtn.click();
    // input data
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.personPosition.selectOption(position);
    // create project
    await this.createBtn.click();
  }

  async handleChangeStatus(number, status, page) {
    // get the person and press edit
    await page.locator(".person-card-container").nth(number).click();
    // wait for edit inputs to be populated
    await expect(page.locator("[name='firstName']")).not.toHaveValue("");
    // change the status
    await page.locator("[name='status']").selectOption({ value: status });
    // update the project
    await page.getByRole("button", { name: "Update" }).click();
  }

  async handleDeletePerson(number, page) {
    // get the person and press delete
    await page.locator(".person-card-container").nth(number).click();
    await page.getByRole("button", { name: "Delete" }).click();
    // wait
    await page.waitForTimeout(300);
    // confirm deleting the project
    await page.getByRole("button", { name: "Yes" }).click();
  }

  async handleEmptyInput(firstName, lastName, position, validation) {
    // go to available person
    await this.availableTab.click();
    // click on add new person
    await this.addPersonBtn.click();
    // fill inputs
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    if (position) {
      await this.personPosition.selectOption(position);
    }
    // submit button
    await this.createBtn.click();
    // define the error message
    const message = await this.handleValidation(validation);
    // check if browser error message is present
    expect(message).toBeTruthy();
    // close the modal
    await this.closeModalBtn.click();
  }
}

export class Projects extends BasePage {
  constructor(page) {
    super(page);

    this.dashboardTab = page.getByRole("button", { name: "Dashboard" });
    this.projectsTab = page.getByRole("button", { name: "Projects" });
    this.inProgressBtn = page.locator("[name='In Progress']");
    this.pendingBtn = page.locator("[name='Pending']");
    this.doneBtn = page.locator("[name='Done']");
    this.addProjectBtn = page.locator("[name='Add Project']");
    this.nameInput = page.getByPlaceholder("Project name");
    this.descriptionInput = page.getByPlaceholder("Project description");
    this.startDate = page.locator("[name='start']");
    this.endDate = page.locator("[name='end']");
    this.createBtn = page.getByRole("button", { name: "Create" });
    this.closeModalBtn = page.getByRole("button", { name: "X" });
  }

  async handleCreateProject(name, description, start, end) {
    // click on add new project
    await this.addProjectBtn.click();
    // input data
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.startDate.fill(start);
    await this.endDate.fill(end);
    // create project
    await this.createBtn.click();
  }

  async handleChangeStatus(number, status, page) {
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

  async handleDeleteProject(number, page) {
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

  async handleEmptyInput(name, description, start, end, validation) {
    // go to In Progress tab
    await this.inProgressBtn.click();
    // click on add new project
    await this.addProjectBtn.click();
    // fill inputs
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.startDate.fill(start);
    await this.endDate.fill(end);
    // submit button
    await this.createBtn.click();
    // define the error message
    const message = await this.handleValidation(validation);
    // check if browser error message is present
    expect(message).toBeTruthy();
    // close the modal
    await this.closeModalBtn.click();
  }
}
