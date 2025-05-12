class OrderSummary{

    constructor(page){
        this.page = page;
        this.orderIdSummarryPageLocator = page.locator("//div[@class='col-text -main']");
    }

    async getOrderSummaryOrderId(){
        const orderId = this.orderIdSummarryPageLocator.textContent();
        return orderId;
    }

}
module.exports = {OrderSummary};