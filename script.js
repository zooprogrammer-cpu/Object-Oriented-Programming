// Coding Challenge 4- 
// Redo Challenge 3 using ES6 Classes
// Create 'EVCl' child Class
// Make child class private
// Chain accelerate and chargeBattery methods 
class CarCl {
    constructor (make, speed){
        this.make = make;
        this.speed = speed; 
    }

    brake(){
        this.speed -= 10; 
        return this; 
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

class EVCl extends CarCl {
    #charge; 
    constructor (make, speed, charge) {
        super (make, speed);
        this.#charge = charge; 
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo; 
        return this;
    }

    accelerate(){
        this.speed += 10;
        this.#charge--; 
        console.log(`${this.make} is going at ${this.speed} 
        with a charge of ${this.#charge}`); 
        return this;
    }
}

const rivian = new EVCl ('Rivian', 120, 23);
// console.log(rivian);
// console.log(rivian.#charge);
// chaining methods
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS);