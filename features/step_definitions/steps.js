const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require("@playwright/test");
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions


    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (prodName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashBoardPage = this.poManager.getdashBoardPage();
    await this.dashBoardPage.addProductToCart(prodName);
});

Then('Verify {string} is displaying in the Cart', async function (prodName) {
    const isProductInCart = this.dashBoardPage.checkCartsPrducts(prodName);
    expect(isProductInCart).toBeTruthy();
    await this.dashBoardPage.checkoutCart();
});

When('Enter valid details and place the order {string}', function (username) {
    // Write code here that turns the phrase above into concrete actions
    const paymentPage = this.poManager.getpaymentPage();
    paymentPage.selectCountryFromDropdown("India");
    expect(paymentPage.verifyUserEmail(username));
    paymentPage.placeOrder();
});

Then('Verify order in present in the orderHistory', async function () {
    const thankyouPage = this.poManager.getthankyouPage();
    const confirmationMessage = await thankyouPage.getOrderConfirmationMessage();
    expect(confirmationMessage).toBe("Thankyou for the order.");
});



Given('a login to Ecommerce2 application with {string} and {string}', async function (user, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");

    await userName.fill(user);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});



// await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     console.log(await page.title());
//     await userName.fill("rahulshetty");
//     await page.locator("[type='password']").fill("learning");
//     await signIn.click();
//     console.log(await page.locator("[style*='block']").textContent());
//     await expect(page.locator("[style*='block']")).toContainText('Incorrect');

