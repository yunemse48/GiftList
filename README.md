# Project Overview
This application is designed to demonstrate the use of Merkle Trees for efficient and secure verification of data. In this scenario, the system manages a list of names eligible to receive a gift. The client, acting as a prover, needs to confirm to the server (the verifier) that a particular name is on the list using a Merkle Tree-based proof.

The project is an exemplary implementation of a Merkle Tree in a client-server architecture, where the client generates a proof for a name, and the server verifies this proof against a pre-generated Merkle Root to confirm the name's presence on the list.

# Repository Structure
`/utils`: Contains the necessary utilities for Merkle Tree operations.

- `niceList.json`: A list of names eligible for gifts. Feel free to modify this list as needed.
- `MerkleTree.js`: A utility module for creating and handling Merkle Trees.
- `verifyProof.js`: Utility function for verifying Merkle Proofs against a given Merkle Root.
- `example.js`: Demonstrates how to generate a root, a proof, and verify a value using these utilities. Run it using node example.js.

- `client/index.js`: The client-side logic for generating Merkle Tree proofs for a given name.
- `server/index.js`: The server-side logic for verifying the proof provided by the client.

# How It Works
**Client (Prover):** The client takes a name and generates a Merkle Proof using `MerkleTree.js`. This proof is then sent to the server.

**Server (Verifier):** Upon receiving the proof from the client, the server uses `verifyProof.js` to check whether the provided name is in the Merkle Tree corresponding to the pre-generated Merkle Root. If the verification is successful, the server acknowledges that the name is on the list.

# Running the Application
### Install Dependencies:

- Ensure you have Node.js installed.
- Install necessary Node modules by running npm install in the project's root directory.

### Running the Server:

Start the server by executing `nodemon server/index`

### Running the Client:

Run the client script with `node client/index`
