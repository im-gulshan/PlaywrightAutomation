import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // new locator in playwright
    // for checkboxes we can use.check() method instead of click();
    //use getByLabel to use the label attribute of dom
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");


    // use getByPlaceholder attribute of dom to identify the locator
    await page.getByPlaceholder("Password").fill("abc123");

    // use get by role
    await page.getByRole("button", {name: 'submit'}).click();

    //use getbytext
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //use anchor a tag
    await page.getByRole("link", {name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


    await page.waitForTimeout(5000);
});