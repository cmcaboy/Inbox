// Writes tests for our contracts

const assert = require('assert'); // built into nodejs runtime
const ganache = require('ganache-cli');
const Web3 = require('web3');
const  {interface, bytecode} = require('../compile');
// by convention, if we work with a constructor as we are with web3, it is
// best practice to capitalize the constructor. Instances are typically
// lower case.

// Web3 versioning info. Web3 is the end all solution for ethereum access
// There are 2 groups of versions available: v0.x.x and v1.x.x. 
// Be aware that the older version is reference often in public posts.
// It had more primitive functions, such as callbacks. v1.x.x supports
// async/await, which is much more easier to work with.

// For web3, you must provide a provider, which is a network.
const provider = ganache.provider();
// Create a new web3 instance
const web3 = new Web3(provider);

// The ganache.provider() parameter will change over time as we begin
// to interact with other networks.

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!"

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
    
  // web3 has several different modules that can be used to deal with crytocurrencies
  // .eth refers to the ethereum module. getAccounts
  // All accounts with web3 are async so they all return a promise.

  // Use one of those accounts to deploy the contract
  // First line tells web3 about what methods an Inbox contract has
  // We are passing the interface (ABI) into the contract.
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // This line tells web3 that we want to deploy a new copy of
    // the contract. This creates a transaction object with the data property
    // and argument property. The argument property passes a list of items
    // into the contract's contructor function. Naturally, it can accept
    // multiple arguments.
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    // This last line tells web3 to send out a transaction that creates
    // this contract. This triggers the communication to the network.
    .send({from: accounts[0], gas: '1000000'}) 

    inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // The address is located at inbox.options.address. This is standard
    // among contracts. the ok method of assert checks to see if the value
    // exists. If it is null or undefined, it will fail.
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    // inbox is a reference to our contract. Methods is property on inbox.
    // message() is one of the functions on our contracts.
    // Since we are calling this method, it will execute quickly, but it
    // is still asynchronous. The message function takes any arguments that
    // the function in the contract requires. The call function takes parameters
    // for details about who is going to pay for the transaction and how much
    // gas it will use.
    const message = await inbox.methods.message().call();
    assert.equal(message,INITIAL_STRING);
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message,'bye');
  })
});


// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }


// Must initialize variables outside of beforeEach function. This is due 
// to variable scope.
// let car;

// beforeEach(() => {
//     car = new Car();
// });

// // The first parameter is just the title of the test. It is just used
// // for organizational purposes.
// describe('Car',() => {
//     it('can park',() => {
//         // If the values are equal, the test succeeds. If not, it fails.
//         assert.equal(car.park(), 'stopped');
//     })

//     it('can drive',() => {
//         assert.equal(car.drive(), 'vroom');
//     })
// })
