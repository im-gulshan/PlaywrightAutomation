const {test, expect} = require('@playwright/test');

test("Popup Validation", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.waitForTimeout(1000);
    // await page.goForward();

    // await expect(page.locator("//input[@id='displayed-text']")).toBeVisible();
    // await page.locator("//input[@id='hide-textbox']").click();
    // await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();


    // handle webPopups --> accepts or Reject
    await page.locator("#name").fill("Gulshan");
    await page.locator("//input[@id='confirmbtn']").click();
    await page.waitForTimeout(2000);
    page.on('dialog', dialog => dialog.accept());


    // mouse hover
    await page.locator("#mousehover").hover();
    
    






    await page.waitForTimeout(4000);
});