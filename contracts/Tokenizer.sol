//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Need to implememnt IERC721Receiver to receive tokens
// Need burnable function to allow properties to be taken off-chain
// Need oracle call to verify agent
// Need to figure out IPFS storage

/*
  Need to figure out how to verify authenticity of agent.  Ideas:
    - KYC with license and real estate license
    - Have owner of properties validate
    - Have already approved agent validate data offchain after oracle call **
    - Can also configure way to pull data from any public resource and
      query via oracle.  Could use this to validate that person that owns property
      to be tokenized actually owns it, and have that person validate agent.
*/

/*
  Will proabably need to validate transactions that have happened as well.
  A few ways to do this:
    - Multiple approved real estate agents can validate onchain
    - Can configure way to get data from any API, I know link does this but
      it is moreso figuring out how to make it easy for the user / can we switch
      out the api the oracle is calling and handle all data returned, endpoints
      will likely differ
    - Escrow type transaction where both seller and buyer approve transaction
      proving that it happened
*/

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
    _safeMint(to, tokenId);
    tokenId++;
  }


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
