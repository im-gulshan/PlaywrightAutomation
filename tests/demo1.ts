import { expect, type Locator, type Page } from '@playwright/test';

let message1:string = "Hello";
message1 = "bye";
console.log(message1);

let age1:number = 20;
console.log(age1);


let isActive:boolean = false;
let number1:number[] = [1,2,3];

let data:any = "This could be anything";
data = 54;


function add2(a: number, b: number): number{
    return a+b;
}

add2(3, 9);

let user :{name:string, age:number, location:string} = {name:"Gulshan", age: 10, location:"Delhi"};
user.location = "Hyderabad";



class OrdersPage{
    page:Page;
    checkOrderIdLeft:String;
    checkOrderIdRight:String;

    constructor(page:Page){
        this.page = page;
        this.checkOrderIdLeft = "//tbody/tr/th[text()='";
        this.checkOrderIdRight = "']//following-sibling::td/button[text()='View']";
    }
}