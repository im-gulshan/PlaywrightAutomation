const { LoginPage } = require('../pageObjects/LoginPage');
const { DashBoardPage } = require('../pageObjects/DashBoardPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');
const { ThankyouPage } = require('../pageObjects/ThankyouPage');
const { HeaderPage } = require('../pageObjects/HeaderPage');
const { OrdersPage } = require('../pageObjects/OrdersPage');
const { OrderSummary } = require('../pageObjects/OrderSummary');


class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashBoardPage(page);
        this.paymentPage = new PaymentPage(page);
        this.thankyouPage = new ThankyouPage(page);
        this.headerPage = new HeaderPage(page);
        this.orderPage = new OrdersPage(page);
        this.orderSummary = new OrderSummary(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getdashBoardPage(){
        return this.dashBoardPage;
    }

    getpaymentPage(){
        return this.paymentPage;
    }

    getthankyouPage(){
        return this.thankyouPage;
    }

    getheaderPage(){
        return this.headerPage;
    }

    getorderPage(){
        return this.orderPage;
    }

    getorderSummary(){
        return this.orderSummary;
    }



}

module.exports = {POManager};