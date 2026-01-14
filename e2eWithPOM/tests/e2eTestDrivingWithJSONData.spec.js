const { test, expect } = require('@playwright/test');
const testData = require('../testdata/e2eData.json');
const { POManager } = require('../pageobjects/POManager.js');
const path = require('path');
let poManager;

test.only('@Webst Client App login', async ({ page }) => {
    // Initialize Page Object Manager
    poManager = new POManager(page);

    // Login to the application
    const loginPage = await poManager.getLoginPage();
    await loginPage.navigate();
    await loginPage.fillCredentialsAndLogin();

    // Navigate to the dashboard and add a product to the cart
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.waitForProductsToLoad();
    await dashboardPage.selectProductAndAddToCart(testData.productName);
    await dashboardPage.goToCart();

    // Verify the product in the cart and complete the checkout process
    const cartAndCheckoutPage = await poManager.getCartAndCheckoutPage();
    await cartAndCheckoutPage.verifyProductInCart(testData.productName);
    await cartAndCheckoutPage.clickOnCheckoutButton();
    await cartAndCheckoutPage.fillCheckoutDetails();
    await cartAndCheckoutPage.placeOrderAndVerifyPlacement();

    
    await page.pause();
});
