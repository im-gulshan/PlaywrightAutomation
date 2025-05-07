const { test, expect } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils')


test('Security test request intercept', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    const email = "gulshan@iomail.com";

    const userName = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const login = page.locator("#login");
    const orders = page.locator("//button[contains(@routerlink,'orders')]");

    await userName.fill(email);
    await pwd.fill("Test@12345");
    await login.click();

    await orders.click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
    )

    // login and reach order page.
    await page.locator("//button[text()='View']").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

    await page.waitForTimeout(4000);
})