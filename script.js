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











