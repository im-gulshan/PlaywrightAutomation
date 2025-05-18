const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils')

const loginPayload = { userEmail: "gulshan@iomail.com", userPassword: "Test@12345" };
const orderPayload = { orders: [{ country: "Bahrain", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
const getCustOrderApi = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";


let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


    // check orderResponse
});


test('Place the order', async ({ page }) => {
    const prodName = "ZARA COAT 3";
    const email = "gulshan@iomail.com";

    // add javascript in playwright
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.waitForTimeout(2000);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route(getCustOrderApi,
        async route => {
            //intercept the response  API response -> {Playwright fake response}--> broswer
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            })
        }
    )

    //  click on my order
    await page.locator("//button[contains(@routerlink, 'orders')]").click();
    await page.waitForResponse(getCustOrderApi);

    const emptyCartMsg = await page.locator("//div[contains(@class, 'mt-4')]").textContent();
    console.log(emptyCartMsg);


    // await page.locator("//tbody/tr/th[text()='"+response.orderId+"']//following-sibling::td/button[text()='View']").click();
    // // await page.pause();
    // const orderSummaryOrderId = await page.locator("//div[@class='col-text -main']").textContent();

    // console.log("OrderSummar Order Id : "+orderSummaryOrderId);

    await page.waitForTimeout(4000);

}); 