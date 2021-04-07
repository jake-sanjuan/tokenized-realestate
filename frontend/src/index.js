import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./styles/GlobalStyle";
import { getSigner } from './Main';
import { utils } from 'ethers';
import { registerProperty } from "./Functions";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// registerProperty("something", "0x262a788a7877d878768", 1234, 0.0001)
//   .then((result)=>{console.log(result)})
//   .catch((e)=>{console.log(e)})

//example showing how to get info after getting signer
getSigner()
  .then((signer)=>{
    signer.getAddress()
      .then((add)=>{console.log("Address: "+add)})
      .catch((e)=>{console.log(e)})
    signer.getBalance()
      .then((bal)=>{console.log("Balance: "+utils.formatEther(bal.toString())+" ETH"  )})
      .catch((e)=>{console.log(e)})
    signer.getGasPrice()
      .then((price)=>{console.log("Current Gas price: "+price.toNumber())})
      .catch((e)=>{console.log(e)})
  })
  .catch((e)=>{console.log(e)})
//console.log(contract)

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
