const {test, expect} = require('@playwright/test');
const exp = require('constants');


test('Browser Context Playwright test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    // block any request.
    // page.route("**/*.css", route => route.abort());
    page.route("**/*.{jpg, png, jpeg}", route => route.abort());

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    // print all the request in console.
    page.on('request', request => console.log(request.url()));
    page.on('response', responce => console.log(responce.url(), responce.status()));


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());

    await page.waitForTimeout(4000);

    const allTitle  = await cardTitle.allTextContents();
    console.log(allTitle);

    
});

test('Page Playwright test', async ({page})=>{

    await page.goto("https://google.com");
    // console.log(await page.title());
    await expect(page).toHaveTitle("Google");
     
}); 


test('UI Controls', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");
    const pwd = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const radioBtn = page.locator("[class='checkmark']");
    const okayBtn = page.locator("[id='okayBtn']");
    const checkBox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");


    console.log(await page.title());

    await userName.fill("rahulshetty");
    await pwd.fill("learning");
    await dropdown.selectOption("consult");
    
    await radioBtn.last().click();

    // assertion to check the radio btn
    expect(radioBtn.last()).toBeChecked;
    await okayBtn.click();
    console.log(await radioBtn.last().isChecked());

    await checkBox.click();
    expect(checkBox).toBeChecked;
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy;
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    await signIn.click();
});


test('@Child window handle', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    

    const[newPage] = await Promise.all([
        context.waitForEvent("page"), // we write this before new event happens
        documentLink.click()
    ]);

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    const userName = page.locator("//input[@name='username']");

    await userName.fill(domain);
    console.log(await userName.inputValue());
    


});

// below test is recored script---
test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
});
 

