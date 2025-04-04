const { test, expect } = require('@playwright/test');
const testData=require('../testdata/e2eData.json');
const {POManager} = require('../pageobjects/POManager.js');
let poManager;

test('@Webst Client App login', async ({ page }) => {
    poManager=new POManager(page);
    const loginPage= await poManager.getLoginPage();
    await loginPage.navigate();
    await loginPage.fillCredentialsAndLogin();
    const dashboardPage= await poManager.getDashboardPage();
    await dashboardPage.waitForProductsToLoad();
    await dashboardPage.selectProductAndAddToCart(testData.productName);
    await dashboardPage.goToCart();
    const cartAndCheckoutPage= await poManager.getCartAndCheckoutPage();
    await cartAndCheckoutPage.verifyProductInCart(testData.productName);
    await cartAndCheckoutPage.clickOnCheckoutButton();
    await cartAndCheckoutPage.fillCheckoutDetails();
    await cartAndCheckoutPage.placeOrderAndVerifyPlacemenet();
    await page.pause();

   

   
})