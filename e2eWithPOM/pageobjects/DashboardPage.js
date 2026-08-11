class DashboardPage {
    constructor(page) {
        this.page = page;
        
        this.allProductsTiles = this.page.locator(".card-body");
        this.allProductsTextsElements = this.page.locator(".card-body b");
        this.url = 'https://rahulshettyacademy.com/client/dashboard/dash';
        this.mainUrl = 'https://rahulshettyacademy.com/client/';
    }
    async verifyLocatorIsVisibleOrNot(locator) {
        const targetElement = this.page.locator(locator);
        const isTargetVisible = await targetElement.isVisible();
        return isTargetVisible;

    }
    async getAllProductsText(){
        const texts= await this.allProductsTextsElements.allTextContents();
        return texts;
    }
    async isDashboardPageVerified() {
        const isSignOutVisible = await this.isSignOutButtonVisibleOnDashboard();
        const isAutomationPracticeTextVisible = await this.isAutomationPracticeTextVisible();
        console.log('Is DashboardPage Verified? => ',isSignOutVisible && isAutomationPracticeTextVisible)
        return (isSignOutVisible && isAutomationPracticeTextVisible);
    }
    async navigate() {
        await this.page.goto(this.url);
        const isVerified = await this.isDashboardPageVerified();
        if (isVerified) {
            console.log('Successfully navigated to Dashboard');
        } else {
            throw new Error('Dashboard verification failed');
        }
    }
    async isSignOutButtonVisibleOnDashboard() {
        return await this.verifyLocatorIsVisibleOrNot('button:has-text("Sign Out")');
    }
    async isAutomationPracticeTextVisible() {
        let text='Automation Practice';
        let textLocator = await this.page.getByText(text);
        // console.log('text locator for the automation text = ',textLocator)
        let isVisible = await textLocator.isVisible();
        // console.log('isAutomationPracticeTextVisible isVisible ',isVisible)
        if (isVisible){
            console.log(text,'is visible')
            return true;
        }
        else {
            console.log(text,'is not visible')
            return false;
        }
    }
    async navigateFirstTimeUsingTokenSetup() {
        await this.page.goto(this.mainUrl);
        const isVerified = await this.isDashboardPageVerified();
        if (!isVerified) {
            throw new Error('Dashboard verification failed after token setup');
        }
    }
    async waitForProductsToLoad() {
        await this.allProductsTiles.first().waitFor();
    }
    async selectProductAndAddToCart(productName) {
        await this.waitForProductsToLoad();
        await this.allProductsTiles
            .filter({ hasText: productName })
            .first()
            .getByRole("button", { name: 'Add To Cart' })
            .click();
    }

    async goToCart() {
        await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
    }

    async getAllProductTitles() {
        await this.allProductsTextsElements.first().waitFor()

        let allTitles = await this.allProductsTextsElements.allTextContents();
        return allTitles;
    }
}
module.exports = { DashboardPage };
