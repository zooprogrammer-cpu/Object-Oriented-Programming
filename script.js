'use strict';

// Object.create
// Least used in the real world
const personProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear){
        this.firstName = firstName; 
        this.birthYear = birthYear; 
    }
}

const steven = Object.create(personProto);
console.log(steven);
steven.name = 'Steve';
steven.birthYear = 2002;
steven.calcAge(); // prints 35
// by adding the init function above, we can make objects programmatically
const sarah = Object.create(personProto);
sarah.init('Sarah', 1979);
sarah.calcAge(); //prints 58 








