'use strict';

'use strict';
// Section 14 - Inheritance between Classes
// Using COnstructor Functions 
const Person = function (firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear; 
};

Person.prototype.calcAge = function (){
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course){
    // this.firstName = firstName; 
    // this.birthYear = birthYear;
    // this.course = course; 
    // instead of duplicating like above, just called the Person function
    Person.call(this, firstName, birthYear);
    this.course = course; 
};
// Linking Prototypes
Student.prototype = Object.create(Person.prototype);

// to create a method, use prototype
Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student ('Mike', 1956, 'Computer Science');
console.log(mike);
mike.introduce(); // prints My name is Mike and...
mike.calcAge();  // prints 81

console.log(mike.__proto__);
console.log(Student.prototype.constructor);

// Coding Challenge 3- 
// Use constructor function to implement an electric car class

const Car = function(make, speed){
    this.make = make;
    this.speed = speed; 

}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`The accelerated speed is:` , this.speed); 
}


Car.prototype.brake = function(){
    this.speed -= 10; 
    console.log('The decreased speed is:', this.speed);
}

const EV = function(make, speed, charge){
    Car.call(this, make, speed);
        this.charge = charge;  
}

// tricky part is to link the prototypes 
EV.prototype = Object.create(Car.prototype);

// let's add some methods
EV.prototype.chargeBattery = function (chargeTo){
    this.charge = chargeTo; 
}

EV.prototype.accelerate = function (){
    this.speed += 20; // increase the speed by 20
    this.charge--; //decrease the charge by 1%
    console.log(`The speed has increased to ${this.speed}. The charge has decreased to ${this.charge} `);
}

const tesla = new EV ('Tesla', 150, 60);
console.log(tesla); // prints EV {make: 'Tesla', speed: 150, charge: 60}
tesla.chargeBattery(90);
console.log(tesla); //prints EV {make: 'Tesla', speed: 150, charge: 90}
// Here the child class, EV overwrites the methods in Car class
tesla.brake(); // The decreased speed is: 140
tesla.accelerate(); //The speed has increased to 160. The charge has decreased to 89 

