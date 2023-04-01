'use strict'; 
// Section 15 - ES6 Classes
// Class is just a special type of function 
// First way - class expression
// const Personcls1 = new class{

// }

// Second way - class decleration
class Personcls1 {
    //first thing to add is a constructor method
    constructor(firstName, birthYear){
        this.firstName = firstName; 
        this.birthYear = birthYear;
    }
    // can have a function right here. Methods will be added to .prototype property of the class
    calcAge(){
        console.log(2037 - this.birthYear);
    }

}

const jessica = new Personcls1('Jessica', 1965);
console.log(jessica);  // prints Personcls1 {firstName: 'Jessica', birthYear: 1956}
jessica.calcAge(); // prints 72

// can try adding a method manually
Personcls1.prototype.greet = function (){
    console.log(`Hey ${this.firstName}`);
}

jessica.greet(); // prints Hey Jessica

// Important points - 

//1. Classes are not hoisted - cannot be used before they are declared 
//2. Classes are first class citizens - can pass them into functions and return them from functions
//3. Classes are executed in strict mode

// Getters and Setters
const account = {
    name : 'jonas',
    movements : [100,200,300],

    get latest(){
        return this.movements.slice(-1).pop(); 
    },
    // note the comma before
    // every setter needs exactly one parameter
    set latest(mov){
        this.movements.push(mov); 

    }
}

// to call the getter, you use it as a property and not like a method
console.log(account.latest); // prints 300
// to call a setter, call like a property, not like a method
account.latest = 50; 
console.log(account.movements); // prints [100, 200, 300, 50]

