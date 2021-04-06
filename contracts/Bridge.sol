//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "./BridgeLinkQueries.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";


// Need to figure out IPFS storage, needs to be private, Nic sent good links
  // This will be through front end
// Add event params
// Contract needs to be funded with LINK

/*
  Need to figure out how to verify authenticity of agent.  Ideas (Extra to Oracle):
    - Have already approved agent validate data offchain after oracle call,
      confirm validation.  Will involve somehow validating on front end, maybe just
      upload docs to IPFS with no NFT?
*/

/*
  Agent stuff
    - Need to upload license, proof of id to IPFS at very least
    - Need title, certificate of title, deed uploaded to IPFS
    - Also could have a section for 'arbitrary documents'
*/

// Is it unsafe to assign tokenId before minting token?

/*TODO: Figure out if inheritance or having contract as variable makes more sense */


contract Bridge is ERC721Upgradeable, BridgeLinkQueries {

  mapping (address => bool) public licensed;
  mapping (address => bool) public owner; // Can possible use _owners from ERC721, need to test if mapping to uint will return true
  mapping (address => bool) public approved; // Allows users that have sold property to remain validated
  mapping (address => bool) public newOwner; // Used for new owners that have not changed name yet
  mapping (address => address) public registeringAgent;
  mapping (address => uint) public numAgentApprovals;
  mapping (address => Property) public awaitingApproval;
  mapping (address => mapping (uint => Property)) ownerToIdToPropertyApproved;

  struct Property {
    bytes32 propertyOwner; // Hash
    bytes32 propertyAddress; // Hash
    uint currentPrice;
    uint changePriceCount;
    bool saleApproved;
    bool paid;
    uint[] previousPrices;
  }

  uint public tokenId;

  event PropertyRegistered(address indexed registeringAddress, uint indexed originalPrice);
  event AgentApprovedProperty(address indexed agent, address indexed propertyOwner, uint indexed tokenId);
  event SaleApproved(address indexed owner, uint indexed tokenId);
  event PaymentRecieved(address indexed buyer, uint indexed paymentAmount, uint indexed tokenId);
  event PropertyPriceChanged(uint indexed tokenId, uint indexed newPrice);
  event OwnerChanged(address indexed newOwner, uint indexed tokenId);
  event LicenseRevoked(address indexed revokedLicenseAddress);
  event OwnerApproved(address indexed newOwnerApproved);
  event AgentApproved(address indexed newAgentApproved);

  function initialize() public virtual override initializer {
    super.__ERC721_init("Bridge", "BRDG");
    super.initialize();
    tokenId = 0;
  }

  modifier onlyLicensed() {
    require(licensed[msg.sender] == true, "Must be verified to call function.");
    _;
  }

  modifier onlyPropertyOwner() {
    require(owner[msg.sender] == true, "Must be property owner to call function.");
    _;
  }

  modifier licensedOrOwner() {
    require(
      licensed[msg.sender] || owner[msg.sender],
      "Must be either owner or agent to call this function."
    );
    _;
  }

  modifier onlyNewOwner() {
    require(newOwner[msg.sender] == true, "Only new owner can call this function.");
    _;
  }

  modifier approvedByAgent(address _toBeApproved) {
    require(
      numAgentApprovals[_toBeApproved] > 0,
      "Must have agent verify before calling function"
    );
    _;
  }

  function registerProperty (
    string calldata _propertyOwner,
    string calldata _propertyAddress,
    uint salt,  // Will be displayed as pin to user on frontend
    uint _currentPrice
  )
    external
    onlyPropertyOwner
  {
    Property storage property = awaitingApproval[msg.sender];

    property.propertyOwner = keccak256(abi.encode(_propertyOwner, salt));
    property.propertyAddress = keccak256(abi.encode(_propertyAddress, salt));
    property.currentPrice = _currentPrice;
    property.paid = false;
    property.saleApproved = false;

    emit PropertyRegistered(msg.sender, _currentPrice);
  }

  function approveProperty(address _propertyOwner) external onlyLicensed returns (uint) {

    Property storage property = awaitingApproval[_propertyOwner];

    registeringAgent[_propertyOwner] = msg.sender;
    ownerToIdToPropertyApproved[_propertyOwner][tokenId] = property;

    tokenId++;

    delete(awaitingApproval[_propertyOwner]);

    emit AgentApprovedProperty(msg.sender, _propertyOwner, tokenId - 1);

    return tokenId - 1;
  }

  //Emits "Transfer" event via "mint()" function
  function mintProperty(
    string calldata _propertyOwner,
    string calldata _propertyAddress,
    uint _tokenId,
    uint salt
  )
    external
    onlyPropertyOwner
  {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][_tokenId];

    require(property.propertyOwner == keccak256(abi.encode(_propertyOwner, salt)) &&
      property.propertyAddress == keccak256(abi.encode(_propertyAddress, salt)),
      "Function caller does not own property with that ID"
    );

    mint(msg.sender, _tokenId);
  }

  function approveForSaleByOwner(uint _tokenId) external onlyPropertyOwner {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][_tokenId];

    property.saleApproved = true;
    emit SaleApproved(msg.sender, _tokenId);
  }

  // Need functionality to accept payment and route to agent so they can actually sell
  // Escrow somehow?
  function payment(uint _tokenId, address propertyOwner) external payable onlyNewOwner {
    Property storage property = ownerToIdToPropertyApproved[propertyOwner][_tokenId];

    require(msg.value == property.currentPrice, "Must send exact amount");

    property.paid = true;

    emit PaymentRecieved(msg.sender, msg.value, _tokenId);
  }

  // Should this only be up to owner?
  // emits Transfer event ERC721
  function sell(
    address _from,
    address _to,
    uint _tokenId
  )
    external
    onlyLicensed
  {
    Property storage property = ownerToIdToPropertyApproved[_from][_tokenId];
    require(property.saleApproved, "Owner must have approved sale");
    require(property.paid, "Payment to contract must be received before function call");

    safeTransferFrom(_from, _to, _tokenId);
    payable(_from).transfer(property.currentPrice);

    property.saleApproved = false;
    property.paid = false;

    ownerToIdToPropertyApproved[_to][_tokenId] = property;

    delete(ownerToIdToPropertyApproved[_from][_tokenId]);
    newOwner[_to] = true;
    owner[_from] = false;
  }

  // Might need to look at functionality here, would make sense to split to two functions
  // Second would be internal and automatically execute when property.priceChangeCount == 2
  function changeCurrentPrice(
    address propertyOwner,
    uint _tokenId,
    uint newPrice
  )
    external
    licensedOrOwner
  {
    Property storage property = ownerToIdToPropertyApproved[propertyOwner][_tokenId];

    property.changePriceCount++;

    if (property.changePriceCount == 2) {
      property.previousPrices.push(property.currentPrice);
      property.currentPrice = newPrice;
      property.changePriceCount = 0;
      emit PropertyPriceChanged(_tokenId, newPrice);
    }
  }

  // Definitely need to map newOwner to property they are allowed to change owner for
  function changeOwner(string calldata newOwnerName, uint salt, uint _tokenId) external onlyNewOwner {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][tokenId];
    property.propertyOwner = keccak256(abi.encode(newOwnerName, salt));
    newOwner[msg.sender] = false;
    owner[msg.sender] = true;
    emit OwnerChanged(msg.sender, _tokenId);
  }

  // Emits Transfer event
  function burn(uint _tokenId) external onlyPropertyOwner {
    _burn(_tokenId);
  }

  function revokeLicense() external onlyLicensed {
    licensed[msg.sender] = false;
    emit LicenseRevoked(msg.sender);
  }

  // Oracle call to validate and approve the property owner.  Must also be approved by agent, not one
  // That registered property
  function approvePropertyOwner(
    string calldata ownerName,
    string calldata url,
    string calldata path,
    address _potentialOwner
  )
    external
    approvedByAgent(_potentialOwner)
  {
    requestOwnerData(ownerName, url, path);
    if(true/*Oracle call works*/) {
      owner[msg.sender] = true;
      emit OwnerApproved(_potentialOwner);
    }
  }

  // Oracle call will validate and approve property owner.  Must also be approved by other agent
  function approveLicense(
    string calldata agentName,
    string calldata url,
    string calldata path,
    address _potentialAgent
  )
    external
    approvedByAgent(_potentialAgent)
  {

    requestAgentData(agentName, url, path);
    if (true) {
      licensed[msg.sender] = true;
      emit AgentApproved(_potentialAgent);
    }
  }

  function agentApproval(address toBeApproved) external onlyLicensed {
    require(
      msg.sender != registeringAgent[toBeApproved],
      "Agent that registered property cannot also approve owner"
    );

    numAgentApprovals[toBeApproved]++;
  }

  // Emits ERC721 "Transfer" event
  function mint(address to, uint _tokenId) internal {
    _safeMint(to, _tokenId);
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
