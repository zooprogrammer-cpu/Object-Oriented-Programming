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

// Prototype Inheritance
// can create and use a function even though it is 
// not in the object itself
// we do not attach the copy to every object
console.log(Person.prototype);
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
}

jonas.calcAge();
console.log('jonas', jonas); 
// prints Person {firstName: 'Jonas', birthYear: 1991}birthYear: 1991firstName: "Jonas"[[Prototype]]: Object
// does not have the calcAge method but can still access it
matilda.calcAge();

console.log(jonas.__proto__);
// 
Person.prototype.species = 'Homo Sapiens';
console.log(jonas);
console.log(jonas.species); // prints Homo Sapiens

// Coding Challenge - 

const Car = function(make, speed){
    this.make = make;
    this.speed = speed; 

}

let bmw = new Car ('BMW', 100);
console.log(bmw);

Car.prototype.accelerate = function(){
    this.speed += 10; 
    console.log('Accelerated speed is:', this.speed);
}
bmw.accelerate(); 


Car.prototype.brake = function(){
    this.speed -= 10; 
    console.log('The decreased speed is:', this.speed);
}
bmw.brake(); 

const audi = new Car ('Audi', 200);
console.log(audi);
