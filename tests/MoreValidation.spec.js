const {test, expect} = require('@playwright/test');
const path = require('path');

test.describe.configure({mode: 'parallel'});

test("Popup Validation", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // handle webPopups --> accepts or Reject
    await page.locator("#name").fill("Gulshan");
    await page.locator("//input[@id='confirmbtn']").click();
    await page.waitForTimeout(2000);
    page.on('dialog', dialog => dialog.accept());

    // mouse hover
    await page.locator("#mousehover").hover();

    // manage frames
    const framesPage = page.frameLocator("//iframe[@id='courses-iframe']");
    await framesPage.locator("//a[@class='new-navbar-highlighter' and @href='lifetime-access']").click();
    const textCheck = await framesPage.locator("//div[@class='text']/h2").textContent();
    console.log(textCheck);
    console.log(textCheck.split(" ")[1]);

    await page.waitForTimeout(4000);
});

test(`@Web Screenshot & Visuals comparision`, async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // handle webPopups --> accepts or Reject
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

})

test('Visuals', async ({page}) => {
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})