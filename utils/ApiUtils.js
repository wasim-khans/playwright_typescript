class ApiUtils {
    
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    
 
    async loginAndReturnToken() {
        let loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(loginResponse);
        if (loginResponse.ok()) {
            loginResponse = await loginResponse.json();
            const token= loginResponse.token;
            // console.log(loginResponse);
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
    async createOrder(orderPayLoad) {
        let response = {};
        // console.log('custom response object before loginAndReturnToken call',response)
        response.token = await this.loginAndReturnToken();
        // console.log('custom response object after loginAndReturnToken call',response)
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log('token being used in createOrder',response.token)
        console.log('payload being used in createOrder',orderPayLoad)
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        response.something = "something";
        console.log("our manually created response", response);
 
        return response;
    }

    async createOrderMyWay(userToken,orderPayload) {
        
        this.orderPayload = orderPayload;
        this.userToken=userToken
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }
        });
        
        const orderResponseJson = await orderResponse.json();
        // console.log('token being used in createOrder',response.token)
        // console.log('payload being used in createOrder',orderPayLoad)
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        return orderId
    }
    
}
 
module.exports = { ApiUtils };