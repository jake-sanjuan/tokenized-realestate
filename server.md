# Server

This server is used to serve mock data to the Chainlink oracles in the `Tokenier.sol` contract.

### Running the server

`cd` into a folder that you would like to store the server in.  `git pull https://github.com/jake-sanjuan/tokenized-realestate.git server` once in that folder.  From there, run `node index` and the server should start at `http://localhost:3032`.

To run on ngrok and allow for calls from either a testnet or mainnet please download and configure [ngrok](https://ngrok.com/) and run `./ngrok http 3032`,
