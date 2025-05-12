class OrdersPage{

    constructor(page){
        this.page = page;
        this.checkOrderIdLeft = "//tbody/tr/th[text()='";
        this.checkOrderIdRight = "']//following-sibling::td/button[text()='View']";
    }

    async viewOrderById(orderId){
        const dynamicXpath = this.checkOrderIdLeft+orderId+this.checkOrderIdRight;
        await this.page.locator(dynamicXpath).click();
    }

}
module.exports = {OrdersPage};