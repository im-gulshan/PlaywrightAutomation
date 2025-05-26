import { expect, type Locator, type Page } from '@playwright/test';

// const { LoginPage } = require('../pageObjects/LoginPage');

import {LoginPage} from '../pageObjects_ts/LoginPage';
import { DashBoardPage } from '../pageObjects_ts/DashBoardPage';
import { PaymentPage } from '../pageObjects_ts/PaymentPage';
import { ThankyouPage } from '../pageObjects_ts/ThankyouPage';
import { HeaderPage } from '../pageObjects_ts/HeaderPage';
import { OrdersPage } from '../pageObjects_ts/OrdersPage';
import { OrderSummary } from '../pageObjects_ts/OrderSummary';


export class POManager{
    page:Page;
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    paymentPage: PaymentPage;
    thankyouPage: ThankyouPage;
    headerPage: HeaderPage;
    orderPage: OrdersPage;
    orderSummary: OrderSummary;

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