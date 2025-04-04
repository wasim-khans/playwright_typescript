class DashboardPage{
    constructor(page){
        this.page=page;
        this.allProductsList=this.page.locator(".card-body");
        this.allProductsTexts=this.page.locator(".card-body b");
        this.url='https://rahulshettyacademy.com/client/dashboard/dash';
        this.mainUrl='https://rahulshettyacademy.com/client/';
    }
    async navigate(){
        await this.page.goto(this.url);
    }
    async navigateFirstTimeUsingTokenSetup(){
        await this.page.goto(this.mainUrl);
        await this.page.goto(this.url)
    }
    async waitForProductsToLoad(){
        await this.allProductsList.first().waitFor();
    }
    async selectProductAndAddToCart(productName) {
        this.waitForProductsToLoad();
        await this.allProductsList.filter({ hasText: this.productName }).first().getByRole("button", { name: 'Add To Cart' }).click();
    }

    async goToCart() {
        await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
    }

}
module.exports={DashboardPage};