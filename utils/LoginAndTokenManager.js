require('dotenv').config({ path: './environmentConfigs/.env.rahulshettyclientapp' });

class LoginAndTokenManager {
    constructor(apiContext) {
        this.apiContext = apiContext;
        this.generalUserEmail = process.env.generalUserEmail;
        this.generalUserPassword = process.env.generalUserPassword;
    }

    async getAdminLoginToken() {
        // TODO: Implement admin login token retrieval
    }

    async getCustomerLoginToken() {
        // TODO: Implement customer login token retrieval
    }

    async getGeneralUserLoginToken() {
        let loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: {
                userEmail: this.generalUserEmail,
                userPassword: this.generalUserPassword
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(loginResponse);
        if (loginResponse.ok()) {
            loginResponse = await loginResponse.json();
            const token = loginResponse.token;
            return token;
        }
        else {
            throw new Error("Login failed");
        }

    }

    async setTokenInLocalStorage(page, userToken) {
        await page.evaluate((token) => {
            localStorage.setItem("token", token);
        }, userToken);
    }


    


}

module.exports = { LoginAndTokenManager };
