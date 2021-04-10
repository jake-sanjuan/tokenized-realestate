import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./styles/GlobalStyle";
import { makeQuery } from "./Query";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: cache,
});

var query = `
{
    owners(first: 5) {
      id
      ownedProperties(where:{
        currentPrice_lt: 900,
        currentPrice_gt: 790
      }) {
        id
        approved
      }
    }
    agents(first: 5) {
      id
    }
    properties(where:{
      approved: true
    }){
      id
    }
}  
`;

//approveProperty("0xcB07B63393C3c27bBE33fC9f6F476a8Dc469Dbbb").then((res)=>{console.log(res)})

//example showing how to get info after getting signer
// getSigner()
//   .then((signer)=>{
//     signer.getAddress()
//       .then((add)=>{console.log("Address: "+add)})
//       .catch((e)=>{console.log(e)})
//     signer.getBalance()
//       .then((bal)=>{console.log("Balance: "+utils.formatEther(bal.toString())+" ETH"  )})
//       .catch((e)=>{console.log(e)})
//     signer.getGasPrice()
//       .then((price)=>{console.log("Current Gas price: "+price.toNumber())})
//       .catch((e)=>{console.log(e)})
//   })
//   .catch((e)=>{console.log(e)})

makeQuery(query)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App client={client} />
  </ApolloProvider>,
  document.getElementById("root")
);
