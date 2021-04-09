//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./BridgeLibrary.sol";
import "./BridgeLinkQueries.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";


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

contract Bridge is Initializable, ERC721Upgradeable {

  mapping (address => bool) public licensed;
  mapping (address => bool) public owner;
  mapping (address => bool) public approved; // Allows users that have sold property to remain validated
  mapping (address => bool) public newOwner; // Used for new owners that have not changed name yet
  mapping (address => address) public registeringAgent;
  mapping (address => uint) public numAgentApprovals;
  mapping (address => Property) public awaitingApproval;
  mapping (address => mapping (uint => Property)) ownerToIdToPropertyApproved;

  struct Property {
    bytes32 propertyOwner;
    bytes32 propertyAddress;
    uint currentPrice;
    uint changePriceCount;
    bool saleApproved;
    bool paid;
    uint[] previousPrices;
  }

  uint public tokenId;

  BridgeLinkQueries public linkQueries;

  event PropertyRegistered(
    address indexed registeringAddress,
    uint indexed originalPrice
  );
  event AgentApprovedProperty(
    address indexed agent,
    address indexed propertyOwner,
    uint indexed tokenId
  );
  event SaleApproved(address indexed owner, uint indexed tokenId);
  event PaymentRecieved(
    address indexed buyer,
    uint indexed paymentAmount,
    uint indexed tokenId
  );
  event PropertyPriceChanged(uint indexed tokenId, uint indexed newPrice);
  event OwnerChanged(address indexed newOwner, uint indexed tokenId);
  event LicenseRevoked(address indexed revokedLicenseAddress);
  event OwnerApproved(address indexed newOwnerApproved);
  event AgentApproved(address indexed newAgentApproved);

  function initialize() public virtual initializer {
    linkQueries = new BridgeLinkQueries();
    super.__ERC721_init("Bridge", "BRDG");
    licensed[msg.sender] = true;
    tokenId = 0;
  }

  modifier onlyLicensed() {
    require(licensed[msg.sender] == true, "Must be verified to call function.");
    _;
  }

  modifier onlyPropertyOwner() {
    require(
      owner[msg.sender] == true,
      "Must be validated property owner to call function."
    );
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
    uint _currentPrice,
    address _propertyOwnerAddr
  )
    external
    onlyPropertyOwner
  {
    Property storage property = awaitingApproval[_propertyOwnerAddr];
    property.propertyOwner = keccak256(abi.encode(_propertyOwner, salt));
    property.propertyAddress = keccak256(abi.encode(_propertyAddress, salt));
    property.currentPrice = _currentPrice;
    property.paid = false;
    property.saleApproved = false;

    emit PropertyRegistered(msg.sender, _currentPrice);
  }

  function approveProperty(
    address _propertyOwner
  )
    external
    onlyLicensed
    returns (uint)
  {
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

    require(
      property.propertyOwner == keccak256(abi.encode(_propertyOwner, salt)) &&
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

  function payment(
    uint _tokenId,
    address propertyOwner
  )
    external
    payable
    onlyNewOwner
  {
    Property storage property = ownerToIdToPropertyApproved[propertyOwner][_tokenId];
    require(msg.value == property.currentPrice, "Must send exact amount");
    property.paid = true;

    emit PaymentRecieved(msg.sender, msg.value, _tokenId);
  }

  function sell(
    address _from,
    address _to,
    uint _tokenId
  )
    external
    onlyLicensed
  {
    Property storage property = ownerToIdToPropertyApproved[_from][_tokenId];
    require(
      property.saleApproved,
      "Owner must have approved sale"
    );
    require(
      property.paid,
      "Payment to contract must be received before function call"
    );
    require(
      approved[_to],
      "Must be validated as owner"
    );

    safeTransferFrom(_from, _to, _tokenId);
    payable(_from).transfer(property.currentPrice);

    property.saleApproved = false;
    property.paid = false;
    ownerToIdToPropertyApproved[_to][_tokenId] = property;
    delete(ownerToIdToPropertyApproved[_from][_tokenId]);
    newOwner[_to] = true;
    owner[_from] = false;
  }

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

  function changeOwner(
    string calldata newOwnerName,
    string calldata propertyAddress,
    uint salt,
    uint _tokenId
  )
    external
    onlyNewOwner
  {
    Property storage property = ownerToIdToPropertyApproved[msg.sender][_tokenId];

    property.propertyOwner = keccak256(abi.encode(newOwnerName, salt));
    property.propertyAddress = keccak256(abi.encode(propertyAddress, salt));
    newOwner[msg.sender] = false;
    owner[msg.sender] = true;
    emit OwnerChanged(msg.sender, _tokenId);
  }

  function burn(uint _tokenId) external onlyPropertyOwner {
    _burn(_tokenId);
  }

  function revokeLicense() external onlyLicensed {
    licensed[msg.sender] = false;
    emit LicenseRevoked(msg.sender);
  }

  function approveOwner(
    bytes32 _ownerName,
    bytes32 _addr,
    string calldata _url,
    string calldata _namePath,
    string calldata _addrPath,
    address _potentialOwner
  )
    external
    approvedByAgent(_potentialOwner)
  {

    BridgeLibrary.DataToChainlinkQuery memory linkData;
    linkData.url = _url;
    linkData.namePath = _namePath;
    linkData.addrPath = _addrPath;

    uint chainlinkReturnNum = linkQueries.validateUser(linkData);

    BridgeLibrary.ChainlinkReturn memory linkReturn =
      linkQueries.retrieveData(chainlinkReturnNum);

    require(
      linkReturn.name == _ownerName && linkReturn.addr == _addr,
      "Does not match Oracle validation"
    );

    approved[_potentialOwner] = true;
    emit OwnerApproved(_potentialOwner);

  }

  function approveLicense(
    bytes32 _agentName,
    bytes32 _addr,
    string calldata _url,
    string calldata _namePath,
    string calldata _addrPath,
    address _potentialAgent
  )
    external
    approvedByAgent(_potentialAgent)
  {

    BridgeLibrary.DataToChainlinkQuery memory linkData;
    linkData.url = _url;
    linkData.namePath = _namePath;
    linkData.addrPath = _addrPath;

    uint chainlinkReturnNum = linkQueries.validateUser(linkData);

    BridgeLibrary.ChainlinkReturn memory linkReturn =
      linkQueries.retrieveData(chainlinkReturnNum);

    require(
      linkReturn.name == _agentName && linkReturn.addr == _addr,
      "Does not match Oracle validation"
    );

    owner[_potentialAgent] = true;
    emit AgentApproved(_potentialAgent);
  }

  function agentApproval(address toBeApproved) external onlyLicensed {
    require(
      msg.sender != registeringAgent[toBeApproved],
      "Agent that registered property cannot also approve owner"
    );
    numAgentApprovals[toBeApproved]++;
  }

  function checkHomePriceInUsd(uint priceInEther) external view {
    linkQueries.homeValueEthToUsd(priceInEther);
  }

  function mint(address to, uint _tokenId) private {
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
