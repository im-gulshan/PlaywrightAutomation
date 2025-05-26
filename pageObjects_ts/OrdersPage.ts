import { expect, type Locator, type Page } from '@playwright/test';


export class OrdersPage{
    page: Page;
    checkOrderIdLeft: string;
    checkOrderIdRight: string;



    constructor(page: Page){
        this.page = page;
        this.checkOrderIdLeft = "//tbody/tr/th[text()='";
        this.checkOrderIdRight = "']//following-sibling::td/button[text()='View']";
    }

    async viewOrderById(orderId: string){
        const dynamicXpath = this.checkOrderIdLeft+orderId+this.checkOrderIdRight;
        await this.page.locator(dynamicXpath).click();
    }

}
module.exports = {OrdersPage};