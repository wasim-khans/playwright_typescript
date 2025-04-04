const secrets = require('../testdata/secrets.json');
class LoginAndTokenManagerUsingLoginState {

    constructor(adminPage,managerPage) {
        this.adminPage=adminPage;
        this.managerPage=managerPage;
        this.shopLoginUrl = 'https://rahulshettyacademy.com/client';
    }

    async loginWithAdminRoleAndSaveState() {
        this.role = secrets.adminRole;
        await this.adminPage.pause()
        await this.adminPage.goto(this.shopLoginUrl);
        await this.adminPage.pause()
        await this.adminPage.getByPlaceholder("email@example.com").fill(this.role.email);
        await this.adminPage.getByPlaceholder("enter your passsword").fill(this.role.password);
        await this.adminPage.getByRole('button', { name: "Login" }).click();
    
        
        // Save the browser context's state to a file (e.g., state.json)
        await this.adminPage.waitForLoadState('networkidle');

        await this.adminPage.context().storageState({ path: `./e2eWithPOM/authentication/adminSession.json` });

    }




}
module.exports = { LoginAndTokenManagerUsingLoginState };