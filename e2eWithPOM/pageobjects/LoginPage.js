
const secrets = require('../testdata/secrets.json');

class LoginPage{
    constructor(page){
        this.page=page;
        this.url='https://rahulshettyacademy.com/client';
        
        // Use credentials from secrets.json with fallback to default values
        this.defaultUserEmail = secrets.defaultRole.email;
        this.deafultUserPassword = secrets.defaultRole.password;
        
    }
async navigate(){
  await this.page.goto(this.url);
}
async fillCredentialsAndLogin(){
    await this.page.getByPlaceholder("email@example.com").fill(this.defaultUserEmail);
    await this.page.getByPlaceholder("enter your passsword").fill(this.deafultUserPassword);
    await this.page.getByRole('button',{name:"Login"}).click();
    await this.page.waitForLoadState('networkidle');
}

async loginWithRole(roleType) {
    let credentials;
    
    switch(roleType.toLowerCase()) {
        case 'admin':
            credentials = secrets.adminRole || secrets.defaultRole;
            break;
        case 'manager':
            credentials = secrets.managerRole || secrets.defaultRole;
            break;
        case 'default':
        case 'user':
            credentials = secrets.defaultRole;
            break;
        default:
            throw new Error(`Unknown role type: ${roleType}. Use 'admin', 'manager', or 'default'.`);
    }
    
    if (!credentials || !credentials.email || !credentials.password) {
        throw new Error(`Credentials not found for role: ${roleType}. Please check secrets.json configuration.`);
    }
    else{
        console.log(`Logging in as ${roleType} with email: ${credentials.email}`);
    }
    
    await this.page.getByPlaceholder("email@example.com").fill(credentials.email);
    await this.page.getByPlaceholder("enter your passsword").fill(credentials.password);
    await this.page.getByRole('button', {name:"Login"}).click();
    await this.page.waitForLoadState('networkidle');
    
    console.log(`✅ Logged in successfully as ${roleType}`);
}

async loginWithCredentials(email, password) {
    await this.page.getByPlaceholder("email@example.com").fill(email);
    await this.page.getByPlaceholder("enter your passsword").fill(password);
    await this.page.getByRole('button', {name:"Login"}).click();
    await this.page.waitForLoadState('networkidle');
}

async isLoginPageVisible() {
    return await this.page.getByPlaceholder("email@example.com").isVisible();
}

async getErrorMessage() {
    return await this.page.locator(".toast-message").textContent();
}



}
module.exports={LoginPage};