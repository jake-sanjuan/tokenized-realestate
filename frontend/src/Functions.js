import { getSigner, getContract } from './Main'
//import { ethers, utils } from 'ethers';
import abi from './Tokenizer';
const contractAddress = "0xD02C513472A7BA8ca4532642f390DdBA4249516E";

var _getContract = async ()=>{
    try{
        return await getContract(contractAddress, abi, await getSigner())
    }
    catch(e){
        return e;
    }
}

//Owner functions

export var registerProperty = async (propertyOwner, propertyAddress, salt, currentPrice)=>{
    try{
        let contract = await _getContract()
        return await contract.registerProperty(propertyOwner, propertyAddress, salt, currentPrice)
    }
    catch(e){
        return e;
    }
}

export var mintProperty = async (propertyOwner, propertyAddress, tokenId, salt)=>{
    try{
        let contract = await _getContract()
        return await contract.mintProperty(tokenId, propertyOwner, propertyAddress, salt)
    }
    catch(e){
        return e;
    }

}

export var approveForSaleByOwner = async (tokenId)=>{
    try{
        let contract = await _getContract()
        return await contract.approveForSaleByOwner(tokenId)
    }
    catch(e){
        return e;
    }
}

export var payment = async (tokenId, propertyOwner)=>{
    try{
        let contract = await _getContract()
        return await contract.payment(tokenId, propertyOwner)
    }
    catch(e){
        return e;
    }
}

export var changeOwner = async (newOwnerName, salt, tokenId)=>{
    try{
        let contract = await _getContract()
        return await contract.changeOwner(newOwnerName, salt, tokenId)
    }
    catch(e){
        return e;
    }
}

export var burn = async (tokenId)=>{
    try{
        let contract = await _getContract()
        return await contract.burn(tokenId)
    }
    catch(e){
        return e;
    }
}

//Agent functions

export var approveProperty = async (propertyOwner)=>{
    try{
        let contract = await _getContract()
        return await contract.approveProperty(propertyOwner)
    }
    catch(e){
        return e;
    }
}

export var sell = async (fromAddress, toAddress, tokenId)=>{
    try{
        let contract = await _getContract()
        return await contract.sell(fromAddress, toAddress, tokenId)
    }
    catch(e){
        return e;
    }
}

export var agentApproval = async (toBeApproved)=>{
    try{
        let contract = await _getContract()
        return await contract.agentApproval(toBeApproved)
    }
    catch(e){
        return e;
    }
}

//Both functions

export var changeCurrentPrice = async (toBeApproved)=>{
    try{
        let contract = await _getContract()
        return await contract.changeCurrentPrice(toBeApproved)
    }
    catch(e){
        return e;
    }
}

//Anyone

export var approvePropertyOwner = async (ownerName, url, path, potentialOwner)=>{
    try{
        let contract = await _getContract()
        return await contract.approvePropertyOwner(ownerName, url, path, potentialOwner)
    }
    catch(e){
        return e;
    }
}

export var approveLicense = async (agentName, url, path, potentialAgent)=>{
    try{
        let contract = await _getContract()
        return await contract.approveLicense(agentName, url, path, potentialAgent)
    }
    catch(e){
        return e;
    }
}

export var homeValueEthToUsd = async (homeValueInEther)=>{
    try{
        let contract = await _getContract()
        return await contract.homeValueEthToUsd(homeValueInEther)
    }
    catch(e){
        return e;
    }
}
