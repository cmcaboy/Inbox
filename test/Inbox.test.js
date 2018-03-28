// Writes tests for our contracts

const assert = require('assert'); // built into nodejs runtime
const ganache = require('ganache-cli');
const Web3 = require('web3');
// by convention, if we work with a constructor as we are with web3, it is
// best practice to capitalize the constructor. Instances are typically
// lower case.

// Web3 versioning info. Web3 is the end all solution for ethereum access
// There are 2 groups of versions available: v0.x.x and v1.x.x. 
// Be aware that the older version is reference often in public posts.
// It had more primitive functions, such as callbacks. v1.x.x supports
// async/await, which is much more easier to work with.

// For web3, you must provide a provider, which is a network.

// Create a new web3 instance
const web3 = new Web3(ganache.provider());

// The ganache.provider() parameter will change over time as we begin
// to interact with other networks.

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}


// Must initialize variables outside of beforeEach function. This is due 
// to variable scope.
let car;

beforeEach(() => {
    car = new Car();
});

// The first parameter is just the title of the test. It is just used
// for organizational purposes.
describe('Car',() => {
    it('can park',() => {
        // If the values are equal, the test succeeds. If not, it fails.
        assert.equal(car.park(), 'stopped');
    })

    it('can drive',() => {
        assert.equal(car.drive(), 'vroom');
    })
})
