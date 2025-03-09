const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

// first Test
test('@Web Client App Login', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/");
    const prodName = "ZARA COAT 3";

    const userName = page.locator("#userEmail");
    const pwd = page.locator("#userPassword");
    const login = page.locator("#login");
    const allProductTitles = page.locator(".card-body b");
    const addProdToCart = page.locator("//b[text()='"+prodName+"']//ancestor::div[@class='card-body']//button[@class='btn w-10 rounded']");
    const cart = page.locator("//button[contains(@routerlink, 'cart')]");
    const cartsProd = page.locator("//div[@class='cartSection']/h3");
    const buyNow = page.locator("//div[contains(@class, 'cartSection')]/button[contains(@class, 'btn-primary')]");
    
    const dropdown = page.locator("//section[contains(@class, 'list-group')]");
    const selectCountry = page.locator("//div[@class = 'form-group']/input");
    const selectCountryValue = dropdown.locator("//button");

    const placeOrder = page.locator("//a[contains(@class, 'submit')]");
    const checkout = page.locator("//li/button[@type='button']");




    await userName.fill("gulshan@iomail.com");
    await pwd.fill("Test@12345");
    await login.click();

    await allProductTitles.first().waitFor();
    await addProdToCart.click();
    await cart.click();
    // const expectedCartProd = await cartsProd.textContent();


    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkout.click();

    // await expect(cartsProd).toContainText(prodName);
    // await buyNow.click();


    await selectCountry.pressSequentially("Ind");
    await dropdown.waitFor();

    const optionsCount = await selectCountryValue.count();
    for(let  i=0; i<optionsCount; i++){
        const text = await selectCountryValue.nth(i).textContent();
        if(text === " India"){
            await selectCountryValue.nth(i).click();
            break;
        }
    }
    await page.pause();

    console.log("HiGulshan");


    // await placeOrder.click();




    // const allTitles = await allProductTitles.allTextContents();
    // console.log(allTitles);
}); 