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
    adminSessionFilePath = await loginAndTokenManagerUsingLoginState.loginWithAdminRoleAndSaveStateAndReturnPath();
    await adminContext.close();


})


test('Login with new broswerContext loading the state from saved adminSessionfile', async ({ browser }) => {

    const adminContext = await browser.newContext({ storageState: adminSessionFilePath })
    const page = await adminContext.newPage();
    const poManager = new POManager(page)
    await page.pause()
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.navigateFirstTimeUsingTokenSetup();
    await page.pause()


})