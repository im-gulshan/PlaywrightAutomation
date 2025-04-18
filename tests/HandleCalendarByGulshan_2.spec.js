const {test, expect} = require('@playwright/test');

test('Handle Calendar', async ({context, page})=>{

    const date = "30";
    const month = "March";
    const year = "1998";

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

    await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").click();
    await newPage.locator("//span[contains(@class, 'calendar__navigation__label')]").click();


    // select year
    let condition = true;
    while(condition){
        const decadeYear = newPage.locator("//button[contains(@class, 'decade-view__years')]");
        let decadeYearText = "";
        let yearFound = false;
        

        for(let i=0; i<await decadeYear.count(); i++){
            decadeYearText = await decadeYear.nth(i).textContent();
            if(year === decadeYearText){
                await decadeYear.nth(i).click();
                condition = false;
                yearFound = true;
                break;
            }
        }

        const yearNum = Number(year);
        if(!yearFound){
            const decadeYearTextNum = await decadeYear.first().textContent();
            if(yearNum > Number(decadeYearTextNum.trim())){
                await newPage.locator("//button[contains(@class, 'calendar__navigation__next-button')]").click();
            } else{
                await newPage.locator("//button[contains(@class, 'calendar__navigation__prev-button')]").click();
            }
        }

    }

    //select month
    await newPage.locator("//abbr[contains(text(), '"+month+"')]").click();


    // select date
    const extractedDateLocator = newPage.locator("//button[contains(@class, 'view__days') and not(contains(@class, 'neighboringMonth'))]/abbr[contains(text(), "+date+")]");
    await extractedDateLocator.click();

    



    
    await page.waitForTimeout(5000);

});