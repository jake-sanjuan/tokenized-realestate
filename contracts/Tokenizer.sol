//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Need to implememnt IERC721Receiver to receive tokens
// Need burnable function to allow properties to be taken off-chain
// Need oracle call to verify agent
// Need to figure out IPFS storage
  // This will be through front end, pass token URI into contract
// Need to verify propertyOwner

/*
  Need to figure out how to verify authenticity of agent.  Ideas (Extra to Oracle):
    - Have already approved agent validate data offchain after oracle call.  Will
      involve somehow validating on front end, maybe just upload docs to IPFS with no
      NFT?
*/

/*
  Will proabably need to validate transactions that have happened as well.
  A few ways to do this (All extra to oracle):
    - Multiple approved real estate agents can validate onchain
    - Escrow type transaction where both seller and buyer approve transaction
      proving that it happened
    - Best idea is likley to have owner validation.  If owner is validated and
      proved to be a person, there is no problem here
*/

/*
  Real estate stuff
    - Need title, certificate of title, deed uploaded to IPFS
*/

// Property mint and transfer must be approved by owner

contract Tokenizer is ERC721 {

  mapping (address => bool) public licensed;
  mapping (address => bool) public owner;
  mapping (address => Property) public ownerToProperty;
  mapping (uint => Property) public tokenIdToProperty;

  struct Property {
    bytes32 propertyOwner; // Hash
    bytes32 propertyAddress; // Hash
    uint currentPrice;
    bool approved;  // Approved by owner
    bool saleApprived;
    uint[] previousPrices;
  }

  public string baseURI;
  private uint tokenId;

  constructor() ERC721("Property Token", "PT") {
    tokenId = 0;
  }

  modifier onlyLicensed() {
    require(licensed[msg.sender] == true, "Must be verified to call function.");
  }

  modifier onlyPropertyOwner() {
    require(owner[msg.sender] == true, "Must be property owner to call function.");
  }

  function mint(address to) external onlyPropertyOwner {
    _safeMint(msg.sender, tokenId);
    tokenId++;
  }

  function registerProperty(
    string _propertyOwner,
    string _propertyAddress,
    uint _currentPrice
    ) external onlyLicensed {

      properties.push(Property({
          propertyOwner: keccack256(_propertyOwner),
          propertyAddress: keccak256(_propertyAddress),
          currentPrice: _currentPrice,
          approved: false,
          saleApproved: false
        }));
  }


  function approveProperty() external onlyPropertyOwner {

  }

  // Oracle call to validate and approve the property owner.  Must also be approved by agent, not one
  // That registered property
  function approvePropertyOwner() {

  }

// Oracle call will validate and approve property owner.  Must also be approved by other agent
  function approveLicense() external  {
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
