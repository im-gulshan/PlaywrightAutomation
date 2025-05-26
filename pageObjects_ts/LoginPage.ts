import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    login: Locator;
    pwd: Locator;
    userName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.login = page.locator("#login");
        this.pwd = page.locator("#userPassword");
        this.userName = page.locator("#userEmail");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(email: string, password: string) {
        await this.userName.fill(email);
        await this.pwd.fill(password);
        await this.login.click();
    }


}

module.exports = {LoginPage};