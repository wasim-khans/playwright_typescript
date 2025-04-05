const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');
const testData = require('../testdata/e2eData.json');
const { LoginAndTokenManagerUsingLoginState } = require('../authentication/LoginAndTokenManagerUsingLoginState.js');
let loginAndTokenManagerUsingLoginState;
let poManager;
let adminSessionFilePath;
let adminContext;
let maangerContext;
let adminPage;
test.beforeAll(async ({ browser }) => {
    adminContext = await browser.newContext();
    // managerContext = await browser.newContext();
    adminPage = await adminContext.newPage();
    // const managerPage = await managerContext.newPage();
    loginAndTokenManagerUsingLoginState = new LoginAndTokenManagerUsingLoginState(adminPage);
    adminSessionFilePath=await loginAndTokenManagerUsingLoginState.loginWithAdminRoleAndSaveStateAndReturnPath();
    
    
  


})


test('Login with different users using login state', async () => {

    
    const page = await adminPage
    poManager = new POManager(page);
    // admin login and e2e
    
    let dashboardPage= await poManager.getDashboardPage();
    await dashboardPage.navigateFirstTimeUsingTokenSetup();
    
    console.log(await dashboardPage.allProductsTextsElements)
    let texts= await dashboardPage.getAllProductTitles();
    console.log(texts)
    

    // const dashboardPage = await poManager.getDashboardPage();
    // await dashboardPage.waitForProductsToLoad();
    // await dashboardPage.selectProductAndAddToCart(testData.productName);
    // await dashboardPage.goToCart();

    // // Verify the product in the cart and complete the checkout process
    // const cartAndCheckoutPage = await poManager.getCartAndCheckoutPage();
    // await cartAndCheckoutPage.verifyProductInCart(testData.productName);
    // await cartAndCheckoutPage.clickOnCheckoutButton();
    // await cartAndCheckoutPage.fillCheckoutDetails();
    // await cartAndCheckoutPage.placeOrderAndVerifyPlacement();

})
