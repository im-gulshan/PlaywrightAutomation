class ApiUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    // getToken
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data : this.loginPayload});
        const loginResponseJson= await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    // createorder
    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data : orderPayload,
                headers: {
                    'Authorization' : response.token,
                    'Content-Type' : 'application/json'
                },
            }
        );
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        console.log(orderResponseJson);
        
        response.orderId = orderId;
        return response;
    }






}

module.exports = {ApiUtils}