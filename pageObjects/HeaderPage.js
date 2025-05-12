class HeaderPage{

    constructor(page){
        this.ordersLocator = page.locator("//button[contains(@routerlink, 'orders')]");
    }

    async openOrders(){
        this.ordersLocator.click();
    }






}
module.exports = {HeaderPage};