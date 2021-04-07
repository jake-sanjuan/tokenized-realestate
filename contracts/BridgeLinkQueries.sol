//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract BridgeLinkQueries is ChainlinkClient, Initializable {

  AggregatorV3Interface internal priceFeed;

  mapping(uint => ChainlinkReturn) public countToChainlinkReturn;

  struct DataToChainlinkQuery {
    string url;
    string namePath;
    string addrPath;
  }

  struct ChainlinkReturn {
    bytes32 name;
    bytes32 addr;
  }

  address public oracle;
  bytes32 public jobId;
  uint256 public fee;

  uint validatorCount;

  function initialize() public virtual initializer {
    setPublicChainlinkToken();
    oracle = 0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD;// Find oracle
    jobId = keccak256("");// Figure out where to get jobId
    fee = 1;// Will depend on oracle used
    priceFeed = AggregatorV3Interface(0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD/*TODO: Get Kovan address for ETH USD*/);
    validatorCount = 0;
  }

  function homeValueEthToUsd(uint homeValueInEther) public view returns (int) {
    (, int price, , , ) = priceFeed.latestRoundData();
    return price * int(homeValueInEther);
  }

  function fulfillCheckName(
    bytes32 _requestId,
    bytes32 _chainlinkResponse
  )
    external
    recordChainlinkFulfillment(_requestId)
  {
    ChainlinkReturn storage linkReturn = countToChainlinkReturn[validatorCount];
    linkReturn.name = _chainlinkResponse;
  }

  function fulfillCheckAddress(
    bytes32 _requestId,
    bytes32 _chainlinkResponse
  )
    external
    recordChainlinkFulfillment(_requestId)
  {
    ChainlinkReturn storage linkReturn = countToChainlinkReturn[validatorCount];
    linkReturn.addr = _chainlinkResponse;
  }

  function validateUser(DataToChainlinkQuery memory linkData) internal returns (uint) {
    ChainlinkReturn storage linkReturn = countToChainlinkReturn[validatorCount];
    linkReturn.name = "";
    linkReturn.addr = "";

    checkName(linkData.url, linkData.namePath);
    checkAddress(linkData.url, linkData.addrPath);
    incrementValidatorCount();

    return validatorCount - 1;
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function checkName(
    string memory url,
    string memory path
    )
    private
    returns (bytes32 requestId)
  {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillCheckName.selector);

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function checkAddress(
    string memory url,
    string memory path
    )
    private
    returns (bytes32 requestId) {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillCheckAddress.selector);

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function incrementValidatorCount() private {
    validatorCount++;
  }
}
