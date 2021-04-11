pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Bridge is ERC721 {

  AggregatorV3Interface internal priceFeed;

  mapping(address => Property) public propertyToOwner;

  uint public tokenId;

  struct Property {
    string propertyOwner;
    string propertyAddress;
    uint postalCode;
    uint id; // This will be the tokenId
  }

  constructor() public ERC721("Bridge", "BRDG") {
    priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    tokenId = 0;
  }

  function homeValueInEther(uint priceInUSD) public view returns (uint) {
    ( , int price, , , ) = priceFeed.latestRoundData();
    return priceInUSD / uint(price);
  }

  function registerProperty(
    string calldata _propertyOwner,
    string calldata _propertyAddress,
    uint _postalCode
  ) external
    virtual
  {
    uint _tokenId = mintProperty();

    Property storage property = propertyToOwner[msg.sender];
    property.propertyOwner = _propertyOwner;
    property.propertyAddress = _propertyAddress;
    property.postalCode = _postalCode;
    property.id = _tokenId;
  }

  // Emits transfer event
  function mintProperty() internal virtual returns (uint) {
    _safeMint(msg.sender, tokenId);
    tokenId++;
    return tokenId - 1;
  }

}
