const path = require('path');
const secrets = require('../testdata/secrets.json');
class LoginAndTokenManagerUsingLoginState {

    constructor(adminPage,managerPage) {
        this.adminPage=adminPage;
        this.managerPage=managerPage;
        this.shopLoginUrl = 'https://rahulshettyacademy.com/client';
        this.adminSessionStoragePath=`./e2eWithPOM/authentication/adminSession.json`
        this.managerSessionStoragePath=`./e2eWithPOM/authentication/managerSession.json`
    }

    async loginWithAdminRoleAndSaveStateAndReturnPath() {
        this.role = secrets.adminRole;
        await this.adminPage.goto(this.shopLoginUrl);
        await this.adminPage.getByPlaceholder("email@example.com").fill(this.role.email);
        await this.adminPage.getByPlaceholder("enter your passsword").fill(this.role.password);
        await this.adminPage.getByRole('button', { name: "Login" }).click();
        await this.adminPage.context().close
        
        await this.adminPage.waitForLoadState('networkidle');
        await this.adminPage.context().storageState({ path: this.adminSessionStoragePath });
        console.log('Path to admin session state',this.adminSessionStoragePath)
        return this.adminSessionStoragePath;
    }
    async loginWithManagerRoleAndSaveStateAndReturnPath() {
        this.role = secrets.managerRole;
        await this.managerPage.goto(this.shopLoginUrl);
        await this.managerPage.getByPlaceholder("email@example.com").fill(this.role.email);
        await this.managerPage.getByPlaceholder("enter your passsword").fill(this.role.password);
        await this.managerPage.getByRole('button', { name: "Login" }).click();
        await this.managerPage.context().close
        
        await this.managerPage.waitForLoadState('networkidle');
        await this.managerPage.context().storageState({ path: this.managerSessionStoragePath });
        console.log('Path to manager session state',this.managerSessionStoragePath)
        return this.managerSessionStoragePath;
    }




}
module.exports = { LoginAndTokenManagerUsingLoginState };