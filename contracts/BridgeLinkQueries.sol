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
    setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
    oracle = 0x1b666ad0d20bC4F35f218120d7ed1e2df60627cC;
    jobId = "e7fbe2c2bde643788f4a76b7b09db8ff";
    fee = 0.1 * 10 ** 18;
    priceFeed = AggregatorV3Interface(0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b);
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

  function checkName(
    string memory url,
    string memory path
    )
    private
    returns (bytes32 requestId)
  {

    Chainlink.Request memory request = buildChainlinkRequest(
      jobId,
      address(this),
      this.fulfillCheckName.selector
    );

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function checkAddress(
    string memory url,
    string memory path
    )
    private
    returns (bytes32 requestId) {

    Chainlink.Request memory request = buildChainlinkRequest(
      jobId,
      address(this),
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
