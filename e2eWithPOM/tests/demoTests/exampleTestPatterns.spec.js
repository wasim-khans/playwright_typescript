const { test, expect, describe } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager.js');
const { CommonUtility } = require('../../utilities/commonUtility.js');

// Test data for examples
const testProduct = {
    name: 'ZARA COAT 3',
    minPrice: 1000,
    category: 'clothing'
};

describe('Working Example Test Patterns', () => {
    let poManager;
    let commonUtility;

    // ============================================
    // 1. SINGLE USER TEST - Basic Login & Product Selection
    // ============================================
    test('Single User - Login and Product Selection', async ({ page }) => {
        console.log('🔹 SINGLE USER TEST: Login and Product Selection');
        
        // Initialize page objects
        poManager = new POManager(page);
        commonUtility = new CommonUtility(page);
        
        // Step 1: Login via UI
        const loginPage = poManager.getLoginPage();
        await loginPage.navigate();
        await loginPage.loginWithRole('default');
        
        // Step 2: Navigate and select product
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.waitForProductsToLoad();
        await dashboardPage.selectProductAndAddToCart(testProduct.name);
        
        // Step 3: Verify in cart
        const cartPage = poManager.getCartAndCheckoutPage();
        await cartPage.verifyProductInCart(testProduct.name);
        
        console.log('✅ Single user test completed successfully');
    });

    // ============================================
    // 2. DATA-DRIVEN TEST EXAMPLE
    // ============================================
    const testData = [
        { product: 'ZARA COAT 3', category: 'clothing', minPrice: 1000 },
        { product: 'ADIDAS ORIGINAL', category: 'footwear', minPrice: 2000 }
    ];

    test('Data-Driven Test - Multiple Products', async ({ page }) => {
        console.log('🔹 DATA-DRIVEN TEST: Testing multiple products');
        
        poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        
        // Login
        await loginPage.navigate();
        await loginPage.loginWithRole('default');
        
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.waitForProductsToLoad();
        
        // Test each product
        for (const data of testData) {
            const allProducts = await dashboardPage.getAllProductTitles();
            
            if (allProducts.includes(data.product)) {
                console.log(`Testing product: ${data.product}`);
                
                // Add to cart and verify
                await dashboardPage.selectProductAndAddToCart(data.product);
                
                const cartPage = poManager.getCartAndCheckoutPage();
                await cartPage.verifyProductInCart(data.product);
                
                // Go back to dashboard for next product
                await page.goto('https://rahulshettyacademy.com/client/dashboard/dash');
                await dashboardPage.waitForProductsToLoad();
                
                console.log(`✅ ${data.product} test passed`);
            } else {
                console.log(`⚠️ ${data.product} not available, skipping`);
            }
        }
    });

    // ============================================
    // 3. ASSERTIONS & VALIDATIONS TEST
    // ============================================
    test('Assertions & Validations - Product Details', async ({ page }) => {
        console.log('🔹 ASSERTIONS TEST: Product validation');
        
        poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        
        // Measure page load time
        const startTime = Date.now();
        await loginPage.navigate();
        await loginPage.loginWithRole('default');
        const loadTime = Date.now() - startTime;
        
        // Assert reasonable load time
        expect(loadTime).toBeLessThan(15000); // 15 seconds max
        
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.waitForProductsToLoad();
        
        // Product availability assertions
        const products = await dashboardPage.getAllProductTitles();
        expect(products.length).toBeGreaterThan(0);
        expect(products).toContain(testProduct.name);
        
        // Price validation
        const zaraCoatTile = page.locator(".card-body").filter({ hasText: "ZARA COAT 3" });
        const priceElement = await zaraCoatTile.getByText('$').first();
        const priceText = await priceElement.textContent();
        const actualPrice = parseFloat(priceText.replace('$', '').trim());
        
        expect(actualPrice).toBeGreaterThan(0);
        expect(actualPrice).toBeLessThan(100000); // Reasonable price range
        
        console.log(`✅ Assertions test passed - Load time: ${loadTime}ms, Price: $${actualPrice}`);
    });

    // ============================================
    // 4. ERROR HANDLING TEST
    // ============================================
    test('Error Handling - Page Navigation', async ({ page }) => {
        console.log('🔹 ERROR HANDLING: Navigation and visibility');
        
        poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        
        // Test login page navigation
        await loginPage.navigate();
        
        // Test successful login
        await loginPage.loginWithRole('default');
        
        const dashboardPage = poManager.getDashboardPage();
        
        // Verify dashboard loaded
        const isDashboardVerified = await dashboardPage.isDashboardPageVerified();
        expect(isDashboardVerified).toBeTruthy();
        
        console.log('✅ Error handling test passed');
    });

    // ============================================
    // 5. CLEANUP TEST
    // ============================================
    test('Cleanup - Session Management', async ({ page }) => {
        console.log('🔹 CLEANUP TEST: Session management');
        
        poManager = new POManager(page);
        commonUtility = new CommonUtility(page);
        
        // Login and perform actions
        const loginPage = poManager.getLoginPage();
        await loginPage.navigate();
        await loginPage.loginWithRole('default');
        
        // Clean up after test
        await commonUtility.cleanCacheAndCookies();
        
        console.log('✅ Cleanup test completed');
    });

    // ============================================
    // CLEANUP HOOKS
    // ============================================
    test.afterEach(async ({ page }) => {
        console.log('🧹 Cleaning up after test...');
        if (commonUtility && page) {
            try {
                await commonUtility.cleanCacheAndCookies();
            } catch (error) {
                console.log('Cleanup error:', error.message);
            }
        }
    });

    test.afterAll(async () => {
        console.log('🏁 All working example tests completed');
    });
});
