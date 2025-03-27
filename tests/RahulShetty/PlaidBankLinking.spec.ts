require('dotenv').config(); // Load environment variables from .env
const { test, expect } = require('@playwright/test');

test('Motive Bank Linking - Handle Plaid iFrame and Popup', async ({ browser }) => {
    test.setTimeout(60000);
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set HTTP Basic Authentication (First set of credentials)
    await context.setHTTPCredentials({
        username: process.env.AUTH_USER1,
        password: process.env.AUTH_PASS1
    });

    // Navigate to the login page
    await page.goto(process.env.LOGIN_URL);

    // Set HTTP Basic Authentication (Second set of credentials)
    await context.setHTTPCredentials({
        username: process.env.AUTH_USER2,
        password: process.env.AUTH_PASS2
    });

    // Fill login credentials from .env
    await page.locator('#user_email').fill(process.env.USER_EMAIL);
    await page.locator('#user_password').fill(process.env.USER_PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();

    // Navigate to the card application page
    await page.goto(`${process.env.BASE_URL}/en-US/#/admin/fleet-cards/card-application`);

    // Click "Verify bank account" button (which opens the Plaid iFrame)
    await page.getByRole('button', { name: 'Verify bank account' }).click();

    // Handle Plaid iFrame
    const plaidFrame = await page.frameLocator('#plaid-link-iframe-1');
    await plaidFrame.locator('button:has-text("Continue")').click();
    await plaidFrame.locator('button:has-text("Continue as guest")').click();
    await plaidFrame.locator('.CondensedSearchTile-module__searchImage').nth(3).click();

    // Handle Plaid Bank Popup
    const [plaidBankPopup] = await Promise.all([
        page.waitForEvent('popup'), // Detect new window
        plaidFrame.locator('button:has-text("Continue to login")').click() // Click to trigger popup
    ]);

    await plaidBankPopup.waitForLoadState();
    await plaidBankPopup.locator('#username').fill('user_good');
    await plaidBankPopup.locator('#password').fill('pass_good');
    await plaidBankPopup.locator('button:has-text("Sign in")').click();
    await plaidBankPopup.getByRole('button', { name: 'Get code' }).click();
    await plaidBankPopup.getByRole('button', { name: 'Submit' }).click();
    
    // Select bank account and proceed
    const checkbox = await plaidBankPopup.locator('label').filter({ hasText: 'Plaid Checking' }).getByRole('checkbox');
    await checkbox.waitFor();
    await checkbox.click();
    await plaidBankPopup.getByRole('button', { name: 'Continue' }).click();
    await plaidBankPopup.getByLabel('I have read and accept the').click();
    await plaidBankPopup.getByRole('button', { name: 'Connect account information' }).click();

    // Control back to iframe and finish process
    await plaidFrame.getByRole('button', { name: 'Finish without saving' }).click();

    await page.pause();
});
