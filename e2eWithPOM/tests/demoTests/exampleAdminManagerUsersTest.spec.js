const { test, expect, describe } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager.js');
const { CommonUtility } = require('../../utilities/commonUtility.js');

describe('Admin and Manager Users Test', () => {
    let poManager;

    // ============================================
    // COLLABORATION TEST: Admin and Manager Working Together
    // ============================================
    test('Admin and Manager - Collaborative Shopping', async ({ browser }) => {
        console.log('🔹 COLLABORATION TEST: Admin and Manager working together');
        
        // Create two separate browser contexts
        const adminContext = await browser.newContext();
        const managerContext = await browser.newContext();
        
        const adminPage = await adminContext.newPage();
        const managerPage = await managerContext.newPage();
        
        const adminManager = new POManager(adminPage);
        const managerManager = new POManager(managerPage);
        
        // Admin user actions
        console.log('👑 Admin user starting...');
        const adminPromise = (async () => {
            const loginPage = adminManager.getLoginPage();
            await loginPage.navigate();
            await loginPage.loginWithRole('admin');
            
            const dashboardPage = adminManager.getDashboardPage();
            await dashboardPage.waitForProductsToLoad();
            
            // Admin adds high-value item
            await dashboardPage.selectProductAndAddToCart('ZARA COAT 3');
            
            const cartPage = adminManager.getCartAndCheckoutPage();
            await cartPage.verifyProductInCart('ZARA COAT 3');
            
            return { role: 'admin', product: 'ZARA COAT 3', status: 'completed' };
        })();
        
        // Manager user actions (in parallel)
        console.log('👨‍💼 Manager user starting...');
        const managerPromise = (async () => {
            const loginPage = managerManager.getLoginPage();
            await loginPage.navigate();
            await loginPage.loginWithRole('manager');
            
            const dashboardPage = managerManager.getDashboardPage();
            await dashboardPage.waitForProductsToLoad();
            
            // Manager adds different item
            await dashboardPage.selectProductAndAddToCart('ADIDAS ORIGINAL');
            
            const cartPage = managerManager.getCartAndCheckoutPage();
            await cartPage.verifyProductInCart('ADIDAS ORIGINAL');
            
            return { role: 'manager', product: 'ADIDAS ORIGINAL', status: 'completed' };
        })();
        
        // Wait for both users to complete
        const [adminResult, managerResult] = await Promise.all([adminPromise, managerPromise]);
        
        // Verify both users completed successfully
        expect(adminResult.status).toBe('completed');
        expect(managerResult.status).toBe('completed');
        
        console.log(`✅ Admin (${adminResult.role}) completed: ${adminResult.product}`);
        console.log(`✅ Manager (${managerResult.role}) completed: ${managerResult.product}`);
        
        // Clean up contexts
        await adminContext.close();
        await managerContext.close();
        
        console.log('✅ Collaborative test completed');
    });

    // ============================================
    // ROLE VERIFICATION TEST
    // ============================================
    test('Admin and Manager - Role Verification', async ({ page }) => {
        console.log('🔹 ROLE VERIFICATION: Testing different user capabilities');
        
        poManager = new POManager(page);
        const commonUtility = new CommonUtility(page);
        
        // Login and get to dashboard
        const loginPage = poManager.getLoginPage();
        await loginPage.navigate();
        await loginPage.loginWithRole('admin');
        
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.waitForProductsToLoad();
        
        // Verify dashboard is accessible
        const isDashboardVerified = await dashboardPage.isDashboardPageVerified();
        expect(isDashboardVerified).toBeTruthy();
        
        // Get all available products
        const allProducts = await dashboardPage.getAllProductTitles();
        expect(allProducts.length).toBeGreaterThan(0);
        
        // Verify specific products exist
        expect(allProducts).toContain('ZARA COAT 3');
        expect(allProducts).toContain('ADIDAS ORIGINAL');
        
        console.log('✅ Role verification completed');
        console.log(`   Available products: ${allProducts.length}`);
        console.log(`   Contains ZARA COAT 3: ${allProducts.includes('ZARA COAT 3')}`);
        console.log(`   Contains ADIDAS ORIGINAL: ${allProducts.includes('ADIDAS ORIGINAL')}`);
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
        console.log('🏁 All admin and manager tests completed');
    });
});
