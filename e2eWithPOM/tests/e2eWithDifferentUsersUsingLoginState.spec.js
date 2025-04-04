const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');
const { LoginAndTokenManagerUsingLoginState } = require('../authentication/LoginAndTokenManagerUsingLoginState.js');
let loginAndTokenManagerUsingLoginState;
let poManager;
test.beforeAll(async ({ browser }) => {
    const adminContext = await browser.newContext();
    const managerContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const managerPage = await managerContext.newPage();
    loginAndTokenManagerUsingLoginState = new LoginAndTokenManagerUsingLoginState(adminPage,managerPage);
    await loginAndTokenManagerUsingLoginState.loginWithAdminRoleAndSaveState();


})


test('Login with different users using login state', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    poManager = new POManager(page);
    

})
