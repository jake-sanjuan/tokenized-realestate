import { getSigner, getContract } from "./Main";
//import { ethers, utils } from 'ethers';
import { abiBridge } from "./Tokenizer";
import Bridge from "./abi/Bridge.json";
//const contractAddress = "0xD02C513472A7BA8ca4532642f390DdBA4249516E";
//const contractAddress = "0x9845358d820A76aacAd89aCc85093fD9B14F7df8";
const contractAddress = "0xF972aa1d30d22794F90744512cEd70aDC0B9D424";

var _getContract = async () => {
  try {
    return await getContract(contractAddress, Bridge, await getSigner());
  } catch (e) {
    return e;
  }
};

//Owner functions

export var initialize = async () => {
  try {
    let contract = await _getContract();
    return await contract.initialize();
  } catch (e) {
    return e;
  }
};

export var numAgent = async (addr) => {
  try {
    let contract = await _getContract();
    return await contract.numAgentApprovals(addr);
  } catch (e) {
    return e;
  }
};

export var registerProperty = async (
  propertyOwner,
  propertyAddress,
  salt,
  currentPrice,
  propertyOwnerAddr
) => {
  try {
    let contract = await _getContract();
    return await contract.registerProperty(
      propertyOwner,
      propertyAddress,
      salt,
      currentPrice,
      propertyOwnerAddr
    );
  } catch (e) {
    return e;
  }
};

export var mintProperty = async (
  propertyOwner,
  propertyAddress,
  tokenId,
  salt
) => {
  try {
    let contract = await _getContract();
    return await contract.mintProperty(
      tokenId,
      propertyOwner,
      propertyAddress,
      salt
    );
  } catch (e) {
    return e;
  }
};

export var approveForSaleByOwner = async (tokenId) => {
  try {
    let contract = await _getContract();
    return await contract.approveForSaleByOwner(tokenId);
  } catch (e) {
    return e;
  }
};

export var payment = async (tokenId, propertyOwner) => {
  try {
    let contract = await _getContract();
    return await contract.payment(tokenId, propertyOwner);
  } catch (e) {
    return e;
  }
};

export var changeOwner = async (newOwnerName, propertyName, salt, tokenId) => {
  try {
    let contract = await _getContract();
    return await contract.changeOwner(
      newOwnerName,
      propertyName,
      salt,
      tokenId
    );
  } catch (e) {
    return e;
  }
};

export var burn = async (tokenId) => {
  try {
    let contract = await _getContract();
    return await contract.burn(tokenId);
  } catch (e) {
    return e;
  }
};

//Agent functions

export var approveProperty = async (propertyOwner) => {
  try {
    let contract = await _getContract();

    return await contract.approveProperty(propertyOwner);
  } catch (e) {
    return e;
  }
};

export var sell = async (fromAddress, toAddress, tokenId) => {
  try {
    let contract = await _getContract();
    return await contract.sell(fromAddress, toAddress, tokenId);
  } catch (e) {
    return e;
  }
};

export var agentApproval = async (toBeApproved) => {
  try {
    let contract = await _getContract();
    console.log(contract);
    return await contract.agentApproval(toBeApproved);
  } catch (e) {
    return e;
  }
};

//Both functions

export var changeCurrentPrice = async (propertyOwner, tokenId, newPrice) => {
  try {
    let contract = await _getContract();
    return await contract.changeCurrentPrice(propertyOwner, tokenId, newPrice);
  } catch (e) {
    return e;
  }
};

//Anyone

export var approveOwner = async (
  ownerName,
  addr,
  url,
  namePath,
  addrPath,
  potentialOwner
) => {
  try {
    let contract = await _getContract();
    return await contract.approveOwner(
      ownerName,
      addr,
      url,
      namePath,
      addrPath,
      potentialOwner
    );
  } catch (e) {
    return e;
  }
};

export var approveLicense = async (
  agentName,
  addr,
  url,
  namePath,
  addrPath,
  potentialAgent
) => {
  try {
    let contract = await _getContract();
    return await contract.approveLicense(
      agentName,
      addr,
      url,
      namePath,
      addrPath,
      potentialAgent
    );
  } catch (e) {
    return e;
  }
};

export var checkHomePriceInUsd = async (priceInEther) => {
  try {
    let contract = await _getContract();
    return await contract.checkHomePriceInUsd(priceInEther);
  } catch (e) {
    return e;
  }
};
