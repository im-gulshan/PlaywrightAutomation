import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderPage{
    page: Page;
    ordersLocator: Locator;

    constructor(page: Page){
        this.ordersLocator = page.locator("//button[contains(@routerlink, 'orders')]");
    }

    async openOrders(){
        this.ordersLocator.click();
    }






}
module.exports = {HeaderPage};