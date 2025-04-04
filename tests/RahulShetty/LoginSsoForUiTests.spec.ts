const { test, expect, request } = require('@playwright/test');
const { LoginAndTokenManager } = require('../../utils/LoginAndTokenManager');
const { ApiUtils } = require('../../utils/ApiUtils')
const { CustomUtils } = require('../../utils/CustomUtils')
require('dotenv').config({ path: './environmentConfigs/.env.rahulshettyclientapp' });
const loginPayLoad = { userEmail: "muhammadwasimkhan8@gmail.com", userPassword: "Nopass@1234" };

let customUtils;
let apiUtils;
let apiContext;
let loginAndTokenManager;
test.beforeAll(async () => {

    apiContext = await request.newContext();
    loginAndTokenManager = new LoginAndTokenManager(apiContext);
    apiUtils = new ApiUtils(apiContext, loginPayLoad); //I dont need the loginPayload but bcz RahulShetty is using it for the course thatswhy I am keeping it
    customUtils = new CustomUtils(apiContext);

})
// test.before

test('testing login with my LoginTokenManagerMethod', async ({ browser }) => {


    let context = await browser.newContext();
    let page = await context.newPage();
    let generalUserToken = await loginAndTokenManager.getGeneralUserLoginToken();
    await page.goto(process.env.clientLoginUrl, { waitUntil: 'domcontentloaded' }); // Ensure the page loads
    await loginAndTokenManager.setTokenInLocalStorage(page, generalUserToken); // Now this should work
    const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
    let orderId = await apiUtils.createOrderMyWay(generalUserToken, orderPayload); //createOrderMyWay fn returns orderId only
    await customUtils.goToOrderPageAndCheckIfOrderExists(page, orderId);


})

test('testing login with addInit method', async ({ browser }) => {
    let context = await browser.newContext();
    let page = await context.newPage();
    let generalUserToken = await loginAndTokenManager.getGeneralUserLoginToken();
    await context.addInitScript((token) => {
        window.localStorage.setItem("token", token);
    }, generalUserToken);
    const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };

    let createOrderResponse = await apiUtils.createOrder(orderPayload, generalUserToken); //createOrder fn returns whole json
    let orderId = createOrderResponse.orderId;
    await customUtils.goToOrderPageAndCheckIfOrderExists(page, orderId);

})

