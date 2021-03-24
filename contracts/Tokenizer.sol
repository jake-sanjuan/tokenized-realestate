//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Need to implememnt IERC721Receiver to receive tokens
// Need burnable function to allow properties to be taken off-chain
// Need oracle call to verify agent
// Need to figure out IPFS storage

contract Tokenizer is ERC721 {

  // Enum forSale?

  mapping (address => bool) public licensed;

  public string baseURI;
  private uint tokenId;

  constructor() ERC20("Property Token", "PT") {
    tokenId = 0;
  }

  modifier onlyLicensed() {
    require(licensed[msg.sender] == true, "Must be verified to call function.");
  }

  function mint(address to) public onlyLicensed {
    require(hasRole(AGENT_ROLE, msg.sender), "Must be licensed agent to mint.");
    _safeMint(to, tokenId);
    tokenId++;
  }

  /*
  Will likely have to have user sign transaction with address to
  prove ownership.  Still problems with that idea, could be bad actors
  */
  function approveLicense() {
    // Oracle call here
    if (true) {
      licensed[msg.sender] = true;
    }
  }
}

/*
Modifier order for function:
Visibility
Mutability
Virtual
Override
Custom modifiers
*/
