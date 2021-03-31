//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

// Need to figure out IPFS storage, needs to be private, Nic sent good links
  // This will be through front end
// Add events
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
    - Could this be a seperate NFT? Might have to significantly alter contract,
      tokenized real estate licensing isn't a bad idea though
    - Need title, certificate of title, deed uploaded to IPFS
    - Also could have a section for 'arbitrary documents'
*/

// Is it unsafe to assign tokenId before minting token?

contract Tokenizer is ERC721, ChainlinkClient {

  AggregatorV3Interface internal priceFeed;

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

  public string baseURI;  // Not sure if needed, can probably be passed in directly
  public uint tokenId;

  address public oracle;
  bytes32 public jobId;
  uint256 public fee;

  /*TODO: Figure out params for events, decide if extra events are needed where
  events already emitted*/
  event PropertyRegistered();
  event AgentApprovedProperty();
  event SaleApproved();
  event PaymentRecieved();
  event PropertyPriceChanged();
  event OwnerChanged();
  event LicenseRevoked();
  event OwnerApproved();
  event AgentApproved();

  constructor() ERC721("Property Token", "PT") {
    tokenId = 0;
    setPublicChainlinkToken();
    oracle = // Find oracle
    jobId = // Figure out where to get jobId
    fee = // Will depend on oracle used
    priceFeed = AggregatorV3Interface(/*TODO: Get address for ETH USD*/);
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
    string _propertyOwner,
    string _propertyAddress,
    uint salt,  // Will be displayed as pin to user on frontend
    uint _currentPrice,
    address _propertyOwner
  )
    external
    onlyPropertyOwner
  {
    Property storage property;

    property.propertyOwner = keccack256(_propertyOwner + salt);
    property.propertyAddress = keccak256(_propertyAddress + salt);
    property.currentPrice = _currentPrice;
    property.paid = false;
    property.saleApproved = false;

    awaitingApproval[msg.sender] = property;

    emit RegisteredProperty();
  }

  function approveProperty(address _propertyOwner) external onlyLicensed {

    Property storage property = awaitingApproval[_propteryOwner];

    registeringAgent[_propertyOwner] = msg.sender;
    ownerToIdToPropertyApproved[_propertyOwner][tokenId] = property;

    tokenId++;

    delete(awaitingApproval[_propertyOwner]);

    emit AgentApprovedProperty();

    return tokenId - 1;
  }

  //Emits "Transfer" event via "mint()" function
  function mintProperty(
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

    mint(msg.sender, _tokenId);
  }

  function approveForSaleByOwner(uint _tokenId) external onlyPropertyOwner {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][_tokenId];

    property.saleApproved = true;
    emit SaleApproved();
  }

  // Need functionality to accept payment and route to agent so they can actually sell
  // Escrow somehow?
  function payment(uint _tokenId, address owner) external payable onlyNewOwner {
    Property storage property = ownerToIdToPropertyApproved[owner][_tokenId];

    require(msg.value == property.currentPrice, "Must send exact amount");

    property.paid = true;

    emit PaymentRecieved();
  }

  // Idea is that agent will receive ether and send to owner.  Need to figure out how to stop bad actors
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

    safeTransfer(_from, _to, _tokenId);
    _from.transfer(property.currentPrice);

    property.saleApproved = false;
    property.paid = false;

    ownerToPropertyId[_to][_tokenId] = property;

    delete(ownerToIdToPropertyApproved[_from][_tokenId]);
    newOwner[_to] = true;
    owner[_from] = false;
  }

  // Might need to look at functionality here, would make sense to split to two functions
  // Second would be internal and automatically execute when property.priceChangeCount == 2
  function changeCurrentPrice(
    address owner,
    uint _tokenId,
    uint newPrice
  )
    external
    licensedOrOwner
  {
    Property storage property = ownerToIdToPropertyApproved[owner][_tokenId];

    property.changePriceCount++

    if (property.changePriceCount == 2) {
      property.previousPrices.push(property.currentPrice);
      property.currentPrice = newPrice;
      property.changePriceCount = 0;
      emit PropertyPriceChanged();
    }
  }

  function changeOwner(string newOwnerName, uint salt, uint _tokenId) external onlyNewOwner {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][tokenId];
    property.propertyOwner = keccak256(newOwnerName + salt);
    newOwner[msg.sender] = false;
    owner[msg.sender] = true;
    emit OwnerChanged();
  }

  // Emits Transfer event
  function burn(uint _tokenId) external onlyPropertyOwner {
    _burn(tokenId);
  }

  function revokeLicense() external onlyLicensed {
    licensed[msg.sender] = false;
    emit LicenseRevoked();
  }

  // Oracle call to validate and approve the property owner.  Must also be approved by agent, not one
  // That registered property
  function approvePropertyOwner(
    address _potentialOwner
  )
    external
    approvedByAgent(_potentialOwner)
  {
    requestOwnerData();
    if(/*Oracle call works*/) {
      owner[msg.sender] = true;
      emit OwnerApproved();
    }
  }


  // Oracle call will validate and approve property owner.  Must also be approved by other agent
  function approveLicense(
    address _potentialAgent
  )
    external
    approvedByAgent(_potentialAgent)
  {

    requestAgentData();
    if (/*Oracle call works*/) {
      licensed[msg.sender] = true;
      emit AgentApproved();
    }
  }

  function agentApproval(address toBeApproved) external onlyLicensed {
    require(
      msg.sender != registeringAgent[toBeApproved],
      "Agent that registered property cannot also approve owner"
    );

    numAgentApprovals[toBeApproved]++;
  }

  //Emits ChainlinkFulfilled event
  function fulfill(
    bytes32 _requestId,
    /*TODO: Add type here*/
  )
    external
    recordChainlinkFulfillment
  {
    /*TODO: Return info, bool?*/
  }

  function homeValueEthToUsd(uint tokenId, address owner) external view returns (uint) {
    Property memory property = ownerToIdToPropertyApproved[owner][_tokenId];

    (
        uint80 roundId,
        int price,
        uint startedAt,
        uint timestamp,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price * property.currentPrice;
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function requestOwnerData() internal returns (bytes32 requestId) {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    request.add("get", /*TODO: Add Path*/);
    request.add("path", /*TODO: Destructure JSON*/);

    return sendChainlinkRequest(oracle, request, fee);
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function requestAgentData() internal returns (bytes32 requestId) {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    request.add("get", /*TODO: Add Path*/);
    request.add("path", /*TODO: Destructure JSON*/);

    return sendChainlinkRequest(oracle, request, fee);
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
