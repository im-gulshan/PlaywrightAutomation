import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage {
    page: Page;
    country: Locator;
    dropdown: Locator;
    selectCountryValue: Locator;
    emailLocator: Locator;
    placeOrderBtn: Locator;



    constructor(page) {
        this.country = page.locator("//div[@class = 'form-group']/input");
        this.dropdown = page.locator("//section[contains(@class, 'list-group')]");
        this.selectCountryValue = this.dropdown.locator("//button");
        this.emailLocator = page.locator(".user__name [type='text']");
        this.placeOrderBtn = page.locator(".action__submit");
    }


    async selectCountryFromDropdown(countryName: string) {
        await this.country.pressSequentially(countryName);

        await this.dropdown.waitFor();
        const optionsCount = await this.selectCountryValue.count();
        for (let i = 0; i < optionsCount; i++) {
            const text = (await this.selectCountryValue.nth(i).textContent() ?? '').trim();
            if (text === countryName) {
                await this.selectCountryValue.nth(i).click();
                break;
            }
        }
    }

    async verifyUserEmail(emailId: string) {
        const actualEmail: string = (await this.emailLocator.first().textContent() ?? '').trim();
        if (actualEmail !== emailId) {
            throw new Error(`Email Id : '${emailId}' is not found on payment page.`);
        }
        return true;
    }

    async placeOrder() {
        this.placeOrderBtn.click();
    }








}
module.exports = { PaymentPage };