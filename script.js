'use strict';
// Class expression
// const PersonCl = class{

// }

// Class declaration
class PersonCl{
    constructor(firstName, birthYear){
        this.firstName = firstName
        this.birthYear = birthYear
    }

    calcAge(){
        console.log(2037 - this.birthYear);
    }
}

const jessica = new PersonCl('Jessica', 1984)
console.log(jessica); //prints PersonCl {firstName: "Jessica", birthYear: 1984}

console.log(jessica.calcAge()); //prints 53
