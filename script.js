'use strict';
// Another Class Example
class Account {
    constructor(owner, currency, _pin){
        this.owner = owner;
        this.currency = currency;
        this._pin = _pin; 
        // protected property 
        this._movements = []; 
        this.locale = navigator.language;
        console.log(`Thanks for opening an Account, ${this.owner}`);
    }
    //Public interface
    getMovements(){
        return this._movements; 
    }

    deposit(val){
        this._movements.push(val);
    }

    withdrawl(val){
        this.deposit(-val);
    }

    _approveLoan(val){
        return true; 
    }

    requestLoan(val){
        if (this._approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`)
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
// acc1.movements.push (200);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
acc1._approveLoan(5000); 
// not a good idea for this method to be accessible to the user
// it is an internal method
console.log(acc1);

// Encapsulation
// Let's protect the movements array. 
// Let everyone know that is it protected _movements
// Then developers can use a getMovements method 
// and know that they are not supposed to set, only get
console.log(`Movements`, acc1.getMovements());







