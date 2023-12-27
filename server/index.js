const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const { bytesToHex } = require('ethereum-cryptography/utils');

const port = 1225;

const app = express();
app.use(express.json());

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

function sizeof(object) {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if (
      typeof value === 'object'
      && objectList.indexOf(value) === -1
    ) {
      objectList.push(value);

      for (let i in value) {
        if (value.hasOwnProperty(i)) {
          stack.push(value[i]);
        }
      }
    }
  }

  return bytes;
}

console.log(sizeof(merkleTree));


function jsonSize(obj) {
  return new Blob([JSON.stringify(obj)]).size;
}

console.log(jsonSize(merkleTree));

// merkleTree.leaves.forEach((item) => console.log(bytesToHex(item)));
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = merkleTree.getRoot();
console.log("ROOT: " + MERKLE_ROOT);

app.post('/gift', (req, res) => {
  let isInTheList = false;
  // grab the parameters from the front-end here
  const body = req.body;
  console.log(body);
  const proof = body.merkleProof;
  const name = body.keyName;
  console.log(name);

  // TODO: prove that a name is in the list 

  isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
