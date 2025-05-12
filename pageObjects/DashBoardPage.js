class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.allProductTitles = page.locator(".card-body b");
        this.cart = page.locator("//button[contains(@routerlink, 'cart')]");
        this.addProdToCartLeft = "//b[text()='";
        this.addProdToCartRight = "']//ancestor::div[@class='card-body']//button[@class='btn w-10 rounded']";
        this.cartsProductLeft = "h3:has-text('";
        this.cartsProductRight = "')";
        this.checkout = page.locator("//li/button[@type='button']");
        this.cartsProd = page.locator("//div[@class='cartSection']/h3");
    }

    async addProductToCart(product) {
        await this.allProductTitles.first().waitFor();
        const dynamicXpath = this.addProdToCartLeft + product + this.addProdToCartRight;
        await this.page.locator(dynamicXpath).click();
        this.cart.click();
        await this.cartsProd.textContent();
    }

    async checkCartsPrducts(product) {
        this.page.locator("div li").first().waitFor();
        const dynamicXpath = this.cartsProductLeft + product + this.cartsProductRight;
        const isVisible = await this.page.locator(dynamicXpath).isVisible();
        if (!isVisible) {
            throw new Error(`Product '${product}' is not visible in the cart.`);
        }
        return isVisible; // Optional: Return the visibility status
    }

    async checkoutCart(){
        this.checkout.click();
    }


}

module.exports = { DashBoardPage };
