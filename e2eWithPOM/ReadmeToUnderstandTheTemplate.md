# E2E Testing Framework with Playwright & Page Object Model

## Overview

This framework demonstrates a scalable E2E testing implementation using Playwright with the Page Object Model (POM) pattern. It supports multiple authentication strategies, reusable components, and maintainable test structure.

## 📁 Project Structure

```
e2eWithPOM/
├── authentication/           # Authentication strategies
│   ├── LoginAndTokenManagerUsingAPILogin.js
│   ├── LoginAndTokenManagerUsingLoginState.js
│   ├── adminSession.json
│   └── managerSession.json
├── pageobjects/             # Page Object Model classes
│   ├── POManager.js        # Central page object manager
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── CartAndCheckoutPage.js
├── tests/                  # Test specifications
│   ├── e2eTestDrivingWithJSONData.spec.js
│   ├── e2eWithDifferentUsersUsingApiLogin.spec.js
│   └── e2eWithDifferentUsersUsingLoginState.spec.js
├── testdata/              # Test data and secrets
│   ├── e2eData.json
│   └── secrets.json
└── utilities/              # Helper utilities
    ├── CommonUtility.js
    ├── ApiUtility.js
    └── LoginAndTokenManager.js
```

## 🏗️ Architecture Patterns

### 1. Page Object Model (POM)

**Purpose**: Encapsulate page interactions and locators for maintainability.

**Implementation**:
```javascript
class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://example.com/login';
        this.emailPlaceholder = "email@example.com";
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }
    
    async fillCredentialsAndLogin(email, password) {
        await this.page.getByPlaceholder(this.emailPlaceholder).fill(email);
        await this.page.getByPlaceholder(this.passwordPlaceholder).fill(password);
        await this.page.getByRole('button', {name: "Login"}).click();
    }
}
```

### 2. Page Object Manager (POManager)

**Purpose**: Centralized management of all page objects.

**Benefits**:
- Single point of initialization
- Easy dependency injection
- Consistent page object access

```javascript
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartAndCheckoutPage = new CartAndCheckoutPage(this.page);
    }
    
    getLoginPage() { return this.loginPage; }
    getDashboardPage() { return this.dashboardPage; }
    getCartAndCheckoutPage() { return this.cartAndCheckoutPage; }
}
```

### 3. Multiple Authentication Strategies

#### A. UI-Based Authentication
```javascript
// Direct login through UI
await loginPage.navigate();
await loginPage.fillCredentialsAndLogin();
```

#### B. API-Based Authentication
```javascript
// Login via API and inject token
const token = await loginAndTokenManager.shopLoginWithAdminAndreturnToken();
await context.addInitScript((token) => {
    window.localStorage.setItem("token", token);
}, token);
```

#### C. Session State Persistence
```javascript
// Save and reuse browser session
await context.storageState({ path: 'adminSession.json' });
const newContext = await browser.newContext({ storageState: 'adminSession.json' });
```

## 🧪 Test Implementation Patterns

### 1. Basic Test Structure
```javascript
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');
const testData = require('../testdata/e2eData.json');

test('E2E Purchase Flow', async ({ page }) => {
    // Initialize
    const poManager = new POManager(page);
    
    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.navigate();
    await loginPage.fillCredentialsAndLogin();
    
    // Main flow
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.waitForProductsToLoad();
    await dashboardPage.selectProductAndAddToCart(testData.productName);
    
    // Verification
    const cartPage = poManager.getCartAndCheckoutPage();
    await cartPage.verifyProductInCart(testData.productName);
});
```

### 2. Data-Driven Testing
```javascript
// testdata/e2eData.json
{
    "productName": "ZARA COAT 3",
    "userEmail": "test@example.com",
    "password": "password123"
}

// In test file
const testData = require('../testdata/e2eData.json');
await dashboardPage.selectProductAndAddToCart(testData.productName);
```

### 3. Multi-User Testing
```javascript
test.beforeAll(async ({ browser }) => {
    // Setup different user contexts
    const adminContext = await browser.newContext();
    const managerContext = await browser.newContext();
    // ... authentication setup
});

test('Admin user flow', async ({ browser }) => {
    const context = await browser.newContext({ storageState: adminSessionFilePath });
    const page = await context.newPage();
    // ... test implementation
});
```

## 🔧 Configuration

### Playwright Config (playwright.config.ts)
```typescript
export default defineConfig({
    timeout: 20 * 1000,
    testDir: 'e2eWithPOM/tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    
    use: {
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },
    
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        // Add other browsers as needed
    ]
});
```

## 📝 Best Practices Implemented

### 1. **Separation of Concerns**
- Page Objects: UI interactions only
- Authentication: Login logic only
- Utilities: Reusable helpers
- Tests: Business logic only

### 2. **Maintainability**
- Centralized locators in page objects
- Reusable methods for common actions
- External test data management

### 3. **Scalability**
- Easy to add new pages
- Multiple authentication strategies
- Parallel test execution support

### 4. **Debugging Support**
- Screenshots on failure
- Trace collection
- Multiple reporting options

## 🚀 Getting Started

### 1. Installation
```bash
npm install @playwright/test
npx playwright install
```

### 2. Configuration
1. Update `playwright.config.ts` for your project needs
2. Create test data files in `testdata/` directory
3. Set up credentials in `secrets.json` (add to .gitignore)

### 3. Running Tests
```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/example.spec.js

# Run in UI mode
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

## 📋 Adding New Features

### 1. New Page Object
```javascript
// pageobjects/NewPage.js
class NewPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://example.com/new-page';
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }
    
    async performAction() {
        // Implementation
    }
}

module.exports = { NewPage };
```

### 2. Update POManager
```javascript
const { NewPage } = require('./NewPage.js');

class POManager {
    constructor(page) {
        // ... existing pages
        this.newPage = new NewPage(this.page);
    }
    
    getNewPage() { return this.newPage; }
}
```

### 3. New Test File
```javascript
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager.js');

test('New Feature Test', async ({ page }) => {
    const poManager = new POManager(page);
    const newPage = poManager.getNewPage();
    
    await newPage.navigate();
    await newPage.performAction();
    // Assertions
});
```

## 🔒 Security Considerations

1. **Never commit credentials** - Use environment variables or encrypted secrets
2. **Session management** - Clean up sessions after tests
3. **Data protection** - Use test data, not production data

## 📊 Reporting

### Enable HTML Reports
Uncomment in `playwright.config.ts`:
```typescript
reporter: 'html',
```

### Generate Reports
```bash
npx playwright test --reporter=html
npx playwright show-report
```

## 🐛 Debugging Tips

1. **Use VS Code Playwright extension** for step-by-step debugging
2. **Take screenshots** manually: `await page.screenshot({ path: 'debug.png' })`
3. **Use pause()**: `await page.pause()` for manual inspection
4. **Trace viewer**: `npx playwright show-trace trace.zip`

## 🎯 Advanced Features

### 1. Custom Commands
Create reusable test commands in utilities:
```javascript
// utilities/TestHelper.js
class TestHelper {
    static async loginAsUser(page, userType) {
        // Implementation for different user types
    }
    
    static async generateTestData() {
        // Dynamic test data generation
    }
}
```

### 2. API Integration
Combine API and UI testing:
```javascript
// Setup data via API
const apiResponse = await apiContext.post('/api/products', { data: productData });
// Verify via UI
await page.goto('/products');
await expect(page.getByText(productData.name)).toBeVisible();
```

### 3. Cross-Browser Testing
```typescript
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

## 📈 Scaling the Framework

1. **Modular Architecture**: Each feature in its own directory
2. **Shared Components**: Common actions in utilities
3. **Configuration Management**: Environment-specific configs
4. **CI/CD Integration**: GitHub Actions, Jenkins, etc.
5. **Test Data Management**: Factories for dynamic data

This framework provides a solid foundation for scalable E2E testing with Playwright, demonstrating industry best practices and maintainable code structure.
