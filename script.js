'use strict';
//Constructor functions
const Person = function (firstName, birthYear){
    //console.log(this);// prints Person empty object
    this.firstName = firstName
    this.birthYear = birthYear

    // Never create a function inside the constructor. 
    // If we creates 1000s of this Person object,
    // there would be 1000s of this function, better to 
    // use prototypes

    // this.calcAge = function (){
    //     console.log(2037 - this.birthYear)
    // }
}

// only difference between calling the constructor function and 
// a regular function is we use new
const jonas = new Person('Jonas', 1991)

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

console.log(jonas); //Person {firstName: "Jonas", birthYear: 1991}

const matilda = new Person('Matilda', 2017); 
const jack = new Person('Jack', 1975)

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge =function (){
        console.log(2037 - this.birthYear)
    }
// Now we can use calcAge function even if it was not in the object itself
jonas.calcAge() // prints 46
matilda.calcAge() // prints 26

console.log(jonas.__proto__)
console.log(Person.prototype.isPrototypeOf(jonas)) //true
console.log(Person.prototype.isPrototypeOf(matilda)) //true
console.log(Person.prototype.isPrototypeOf(Person)) //false

Person.prototype.species = 'Homo Sapiens'
console.log(jonas); 
//Person {firstName: "Jonas", birthYear: 1991, calcAge: function, species: "Homo Sapiens"}
console.log(jonas.hasOwnProperty('firstName'))// true
console.log(jonas.hasOwnProperty('species'));//false

