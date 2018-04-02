// This file is used to compile our solidity contracts.

const path = require('path');
const fs = require('fs');
const solc = require('solc');

// __dirname - a constant set by node that refers to current directory
const inboxPath = path.resolve(__dirname, 'contracts','Inbox.sol');
// Read in raw source code
const source = fs.readFileSync(inboxPath, 'utf8');

// compile statement
module.exports = solc.compile(source,1).contracts[':Inbox'];
// returns bytecode and interface

// This outputs a array of contracts
// There are 2 properties that we really care about: bytecode and interface
// bytecode is the actual code of our contract that is going to be stored 
// and executed on the blockchain
// interface is our ABI, our interface between the javascript world and 
// the blockchain world.
// It also specifies the functions that can be called. You can also
// see the various parameters and return values that each function
// requires.
// The output contains a lot more information, but we don't care about
// those.