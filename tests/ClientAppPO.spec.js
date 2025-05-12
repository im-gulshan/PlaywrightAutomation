const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashBoardPage } = require('../pageObjects/DashBoardPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');
const { ThankyouPage } = require('../pageObjects/ThankyouPage');
const { HeaderPage } = require('../pageObjects/HeaderPage');
const { OrdersPage } = require('../pageObjects/OrdersPage');
const { OrderSummary } = require('../pageObjects/OrderSummary');

test('@Gen Client App Login', async ({ page }) => {
    // Test data
    const prodName = "ZARA COAT 3";
    const email = "gulshan@iomail.com";
    const password = "Test@12345";

    // Login to the application
    const loginPage = new LoginPage(page);
    loginPage.goto();
    loginPage.validLogin(email, password);

    // Create DashBoardPage object and add product to the cart
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.addProductToCart(prodName);

    // Verify product is in the cart and proceed to checkout
    const isProductInCart = dashBoardPage.checkCartsPrducts(prodName);
    expect(isProductInCart).toBeTruthy();
    await dashBoardPage.checkoutCart();

    // Create PaymentPage object and complete payment
    const paymentPage = new PaymentPage(page);
    paymentPage.selectCountryFromDropdown("India");
    expect(paymentPage.verifyUserEmail(email));
    paymentPage.placeOrder();

    // Create ThankyouPage object and verify order confirmation
    const thankyouPage = new ThankyouPage(page);
    const confirmationMessage = await thankyouPage.getOrderConfirmationMessage();
    expect(confirmationMessage).toBe("Thankyou for the order.");

    // Retrieve the order ID
    const extractedID = await thankyouPage.getOrderId();

    // Create HeaderPage object and navigate to orders
    const headerPage = new HeaderPage(page);
    headerPage.openOrders();

    // Create OrdersPage object and view the specific order
    const orderPage = new OrdersPage(page);
    orderPage.viewOrderById(extractedID);

    // Create OrderSummary object and retrieve the order summary ID
    const orderSummary = new OrderSummary(page);
    const orderSummaryOrderId = await orderSummary.getOrderSummaryOrderId();

    // Log the order summary ID
    console.log("Order Summary Order ID: " + orderSummaryOrderId);
});