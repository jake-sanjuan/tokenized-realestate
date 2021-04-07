//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./BridgeLibrary.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract BridgeLinkQueries is ChainlinkClient {

  AggregatorV3Interface internal priceFeed;

  mapping (uint => BridgeLibrary.ChainlinkReturn) public countToChainlinkReturn;

  address public oracle;
  bytes32 public jobId;
  uint256 public fee;

  uint validatorCount;

  constructor() public {
    setPublicChainlinkToken();
    oracle = 0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD;// Find oracle
    jobId = keccak256("");// Figure out where to get jobId
    fee = 1;// Will depend on oracle used
    priceFeed = AggregatorV3Interface(0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD/*TODO: Get Kovan address for ETH USD*/);
    validatorCount = 0;
  }

  function homeValueEthToUsd(uint homeValueInEther) external view returns (int) {
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
    BridgeLibrary.ChainlinkReturn storage linkReturn =
      countToChainlinkReturn[validatorCount];
    linkReturn.name = _chainlinkResponse;
  }

  function fulfillCheckAddress(
    bytes32 _requestId,
    bytes32 _chainlinkResponse
  )
    external
    recordChainlinkFulfillment(_requestId)
  {
    BridgeLibrary.ChainlinkReturn storage linkReturn =
      countToChainlinkReturn[validatorCount];
    linkReturn.addr = _chainlinkResponse;
  }

  function retrieveData(
    uint _validatorCount
  )
    external
    view
    returns (BridgeLibrary.ChainlinkReturn memory)
  {
    BridgeLibrary.ChainlinkReturn memory linkReturn = countToChainlinkReturn[_validatorCount];
    return linkReturn;
  }

  function validateUser(
    BridgeLibrary.DataToChainlinkQuery calldata linkData
  )
    external
    returns (uint) {

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

    Chainlink.Request memory request = buildChainlinkRequest(
      jobId,
      address(this), // Needs to be proxy address,
      this.fulfillCheckName.selector
    );

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

    Chainlink.Request memory request = buildChainlinkRequest(
      jobId,
      address(this), // Needs to be proxy address,
      this.fulfillCheckAddress.selector
    );

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function incrementValidatorCount() private {
    validatorCount++;
  }
}
