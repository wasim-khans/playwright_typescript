const { test, expect, describe } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager.js');
const { CommonUtility } = require('../../utilities/commonUtility.js');

describe('Role-Based Login Demo', () => {
    let poManager;

    // ============================================
    // DEMO: Different Role Types
    // ============================================
    test('Role-Based Login - Different User Types', async ({ page }) => {
        console.log('🔹 ROLE-BASED LOGIN DEMO: Testing different user types');
        
        poManager = new POManager(page);
        const commonUtility = new CommonUtility(page);
        
        // Test 1: Default User Login
        console.log('👤 Testing default user login...');
        const loginPage = poManager.getLoginPage();
        await loginPage.navigate();
        await loginPage.loginWithRole('default');
        
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.waitForProductsToLoad();
        
        // Add product as default user
        await dashboardPage.selectProductAndAddToCart('ZARA COAT 3');
        const cartPage = poManager.getCartAndCheckoutPage();
        await cartPage.verifyProductInCart('ZARA COAT 3');
        
        console.log('✅ Default user login successful');
        
        // Clean up and test different role
        await commonUtility.cleanCacheAndCookies();
        
        // Test 2: Admin User Login (will use defaultUser as fallback)
        console.log('👑 Testing admin user login...');
        await loginPage.navigate();
        await loginPage.loginWithRole('admin');
        
        await dashboardPage.waitForProductsToLoad();
        await dashboardPage.selectProductAndAddToCart('ADIDAS ORIGINAL');
        await cartPage.verifyProductInCart('ADIDAS ORIGINAL');
        
        console.log('✅ Admin user login successful (using fallback credentials)');
        
        // Clean up and test manager role
        await commonUtility.cleanCacheAndCookies();
        
        // Test 3: Manager User Login (will use defaultUser as fallback)
        console.log('👨‍💼 Testing manager user login...');
        await loginPage.navigate();
        await loginPage.loginWithRole('manager');
        
        await dashboardPage.waitForProductsToLoad();
        await dashboardPage.selectProductAndAddToCart('iphone 13 pro');
        await cartPage.verifyProductInCart('iphone 13 pro');
        
        console.log('✅ Manager user login successful (using fallback credentials)');
    });

    // ============================================
    // PARALLEL ROLES TEST
    // ============================================
    test('Parallel Role-Based Login - Multiple Users', async ({ browser }) => {
        console.log('🔹 PARALLEL ROLES TEST: Multiple users with different roles');
        
        // Create separate contexts for different roles
        const adminContext = await browser.newContext();
        const managerContext = await browser.newContext();
        const userContext = await browser.newContext();
        
        const adminPage = await adminContext.newPage();
        const managerPage = await managerContext.newPage();
        const userPage = await userContext.newPage();
        
        const adminManager = new POManager(adminPage);
        const managerManager = new POManager(managerPage);
        const userManager = new POManager(userPage);
        
        // Admin user actions
        console.log('👑 Admin user starting...');
        const adminPromise = (async () => {
            const loginPage = adminManager.getLoginPage();
            await loginPage.navigate();
            await loginPage.loginWithRole('admin');
            
            const dashboardPage = adminManager.getDashboardPage();
            await dashboardPage.waitForProductsToLoad();
            await dashboardPage.selectProductAndAddToCart('ZARA COAT 3');
            
            const cartPage = adminManager.getCartAndCheckoutPage();
            await cartPage.verifyProductInCart('ZARA COAT 3');
            
            return { role: 'admin', product: 'ZARA COAT 3', status: 'completed' };
        })();
        
        // Manager user actions
        console.log('👨‍💼 Manager user starting...');
        const managerPromise = (async () => {
            const loginPage = managerManager.getLoginPage();
            await loginPage.navigate();
            await loginPage.loginWithRole('manager');
            
            const dashboardPage = managerManager.getDashboardPage();
            await dashboardPage.waitForProductsToLoad();
            await dashboardPage.selectProductAndAddToCart('ADIDAS ORIGINAL');
            
            const cartPage = managerManager.getCartAndCheckoutPage();
            await cartPage.verifyProductInCart('ADIDAS ORIGINAL');
            
            return { role: 'manager', product: 'ADIDAS ORIGINAL', status: 'completed' };
        })();
        
        // Default user actions
        console.log('👤 Default user starting...');
        const userPromise = (async () => {
            const loginPage = userManager.getLoginPage();
            await loginPage.navigate();
            await loginPage.loginWithRole('default');
            
            const dashboardPage = userManager.getDashboardPage();
            await dashboardPage.waitForProductsToLoad();
            await dashboardPage.selectProductAndAddToCart('iphone 13 pro');
            
            const cartPage = userManager.getCartAndCheckoutPage();
            await cartPage.verifyProductInCart('iphone 13 pro');
            
            return { role: 'default', product: 'iphone 13 pro', status: 'completed' };
        })();
        
        // Wait for all users to complete
        const [adminResult, managerResult, userResult] = await Promise.all([adminPromise, managerPromise, userPromise]);
        
        // Verify all users completed successfully
        expect(adminResult.status).toBe('completed');
        expect(managerResult.status).toBe('completed');
        expect(userResult.status).toBe('completed');
        
        console.log(`✅ Admin (${adminResult.role}) completed: ${adminResult.product}`);
        console.log(`✅ Manager (${managerResult.role}) completed: ${managerResult.product}`);
        console.log(`✅ Default User (${userResult.role}) completed: ${userResult.product}`);
        
        // Clean up contexts
        await adminContext.close();
        await managerContext.close();
        await userContext.close();
        
        console.log('✅ Parallel role-based test completed');
    });

    // ============================================
    // CLEANUP HOOKS
    // ============================================
    test.afterEach(async ({ page }) => {
        console.log('🧹 Cleaning up after test...');
        if (page) {
            try {
                const utility = new CommonUtility(page);
                await utility.cleanCacheAndCookies();
            } catch (error) {
                console.log('Cleanup error:', error.message);
            }
        }
    });

    test.afterAll(async () => {
        console.log('🏁 All role-based login tests completed');
        console.log('');
        console.log('📋 NOTE: To use different credentials for each role, update your secrets.json:');
        console.log('{');
        console.log('  "defaultUser": { "email": "user@example.com", "password": "userPass" },');
        console.log('  "adminUser": { "email": "admin@example.com", "password": "adminPass" },');
        console.log('  "managerUser": { "email": "manager@example.com", "password": "managerPass" }');
        console.log('}');
    });
});
