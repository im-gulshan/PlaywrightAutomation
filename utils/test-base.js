const base = require('@playwright/test');


exports.customTest = base.test.extend({
    testDataForOrder: {
        username: "gulshan@iomail.com",
        password: "Test@12345",
        prodName: "ZARA COAT 3"
    }
});