//getters and setters. 
//functions within an object
const account = {
    owner: 'Jonas',
    movements: [200, 300, 400],

    get latest() {
        return this.movements.slice(-1).pop()
    },
    // not mandatory to have a setter if there is a getter
    set latest(mov) {
        return this.movements.push(mov)
    }

}

console.log(account.latest); //prints 400
// this would not have worked if there was no get
// to set a new value, instead of doing account.latest(600)
// we do this- 
account.latest = 600
console.log(account.movements);
 //prints [200, 300, 400, 600]
