import { expect, type Locator, type Page } from '@playwright/test';

export class OrderSummary{
    page: Page;
    orderIdSummarryPageLocator: Locator;

    constructor(page: Page){
        this.page = page;
        this.orderIdSummarryPageLocator = page.locator("//div[@class='col-text -main']");
    }

    async getOrderSummaryOrderId(){
        const orderId = this.orderIdSummarryPageLocator.textContent();
        return orderId;
    }

}
module.exports = {OrderSummary};