'use strict'; 
// Section 14 - Constructor Functions and the new Operator
const Person = function(firstName, birthYear){
 // Instances properties 
 this.firstName = firstName; 
 this.birthYear = birthYear;
 // can also add functions. But this is bad practice.
 // Never create a function inside a constructor. 
 // If we create 100s of Persons, 
 // each of these objects will have a copy of this function 
 //this.calcAge = function(){
  //console.log(2037 - this.birthYear);
 //}

}

//call the function. Only difference with calling a constructor 
// and regular function is using the New keyword

const jonas = new Person ('Jonas', 1991);

// behind the scenes, when a new Person is created. 
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
console.log(jonas); 
//prints Person { firstName: 'Jonas', birthYear: 1991 }
console.log(jonas.birthYear); // prints 1991

const matilda = new Person ('Matilda', 1975);
console.log(matilda, jonas);

console.log(jonas instanceof Person);  // returns true

// Prototypes







