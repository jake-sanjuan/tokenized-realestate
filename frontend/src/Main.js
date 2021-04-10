import { ethers } from "ethers";

//abiUrl = "https://raw.githubusercontent.com/jake-sanjuan/tokenized-realestate/subgraph/abis/Tokenizer.json"
const getContract = (contractAddress, abi, signer) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.ethereum !== undefined) {
        window.ethereum
          .enable()
          .then(() => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.on("network", (_newNetwork, oldNetwork) => {
              // When a Provider makes its initial connection, it emits a "network"
              // event with a null oldNetwork along with the newNetwork. So, if the
              // oldNetwork exists, it represents a changing network
              if (oldNetwork) {
                window.location.reload();
              }
            });
            const contract = new ethers.Contract(contractAddress, abi, signer);
            resolve(contract);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject(new Error("No injected web3 found"));
      }
    } catch (e) {
      reject(new Error(e.message));
    }
  });
};

const getSigner = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.ethereum !== undefined) {
        window.ethereum
          .enable()
          .then((accounts) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider.on("network", (_newNetwork, oldNetwork) => {
              // When a Provider makes its initial connection, it emits a "network"
              // event with a null oldNetwork along with the newNetwork. So, if the
              // oldNetwork exists, it represents a changing network
              if (oldNetwork) {
                window.location.reload();
              }
            });
            resolve(provider.getSigner());
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject(new Error("No injected web3 found"));
      }
    } catch (e) {
      reject(new Error(e.message));
    }
  });
};

export { getContract, getSigner };
