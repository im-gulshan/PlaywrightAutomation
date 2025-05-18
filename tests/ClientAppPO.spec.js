const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const { customTest } = require('../utils/test-base');

// calling data from json file, its like data driven testing
const data = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));


for (let dataSet of data) {

    test(`@Web Client App Login For ${dataSet.prodName}`, async ({ page }) => {
        const poManager = new POManager(page);

        // Login to the application
        const loginPage = poManager.getLoginPage();
        loginPage.goto();
        loginPage.validLogin(dataSet.username, dataSet.password);

        // Create DashBoardPage object and add product to the cart
        const dashBoardPage = poManager.getdashBoardPage();
        await dashBoardPage.addProductToCart(dataSet.prodName);

        // Verify product is in the cart and proceed to checkout
        const isProductInCart = dashBoardPage.checkCartsPrducts(dataSet.prodName);
        expect(isProductInCart).toBeTruthy();
        await dashBoardPage.checkoutCart();

        // Create PaymentPage object and complete payment
        const paymentPage = poManager.getpaymentPage();
        paymentPage.selectCountryFromDropdown("India");
        expect(paymentPage.verifyUserEmail(dataSet.username));
        paymentPage.placeOrder();

        // Create ThankyouPage object and verify order confirmation
        const thankyouPage = poManager.getthankyouPage();
        const confirmationMessage = await thankyouPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toBe("Thankyou for the order.");

        // Retrieve the order ID
        const extractedID = await thankyouPage.getOrderId();

        // Create HeaderPage object and navigate to orders
        const headerPage = poManager.getheaderPage();
        headerPage.openOrders();

        // Create OrdersPage object and view the specific order
        const orderPage = poManager.getorderPage();
        orderPage.viewOrderById(extractedID);

        // Create OrderSummary object and retrieve the order summary ID
        const orderSummary = poManager.getorderSummary();
        const orderSummaryOrderId = await orderSummary.getOrderSummaryOrderId();

        // Log the order summary ID
        console.log("Order Summary Order ID: " + orderSummaryOrderId);
    });


}

customTest(`Client App Login Custom Test`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);

    // Login to the application
    const loginPage = poManager.getLoginPage();
    loginPage.goto();
    loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    // Create DashBoardPage object and add product to the cart
    const dashBoardPage = poManager.getdashBoardPage();
    await dashBoardPage.addProductToCart(testDataForOrder.prodName);

    // Verify product is in the cart and proceed to checkout
    const isProductInCart = dashBoardPage.checkCartsPrducts(testDataForOrder.prodName);
    expect(isProductInCart).toBeTruthy();
    await dashBoardPage.checkoutCart();
});