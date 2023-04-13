'use strict';
// Another Class Example
class Account {
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.pin = pin; 
        this.movements = []; 
        this.locale = navigator.language;
        console.log(`Thanks for opening an Account, ${this.owner}`);
    }
    //Public interface
    deposit(val){
        this.movements.push(val);
    }

    withdrawl(val){
        this.deposit(-val);
    }

    approveLoan(val){
        return true; 
    }

    requestLoan(val){
        if (this.approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`)
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
acc1.approveLoan(5000); 
// not a good idea for this method to be accessible to the user
// it is an internal method
console.log(acc1);





