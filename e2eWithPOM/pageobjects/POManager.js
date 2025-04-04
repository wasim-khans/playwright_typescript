const {LoginPage}= require('./LoginPage.js');
const {DashboardPage}= require('./DashboardPage.js');
const {CartAndCheckoutPage}= require('./CartAndCheckoutPage.js');

class POManager{
    constructor(page){
        
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.cartAndCheckoutPage=new CartAndCheckoutPage(this.page);
    
    }

    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }   
    getCartAndCheckoutPage(){
        return this.cartAndCheckoutPage;
    }
    
}


module.exports={POManager};