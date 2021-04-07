import { getSigner, getContract } from './Main'
//import { ethers, utils } from 'ethers';
import abi from './Tokenizer';
const contractAddress = "0xD02C513472A7BA8ca4532642f390DdBA4249516E";

var registerProperty = (propertyOwner, propertyAddress, salt, currentPrice)=>{
    return new Promise((resolve, reject)=>{
        getSigner()
            .then((signer)=>{
                //console.log(signer)
                getContract(contractAddress, abi, signer)
                    .then((contract)=>{
                        contract.registerProperty(propertyOwner, propertyAddress, salt, currentPrice)
                            .then((result)=>{
                                resolve(result);
                            })
                            .catch((e)=>{
                                reject(e)
                            })
                    })
                    .catch((e)=>{console.log(e)})
            })
            .catch((e)=>{console.log(e)})
        
    });
}

var mintProperty = (propertyOwner, propertyAddress, tokenId, salt)=>{
    // return new Promise((resolve, reject)=>{
    //     contract.mintProperty(propertyOwner, propertyAddress, tokenId, salt)
    //         .then((result)=>{
    //             resolve(result);
    //         })
    //         .catch((e)=>{
    //             reject(e)
    //         })
    // });
}

var changeOwner = (newOwnerName, salt, tokenId)=>{
    // return new Promise((resolve, reject)=>{
    //     contract.changeOwner(newOwnerName, salt, tokenId)
    //         .then((result)=>{
    //             resolve(result);
    //         })
    //         .catch((e)=>{
    //             reject(e)
    //         })
    // }); 
}

export { registerProperty, mintProperty };