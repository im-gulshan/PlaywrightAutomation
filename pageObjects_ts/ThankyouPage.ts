import { expect, type Locator, type Page } from '@playwright/test';

export class ThankyouPage {
    page: Page;
    orderConfirmationMessageLocator: Locator;
    orderIdLocator: Locator;
    constructor(page: Page) {
        this.orderConfirmationMessageLocator = page.locator(".hero-primary");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async getOrderConfirmationMessage() {
        const orderSuccessMsg = (await this.orderConfirmationMessageLocator.textContent() ?? '');
        return orderSuccessMsg.trim();
    }

    async getOrderId() {
        const orderID = (await this.orderIdLocator.textContent() ?? '');
        console.log(orderID);
        const partOfOrderId = orderID.split('|');
        console.log("Parts " + partOfOrderId);
        let extractedID = partOfOrderId[1].trim();
        console.log("extractedID " + extractedID);
        return extractedID;
    }



}
module.exports = { ThankyouPage };