import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./styles/GlobalStyle";
// import { utils } from "ethers";
// import {
//   registerProperty,
//   mintProperty,
//   approveForSaleByOwner,
//   payment,
//   approveProperty,
//   approveOwner,
//   agentApproval,
//   initialize,
//   approveLicense,
//   numAgent,
// } from "./Functions";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: cache,
});

// var query = `
// {
//     owners(first: 5) {
//       id
//       ownedProperties(where:{
//         currentPrice_lt: 900,
//         currentPrice_gt: 790
//       }) {
//         id
//         approved
//       }
//     }
//     agents(first: 5) {
//       id
//     }
//     properties(where:{
//       approved: true
//     }){
//       id
//     }
// }
// `;

// approveProperty("0xcB07B63393C3c27bBE33fC9f6F476a8Dc469Dbbb")
//   .then((res)=>{console.log(res);res.wait().then(x=>{console.log(x)})})
//   .catch((e)=>{console.log("inside catch");console.log(e)})

// var ownerName = utils.formatBytes32String("amiee mccloskey");
// var addr = utils.formatBytes32String("3445 hunter st");
// var url = "http://9ef75e605f77.ngrok.io/owners";
// var namePath = "owner.amiee mccloskey";
// var addrPath = "owner.amiee mccloskey.3445 hunter st";
// var myAddr = utils.getAddress("0xcB07B63393C3c27bBE33fC9f6F476a8Dc469Dbbb");

// var agentName = utils.formatBytes32String("william zhang");

// initialize()
//   .then(res=>{
//     console.log(res)
//
//   })

// agentApproval(myAddr)
//        .then((res)=>{
//          console.log(res)

//     })

// approveOwner(ownerName, addr, url, namePath, addrPath, myAddr)
//     .then(res=>{
//       console.log(res);
//       res.wait()
//       .then(x=>{console.log(x)})
// })

// numAgent(myAddr).then((res) => console.log(res));

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

// makeQuery(query)
//   .then(data=>console.log(data))
//   .catch(e=>console.log(e))

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App client={client} />
  </ApolloProvider>,
  document.getElementById("root")
);
