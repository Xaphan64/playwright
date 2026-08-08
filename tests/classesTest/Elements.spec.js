const { test, expect } = require("@playwright/test");

class Register {
  constructor(page) {
    this.page = page;

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

  async handleValidation(field) {
    return await field.evaluate((el) => el.validationMessage);
  }
}

class Login {
  constructor(page) {
    this.page = page;

    this.emailField = page.getByPlaceholder("Email");
    this.passField = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.redirectBtn = page.getByRole("button", { name: "No account? Register" });
    this.errorMessage = page.locator(".error-message");
  }

  async handleValidation(field) {
    return await field.evaluate((el) => el.validationMessage);
  }
}

class Persons {
  constructor(page) {
    this.page = page;

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

    // de facut functiile
  }
}

class Projects {
  constructor(page) {
    this.page = page;

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

    // de facut functiile
  }
}
