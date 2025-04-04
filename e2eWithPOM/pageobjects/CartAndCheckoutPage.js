const { expect } = require('@playwright/test');
class CartAndCheckoutPage{
    constructor(page,expect) {
        this.expect=expect;
        this.page = page;
        this.url = 'https://rahulshettyacademy.com/client/dashboard/cart';
    }
    async navigate() {
        await this.page.goto(url);
    }
    

    async clickOnCheckout() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
    }
    async verifyProductInCart(productName) {
        await this.page.locator("div li").first().waitFor();
        await expect(this.page.getByText(productName)).toBeVisible();
    }
    async clickOnCheckoutButton() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
    }

    async fillCheckoutDetails() {
        await this.page.getByPlaceholder("Select Country").pressSequentially("ind");
        await this.page.getByRole("button", { name: "India" }).nth(1).click();
        
    }
    async placeOrderAndVerifyPlacement(){
        await this.page.getByText("PLACE ORDER").click();
        await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();
    }
}
module.exports={CartAndCheckoutPage};