import { ethers } from 'ethers';

//abiUrl = "https://raw.githubusercontent.com/jake-sanjuan/tokenized-realestate/subgraph/abis/Tokenizer.json"
var getContract = (contractAddress, abi, signer)=>{
    return new Promise((resolve, reject)=>{
        try {
            if (typeof  window.ethereum !== undefined) {
                window.ethereum.enable()
                    .then(()=>{
                        const provider = new ethers.providers.Web3Provider(window.ethereum)
                        provider.on("network", (_newNetwork, oldNetwork) => {
                            // When a Provider makes its initial connection, it emits a "network"
                            // event with a null oldNetwork along with the newNetwork. So, if the
                            // oldNetwork exists, it represents a changing network
                            if (oldNetwork) {
                                window.location.reload();
                            }
                        });
                        const contract = new ethers.Contract(contractAddress, abi, signer)
                        resolve(contract)
                    })
                    .catch((e)=>{reject(e)})
            } else {
                reject(new Error("No injected web3 found"))
            }
        } catch (e) {
            reject(new Error(e.message))
        }
    })
}

var getSigner = ()=>{
    return new Promise((resolve, reject)=>{
        try {
            if (typeof  window.ethereum !== undefined) {
                window.ethereum.enable()
                    .then(()=>{
                        const provider = new ethers.providers.Web3Provider(window.ethereum)
                        provider.on("network", (_newNetwork, oldNetwork) => {
                            // When a Provider makes its initial connection, it emits a "network"
                            // event with a null oldNetwork along with the newNetwork. So, if the
                            // oldNetwork exists, it represents a changing network
                            if (oldNetwork) {
                                window.location.reload();
                            }
                          });
                        resolve(provider.getSigner())
                    })
                    .catch((e)=>{reject(e)})
                
            } else {
                reject(new Error("No injected web3 found"))
            }
        } catch (e) {
            reject(new Error(e.message))
        }
    })
}

// window.ethereum.enable()
// var provider = new ethers.providers.Web3Provider(window.ethereum);

// provider.on("network", (_newNetwork, oldNetwork) => {
//   // When a Provider makes its initial connection, it emits a "network"
//   // event with a null oldNetwork along with the newNetwork. So, if the
//   // oldNetwork exists, it represents a changing network
//   if (oldNetwork) {
//       window.location.reload();
//   }
// });

// var signer = provider.getSigner(0);
// var contractAddress = "0xD02C513472A7BA8ca4532642f390DdBA4249516E";

//var abi = fs.readFile("Tokenizer.json");

// function getContract(address, abiUrl, signer){
//     return new Promise((resolve, reject)=>{
//         request.get(abiUrl, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 let abi = body
//                 let contract = "hello" //new ethers.Contract(address, abi, signer)
//                 resolve(contract)
//             }
//             else{
//                 reject(new Error("Could not get abi"))
//             }
//         });
        
//     });
    
// }
//var contract = new ethers.Contract(contractAddress, abi, signer)
export { getContract, getSigner };
// getContract(contractAddress, abiUrl, signer)
//     .then((contract)=>{
//         contract = contract
//     })
//     .catch((e)=>{
//         console.log(e)
//     })