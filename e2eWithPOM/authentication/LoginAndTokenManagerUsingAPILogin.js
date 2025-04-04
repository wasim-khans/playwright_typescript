const secrets = require('../testdata/secrets.json');
class LoginAndTokenManager {
    constructor(adminApiContext,managerApiContext) {
        this.adminContext = adminApiContext;
        this.managerContext = managerApiContext;
        this.shopLoginUrl='https://rahulshettyacademy.com/api/ecom/auth/login';
    }

    async shopLoginWithAdminAndreturnToken() {
        const roleName='Admin'
        this.role=secrets.adminRole;
        const loginPayload = {
            userEmail: this.role.email,
            userPassword: this.role.password
        };

        const response = await this.adminContext.post(this.shopLoginUrl, {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok()) {
            // await this.adminContext.storageState({ path: 'adminSession.json' });
            const responseBody=await response.json();
            const token = responseBody.token;
            // console.log(`${roleName} Token:`, token);
            
            return token;
        } else {
            throw new Error(`Login with ${roleName} role failed`);
        }

    }

    async setTokenInLocalStorage(page, userToken) {
        await page.evaluate((token) => {
            localStorage.setItem("token", token);
        }, userToken);
    }

    async shopLoginWithManagerAndreturnToken() {
        const roleName='manager'
        this.role=secrets.managerRole;
        const loginPayload = {
            userEmail: this.role.email,
            userPassword: this.role.password
        };

        const response = await this.adminContext.post(this.shopLoginUrl, {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok()) {
            // await this.adminContext.storageState({ path: 'adminSession.json' });
            const responseBody=await response.json();
            const token = responseBody.token;
            // console.log(`${roleName} Token:`, token);
            
            return token;
        } else {
            throw new Error(`Login with ${roleName} role failed`);
        }

    }

    

   
}

module.exports = { LoginAndTokenManager };