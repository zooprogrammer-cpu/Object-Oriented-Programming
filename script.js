'use strict';

// Static Methods in Class
// Create a constructor function first
class Personcls1 {
    constructor(fullName, birthYear) {
        this.fullName = fullName; // each time this code is executed, the setter below gets executed
        this.birthYear = birthYear;
    }

    // Create the static method
    static hey() {
        console.log('Hey there 👋 ');
        console.log(this);
    }
}

Personcls1.hey(); 
// prints: 
//Hey there 👋 
// script.js:15 class Personcls1 {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName; // each time this code is executed, the setter below gets executed
//         this.birthYear = birthYear;
//     }








