const {test, expect} = require('@playwright/test');

// first Test
test('@Web Client App Login', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/");

    const userName = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const login = page.locator("#login");
    const allProductTitles = page.locator(".card-body b");


    await userName.fill("gulshan@iomail.com");
    await pwd.fill("Test@12345");
    await login.click();

    await allProductTitles.first().waitFor();
    const allTitles = await allProductTitles.allTextContents();
    console.log(allTitles);
     
}); 