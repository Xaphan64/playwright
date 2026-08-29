import { Login, Persons, Projects, Register } from "./Elements.js";

export class PageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new Login(this.page);
    this.registerPage = new Register(this.page);
    this.projectsPage = new Projects(this.page);
    this.personsPage = new Persons(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getProjectsPage() {
    return this.projectsPage;
  }

  getPersonsPage() {
    return this.personsPage;
  }
}
