const {test, expect} = require('@playwright/test');

test('Handle Calendar', async ({context, page})=>{

    const date = "28";
    const month = "March";
    const year = "2090";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

    // click on top deals
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for new page to be created
        page.click("//a[contains(@href, 'offers')]") // Trigger that new page
    ]);

    await newPage.waitForLoadState();

    //click on calendar
    const calendar = newPage.locator("//*[name()='svg' and contains(@class, 'calendar-button')]");
    await calendar.waitFor();
    await calendar.click();

    let monthYear = await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").textContent();
    let seprate = monthYear.split(' ');

    let numYear = Number(seprate[1]);
       
    // select year *****************
    while (year > numYear){
        await newPage.locator("//button[contains(@class, 'next2-button')]").click();
        monthYear = await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").textContent();
        seprate = monthYear.split(' ');
        numYear = Number(seprate[1]);
    }

    while (year < numYear){
        await newPage.locator("//button[contains(@class, 'prev2-button')]").click();
        monthYear = await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").textContent();
        seprate = monthYear.split(' ');
        numYear = Number(seprate[1]);
    }
    // select year *****************

    const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let uiMonth = seprate[0];

    let indexOfGivenMonth = monthOrder.indexOf(month);
    let indexOfUiMonth = monthOrder.indexOf(uiMonth);

    // Select Month**********************
    while(indexOfGivenMonth > indexOfUiMonth){
        await newPage.locator("//button[contains(@class, 'next-button')]").click();
        monthYear = await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").textContent();
        seprate = monthYear.split(' ');
        uiMonth = seprate[0];
        indexOfUiMonth = monthOrder.indexOf(uiMonth);
    }

    while(indexOfGivenMonth < indexOfUiMonth){
        await newPage.locator("//button[contains(@class, 'prev-button')]").click();
        monthYear = await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").textContent();
        seprate = monthYear.split(' ');
        uiMonth = seprate[0];
        indexOfUiMonth = monthOrder.indexOf(uiMonth);
    }
    // Select Month**********************


    // select date
    const extractedDateLocator = newPage.locator("//button[contains(@class, 'view__days') and not(contains(@class, 'neighboringMonth'))]/abbr[text()  = "+date+"]");
    await extractedDateLocator.click();



    await page.waitForTimeout(2000);

});