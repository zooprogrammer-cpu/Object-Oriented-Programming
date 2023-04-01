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
    // getter in a class
    get age(){ 
        return this.birthYear - 30 ; 
    }

}

const jessica = new Personcls1('Jessica', 1965);
console.log(jessica);  // prints Personcls1 {firstName: 'Jessica', birthYear: 1956}
jessica.calcAge(); // prints 72
// to call the getter in class
console.log(jessica.age); // prints 1935

// can try adding a method manually
Personcls1.prototype.greet = function (){
    console.log(`Hey ${this.firstName}`);
}

jessica.greet(); // prints Hey Jessica
// to use a getter - 
jessica.age; 

// Important points - 

//1. Classes are not hoisted - cannot be used before they are declared 
//2. Classes are first class citizens - can pass them into functions and return them from functions
//3. Classes are executed in strict mode

