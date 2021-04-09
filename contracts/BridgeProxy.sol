pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/UpgradeableProxy.sol";

contract BridgeProxy is UpgradeableProxy {

  constructor(address _bridgeAddr) public UpgradeableProxy(_bridgeAddr, "") {

  }

}
