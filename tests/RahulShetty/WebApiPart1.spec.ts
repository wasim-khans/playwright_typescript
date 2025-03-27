const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../../utils/ApiUtils');
const loginPayLoad = { userEmail: "muhammadwasimkhan8@gmail.com", userPassword: "Nopass@1234" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})


//create order is success
test('@API Place the order', async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);
        console.log('Token set as cookie', window.localStorage.getItem('token'));
    }, response.token);
    // 
    await page.goto("https://rahulshettyacademy.com/client");
    await page.pause()
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

//Verify if order created is showing in history page
// Precondition - create order -