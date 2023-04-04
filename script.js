'use strict';

// Challenge 2 - Redo Challenge 1 with Class

class Car {
    constructor (make, speed){
        this.make = make; 
        this.speed = speed; 
    }

    accelerate(){
        return console.log('The accelerated speed is: ', this.speed += 10);
    }
    brake(){
        return console.log('The braked speed is:', this.speed -= 20);
    }
    // getter to change speed to US miles
    get speedUS(){
    return this.speed/ 1.6;
    }

    //setter- take a new speed and multiply by 1.6
    set speedUS(speed){
        this.speed = speed * 1.6; 
    }
}

let bmw = new Car ('BMW', 120);
console.log(bmw); //prints Car {make: 'BMW', speed: 120}
console.log(bmw.speedUS); //prints 75
bmw.accelerate(); //prints The accelerated speed is: 130
bmw.brake(); // prints The braked speed is: 110
//setter - 
bmw.speedUS = 50;
console.log(bmw); //prints Car {make: 'BMW', speed: 80}
//which is 50 * 1.6  = 80









