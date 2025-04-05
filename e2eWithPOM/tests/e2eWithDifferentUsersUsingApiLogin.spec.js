const { test, expect, request } = require('@playwright/test');
const testData = require('../testdata/e2eData.json');
const { POManager } = require('../pageobjects/POManager.js');
const { CommonUtility } = require('../utilities/commonUtility.js')
const { LoginAndTokenManager}= require('../authentication/LoginAndTokenManagerUsingAPILogin.js')
let loginAndTokenManager;
let commonUtility;
let poManager;
let adminToken;
let managerToken;
test.beforeAll(async({browser})=>{
    const adminApiContext= await request.newContext();
    const managerApiContext= await request.newContext();
    loginAndTokenManager= new LoginAndTokenManager(adminApiContext,managerApiContext);
    adminToken=await loginAndTokenManager.shopLoginWithAdminAndreturnToken();
    managerToken=await loginAndTokenManager.shopLoginWithManagerAndreturnToken();


})

test('Login via UI and Buy Product e2e', async({page})=>{
    poManager = new POManager(page);
    commonUtility=new CommonUtility(page);
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
    await page.pause()
    await commonUtility.cleanCacheAndCookies();
    await page.pause();
    
})



// test('@admin Admin login via API and Buy Product e2e', async({browser})=>{
//     test.setTimeout(60000); // Set timeout to 60 seconds
//     const context = await browser.newContext();
//     await context.addInitScript((token) => {
//         window.localStorage.setItem("token", token);
//         console.log('Token set as cookie', window.localStorage.getItem('token'));
//     }, adminToken);
//     const page = await context.newPage();
//     poManager = new POManager(page);
//     // console.log('running admin e2e with this token',adminToken)
//     // Navigate to the dashboard and add a product to the cart
//     const dashboardPage = await poManager.getDashboardPage();
//     await dashboardPage.navigateFirstTimeUsingTokenSetup();
//     await dashboardPage.waitForProductsToLoad();
//     await dashboardPage.selectProductAndAddToCart(testData.productName);
//     await dashboardPage.goToCart();

//     // Verify the product in the cart and complete the checkout process
//     const cartAndCheckoutPage = await poManager.getCartAndCheckoutPage();
//     await cartAndCheckoutPage.verifyProductInCart(testData.productName);
//     await cartAndCheckoutPage.clickOnCheckoutButton();
//     await cartAndCheckoutPage.fillCheckoutDetails();
    
//     await cartAndCheckoutPage.placeOrderAndVerifyPlacement();
    
    
// })


// test('@manager Login via API and Buy Product e2e', async({browser})=>{
//     const context = await browser.newContext();
    
//     await context.addInitScript((token) => {
//         window.localStorage.setItem("token", token);
//     }, managerToken);
//     const page = await context.newPage();
//     poManager = new POManager(page);

//     // Navigate to the dashboard and add a product to the cart
//     const dashboardPage = await poManager.getDashboardPage();
//     await dashboardPage.navigateFirstTimeUsingTokenSetup();
//     await dashboardPage.waitForProductsToLoad();
//     await dashboardPage.selectProductAndAddToCart(testData.productName);
//     await dashboardPage.goToCart();

//     // Verify the product in the cart and complete the checkout process
//     const cartAndCheckoutPage = await poManager.getCartAndCheckoutPage();
//     await cartAndCheckoutPage.verifyProductInCart(testData.productName);
//     await cartAndCheckoutPage.clickOnCheckoutButton();
//     await cartAndCheckoutPage.fillCheckoutDetails();
//     await cartAndCheckoutPage.placeOrderAndVerifyPlacement();
    
// })

