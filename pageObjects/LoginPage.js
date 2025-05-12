class LoginPage {

    constructor(page) {
        this.page = page;
        this.login = page.locator("#login");
        this.pwd = page.locator("#userPassword");
        this.userName = page.locator("#userEmail");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(email, password) {
        await this.userName.fill(email);
        await this.pwd.fill(password);
        await this.login.click();
    }


}

module.exports = {LoginPage};