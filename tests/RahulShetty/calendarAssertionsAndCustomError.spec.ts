const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Open Calendar
    await page.locator(".react-date-picker__inputGroup").click();

    // Select Year
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();

    // Select Month
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();

    // Select Date
    await page.locator(`//abbr[text()='${date}']`).click();

    // Fetch input values
    const inputs = await page.locator(".react-date-picker__inputGroup input").all();

    for (let index = 1; index < inputs.length; index++) 
    {
    let actualvalue=await inputs[index].inputValue();
    let expectedvalue=expectedList[index-1];

    if (index === 1) {
        console.log("Month comparison");
        console.log('expected value=',expectedvalue,' and actual value',actualvalue);
        if (expectedvalue === actualvalue) {
            console.log("Month comparison passed");
        }
        else {
            console.log("Month comparison failed");
        }
    }
    if (index === 2) {
        console.log("Date comparison");
        console.log('expected value=',expectedvalue,' and actual value',actualvalue);
        if (expectedvalue === actualvalue) {
            console.log("Date comparison passed");
        }
        else {  
            console.log("Date comparison failed");
        }
    }
    if (index === 3) {  
        console.log("Year comparison");
        console.log('expected value=',expectedvalue,' and actual value',actualvalue);
        if (expectedvalue === actualvalue) {
            console.log("Year comparison passed");
        }
        else {
            throw new Error(`❌ Year comparison failed! Expected: '${expectedvalue}', but got: '${actualvalue}'`);
        }
    }
    }
    await page.pause()
});
