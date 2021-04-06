pragma solidity ^0.6.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract BridgeLinkQueries is ChainlinkClient, Initializable {

  AggregatorV3Interface internal priceFeed;

  address public oracle;
  bytes32 public jobId;
  uint256 public fee;

  function initialize() public virtual initializer {
    setPublicChainlinkToken();
    oracle = 0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD;// Find oracle
    jobId = keccak256("");// Figure out where to get jobId
    fee = 1;// Will depend on oracle used
    priceFeed = AggregatorV3Interface(0x605C9B6f969A27982Fe1Be16e3a24F6720A14beD/*TODO: Get address for ETH USD*/);
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function requestOwnerData(
    string memory ownerName,
    string memory url,
    string memory path
    )
    internal
    returns (bytes32 requestId)
  {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  // Might not be able to be internal
  // Emits "ChainlinkRequested" event
  function requestAgentData(
    string memory agentName,
    string memory url,
    string memory path
    )
    internal
    returns (bytes32 requestId) {

    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    request.add("get", url);
    request.add("path", path);

    return sendChainlinkRequestTo(oracle, request, fee);
  }

  function fulfill(
    bytes32 _requestId,
    bytes32 _chainlinkResponse
  )
    external
    recordChainlinkFulfillment(_requestId)
  {
    console.logBytes32(_chainlinkResponse);
  }
}
