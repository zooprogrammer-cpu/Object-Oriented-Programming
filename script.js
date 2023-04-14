'use strict';
// Another Class Example
class Account {
    // Public fields (instances)
    locale = navigator.language; 
    
    // Private fields
    #movements = []; 
    #pin; 

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin; 
        console.log(`Thanks for opening an Account, ${this.owner}`);
    }
    //Public interface
    getMovements(){
        return this.#movements; 
    }

    deposit(val){
        this.#movements.push(val);
        return this; 
    }

    withdrawl(val){
        this.deposit(-val);
        return this; 
    }

    _approveLoan(val){
        return true; 
    }

    requestLoan(val){
        if (this._approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`);
            return this; 
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
acc1._approveLoan(5000); 

// Chaining Methods. Need to add returns in the methods
acc1.deposit(300).deposit(500).withdrawl(35).
requestLoan(5000);
console.log(acc1.getMovements());
// prints [250, -140, 1000, 300, 500, -35, 5000]






