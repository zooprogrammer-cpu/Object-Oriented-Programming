'use strict'; 
// setters and getters to use as validation 
class Personcls1 {
    constructor(fullName, birthYear){
        this.fullName = fullName; // each time this code is executed, the setter below gets executed
        this.birthYear = birthYear;
    }

    // getter in a class
    get age(){ 
        return this.birthYear - 30 ; 
    }
    // setter to check for full name.
    // Set a property that already exists.
    // Note that fullName is a proprty that already exists above
    set fullName(name){
        if (name.includes(' ')){
            this._fullName = name; // convention is to use _fullName else we get error
        } else {
            alert (`The given ${name} is not a full name`); 
        }
    }
    // cannot do jessica.fullName now since it is undefined. So we need to use a getter
    get fullName(){
        return this._fullName; 
    }

}

const jessica = new Personcls1('Jessica Davis', 1965);
console.log('Full name is: ' ,jessica.fullName); // prints full name is Jessica Davis
//Note it is still _fullName: 'Jessica Davis'. 
console.log(jessica);//Personcls1 {_fullName: 'Jessica Davis', birthYear: 1965}


const walter = new Personcls1('Walter', 1965);
console.log(walter); // prints : The given Walter is not a full name


