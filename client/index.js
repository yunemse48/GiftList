const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name = 'Norman Blockk';
  const index = niceList.findIndex(n => n === name);
  console.log("Index: " + index);
  const proof = merkleTree.getProof(index);
  console.log("Proof: " + JSON.stringify(proof));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    keyName: name,
    merkleProof: proof
  });

  console.log({ gift });
}

main();