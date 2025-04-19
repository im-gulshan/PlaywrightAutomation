const{test, expect} = require('@playwright/test');

test("Calendar Validation", async ({page}) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";

    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator("//div[contains(@class, 'date-picker__inputGroup')]").click();

    await page.locator("//span[contains(@class, 'calendar__navigation__label')]").click();
    await page.locator("//span[contains(@class, 'calendar__navigation__label')]").click();
    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();

    
    // select date
    const extractedDateLocator = page.locator("//button[contains(@class, 'view__days') and not(contains(@class, 'neighboringMonth'))]/abbr[contains(text(), "+date+")]");
    await extractedDateLocator.click();

    const inputs =  page.locator("//div[@class='react-date-picker__inputGroup']/input[@type='number']");
    for(let i=0; i<inputs.length; i++){
        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
    }


    await page.waitForTimeout(2000);
});