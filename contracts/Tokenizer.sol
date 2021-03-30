//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Need to implememnt IERC721Receiver to receive tokens
  // Maybe not, do not want this contract to actually handle tokens
// Need oracle call to verify agent and propertyOwner
// Need to figure out IPFS storage, needs to be private, Nic sent good links
  // This will be through front end, pass token URI into contract
// Add events

/*
  Need to figure out how to verify authenticity of agent.  Ideas (Extra to Oracle):
    - Have already approved agent validate data offchain after oracle call,
      confirm vaidation.  Will involve somehow validating on front end, maybe just
      upload docs to IPFS with no NFT?
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
  Agent stuff
    - Need to upload license, proof of id to IPFS at very least
    - Could this be a seperate NFT? Might have to significantly alter contract,
      tokenized real estate licensing isn't a bad idea though
*/

/*
  Real estate stuff (Will need to be mapped to NFT)
    - Need title, certificate of title, deed uploaded to IPFS
    - Also could have a section for 'arbitrary documents'
*/

// Property mint and transfer must be approved by owner

contract Tokenizer is ERC721 {

  mapping (address => bool) public licensed;
  mapping (address => bool) public owner; // Can possible use _owners from ERC721, need to test if mapping to uint will return true
  mapping (address => mapping (uint => Property)) ownerToIdToProperty;

  struct Property {
    bytes32 propertyOwner; // Hash
    bytes32 propertyAddress; // Hash
    uint currentPrice;
    bool approved;  // Approved by owner
    bool saleApproved;
    uint[] previousPrices;
  }

  public string baseURI;  // Not sure if needed, can probably be passed in directly
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

  function mint(address to, uint _tokenId) internal {
    _safeMint(to, _tokenId);
  }

  // Map _propertyOwner address to property struct, property struct to tokenId
  function registerProperty (
    string _propertyOwner,
    string _propertyAddress,
    uint salt,  // Will be displayed as pin to user on frontend
    uint _currentPrice,
    address _propertyOwner
    )
    external
    onlyLicensed
    returns(uint)
  {
    Property storage property;

    property.propertyOwner = keccack256(_propertyOwner + salt);
    property.propertyAddress = keccak256(_propertyAddress + salt);
    property.currentPrice = _currentPrice;
    property.approved = false;
    property.saleApproved = false;

    ownerToIdToProperty[_propertyOwner][tokenId] = property;

    tokenId++; // This should probably be somewhere else, either higher up or in its own function.  Reentrancy?

    return tokenId - 1;
  }

  function approveAndMintProperty(
    uint _tokenId,
    string _propertyOwner,
    string _propertyAddress,
    uint salt
    )
    external
    onlyPropertyOwner
  {
    Property storage property = ownerToIdProperty[msg.sender][_tokenId];

    require(property.propertyOwner == keccack256(_propertyOwner + salt) &&
      property.propertyAddress == keccack256(_propertyAddress + salt),
      "Function caller does not own property with that ID"
    );

    property.approved = true;

    mint(msg.sender, _tokenId);
  }

  // Might need approval from ERC721? Not sure here
  function approveForSaleByOwner(uint _tokenId) external onlyPropertyOwner {
    Property storage property = ownerToIdToProperty[msg.sender][_tokenId];

    property.saleApproved = true;
  }

  // Which modifier? Need approval from both agent and owner?
  // Need to make sure owner owns _tokenId, not sure if multiple modifiers or require statement
    // Can use _owners from ERC721, need to access private variable though
  // Not sure if ownerToIdToProperty will automatically update here, need to test that
  function sell(address _to, uint _tokenId) external  {
    Property storage property = ownerToIdToProperty[msg.sender][_tokenId];

    safeTransfer(msg.sender, _to, _tokenId);

    //changeOwner()
    //Set Property.saleApproved to false
    //owner[msg.sender] = false
  }

  // Add currentPrice to previousPrices array
  function changeCurrentPrice() {

  }

  function changeOwner() internal {

  }

  function burn(uint _tokenId) external onlyPropertyOwner {
    _burn(tokenId);
  }

  function revokeLicense() external onlyLicensed {

  }

  // Oracle call to validate and approve the property owner.  Must also be approved by agent, not one
  // That registered property
  function approvePropertyOwner() external {
    // Oracle call here`
    if(true) {
      owner[msg.sender] = true;
    }
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
