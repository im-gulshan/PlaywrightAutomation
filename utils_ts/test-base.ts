import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    prodName: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "gulshan@iomail.com",
            password: "Test@12345",
            prodName: "ZARA COAT 3"
        });
    }
});