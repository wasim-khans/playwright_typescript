class CustomUtils{
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

async goToOrderPageAndCheckIfOrderExists(page,orderIdToCheck){
    await page.goto(process.env.clientLoginUrl)
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderIdToCheck.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    if (orderIdDetails===orderIdToCheck){
        console.log("Test Passed")
    }
    console.log(orderIdDetails)
    console.log(orderIdToCheck)

}
}
module.exports = { CustomUtils };