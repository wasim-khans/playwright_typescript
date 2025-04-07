const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');
const testData = require('../testdata/e2eData.json');
const { LoginAndTokenManagerUsingLoginState } = require('../authentication/LoginAndTokenManagerUsingLoginState.js');

let poManager;
let managerSessionFilePath;
let adminSessionFilePath;

test.beforeAll(async ({ browser }) => {

    const adminContext = await browser.newContext();
    const managerContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const managerPage = await managerContext.newPage();
    const loginAndTokenManagerUsingLoginState = new LoginAndTokenManagerUsingLoginState(adminPage,managerPage);
    adminSessionFilePath = await loginAndTokenManagerUsingLoginState.loginWithAdminRoleAndSaveStateAndReturnPath();
    await adminContext.close();
    managerSessionFilePath = await loginAndTokenManagerUsingLoginState.loginWithManagerRoleAndSaveStateAndReturnPath();
    await managerContext.close();

})


test('Login with new broswerContext loading the state from saved adminSessionfile', async ({ browser }) => {

    const adminContext = await browser.newContext({ storageState: adminSessionFilePath })
    const page = await adminContext.newPage();
    poManager = new POManager(page)
    await page.pause()
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.navigateFirstTimeUsingTokenSetup();
    await page.pause()

})

test('Login with new broswerContext loading the state from saved managerSessionFile', async ({ browser }) => {

    const managerContext = await browser.newContext({ storageState: managerSessionFilePath })
    const page = await managerContext.newPage();
    poManager = new POManager(page)
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.navigateFirstTimeUsingTokenSetup();
})

test.only('PlayAround with locators and assertions', async ({ browser }) => {

    const managerContext = await browser.newContext({ storageState: managerSessionFilePath })
    const page = await managerContext.newPage();
    poManager = new POManager(page)
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.navigateFirstTimeUsingTokenSetup();
    let allProducts=await page.locator(".card-body")
    let zaraCoatTile= allProducts.filter({hasText:"ZARA COAT 3"})
    let priceElement=await zaraCoatTile.getByText('$')
    let priceElementText=await priceElement.textContent();
    console.log('Zara price element value = ',priceElementText)
    let actualPriceValue=parseFloat(priceElementText.replace('$','').trim())
    expect(actualPriceValue).toBeGreaterThan(0)
    
})
